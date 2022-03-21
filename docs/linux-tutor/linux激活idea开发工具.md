# linux使用idea

## 备份软件配置

导出为settings.zip
里面有一个installed.txt即为已有的插件
​

导入的时候需要**新开一个空白项目然后更新插件**,等他下载完毕就可以用插件了
​

```text
idea默认配置文件位置
/home/yzqdev/.config/JetBrains/IntelliJIdea2021.3

idea默认插件位置
/home/yzqdev/.local/share/JetBrains/IntelliJIdea2021.3
```

## idea默认vmoptions

```python
-Xms128m
-Xmx750m
-XX:ReservedCodeCacheSize=512m
-XX:+IgnoreUnrecognizedVMOptions
-XX:+UseG1GC
-XX:SoftRefLRUPolicyMSPerMB=50
-XX:CICompilerCount=2
-XX:+HeapDumpOnOutOfMemoryError
-XX:-OmitStackTraceInFastThrow
-ea
-Dsun.io.useCanonCaches=false
-Djdk.http.auth.tunneling.disabledSchemes=""
-Djdk.attach.allowAttachSelf=true
-Djdk.module.illegalAccess.silent=true
-Dkotlinx.coroutines.debug=off
-Dide.no.platform.update=true
-Didea.config.path=D:\\configuration\\GolandConf\\config
-Didea.system.path=D:\\configuration\\GolandConf\\system
-Didea.log.path=D:\\configuration\\GolandConf\\system\\log
-Dtoolbox.notification.token=-6tXZmdW_5QqEo28Bi2wcmlnMyYTIXpIdcIAQ6HXN-s=
-Dtoolbox.notification.portFile=D:\JetBrains\apps\Goland\ch-1\213.6777.51.vmoptions.port
-Didea.plugins.path=D:\\JetBrains\\apps\\Goland\\ch-1\\213.6777.51.plugins

```

## 下载ja-netfilter软件

[https://jetbra.in/s](https://jetbra.in/s)  复制注册码
​

文件夹里面有一个script文件夹
修改`install.sh`为

```python
#!/bin/sh

set -e

OS_NAME=$(uname -s)
JB_PRODUCTS="idea clion phpstorm goland pycharm webstorm webide rider datagrip rubymine appcode dataspell gateway jetbrains_client jetbrainsclient"

BASE_PATH=$(dirname $(
  cd $(dirname "$0")
  pwd
))

JAR_FILE_PATH="${BASE_PATH}/ja-netfilter.jar"

if [ ! -f "${JAR_FILE_PATH}" ]; then
  echo 'ja-netfilter.jar not found'
  exit -1
fi

KDE_ENV_DIR="${HOME}/.config/plasma-workspace/env"
LAUNCH_AGENTS_DIR="${HOME}/Library/LaunchAgents"

PROFILE_PATH="${HOME}/.profile"
ZSH_PROFILE_PATH="${HOME}/.zshrc"
PLIST_PATH="${LAUNCH_AGENTS_DIR}/jetbrains.vmoptions.plist"

if [ $OS_NAME = "Darwin" ]; then
  BASH_PROFILE_PATH="${HOME}/.bash_profile"

  mkdir -p "${LAUNCH_AGENTS_DIR}"
  echo '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict><key>Label</key><string>jetbrains.vmoptions</string><key>ProgramArguments</key><array><string>sh</string><string>-c</string><string>' >"${PLIST_PATH}"
else
  BASH_PROFILE_PATH="${HOME}/.bashrc"
  mkdir -p "${KDE_ENV_DIR}"
fi

touch "${PROFILE_PATH}"
touch "${BASH_PROFILE_PATH}"
touch "${ZSH_PROFILE_PATH}"

MY_VMOPTIONS_SHELL_NAME="jetbrains.vmoptions.sh"
MY_VMOPTIONS_SHELL_FILE="${HOME}/.${MY_VMOPTIONS_SHELL_NAME}"
echo '#!/bin/sh' >"${MY_VMOPTIONS_SHELL_FILE}"

EXEC_LINE='___MY_VMOPTIONS_SHELL_FILE="${HOME}/.jetbrains.vmoptions.sh"; if [ -f "${___MY_VMOPTIONS_SHELL_FILE}" ]; then . "${___MY_VMOPTIONS_SHELL_FILE}"; fi'

for PRD in $JB_PRODUCTS; do
  VM_FILE_PATH="${BASE_PATH}/vmoptions/${PRD}.vmoptions"
  if [ ! -f "${VM_FILE_PATH}" ]; then
    continue
  fi

  if [ $OS_NAME = "Darwin" ]; then
    sed -i '' '/^\-javaagent:.*[\/\\]ja\-netfilter\.jar.*/d' "${VM_FILE_PATH}"
  else
    sed -i '/^\-javaagent:.*[\/\\]ja\-netfilter\.jar.*/d' "${VM_FILE_PATH}"
  fi

  echo "-javaagent:${JAR_FILE_PATH}=jetbrains" >>"${VM_FILE_PATH}"

  ENV_NAME=$(echo $PRD | tr '[a-z]' '[A-Z]')"_VM_OPTIONS"
  echo "export ${ENV_NAME}=\"${VM_FILE_PATH}\"" >>"${MY_VMOPTIONS_SHELL_FILE}"

  if [ $OS_NAME = "Darwin" ]; then
    launchctl setenv "${ENV_NAME}" "${VM_FILE_PATH}"
    echo "launchctl setenv \"${ENV_NAME}\" \"${VM_FILE_PATH}\"" >>"${PLIST_PATH}"
  fi
done

if [ $OS_NAME = "Darwin" ]; then
  sed -i '' '/___MY_VMOPTIONS_SHELL_FILE="${HOME}\/\.jetbrains\.vmoptions\.sh"; if /d' "${PROFILE_PATH}"   2>&1
  sed -i '' '/___MY_VMOPTIONS_SHELL_FILE="${HOME}\/\.jetbrains\.vmoptions\.sh"; if /d' "${BASH_PROFILE_PATH}"   2>&1
  sed -i '' '/___MY_VMOPTIONS_SHELL_FILE="${HOME}\/\.jetbrains\.vmoptions\.sh"; if /d' "${ZSH_PROFILE_PATH}"   2>&1
  
  echo '</string></array><key>RunAtLoad</key><true/></dict></plist>' >>"${PLIST_PATH}"
else
  sed -i '/___MY_VMOPTIONS_SHELL_FILE="${HOME}\/\.jetbrains\.vmoptions\.sh"; if /d' "${PROFILE_PATH}"   2>&1
  sed -i '/___MY_VMOPTIONS_SHELL_FILE="${HOME}\/\.jetbrains\.vmoptions\.sh"; if /d' "${BASH_PROFILE_PATH}"   2>&1
  sed -i '/___MY_VMOPTIONS_SHELL_FILE="${HOME}\/\.jetbrains\.vmoptions\.sh"; if /d' "${ZSH_PROFILE_PATH}"   2>&1
fi

echo "${EXEC_LINE}" >>"${PROFILE_PATH}"
echo "${EXEC_LINE}" >>"${BASH_PROFILE_PATH}"
echo "${EXEC_LINE}" >>"${ZSH_PROFILE_PATH}"

if [ $OS_NAME = "Darwin" ]; then
  echo 'done.'
else
  ln -sf "${MY_VMOPTIONS_SHELL_FILE}" "${KDE_ENV_DIR}/${MY_VMOPTIONS_SHELL_NAME}"
  echo "done. you'd better log off first!"
fi

```
