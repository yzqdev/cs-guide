# 组合模式 (Composite)

> **将对象组合成树形结构以表示"部分-整体"的层次结构。** 组合模式使得客户端可以一致地处理单个对象和组合对象。

## 场景

- 文件系统：文件（叶子）和文件夹（容器）的统一操作
- 树形菜单：菜单项和子菜单
- UI 组件树：Button、Panel、Window 都实现相同的 `render()` 方法

## 核心角色

| 角色 | 说明 |
|------|------|
| **Component（抽象组件）** | 为 Leaf 和 Composite 声明统一接口 |
| **Leaf（叶子节点）** | 没有子节点的最终对象 |
| **Composite（组合节点）** | 有子节点的容器，存储子组件 |

## 代码示例

```java
import java.util.ArrayList;
import java.util.List;

// ----- Component -----
interface FileComponent {
    void showDetails();
    int getSize();
}

// ----- Leaf -----
class FileLeaf implements FileComponent {
    private String name;
    private int size;

    public FileLeaf(String name, int size) {
        this.name = name;
        this.size = size;
    }

    @Override
    public void showDetails() {
        System.out.println("文件: " + name + " (" + size + "KB)");
    }

    @Override
    public int getSize() {
        return size;
    }
}

// ----- Composite -----
class FolderComposite implements FileComponent {
    private String name;
    private List<FileComponent> children = new ArrayList<>();

    public FolderComposite(String name) {
        this.name = name;
    }

    public void add(FileComponent component) {
        children.add(component);
    }

    public void remove(FileComponent component) {
        children.remove(component);
    }

    @Override
    public void showDetails() {
        System.out.println("📁 文件夹: " + name);
        for (FileComponent child : children) {
            child.showDetails();
        }
    }

    @Override
    public int getSize() {
        return children.stream().mapToInt(FileComponent::getSize).sum();
    }
}

// ----- 使用 -----
public class CompositeDemo {
    public static void main(String[] args) {
        // 创建文件
        FileLeaf file1 = new FileLeaf("readme.txt", 10);
        FileLeaf file2 = new FileLeaf("photo.jpg", 200);
        FileLeaf file3 = new FileLeaf("code.java", 50);

        // 创建文件夹
        FolderComposite docs = new FolderComposite("我的文档");
        docs.add(file1);
        docs.add(file3);

        FolderComposite pictures = new FolderComposite("图片");
        pictures.add(file2);

        FolderComposite root = new FolderComposite("根目录");
        root.add(docs);
        root.add(pictures);

        // 统一操作：展示整个文件树
        root.showDetails();
        System.out.println("总大小: " + root.getSize() + "KB");
    }
}
```

## 优缺点

| 优点 | 缺点 |
|------|------|
| ✅ 客户端可以一致地对待叶子节点和容器节点 | ❌ 过度通用化，限制了对组件的类型约束 |
| ✅ 符合开闭原则，新增组件类型无需修改现有代码 | ❌ 设计复杂，不适合层次简单的场景 |
| ✅ 天然支持树形结构的递归遍历 | |

## JDK 中的应用

- `java.awt.Container.add(Component)` — AWT/Swing 的组件树
- `javax.faces.component.UIComponent` — JSF 组件树
- `javax.xml.parsers.DocumentBuilder` — XML DOM 树
