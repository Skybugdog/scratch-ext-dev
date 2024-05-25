import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'SkydogCookie', // Replace it with your extension name
  entry: ['src/index.ts', 'src/index.js'],
  target: ['esnext'],
  format: ['iife'],
  outDir: 'dist',
  banner: {
    // Replace it with your extension's metadata
    js: `// Name: Skydog's Cookie
// Version: 1.0.0
// ID: Cookie
// Description: Manipulate cookies! Set expiration time!
// By: MoreBugOfDog
// License: MPL-2.0
// 本拓展经过开发者严格的法律审查，不涉及任何违法行为。
// 使用本拓展造成的任何后果与开发者无关。
// Cookie的读取和储存强制添加了唯一标识符和命名空间（ccw_custom_作品链接_用户输入的name），
// path强制为/ 防止随请求携带导致错误
// 编辑器内和编辑器外cookie不同步，这是为了方便肝酱开发，非Bug
//——————————不重要的——————————
// 我解释一下，为什么id是Cookie没有Skydog
// 因为如果加上Skydog不方便URL输入ID加载
`
  },
  platform: 'browser',
  clean: true
})
