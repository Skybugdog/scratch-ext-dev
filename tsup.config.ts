import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'Ext', // Replace it with your extension name
  entry: ['src/index.ts', 'src/index.js'],
  target: ['esnext'],
  format: ['iife'],
  outDir: 'dist',
  banner: {
    // Replace it with your extension's metadata
    js: `// Name: Better Message
// Version: 1.0.0
// ID: BetterMsg
// Description: 更好的弹窗！美观|实用|丰富
// By: Skydog
// License: MIT
// 本拓展经过开发者严格的法律审查，不涉及任何违法行为。
// 使用本拓展造成的任何后果与开发者无关。

`
  },
  platform: 'browser',
  clean: true
})
