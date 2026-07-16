---
order: 14
---

# 数据持久化

## 1. 持久化方案对比

| 方案                | 适用场景       | 特点               |
| ------------------- | -------------- | ------------------ |
| `SharedPreferences` | 简单的键值对   | 轻量级，存储小数据 |
| `File`              | 文件读写       | 可以存储任意格式   |
| `SQLite (sqflite)`  | 结构化数据     | 关系型数据库       |
| `Hive`              | NoSQL 本地存储 | 快速，无原生依赖   |
| `Isar`              | NoSQL 本地存储 | 高性能，类型安全   |

## 2. SharedPreferences（共享偏好设置）

```yaml
dependencies:
  shared_preferences: ^2.2.2
```

```dart
import 'package:shared_preferences/shared_preferences.dart';

class PreferencesService {
  static Future<void> saveString(String key, String value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(key, value);
  }

  static Future<String?> getString(String key) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(key);
  }

  static Future<void> saveInt(String key, int value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(key, value);
  }

  static Future<void> saveBool(String key, bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(key, value);
  }

  static Future<void> saveList(String key, List<String> value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(key, value);
  }

  static Future<void> remove(String key) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(key);
  }
}

// 使用
class SettingsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('设置')),
      body: Column(
        children: [
          Switch(
            value: isDarkMode,
            onChanged: (value) async {
              await PreferencesService.saveBool('dark_mode', value);
              setState(() => isDarkMode = value);
            },
          ),
        ],
      ),
    );
  }
}
```

## 3. SQLite（sqflite）

```yaml
dependencies:
  sqflite: ^2.3.0
  path: ^1.8.3
```

```dart
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DatabaseHelper {
  static final DatabaseHelper instance = DatabaseHelper._init();
  static Database? _database;

  DatabaseHelper._init();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB('app.db');
    return _database!;
  }

  Future<Database> _initDB(String fileName) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, fileName);

    return openDatabase(
      path,
      version: 1,
      onCreate: _createDB,
      onUpgrade: _upgradeDB,
    );
  }

  Future<void> _createDB(Database db, int version) async {
    await db.execute('''
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        age INTEGER,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    ''');

    await db.execute('''
      CREATE TABLE tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        is_completed INTEGER DEFAULT 0,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    ''');
  }

  // CRUD 操作
  Future<int> insert(String table, Map<String, dynamic> data) async {
    final db = await database;
    return db.insert(table, data);
  }

  Future<List<Map<String, dynamic>>> queryAll(String table) async {
    final db = await database;
    return db.query(table);
  }

  Future<List<Map<String, dynamic>>> queryWithCondition(
    String table, {
    String? where,
    List<dynamic>? whereArgs,
    String? orderBy,
  }) async {
    final db = await database;
    return db.query(table, where: where, whereArgs: whereArgs, orderBy: orderBy);
  }

  Future<int> update(String table, Map<String, dynamic> data, int id) async {
    final db = await database;
    return db.update(table, data, where: 'id = ?', whereArgs: [id]);
  }

  Future<int> delete(String table, int id) async {
    final db = await database;
    return db.delete(table, where: 'id = ?', whereArgs: [id]);
  }

  Future<void> close() async {
    final db = await database;
    db.close();
    _database = null;
  }
}

// 使用
class TaskRepository {
  final DatabaseHelper _db = DatabaseHelper.instance;

  Future<int> addTask(Task task) async {
    return _db.insert('tasks', task.toMap());
  }

  Future<List<Task>> getAllTasks() async {
    final maps = await _db.queryWithCondition(
      'tasks',
      orderBy: 'created_at DESC',
    );
    return maps.map((map) => Task.fromMap(map)).toList();
  }
}
```

## 4. Hive

```yaml
dependencies:
  hive: ^2.2.3
  hive_flutter: ^1.1.0

dev_dependencies:
  hive_generator: ^2.0.1
  build_runner: ^2.4.8
```

```dart
import 'package:hive/hive.dart';
import 'package:hive_flutter/hive_flutter.dart';

// 初始化
void main() async {
  await Hive.initFlutter();
  Hive.registerAdapter(PersonAdapter());
  await Hive.openBox<Person>('people');
  runApp(const MyApp());
}

// 模型
@HiveType(typeId: 0)
class Person extends HiveObject {
  @HiveField(0)
  final String name;

  @HiveField(1)
  final int age;

  Person({required this.name, required this.age});
}

// 使用
class PeopleService {
  static Box<Person> get _box => Hive.box<Person>('people');

  static List<Person> getAll() => _box.values.toList();

  static void add(Person person) => _box.add(person);

  static void update(int index, Person person) => _box.putAt(index, person);

  static void delete(int index) => _box.deleteAt(index);

  static void clear() => _box.clear();
}

// ValueListenableBuilder 用于监听变化
ValueListenableBuilder<Box<Person>>(
  valueListenable: Hive.box<Person>('people').listenable(),
  builder: (context, box, child) {
    return ListView.builder(
      itemCount: box.length,
      itemBuilder: (context, index) {
        final person = box.getAt(index);
        return ListTile(
          title: Text(person!.name),
          subtitle: Text('${person.age} 岁'),
        );
      },
    );
  },
)
```

## 5. 文件存储

```yaml
dependencies:
  path_provider: ^2.1.1
```

```dart
import 'dart:convert';
import 'dart:io';
import 'package:path_provider/path_provider.dart';

class FileStorage {
  static Future<File> get _localFile async {
    final directory = await getApplicationDocumentsDirectory();
    return File('${directory.path}/data.json');
  }

  static Future<void> saveData(Map<String, dynamic> data) async {
    final file = await _localFile;
    final jsonString = json.encode(data);
    await file.writeAsString(jsonString);
  }

  static Future<Map<String, dynamic>?> loadData() async {
    try {
      final file = await _localFile;
      final jsonString = await file.readAsString();
      return json.decode(jsonString) as Map<String, dynamic>;
    } catch (e) {
      return null;
    }
  }

  static Future<File> saveImage(String fileName, List<int> bytes) async {
    final directory = await getApplicationDocumentsDirectory();
    final file = File('${directory.path}/$fileName');
    return file.writeAsBytes(bytes);
  }

  static Future<String> getLocalPath() async {
    final directory = await getApplicationDocumentsDirectory();
    return directory.path;
  }
}
```

## 6. 推荐方案

| 数据类型           | 推荐方案                         |
| ------------------ | -------------------------------- |
| 用户设置、主题偏好 | SharedPreferences                |
| 复杂的关系型数据   | sqflite (SQLite)                 |
| 简单的对象列表     | Hive / Isar                      |
| 文件、图片         | 文件存储 (path_provider)         |
| 大量日志数据       | sqflite                          |
| API 响应缓存       | Hive（快速）或 sqflite（可查询） |
