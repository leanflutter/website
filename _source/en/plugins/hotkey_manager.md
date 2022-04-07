# hotkey_manager

[![pub version][pub-image]][pub-url] [![][discord-image]][discord-url]

[pub-image]: https://img.shields.io/pub/v/hotkey_manager.svg
[pub-url]: https://pub.dev/packages/hotkey_manager

[discord-image]: https://img.shields.io/discord/884679008049037342.svg
[discord-url]: https://discord.gg/zPa6EZ2jqb

This plugin allows Flutter **desktop** apps to defines system/inapp wide hotkey (i.e. shortcut).

---

English | [简体中文](./README-ZH.md)

---

## Platform Support

| Linux | macOS | Windows |
| :---: | :---: | :-----: |
|   ✔️   |   ✔️   |    ✔️    |

## Quick Start

### Installation

Add this to your package's pubspec.yaml file:

```yaml
dependencies:
  hotkey_manager: ^0.1.6
```

Or

```yaml
dependencies:
  hotkey_manager:
    git:
      url: https://github.com/leanflutter/hotkey_manager.git
      ref: main
```

#### Linux requirements

- [`keybinder-3.0`](https://github.com/kupferlauncher/keybinder)

Run the following command

```
sudo apt-get install keybinder-3.0
```

### Usage

```dart
import 'package:hotkey_manager/hotkey_manager.dart';

void main() async {
  // Must add this line.
  WidgetsFlutterBinding.ensureInitialized();
  // For hot reload, `unregisterAll()` needs to be called.
  await hotKeyManager.unregisterAll();

  runApp(MyApp());
}
```

Register/Unregsiter a system/inapp wide hotkey.

```dart
// ⌥ + Q
HotKey _hotKey = HotKey(
  KeyCode.keyQ,
  modifiers: [KeyModifier.alt],
  // Set hotkey scope (default is HotKeyScope.system)
  scope: HotKeyScope.inapp, // Set as inapp-wide hotkey.
);
await hotKeyManager.register(
  _hotKey,
  keyDownHandler: (hotKey) {
    print('onKeyDown+${hotKey.toJson()}');
  },
  // Only works on macOS.
  keyUpHandler: (hotKey){
    print('onKeyUp+${hotKey.toJson()}');
  } ,
);

await hotKeyManager.unregister(_hotKey);

await hotKeyManager.unregisterAll();
```

Use `HotKeyRecorder` widget to help you record a hotkey.

```dart
HotKeyRecorder(
  onHotKeyRecorded: (hotKey) {
    _hotKey = hotKey;
    setState(() {});
  },
),
```

> Please see the example app of this plugin for a full example.

## Who's using it?

- [AuthPass](https://authpass.app/) - Password Manager based on Flutter for all platforms. Keepass 2.x (kdbx 3.x) compatible.
- [Biyi (比译)](https://biyidev.com/) - A convenient translation and dictionary app.

## API

### HotKeyManager

| Method        | Description                               | Linux | macOS | Windows |
| ------------- | ----------------------------------------- | ----- | ----- | ------- |
| register      | register an system/inapp wide hotkey.     | ✔️     | ✔️     | ✔️       |
| unregister    | unregister an system/inapp wide hotkey.   | ✔️     | ✔️     | ✔️       |
| unregisterAll | unregister all system/inapp wide hotkeys. | ✔️     | ✔️     | ✔️       |

## Related Links

- https://github.com/soffes/HotKey
- https://github.com/kupferlauncher/keybinder

## License

[MIT](./LICENSE)
