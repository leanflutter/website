---
title: 关闭窗口后点击Dock图标进行恢复
date: 2022-05-21 23:40
template: splash
tags:
- macos
---

更改文件 `macos/Runner/AppDelegate.swift` 如下：

```diff
import Cocoa
import FlutterMacOS

@NSApplicationMain
class AppDelegate: FlutterAppDelegate {
    override func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return false
    }
    
+    override func applicationShouldHandleReopen(_ sender: NSApplication, hasVisibleWindows flag: Bool) -> Bool {
+        if !flag {
+            for window in NSApp.windows {
+                if !window.isVisible {
+                    window.setIsVisible(true)
+                }
+                window.makeKeyAndOrderFront(self)
+                NSApp.activate(ignoringOtherApps: true)
+            }
+        }
+        return true
+    }
}

```
