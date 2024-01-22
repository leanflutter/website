---
title: Click the dock icon to restore after closing the window
date: 2022-05-21 23:40
template: splash
tags:
- macos
---

Change the file `macos/Runner/AppDelegate.swift` as follows:

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
