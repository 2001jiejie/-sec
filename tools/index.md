# 安全工具

收集和分享各种实用的网络安全工具，包括使用教程、配置技巧和实战案例。

## 🛠️ 工具分类

### 渗透测试工具
#### Web应用测试
- **[Burp Suite](./burp-suite.md)** - Web应用安全测试的瑞士军刀
- **[OWASP ZAP](./zap.md)** - 开源Web应用安全扫描器
- **[Sqlmap](./sqlmap.md)** - 自动化SQL注入测试工具
- **[Nikto](./nikto.md)** - Web服务器漏洞扫描器

#### 网络扫描工具
- **[Nmap](./nmap.md)** - 网络发现和安全审计工具
- **[Masscan](./masscan.md)** - 高速端口扫描器
- **[Zmap](./zmap.md)** - 互联网范围的网络扫描器

#### 漏洞利用框架
- **[Metasploit](./metasploit.md)** - 渗透测试和漏洞利用框架
- **[Cobalt Strike](./cobalt-strike.md)** - 商业渗透测试工具
- **[Empire](./empire.md)** - PowerShell后渗透框架

### 信息收集工具
- **Subfinder** - 子域名枚举工具
- **Amass** - 深度攻击面映射工具
- **TheHarvester** - 邮箱和域名信息收集
- **Recon-ng** - Web侦察框架

### 密码攻击工具
- **John the Ripper** - 密码破解工具
- **Hashcat** - 高性能密码恢复工具
- **Hydra** - 网络登录破解器
- **Medusa** - 快速并行密码破解器

## 📊 工具对比

| 工具类型 | 免费工具 | 商业工具 | 推荐指数 |
|----------|----------|----------|----------|
| Web扫描 | OWASP ZAP | Acunetix | ⭐⭐⭐⭐⭐ |
| 端口扫描 | Nmap | Nessus | ⭐⭐⭐⭐⭐ |
| 漏洞利用 | Metasploit | Core Impact | ⭐⭐⭐⭐ |
| 代码审计 | SonarQube | Checkmarx | ⭐⭐⭐⭐ |

## 🎯 工具选择指南

### 初学者推荐
1. **Nmap** - 学习网络基础知识
2. **Burp Suite Community** - 了解Web安全测试
3. **OWASP ZAP** - 自动化漏洞扫描
4. **Metasploit** - 漏洞利用实践

### 进阶用户推荐
1. **Burp Suite Professional** - 专业Web测试
2. **Cobalt Strike** - 高级持续威胁模拟
3. **自定义脚本** - 针对性工具开发

## ⚙️ 环境搭建

### Kali Linux
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装常用工具
sudo apt install nmap burpsuite sqlmap nikto -y

# 安装Metasploit
curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall
chmod 755 msfinstall
./msfinstall
```

### Docker环境
```dockerfile
# 安全测试环境
FROM kalilinux/kali-rolling

RUN apt-get update && apt-get install -y \
    nmap \
    sqlmap \
    nikto \
    dirb \
    gobuster \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
```

## 📚 学习资源

### 官方文档
- [Burp Suite Documentation](https://portswigger.net/burp/documentation)
- [Metasploit Documentation](https://docs.rapid7.com/metasploit/)
- [Nmap Network Scanning](https://nmap.org/book/)

### 在线实验室
- **PortSwigger Web Security Academy** - Burp Suite实战
- **TryHackMe** - 工具使用教程
- **HackTheBox Academy** - 综合安全培训

---

> 🔧 **提示**: 工具只是手段，理解原理才是关键！
