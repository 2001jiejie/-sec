# 0x4 Java安全

Java安全是企业级应用安全的重要组成部分，涉及反序列化、框架漏洞等多个层面。

## 📚 技术问答

### ☕ Java反射
- **Java反射做了什么事情？**
- **Java反射可以修改Final字段吗？**
- **传统的反射方法加入黑名单怎么绕？**
- **Java中可以执行反弹shell的命令吗？**
- **假设Runtime.exec加入黑名单还有什么方式执行命令？**

### 🔗 JNDI注入
- **RMI和LDAP类型的JNDI注入分别在哪个版本限制？**
- **RMI和LDAP的限制版本分别可以怎样绕过？**

### 🎭 模板注入
- **谈谈TemplatesImpl这个类？**
- **了解BCEL ClassLoader吗？**

### 📦 反序列化
- **谈谈7u21反序列化？**
- **谈谈8u20反序列化？**
- **了解缩小反序列化Payload的手段吗？**

### 🛡️ Shiro框架
- **Shiro反序列化怎么检测key？**
- **Shiro 721怎么利用？**
- **最新版Shiro还存在反序列化漏洞吗？**
- **Shiro反序列化Gadget选择有什么坑吗？**
- **Shiro注入Tomcat内存马有什么坑吗？**
- **有什么办法让Shiro漏洞只能被你一人发现？**
- **Shiro的权限绕过问题了解吗？**
- **Shiro的Payload过长怎么解决？**

### 📝 Log4j漏洞
- **谈谈Log4j2漏洞？**
- **知道Log4j2 2.15.0 RC1修复的绕过吗？**
- **Log4j2的两个DOS CVE了解吗？**
- **Log4j2 2.15.0正式版的绕过了解吗？**
- **Log4j2绕WAF的手段有哪些？**
- **Log4j2除了RCE还有什么利用姿势？**

### 🚀 Fastjson漏洞
- **Fastjson漏洞的原理？**
- **Fastjson漏洞不出网怎么利用？**
- **利用Fastjson漏洞时，怎么判断版本？**

### 🖥️ 中间件回显
- **各个中间件的回显思路？**

### 🧠 内存马
- **内存马有几种不同类别，分别是什么？**

---

## 🎯 Java漏洞分类

### 反序列化漏洞
```java
// 危险的反序列化代码
ObjectInputStream ois = new ObjectInputStream(input);
Object obj = ois.readObject(); // 可能执行恶意代码
```

**利用工具:**
- **ysoserial** - Java反序列化利用工具
- **marshalsec** - 各种序列化库漏洞利用

### JNDI注入
```java
// 危险的JNDI查找
InitialContext ctx = new InitialContext();
ctx.lookup(userInput); // 用户可控输入
```

**绕过版本限制:**
- **RMI绕过** - 使用本地Factory类
- **LDAP绕过** - 利用序列化属性

### 表达式注入
```java
// SpEL表达式注入
@Value("#{${user.expression}}")
private String value;

// OGNL表达式注入
Ognl.getValue(expression, context, root);
```

## 🛠️ 实战工具

### 漏洞检测
- **CodeQL** - 静态代码分析
- **JNDIExploit** - JNDI注入利用工具
- **FastjsonExploit** - Fastjson漏洞利用
- **ShiroExploit** - Shiro漏洞检测利用

### 代码审计
- **SpotBugs** - Java静态分析工具
- **SonarQube** - 代码质量分析
- **Checkmarx** - 商业代码审计工具
- **Semgrep** - 静态分析工具

### 动态分析
- **Burp Suite** - Web应用测试
- **OWASP ZAP** - 开源安全测试
- **Java Decompiler** - Java反编译
- **JD-GUI** - Java字节码查看器

## 📊 漏洞时间线

### 经典漏洞
| 年份 | 漏洞名称 | 影响组件 | 严重程度 |
|------|----------|----------|----------|
| 2017 | Struts2-045 | Apache Struts2 | 🔴 严重 |
| 2019 | Fastjson ≤1.2.47 | Alibaba Fastjson | 🔴 严重 |
| 2020 | Shiro-550 | Apache Shiro | 🟠 高危 |
| 2021 | Log4j2 RCE | Apache Log4j2 | 🔴 严重 |
| 2022 | Spring4Shell | Spring Framework | 🔴 严重 |

### 攻击链示例
```bash
# 完整的Java攻击链
1. 信息收集 → 发现Java应用
2. 框架指纹 → 识别具体组件版本
3. 漏洞检测 → 确认存在可利用漏洞
4. Payload构造 → 生成恶意载荷
5. 漏洞利用 → 获取系统权限
6. 权限维持 → 植入Webshell或后门
```

---

> ☕ **Java安全心得**: Java生态庞大而复杂，框架和组件众多。掌握核心原理比记住具体漏洞更重要，要从底层理解Java的安全机制。
