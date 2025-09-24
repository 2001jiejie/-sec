# 0x3 内网渗透

内网渗透是企业级渗透测试的核心，涉及Active Directory域环境的深度攻击技术。

## 📚 技术问答

### 🏢 域环境基础
- **域内收集信息的常用命令？**
- **域内用户和工作组用户的差别？**
- **什么情况下叫在域内？**
- **可以从什么方向去判断目标存在域环境？**

### 🎫 Kerberos认证
- **Kerberos认证大致流程和角色？**
- **黄金票据原理，在 Kerberos认证的哪个阶段？如何制作？用哪个用户的 hash 来制作？**
- **黄金票据和白银票据的区别？**

### 🔄 NTLM中继
- **NTLM Relay原理？**

### 🎯 域攻击技术
- **进入内网后，你的整体流程和思路是什么样的？**
- **有哪些方法可以直接攻击域控？**

### 🔗 委派攻击
- **内网 PotitPetam 利用和原理？**
- **几种委派的原理和利用方式？**

### 💻 漏洞利用
- **NoPAC漏洞的原理？**
- **对一个机器账号有全部属性的写权限，怎么利用？**
- **如果默认的可以创建10个机器账号被修改为0了怎么绕过？**

### 🎟️ 票据攻击
- **Kerberosting原理？**
- **利用Kerberosting的时候会重点关注哪些服务？**
- **AS-REPRoasting原理？**
- **有一台工作组的机器，可以访问域控，这时候怎么利用AS-REPRoasting？**

### 🥔 提权技术
- **几种土豆提权的原理？**

### 🔐 证书服务
- **ADCS漏洞了解过吗？**

### 🔑 凭证利用
- **如果只有hash，怎么登录RDP？**

### ⚡ 重大漏洞
- **Zerologon漏洞的原理？**

### 🌉 域信任
- **说一下域间信任？**

### 🌐 网络问题
- **挂了socks代理，但是ping不通内网的机器，为什么？**

---

## 🎯 内网渗透流程

### 1. 初始访问
```bash
# 获得初始立足点
- Web应用漏洞
- 钓鱼攻击
- 供应链攻击
- 物理接入
```

### 2. 执行和持久化
```bash
# 在目标系统执行代码
- PowerShell执行
- WMI执行
- 计划任务
- 服务安装
```

### 3. 权限提升
```bash
# 本地权限提升
- 内核漏洞利用
- 服务权限配置错误
- DLL劫持
- UAC绕过
```

### 4. 防御绕过
```bash
# 绕过安全防护
- 进程注入
- 内存执行
- 白名单绕过
- 日志清除
```

### 5. 凭证获取
```bash
# 获取用户凭证
mimikatz
sekurlsa::logonpasswords
sekurlsa::wdigest
sekurlsa::kerberos
```

### 6. 发现
```bash
# 网络发现
netsh interface show
arp -a
net view /domain
nltest /domain_trusts
```

### 7. 横向移动
```bash
# 横向移动技术
- Pass the Hash
- Pass the Ticket
- WMI横向移动
- PowerShell Remoting
```

## 🛠️ 核心工具

### 域信息收集
- **BloodHound** - 域关系分析
- **PowerView** - PowerShell域枚举
- **ADRecon** - Active Directory侦察
- **Ldapdomaindump** - LDAP信息提取

### 凭证获取
- **Mimikatz** - 内存凭证提取
- **LaZagne** - 多平台密码恢复
- **SessionGopher** - 会话信息提取
- **KeeThief** - KeePass数据库攻击

### 横向移动
- **Impacket** - Python实现的网络协议库
- **CrackMapExec** - 后渗透枚举和攻击
- **Evil-WinRM** - Windows Remote Management客户端
- **SharpRDP** - C#实现的RDP客户端

### 权限提升
- **PowerUp** - Windows权限提升检查
- **BeRoot** - 多平台权限提升检查
- **Watson** - Windows漏洞检查
- **Sherlock** - PowerShell漏洞检查

---

> 🏰 **内网渗透心得**: 域环境是企业网络的心脏，理解Active Directory的工作原理是成功进行内网渗透的关键。
