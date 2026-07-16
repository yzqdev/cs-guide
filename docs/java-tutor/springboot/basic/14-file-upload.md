---
title: "文件上传与下载"
order: 14
---

# 文件上传与下载

> Spring Boot 提供了方便的文件上传下载支持。

## 配置文件上传

```yaml
spring:
  servlet:
    multipart:
      enabled: true               # 启用文件上传（默认）
      max-file-size: 10MB         # 单个文件最大大小
      max-request-size: 100MB     # 总请求最大大小
      file-size-threshold: 2KB    # 文件写入磁盘的阈值
      location: ${java.io.tmpdir} # 临时存储路径
```

## 文件上传

```java
@RestController
@RequestMapping("/api/files")
public class FileController {

    @Value("${file.upload-path:uploads}")
    private String uploadPath;

    // 单文件上传
    @PostMapping("/upload")
    public Result<String> upload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return Result.error(400, "文件不能为空");
        }

        try {
            // 生成唯一文件名
            String originalName = file.getOriginalFilename();
            String ext = originalName.substring(originalName.lastIndexOf("."));
            String fileName = UUID.randomUUID() + ext;

            // 按日期分目录
            String datePath = LocalDate.now().toString();
            File dir = new File(uploadPath, datePath);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // 保存文件
            File dest = new File(dir, fileName);
            file.transferTo(dest);

            // 返回访问路径
            String url = "/api/files/" + datePath + "/" + fileName;
            return Result.success(url);

        } catch (IOException e) {
            log.error("文件上传失败", e);
            return Result.error(500, "文件上传失败");
        }
    }

    // 多文件上传
    @PostMapping("/uploads")
    public Result<List<String>> uploadMultiple(
            @RequestParam("files") List<MultipartFile> files) {
        List<String> urls = new ArrayList<>();
        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                // 复用单文件上传逻辑
                Result<String> result = upload(file);
                if (result.getCode() == 200) {
                    urls.add(result.getData());
                }
            }
        }
        return Result.success(urls);
    }

    // 文件信息
    @PostMapping("/upload/info")
    public Result<FileInfo> uploadWithInfo(@RequestParam("file") MultipartFile file) {
        FileInfo info = new FileInfo();
        info.setOriginalName(file.getOriginalFilename());
        info.setSize(file.getSize());
        info.setContentType(file.getContentType());
        info.setUrl(upload(file).getData());
        return Result.success(info);
    }
}

@Data
public class FileInfo {
    private String originalName;
    private long size;
    private String contentType;
    private String url;
}
```

## 文件下载

```java
@RestController
@RequestMapping("/api/files")
public class FileDownloadController {

    @Value("${file.upload-path:uploads}")
    private String uploadPath;

    // 直接下载
    @GetMapping("/{datePath}/{fileName}")
    public ResponseEntity<Resource> download(@PathVariable String datePath,
                                              @PathVariable String fileName) {
        try {
            Path filePath = Paths.get(uploadPath, datePath, fileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // 预览（浏览器内打开）
    @GetMapping("/preview/{datePath}/{fileName}")
    public ResponseEntity<Resource> preview(@PathVariable String datePath,
                                             @PathVariable String fileName) {
        // 同 download 但不加 Content-Disposition: attachment
        // 浏览器会根据 Content-Type 决定打开方式
        return download(datePath, fileName);
    }
}
```

## 文件上传到云存储

### 阿里云 OSS

```xml
<dependency>
    <groupId>com.aliyun.oss</groupId>
    <artifactId>aliyun-sdk-oss</artifactId>
    <version>3.17.4</version>
</dependency>
```

```java
@Component
@ConfigurationProperties(prefix = "aliyun.oss")
@Data
public class OssProperties {
    private String endpoint;
    private String accessKeyId;
    private String accessKeySecret;
    private String bucketName;
}

@Component
@RequiredArgsConstructor
public class OssService {

    private final OssProperties ossProperties;

    public String upload(MultipartFile file) {
        OSS ossClient = new OSSClientBuilder().build(
                ossProperties.getEndpoint(),
                ossProperties.getAccessKeyId(),
                ossProperties.getAccessKeySecret());

        try {
            String key = "uploads/" + UUID.randomUUID() + "_" + file.getOriginalFilename();
            ossClient.putObject(ossProperties.getBucketName(), key,
                    new ByteArrayInputStream(file.getBytes()));
            return "https://" + ossProperties.getBucketName() + "." +
                    ossProperties.getEndpoint() + "/" + key;
        } catch (IOException e) {
            throw new RuntimeException("OSS 上传失败", e);
        } finally {
            ossClient.shutdown();
        }
    }
}
```

### 七牛云 Kodo

```java
@Component
@RequiredArgsConstructor
public class KodoService {

    private final KodoProperties properties;

    public String upload(MultipartFile file) {
        Configuration cfg = new Configuration(Region.autoRegion());
        UploadManager uploadManager = new UploadManager(cfg);
        Auth auth = Auth.create(properties.getAccessKey(), properties.getSecretKey());
        String upToken = auth.uploadToken(properties.getBucket());

        try {
            Response response = uploadManager.put(
                    file.getBytes(), UUID.randomUUID().toString(), upToken);
            return "https://" + properties.getDomain() + "/" + response.key;
        } catch (IOException e) {
            throw new RuntimeException("七牛云上传失败", e);
        }
    }
}
```

## 文件类型校验

```java
@Component
public class FileValidator {

    private static final Map<String, List<String>> ALLOWED_TYPES = Map.of(
            "image", List.of("jpg", "jpeg", "png", "gif", "webp"),
            "document", List.of("pdf", "doc", "docx", "xls", "xlsx"),
            "video", List.of("mp4", "avi", "mov")
    );

    public void validate(MultipartFile file, String category) {
        String ext = getExtension(file.getOriginalFilename());
        List<String> allowed = ALLOWED_TYPES.get(category);

        if (allowed == null || !allowed.contains(ext.toLowerCase())) {
            throw new BadRequestException(
                    "不支持的文件类型: " + ext + "，允许类型: " + allowed);
        }

        if (file.getSize() > 10 * 1024 * 1024) {
            throw new BadRequestException("文件大小不能超过 10MB");
        }
    }

    private String getExtension(String filename) {
        return filename.substring(filename.lastIndexOf(".") + 1);
    }
}
```

## 练习

1. 实现单文件和多文件上传接口
2. 添加文件类型校验，只允许上传图片（jpg/png/gif）
3. 实现文件下载接口，支持断点续传（Range 头）
4. 集成阿里云 OSS 或七牛云实现云存储上传
