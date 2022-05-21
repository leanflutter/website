---
title: Making the app single-instanced
date: 2022-05-21 15:30
tags:
- windows
---

Single-instanced apps only allow one instance of the app running at a time. Flutter Windows apps are multi-instanced by default. If a first instance exists when trying to start a new instance, end the new instance and activate the first instance.

## Via the `FindWindow` method

Find the window `HWND` named `single_instance_example` by `FindWindow`, activate the window if it exists and end the current program.

> Please change `single_instance_example` to the name of your app.


Change the file `windows/runner/main.cpp` as follows:

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
