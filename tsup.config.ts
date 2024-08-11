import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'EmbeddedProject', // Replace it with your extension name
  entry: ['src/index.ts', 'src/index.js'],
  target: ['esnext'],
  format: ['iife'],
  outDir: 'dist',
  banner: {
    // Replace it with your extension's metadata
    js: `// Name: EmbeddedProject
// Version: 1.0.0
// ID: EmbeddedProject
// Description: Embed other items in your project! Seamless! No jump!
// Description_zh: 在项目中内嵌其他项目！无缝衔接！无需跳转！
// By: 多bug的啸天犬
// License: MPL-2.0
// 本拓展经过开发者严格的法律审查，不涉及任何违法行为。
// 使用本拓展造成的任何后果与开发者无关。

`
  },
  platform: 'browser',
  clean: true
})
