# 安装 Windows 计划任务：每天 08:00 与 20:00 自动刷新市讯内容（新闻一天两次）
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$npm = (Get-Command npm).Source
$action = New-ScheduledTaskAction -Execute $npm -Argument 'run refresh' -WorkingDirectory $root
$triggerMorning = New-ScheduledTaskTrigger -Daily -At 8:00am
$triggerEvening = New-ScheduledTaskTrigger -Daily -At 8:00pm
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

Register-ScheduledTask -TaskName '市讯每日刷新-上午' -Action $action -Trigger $triggerMorning -Settings $settings -Force | Out-Null
Register-ScheduledTask -TaskName '市讯每日刷新-晚上' -Action $action -Trigger $triggerEvening -Settings $settings -Force | Out-Null

Write-Host '已安装计划任务：市讯每日刷新-上午(08:00)、市讯每日刷新-晚上(20:00)'
Write-Host "工作目录: $root"
Write-Host '也可随时手动执行: npm run refresh'
