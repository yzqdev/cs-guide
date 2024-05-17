# rust 测试

## 在src内部

```rust
#[cfg(test)]  
mod tests {  
    use super::*;  
  
    #[test]  
    fn one_result() {  
        let query = "duct";  
        let contents = "\  
Rust:  
safe, fast, productive.  
Pick three.";  
  
        assert_eq!(vec!["safe, fast, productive."], search(query, contents));  
    }  
}
```

## tests文件夹

在src兄弟路径创建tests文件夹,里面加入hello_test.rs

```rust
#[test]  
fn hello(){  
     println!("{}","hhh") 
}
```