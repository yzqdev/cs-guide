# jpa操作

## 更新(update)

```java
@Modifying
@Query("update User u set u.firstname = ?1, u.lastname = ?2 where u.id = ?3")
void setUserInfoById(String firstname, String lastname, Integer userId);

```

或者使用save,但是必须带有id

```java
public void updateUser(Userinfos u) {
    User userFromDb = userRepository.findById(u.getid());
    // crush the variables of the object found
    userFromDb.setFirstname("john"); 
    userFromDb.setLastname("dew");
    userFromDb.setAge(16);
    userRepository.save(userFromDb);
}
```
