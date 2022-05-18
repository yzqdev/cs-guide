# 常用库

## viper

解析yaml和json可能会出现解析值为空,原因是错误的使用了json或者yaml的tag,要使用`mapstructure`标签

```go
type Config{
    QiniuAccessKey     string `yaml:"qiniu_accesskey" mapstruct:"qiniu_accesskey"`
}

```

## gorm

AutoMigrate

<https://gorm.io/zh_CN/docs/migration.html>

## 爬虫

[https://github.com/gocolly/colly](https://github.com/gocolly/colly)
