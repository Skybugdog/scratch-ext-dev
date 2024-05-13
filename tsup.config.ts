import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'DeeplX', // Replace it with your extension name
  entry: ['src/index.ts', 'src/index.js'],
  target: ['esnext'],
  format: ['iife'],
  outDir: 'dist',
  banner: {
    // Replace it with your extension's metadata
    js: `// Name: DeeplX Translation
// ID: DeeplX
// Description: Free Deepl-pro translation api via DeeplX service.
// By: MoreBugOfDog
// License: MPL-2.0
// 本拓展经过开发者严格的法律审查，不涉及任何违法行为。
// 使用本拓展造成的任何后果与开发者无关。
// 关于法律问题：DeeplX服务是将 deepl api 进行了本地化，不涉及到任何违法行为。
// This extension has been subjected to strict legal scrutiny by the developer and does not involve any illegal behavior.
// The developer has nothing to do with any consequences of using this extension.
// Regarding legal issues: the DeeplX service is a localization of the deepl api and does not involve any illegal behavior.
// 感谢 zhile 提供免费稳定的 DeeplX api！
// Thank you zhile for providing a stable and reliable DeeplX api!  
// 感谢 FurryR的拓展开发脚手架！
// Thank you FurryR for the extension development scaffold!
`
  },
  platform: 'browser',
  clean: true
})
