---
title: 让应用成为单实例
date: 2022-05-21 15:30
tags:
- windows
---

单实例应用一次只允许一个应用实例运行。Flutter Windows 应用默认是多实例的。在尝试启动新实例时如果存在第一实例，则结束新实例并激活第一实例。

## 通过 `FindWindow` 方法

通过 `FindWindow` 查找名为 `single_instance_example` 的窗口 `HWND`，如果存在该窗口则激活该窗口并结束当前程序。

> 请将修改 `single_instance_example` 为你应用的名称。

更改文件 `windows/runner/main.cpp` 如下：

```diff
// ...

int APIENTRY wWinMain(_In_ HINSTANCE instance, _In_opt_ HINSTANCE prev,
                      _In_ wchar_t *command_line, _In_ int show_command) {
+  HWND hwnd = ::FindWindow(L"FLUTTER_RUNNER_WIN32_WINDOW", L"single_instance_example");
+  if (hwnd != NULL) {
+    ::ShowWindow(hwnd, SW_NORMAL);
+    ::SetForegroundWindow(hwnd);
+    return EXIT_FAILURE;
+  }

  // ...
  
  if (!window.CreateAndShow(L"single_instance_example", origin, size)) {
    return EXIT_FAILURE;
  }

  // ...
}
```
