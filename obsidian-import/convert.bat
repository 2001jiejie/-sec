@echo off
echo 🚀 Obsidian 到 VitePress 转换工具
echo.

REM 检查参数
if "%~1"=="" (
    echo 用法: convert.bat "Obsidian笔记路径" [目标路径]
    echo.
    echo 示例:
    echo   convert.bat "C:\Users\用户名\Documents\MyVault"
    echo   convert.bat "D:\Obsidian\Notes" "notes\tech"
    echo.
    pause
    exit /b 1
)

REM 设置默认目标路径
set "target_path=notes"
if not "%~2"=="" set "target_path=%~2"

echo 源路径: %~1
echo 目标路径: %target_path%
echo.

REM 检查源路径是否存在
if not exist "%~1" (
    echo ❌ 错误: 源路径不存在: %~1
    pause
    exit /b 1
)

REM 运行转换脚本
echo 🔄 开始转换...
node convert-obsidian.js "%~1" "%target_path%"

if %errorlevel% equ 0 (
    echo.
    echo ✅ 转换完成！
    echo.
    echo 📁 转换后的文件保存在: %target_path%
    echo 🔧 请记得更新 .vitepress\config.mts 配置文件
    echo.
) else (
    echo.
    echo ❌ 转换过程中出现错误
)

pause
