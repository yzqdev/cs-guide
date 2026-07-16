---
order: 17
---

# 表单与验证

## 1. Form Widget（表单组件）

```dart
class LoginForm extends StatefulWidget {
  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _submit() {
    if (_formKey.currentState!.validate()) {
      // 表单验证通过
      final email = _emailController.text;
      final password = _passwordController.text;
      login(email, password);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _emailController,
            decoration: const InputDecoration(
              labelText: '邮箱',
              prefixIcon: Icon(Icons.email),
            ),
            keyboardType: TextInputType.emailAddress,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return '请输入邮箱';
              }
              if (!value.contains('@') || !value.contains('.')) {
                return '请输入有效的邮箱地址';
              }
              return null;
            },
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: _passwordController,
            obscureText: _obscurePassword,
            decoration: InputDecoration(
              labelText: '密码',
              prefixIcon: const Icon(Icons.lock),
              suffixIcon: IconButton(
                icon: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility),
                onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
              ),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return '请输入密码';
              }
              if (value.length < 6) {
                return '密码至少6个字符';
              }
              return null;
            },
          ),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: _submit,
            style: ElevatedButton.styleFrom(
              minimumSize: const Size(double.infinity, 48),
            ),
            child: const Text('登录'),
          ),
        ],
      ),
    );
  }
}
```

## 2. 常用验证规则

```dart
class Validators {
  static String? required(String? value, [String field = '此字段']) {
    if (value == null || value.trim().isEmpty) {
      return '$field 是必填项';
    }
    return null;
  }

  static String? email(String? value) {
    if (value == null || value.isEmpty) return '请输入邮箱';
    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    if (!emailRegex.hasMatch(value)) {
      return '请输入有效的邮箱地址';
    }
    return null;
  }

  static String? password(String? value) {
    if (value == null || value.isEmpty) return '请输入密码';
    if (value.length < 8) return '密码至少8个字符';
    if (!value.contains(RegExp(r'[A-Z]'))) {
      return '密码必须包含大写字母';
    }
    if (!value.contains(RegExp(r'[0-9]'))) {
      return '密码必须包含数字';
    }
    return null;
  }

  static String? phone(String? value) {
    if (value == null || value.isEmpty) return '请输入手机号';
    final phoneRegex = RegExp(r'^\d{10,11}$');
    if (!phoneRegex.hasMatch(value.replaceAll(RegExp(r'\s+|-'), ''))) {
      return '请输入有效的手机号码';
    }
    return null;
  }

  static String? confirmPassword(String? value, String password) {
    if (value == null || value.isEmpty) return '请确认密码';
    if (value != password) return '两次密码不一致';
    return null;
  }

  static String? url(String? value) {
    if (value == null || value.isEmpty) return '请输入 URL';
    final urlRegex = RegExp(r'^(https?:\/\/)?([\w\-])+\.{1}[a-zA-Z]{2,}([\/\w\-]*)*\/?$');
    if (!urlRegex.hasMatch(value)) {
      return '请输入有效的 URL';
    }
    return null;
  }

  static String? minLength(int min) {
    return (String? value) {
      if (value == null || value.length < min) {
        return '至少需要 $min 个字符';
      }
      return null;
    };
  }

  static String? maxLength(int max) {
    return (String? value) {
      if (value != null && value.length > max) {
        return '最多 $max 个字符';
      }
      return null;
    };
  }
}
```

## 3. 自动验证

```dart
// 自动验证模式
Form(
  autovalidateMode: AutovalidateMode.onUserInteraction,
  child: Column(
    children: [
      TextFormField(
        validator: Validators.email,
        // 用户交互时自动验证
      ),
    ],
  ),
)
```

## 4. 表单重置与填充

```dart
class ProfileForm extends StatefulWidget {
  @override
  State<ProfileForm> createState() => _ProfileFormState();
}

class _ProfileFormState extends State<ProfileForm> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _bioController = TextEditingController();

  void _loadUserData(User user) {
    _nameController.text = user.name;
    _bioController.text = user.bio;
  }

  void _resetForm() {
    _formKey.currentState?.reset();
    _nameController.clear();
    _bioController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _nameController,
            decoration: const InputDecoration(labelText: '姓名'),
          ),
          TextFormField(
            controller: _bioController,
            decoration: const InputDecoration(labelText: '个人简介'),
            maxLines: 3,
          ),
          Row(
            children: [
              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    saveProfile();
                  }
                },
                child: const Text('保存'),
              ),
              const SizedBox(width: 16),
              TextButton(
                onPressed: _resetForm,
                child: const Text('重置'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
```

## 5. DropdownButtonFormField（下拉选择表单）

```dart
String? _selectedGender;

DropdownButtonFormField<String>(
  value: _selectedGender,
  decoration: const InputDecoration(
    labelText: '性别',
    prefixIcon: Icon(Icons.person),
  ),
  items: ['男', '女', '其他'].map((gender) {
    return DropdownMenuItem(value: gender, child: Text(gender));
  }).toList(),
  onChanged: (value) => setState(() => _selectedGender = value),
  validator: (value) {
    if (value == null) return '请选择性别';
    return null;
  },
)
```

## 6. DatePicker（日期选择器）

```dart
DateTime? _selectedDate;

TextFormField(
  readOnly: true,
  controller: TextEditingController(
    text: _selectedDate != null
        ? DateFormat('yyyy-MM-dd').format(_selectedDate!)
        : '',
  ),
  decoration: const InputDecoration(
    labelText: '出生日期',
    prefixIcon: Icon(Icons.calendar_today),
  ),
  onTap: () async {
    final date = await showDatePicker(
      context: context,
      initialDate: _selectedDate ?? DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
      helpText: '选择出生日期',
    );
    if (date != null) {
      setState(() => _selectedDate = date);
    }
  },
  validator: (value) {
    if (_selectedDate == null) return '请选择出生日期';
    final age = DateTime.now().difference(_selectedDate!).inDays ~/ 365;
    if (age < 18) return '您必须年满18岁';
    return null;
  },
)
```

## 7. 实时搜索/过滤

```dart
class SearchInput extends StatefulWidget {
  final Function(String) onSearch;

  const SearchInput({required this.onSearch});

  @override
  State<SearchInput> createState() => _SearchInputState();
}

class _SearchInputState extends State<SearchInput> {
  final _controller = TextEditingController();
  Timer? _debounce;

  @override
  void initState() {
    super.initState();
    _controller.addListener(_onSearchChanged);
  }

  void _onSearchChanged() {
    if (_debounce?.isActive ?? false) _debounce!.cancel();
    _debounce = Timer(const Duration(milliseconds: 500), () {
      widget.onSearch(_controller.text);
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    _debounce?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: _controller,
      decoration: InputDecoration(
        hintText: '搜索...',
        prefixIcon: const Icon(Icons.search),
        suffixIcon: _controller.text.isNotEmpty
            ? IconButton(
                icon: const Icon(Icons.clear),
                onPressed: () {
                  _controller.clear();
                  widget.onSearch('');
                },
              )
            : null,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
  }
}
```
