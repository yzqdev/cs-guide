---
order: 21
---

# 实战项目：待办事项应用

## 1. 项目概述

构建一个完整的待办事项应用，涵盖：

- 任务增删改查
- 状态管理（Provider）
- 本地持久化
- 分类管理
- 搜索与过滤

## 2. 项目结构

```
todo_app/
├── lib/
│   ├── main.dart
│   ├── app.dart
│   ├── models/
│   │   └── task.dart
│   ├── providers/
│   │   └── task_provider.dart
│   ├── services/
│   │   └── storage_service.dart
│   ├── screens/
│   │   ├── home_screen.dart
│   │   └── add_task_screen.dart
│   └── widgets/
│       ├── task_item.dart
│       └── empty_state.dart
```

## 3. 数据模型

```dart
// models/task.dart
import 'package:flutter/foundation.dart';

class Task {
  final String id;
  String title;
  String description;
  bool isCompleted;
  DateTime createdAt;
  String category;

  Task({
    required this.id,
    required this.title,
    this.description = '',
    this.isCompleted = false,
    DateTime? createdAt,
    this.category = '通用',
  }) : createdAt = createdAt ?? DateTime.now();

  Task copyWith({
    String? id,
    String? title,
    String? description,
    bool? isCompleted,
    DateTime? createdAt,
    String? category,
  }) {
    return Task(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      isCompleted: isCompleted ?? this.isCompleted,
      createdAt: createdAt ?? this.createdAt,
      category: category ?? this.category,
    );
  }

  Map<String, dynamic> toMap() => {
    'id': id,
    'title': title,
    'description': description,
    'isCompleted': isCompleted,
    'createdAt': createdAt.toIso8601String(),
    'category': category,
  };

  factory Task.fromMap(Map<String, dynamic> map) => Task(
    id: map['id'] as String,
    title: map['title'] as String,
    description: map['description'] as String? ?? '',
    isCompleted: map['isCompleted'] as bool? ?? false,
    createdAt: DateTime.parse(map['createdAt'] as String),
    category: map['category'] as String? ?? '通用',
  );
}
```

## 4. 存储服务

```dart
// services/storage_service.dart
import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/task.dart';

class StorageService {
  static const String _tasksKey = 'tasks';

  Future<void> saveTasks(List<Task> tasks) async {
    final prefs = await SharedPreferences.getInstance();
    final tasksJson = tasks.map((task) => task.toMap()).toList();
    await prefs.setString(_tasksKey, json.encode(tasksJson));
  }

  Future<List<Task>> loadTasks() async {
    final prefs = await SharedPreferences.getInstance();
    final tasksJson = prefs.getString(_tasksKey);
    if (tasksJson == null) return [];

    final List<dynamic> decoded = json.decode(tasksJson);
    return decoded.map((item) => Task.fromMap(item as Map<String, dynamic>)).toList();
  }
}
```

## 5. 状态管理

```dart
// providers/task_provider.dart
import 'package:flutter/foundation.dart';
import 'package:uuid/uuid.dart';
import '../models/task.dart';
import '../services/storage_service.dart';

class TaskProvider extends ChangeNotifier {
  List<Task> _tasks = [];
  final StorageService _storage = StorageService();
  final Uuid _uuid = const Uuid();

  List<Task> get tasks => List.unmodifiable(_tasks);

  int get totalTasks => _tasks.length;
  int get completedTasks => _tasks.where((t) => t.isCompleted).length;
  int get pendingTasks => _tasks.where((t) => !t.isCompleted).length;

  List<String> get categories {
    final cats = _tasks.map((t) => t.category).toSet().toList();
    cats.sort();
    return cats;
  }

  List<Task> getTasksByCategory(String category) {
    return _tasks.where((t) => t.category == category).toList();
  }

  List<Task> searchTasks(String query) {
    if (query.isEmpty) return _tasks;
    return _tasks.where((t) =>
      t.title.toLowerCase().contains(query.toLowerCase()) ||
      t.description.toLowerCase().contains(query.toLowerCase())
    ).toList();
  }

  Future<void> loadTasks() async {
    _tasks = await _storage.loadTasks();
    notifyListeners();
  }

  Future<void> addTask(Task task) async {
    _tasks.insert(0, task);
    await _storage.saveTasks(_tasks);
    notifyListeners();
  }

  Future<void> toggleTask(String id) async {
    final index = _tasks.indexWhere((t) => t.id == id);
    if (index >= 0) {
      _tasks[index] = _tasks[index].copyWith(isCompleted: !_tasks[index].isCompleted);
      await _storage.saveTasks(_tasks);
      notifyListeners();
    }
  }

  Future<void> updateTask(Task updatedTask) async {
    final index = _tasks.indexWhere((t) => t.id == updatedTask.id);
    if (index >= 0) {
      _tasks[index] = updatedTask;
      await _storage.saveTasks(_tasks);
      notifyListeners();
    }
  }

  Future<void> deleteTask(String id) async {
    _tasks.removeWhere((t) => t.id == id);
    await _storage.saveTasks(_tasks);
    notifyListeners();
  }

  Future<void> clearCompleted() async {
    _tasks.removeWhere((t) => t.isCompleted);
    await _storage.saveTasks(_tasks);
    notifyListeners();
  }
}
```

## 6. 首页

```dart
// screens/home_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/task_provider.dart';
import '../widgets/task_item.dart';
import '../widgets/empty_state.dart';
import 'add_task_screen.dart';

class HomeScreen extends StatefulWidget {
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _searchController = TextEditingController();
  String _selectedCategory = '全部';
  String _searchQuery = '';

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<TaskProvider>().loadTasks();
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('我的任务'),
        actions: [
          Consumer<TaskProvider>(
            builder: (context, provider, child) {
              if (provider.completedTasks > 0) {
                return IconButton(
                  icon: const Icon(Icons.cleaning_services),
                  tooltip: '清除已完成',
                  onPressed: () => _confirmClearCompleted(context),
                );
              }
              return const SizedBox();
            },
          ),
        ],
      ),
      body: Column(
        children: [
          _buildSearchBar(),
          _buildCategoryFilter(),
          Expanded(
            child: Consumer<TaskProvider>(
              builder: (context, provider, child) {
                final tasks = _filteredTasks(provider);
                if (tasks.isEmpty) {
                  return const EmptyState(
                    icon: Icons.task_alt,
                    message: '暂无任务',
                    subtitle: '点击 + 添加第一个任务',
                  );
                }
                return ListView.builder(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  itemCount: tasks.length,
                  itemBuilder: (context, index) {
                    return TaskItem(
                      task: tasks[index],
                      onToggle: () => provider.toggleTask(tasks[index].id),
                      onDelete: () => provider.deleteTask(tasks[index].id),
                      onTap: () => _editTask(context, tasks[index]),
                    );
                  },
                );
              },
            ),
          ),
          _buildStatsBar(),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _addTask(context),
        child: const Icon(Icons.add),
      ),
    );
  }

  Widget _buildSearchBar() {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: TextField(
        controller: _searchController,
        decoration: InputDecoration(
          hintText: '搜索任务...',
          prefixIcon: const Icon(Icons.search),
          suffixIcon: _searchQuery.isNotEmpty
              ? IconButton(
                  icon: const Icon(Icons.clear),
                  onPressed: () {
                    _searchController.clear();
                    setState(() => _searchQuery = '');
                  },
                )
              : null,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide.none,
          ),
          filled: true,
          fillColor: Theme.of(context).colorScheme.surfaceVariant,
        ),
        onChanged: (value) => setState(() => _searchQuery = value),
      ),
    );
  }

  Widget _buildCategoryFilter() {
    return Consumer<TaskProvider>(
      builder: (context, provider, child) {
        final categories = ['全部', ...provider.categories];
        return SizedBox(
          height: 40,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: categories.length,
            itemBuilder: (context, index) {
              final category = categories[index];
              final isSelected = category == _selectedCategory;
              return Padding(
                padding: const EdgeInsets.only(right: 8),
                child: FilterChip(
                  label: Text(category),
                  selected: isSelected,
                  onSelected: (selected) {
                    setState(() => _selectedCategory = category);
                  },
                ),
              );
            },
          ),
        );
      },
    );
  }

  Widget _buildStatsBar() {
    return Consumer<TaskProvider>(
      builder: (context, provider, child) {
        return Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Theme.of(context).colorScheme.surface,
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 10,
                offset: const Offset(0, -2),
              ),
            ],
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _statItem('总计', provider.totalTasks.toString(), Colors.blue),
              _statItem('待办', provider.pendingTasks.toString(), Colors.orange),
              _statItem('已完成', provider.completedTasks.toString(), Colors.green),
            ],
          ),
        );
      },
    );
  }

  Widget _statItem(String label, String value, Color color) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(value, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: color)),
        Text(label, style: TextStyle(color: Colors.grey.shade600)),
      ],
    );
  }

  List<Task> _filteredTasks(TaskProvider provider) {
    var tasks = _searchQuery.isEmpty ? provider.tasks : provider.searchTasks(_searchQuery);
    if (_selectedCategory != '全部') {
      tasks = tasks.where((t) => t.category == _selectedCategory).toList();
    }
    return tasks;
  }

  void _addTask(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const AddTaskScreen()),
    );
  }

  void _editTask(BuildContext context, Task task) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => AddTaskScreen(existingTask: task)),
    );
  }

  void _confirmClearCompleted(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('清除已完成的任务？'),
        content: const Text('此操作不可撤销。'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('取消')),
          TextButton(
            onPressed: () {
              context.read<TaskProvider>().clearCompleted();
              Navigator.pop(context);
            },
            child: const Text('清除'),
          ),
        ],
      ),
    );
  }
}
```

## 7. 添加/编辑任务页面

```dart
// screens/add_task_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:uuid/uuid.dart';
import '../models/task.dart';
import '../providers/task_provider.dart';

class AddTaskScreen extends StatefulWidget {
  final Task? existingTask;

  const AddTaskScreen({super.key, this.existingTask});

  @override
  State<AddTaskScreen> createState() => _AddTaskScreenState();
}

class _AddTaskScreenState extends State<AddTaskScreen> {
  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _titleController;
  late final TextEditingController _descriptionController;
  late final TextEditingController _categoryController;
  bool _isEditing = false;

  static const List<String> _categoryOptions = [
    '通用', '工作', '个人', '学习', '健康', '购物'
  ];

  @override
  void initState() {
    super.initState();
    _isEditing = widget.existingTask != null;
    _titleController = TextEditingController(text: widget.existingTask?.title ?? '');
    _descriptionController = TextEditingController(text: widget.existingTask?.description ?? '');
    _categoryController = TextEditingController(text: widget.existingTask?.category ?? '通用');
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    _categoryController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_isEditing ? '编辑任务' : '新建任务'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextFormField(
                controller: _titleController,
                decoration: const InputDecoration(
                  labelText: '任务标题',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return '标题是必填项';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _descriptionController,
                decoration: const InputDecoration(
                  labelText: '描述（可选）',
                  border: OutlineInputBorder(),
                ),
                maxLines: 4,
              ),
              const SizedBox(height: 16),
              Autocomplete<String>(
                optionsBuilder: (textEditingValue) {
                  if (textEditingValue.text.isEmpty) return _categoryOptions;
                  return _categoryOptions.where((option) =>
                    option.toLowerCase().contains(textEditingValue.text.toLowerCase()));
                },
                initialValue: TextEditingValue(text: _categoryController.text),
                onSelected: (value) => _categoryController.text = value,
                fieldViewBuilder: (context, controller, focusNode, onSubmitted) {
                  return TextFormField(
                    controller: controller,
                    focusNode: focusNode,
                    decoration: const InputDecoration(
                      labelText: '分类',
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.category),
                    ),
                    onFieldSubmitted: (_) => onSubmitted(),
                  );
                },
              ),
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: _saveTask,
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 48),
                ),
                child: Text(_isEditing ? '更新任务' : '添加任务'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _saveTask() {
    if (!_formKey.currentState!.validate()) return;

    final provider = context.read<TaskProvider>();

    if (_isEditing) {
      provider.updateTask(widget.existingTask!.copyWith(
        title: _titleController.text.trim(),
        description: _descriptionController.text.trim(),
        category: _categoryController.text.trim().isEmpty ? '通用' : _categoryController.text.trim(),
      ));
    } else {
      provider.addTask(Task(
        id: const Uuid().v4(),
        title: _titleController.text.trim(),
        description: _descriptionController.text.trim(),
        category: _categoryController.text.trim().isEmpty ? '通用' : _categoryController.text.trim(),
      ));
    }

    Navigator.pop(context);
  }
}
```

## 8. 任务项组件

```dart
// widgets/task_item.dart
import 'package:flutter/material.dart';
import '../models/task.dart';

class TaskItem extends StatelessWidget {
  final Task task;
  final VoidCallback onToggle;
  final VoidCallback onDelete;
  final VoidCallback onTap;

  const TaskItem({
    required this.task,
    required this.onToggle,
    required this.onDelete,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: Checkbox(
          value: task.isCompleted,
          onChanged: (_) => onToggle(),
        ),
        title: Text(
          task.title,
          style: TextStyle(
            decoration: task.isCompleted ? TextDecoration.lineThrough : null,
            color: task.isCompleted ? Colors.grey : null,
          ),
        ),
        subtitle: Text(
          task.category,
          style: TextStyle(
            color: Theme.of(context).colorScheme.primary,
            fontSize: 12,
          ),
        ),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (task.description.isNotEmpty)
              const Icon(Icons.description_outlined, size: 16, color: Colors.grey),
            const SizedBox(width: 8),
            IconButton(
              icon: const Icon(Icons.delete_outline, color: Colors.red),
              onPressed: onDelete,
            ),
          ],
        ),
        onTap: onTap,
      ),
    );
  }
}
```

## 9. 空状态组件

```dart
// widgets/empty_state.dart
import 'package:flutter/material.dart';

class EmptyState extends StatelessWidget {
  final IconData icon;
  final String message;
  final String? subtitle;

  const EmptyState({
    required this.icon,
    required this.message,
    this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 80, color: Colors.grey.shade400),
            const SizedBox(height: 16),
            Text(
              message,
              style: TextStyle(
                fontSize: 18,
                color: Colors.grey.shade600,
                fontWeight: FontWeight.w500,
              ),
            ),
            if (subtitle != null) ...[
              const SizedBox(height: 8),
              Text(
                subtitle!,
                style: TextStyle(color: Colors.grey.shade500),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
```

## 10. 入口文件

```dart
// main.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/task_provider.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => TaskProvider(),
      child: MaterialApp(
        title: '待办事项应用',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(
            seedColor: Colors.indigo,
            brightness: Brightness.light,
          ),
          useMaterial3: true,
        ),
        darkTheme: ThemeData(
          colorScheme: ColorScheme.fromSeed(
            seedColor: Colors.indigo,
            brightness: Brightness.dark,
          ),
          useMaterial3: true,
        ),
        themeMode: ThemeMode.system,
        home: const HomeScreen(),
      ),
    );
  }
}
```

## 11. 运行项目

```bash
# 创建项目
flutter create todo_app

# 添加依赖
flutter pub add provider shared_preferences uuid

# 将上述文件复制到对应目录

# 运行
flutter run
```

## 12. 扩展方向

- 添加**截止日期**提醒
- 添加**任务优先级**（高/中/低）
- 添加**数据同步**（Firebase/REST API）
- 添加**通知提醒**
- 添加**标签系统**
- 添加**拖拽排序**
- 添加**数据导出/导入**
- 添加**多用户支持**
