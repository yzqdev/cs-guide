#!/bin/bash
# MySQL 数据库备份脚本
# 用法: sh mysql_backup.sh "20260715"
# 参数: 备份日期（YYYYMMDD）

set -e

backupDatetime=$1

if [ "$backupDatetime" = "" ]; then
    echo -e "\033[0;31m❌ 请输入备份日期，例如: sh mysql_backup.sh 20260715\033[0m"
    exit 1
fi

echo "📅 备份日期 = $backupDatetime"
echo "📦 开始备份..."

/usr/bin/mysqldump -u root --password=123456 数据库名 > /opt/mydb-"$backupDatetime".sql

echo "✅ 备份完成: /opt/mydb-${backupDatetime}.sql"