#!/bin/bash
# For 循环演示脚本
# 用法: sh shell-for.sh [最大数值]
# 示例: sh shell-for.sh 20

totalDegree=$1

# 默认值
if [ "$totalDegree" = "" ]; then
    totalDegree=10
fi

echo "=== 从 0 到 ${totalDegree}，步长 5 ==="
for ((timeTemp = 0; timeTemp <= totalDegree; timeTemp = timeTemp + 5))
do
    echo "timeTemp=$timeTemp"
done
echo "=== 循环结束 ==="