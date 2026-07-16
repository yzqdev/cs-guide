---
order: 9
---

# 可滚动 Widget

## 1. ListView

### 基本用法

```dart
ListView(
  padding: const EdgeInsets.all(16),
  children: [
    ListTile(title: const Text('项目 1'), leading: const Icon(Icons.star)),
    ListTile(title: const Text('项目 2'), leading: const Icon(Icons.star)),
    ListTile(title: const Text('项目 3'), leading: const Icon(Icons.star)),
  ],
)
```

### ListView.builder（高效列表）

```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(items[index].title),
      subtitle: Text(items[index].subtitle),
      leading: CircleAvatar(child: Text('${index + 1}')),
      trailing: const Icon(Icons.chevron_right),
      onTap: () => navigateToDetail(items[index]),
    );
  },
)
```

### ListView.separated（带分隔线）

```dart
ListView.separated(
  itemCount: 20,
  separatorBuilder: (context, index) => const Divider(height: 1),
  itemBuilder: (context, index) => ListTile(title: Text('项目 $index')),
)
```

### 不同项目类型

```dart
ListView.builder(
  itemCount: data.length,
  itemBuilder: (context, index) {
    final item = data[index];
    if (item.type == 'header') {
      return ListTile(
        title: Text(item.title, style: Theme.of(context).textTheme.headlineSmall),
      );
    }
    return ListTile(
      title: Text(item.title),
      trailing: const Icon(Icons.chevron_right),
    );
  },
)
```

### 下拉刷新

```dart
RefreshIndicator(
  onRefresh: () async {
    await fetchData();
  },
  child: ListView.builder(
    itemCount: items.length,
    itemBuilder: (context, index) => ListTile(title: Text(items[index])),
  ),
)
```

## 2. GridView

### GridView.count - 固定列数

```dart
GridView.count(
  crossAxisCount: 2,
  mainAxisSpacing: 8,
  crossAxisSpacing: 8,
  padding: const EdgeInsets.all(16),
  childAspectRatio: 0.75,  // 宽高比
  children: [
    for (var i = 0; i < 10; i++)
      Container(
        decoration: BoxDecoration(
          color: Colors.blue.shade100,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Center(child: Text('项目 $i')),
      ),
  ],
)
```

### GridView.builder - 高效网格

```dart
GridView.builder(
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 3,
    childAspectRatio: 1,
    crossAxisSpacing: 4,
    mainAxisSpacing: 4,
  ),
  itemCount: images.length,
  itemBuilder: (context, index) {
    return Image.network(images[index], fit: BoxFit.cover);
  },
)
```

### GridView.extent - 固定宽度

```dart
GridView.extent(
  maxCrossAxisExtent: 150,
  mainAxisSpacing: 8,
  crossAxisSpacing: 8,
  children: [...],
)
```

## 3. CustomScrollView

```dart
CustomScrollView(
  slivers: [
    // 应用栏
    const SliverAppBar(
      title: Text('自定义滚动'),
      pinned: true,
      expandedHeight: 200,
      flexibleSpace: FlexibleSpaceBar(
        background: FlutterLogo(),
      ),
    ),

    // 列表项
    SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) => ListTile(title: Text('项目 $index')),
        childCount: 20,
      ),
    ),

    // 网格
    SliverGrid(
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,
        mainAxisSpacing: 4,
        crossAxisSpacing: 4,
      ),
      delegate: SliverChildBuilderDelegate(
        (context, index) => Container(color: Colors.primaries[index % Colors.primaries.length]),
        childCount: 9,
      ),
    ),

    // 固定高度项
    SliverFixedExtentList(
      itemExtent: 60,
      delegate: SliverChildBuilderDelegate(
        (context, index) => Container(
          color: index.isEven ? Colors.blue.shade50 : Colors.white,
          child: Center(child: Text('固定高度项目 $index')),
        ),
        childCount: 10,
      ),
    ),

    // 自适应项
    SliverToBoxAdapter(
      child: Container(
        height: 100,
        color: Colors.grey.shade200,
        child: const Center(child: Text('SliverToBoxAdapter')),
      ),
    ),
  ],
)
```

## 4. SingleChildScrollView

```dart
SingleChildScrollView(
  padding: const EdgeInsets.all(16),
  scrollDirection: Axis.vertical,  // 或 Axis.horizontal
  physics: const BouncingScrollPhysics(),  // iOS 弹性效果
  child: Column(
    children: [
      for (var i = 0; i < 20; i++)
        Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: Text('可滚动内容行 $i'),
        ),
    ],
  ),
)
```

## 5. ScrollController

```dart
class _ScrollDemoState extends State<ScrollDemo> {
  final ScrollController _controller = ScrollController();

  @override
  void initState() {
    super.initState();
    _controller.addListener(_scrollListener);
  }

  void _scrollListener() {
    // 监听滚动位置
    print('滚动偏移: ${_controller.offset}');

    // 检查是否滚动到底部
    if (_controller.position.pixels >= _controller.position.maxScrollExtent) {
      loadMoreData();
    }
  }

  void _scrollToTop() {
    _controller.animateTo(
      0,
      duration: const Duration(milliseconds: 500),
      curve: Curves.easeInOut,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: ListView.builder(
            controller: _controller,
            itemCount: 50,
            itemBuilder: (context, index) => ListTile(title: Text('项目 $index')),
          ),
        ),
        ElevatedButton(
          onPressed: _scrollToTop,
          child: const Text('回到顶部'),
        ),
      ],
    );
  }
}
```

## 6. ScrollPhysics 对比

| 物理效果                        | 效果             |
| ------------------------------- | ---------------- |
| `AlwaysScrollableScrollPhysics` | 始终可滚动       |
| `NeverScrollableScrollPhysics`  | 禁用滚动         |
| `BouncingScrollPhysics`         | iOS 弹性回弹     |
| `ClampingScrollPhysics`         | Android 固定边界 |
| `RangeMaintainingScrollPhysics` | 保持可见范围     |

## 7. 无限滚动加载

```dart
class _InfiniteListState extends State<InfiniteList> {
  final ScrollController _controller = ScrollController();
  List<String> items = List.generate(20, (i) => '项目 $i');
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    _controller.addListener(_loadMore);
  }

  void _loadMore() {
    if (_controller.position.pixels >= _controller.position.maxScrollExtent - 200
        && !isLoading) {
      setState(() => isLoading = true);
      Future.delayed(const Duration(seconds: 2), () {
        setState(() {
          items.addAll(List.generate(10, (i) => '新项目 ${items.length + i}'));
          isLoading = false;
        });
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      controller: _controller,
      itemCount: items.length + 1,
      itemBuilder: (context, index) {
        if (index == items.length) {
          return const Padding(
            padding: EdgeInsets.all(16),
            child: Center(child: CircularProgressIndicator()),
          );
        }
        return ListTile(title: Text(items[index]));
      },
    );
  }
}
```
