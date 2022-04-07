# hotkey_manager

[![pub version][pub-image]][pub-url] [![][discord-image]][discord-url]

[pub-image]: https://img.shields.io/pub/v/hotkey_manager.svg
[pub-url]: https://pub.dev/packages/hotkey_manager

[discord-image]: https://img.shields.io/discord/884679008049037342.svg
[discord-url]: https://discord.gg/zPa6EZ2jqb

这个插件允许 Flutter **桌面** 应用定义系统/应用范围内的热键（即快捷键）。

---

[English](./README.md) | 简体中文

---

## 平台支持

| Linux | macOS | Windows |
| :---: | :---: | :-----: |
|   ✔️   |   ✔️   |    ✔️    |

## 快速开始

### 安装

将此添加到你的软件包的 pubspec.yaml 文件：

```yaml
dependencies:
  hotkey_manager: ^0.1.6
```

或

```yaml
dependencies:
  hotkey_manager:
    git:
      url: https://github.com/leanflutter/hotkey_manager.git
      ref: main
```

#### Linux requirements

- [`keybinder-3.0`](https://github.com/kupferlauncher/keybinder)

运行以下命令

```
sudo apt-get install keybinder-3.0
```

### 用法

```dart
import 'package:hotkey_manager/hotkey_manager.dart';

void main() async {
  // 必须加上这一行。
  WidgetsFlutterBinding.ensureInitialized();
  // 对于热重载，`unregisterAll()` 需要被调用。
  await hotKeyManager.unregisterAll();

  runApp(MyApp());
}
```

注册/卸载一个系统/应用范围的热键。

```dart
// ⌥ + Q
HotKey _hotKey = HotKey(
  KeyCode.keyQ,
  modifiers: [KeyModifier.alt],
  // 设置热键范围（默认为 HotKeyScope.system）
  scope: HotKeyScope.inapp, // 设置为应用范围的热键。
);
await hotKeyManager.register(
  _hotKey,
  keyDownHandler: (hotKey) {
    print('onKeyDown+${hotKey.toJson()}');
  },
  // 只在 macOS 上工作。
  keyUpHandler: (hotKey){
    print('onKeyUp+${hotKey.toJson()}');
  } ,
);

await hotKeyManager.unregister(_hotKey);

await hotKeyManager.unregisterAll();
```

使用 `HotKeyRecorder` 小部件帮助您录制一个热键。

```dart
HotKeyRecorder(
  onHotKeyRecorded: (hotKey) {
    _hotKey = hotKey;
    setState(() {});
  },
),
```

> 请看这个插件的示例应用，以了解完整的例子。

## 谁在用使用它？

- [AuthPass](https://authpass.app/) - 基于Flutter的密码管理器，适用于所有平台。兼容Keepass 2.x（kdbx 3.x）。
- [Biyi (比译)](https://biyidev.com/) - 一个便捷的翻译和词典应用程序。

## API

### HotKeyManager

| Method        | Description                       | Linux | macOS | Windows |
| ------------- | --------------------------------- | ----- | ----- | ------- |
| register      | 注册一个系统/应用范围的热键。     | ✔️     | ✔️     | ✔️       |
| unregister    | 取消注册一个系统/应用范围的热键。 | ✔️     | ✔️     | ✔️       |
| unregisterAll | 取消注册全部系统/应用范围的热键。 | ✔️     | ✔️     | ✔️       |

## 相关链接

- https://github.com/soffes/HotKey
- https://github.com/kupferlauncher/keybinder

## 许可证

[MIT](./LICENSE)
