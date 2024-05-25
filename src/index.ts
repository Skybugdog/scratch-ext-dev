
;(function (Scratch) {
  const SkydogCookieIconUrl ='https://m.ccw.site/user_projects_assets/37848819fcc08004615ec96170b3635c.png'
  const SkydogCookiePictureUrl ='https://m.ccw.site/user_projects_assets/8c2404f1490aad6019616fda9e609133.jpg'
  if (Scratch.extensions.unsandboxed === false) {
    throw new Error('Sandboxed mode is not supported')
  }
  // Your extension's code
  Scratch.translate.setup({
    'zh-cn': {
      'SkydogCookie.name': '啸天犬的Cookie',
      'SkydogCookie.newCookie':
        '创建或修改名为[name]的cookie值为[value]过期时间[time]天',
      'SkydogCookie.read': '读取名为[name]的cookie值',
      'SkydogCookie.delete': '删除名为[name]的cookie'
    },
    en: {
      'SkydogCookie.name': "Skydog's Cookie",
      'SkydogCookie.newCookie':
        'Create or modify a cookie named [name] with value [value] and expiration time [time]',
      'SkydogCookie.read': 'Read the value of the cookie named [name]',
      'SkydogCookie.delete': 'Delete the cookie named [name]'
    }
  })
  function i10n(id: string) {
    return Scratch.translate({ id, default: id, description: id })
  }

  class SkydogCookie implements Scratch.Extension {
    runtime: VM.Runtime
    constructor(runtime: VM.Runtime) {
      this.runtime = runtime
    }

    getInfo() {
      return {
        id: 'SkydogCookie',
        name: i10n('SkydogCookie.name'),
        color1: '#996026',
        color2: '#996026',
        blockIconURI:SkydogCookieIconUrl,
        menuIconURI:SkydogCookieIconUrl,
        blocks: [
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'newCookie',
            text: i10n('SkydogCookie.newCookie'),
            arguments: {
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'hello'
              },

              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'word'
              },

              time: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 30
              }
            }
          },
          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: 'read',
            text: i10n('SkydogCookie.read'),
            arguments: {
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'hello'
              }
            }
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'delete',
            text: i10n('SkydogCookie.delete'),
            arguments: {
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'hello'
              }
            }
          }
        ]
      }
    }
    newCookie(args) {
      const name = args.name
      const value = args.value
      const time = args.time
      const host = window.location.href
      // 加入前缀，防止读取非作品信息
      const cookie = `ccw_custom_cookie_${host}_${name}=${value};expires=${new Date(Date.now() + time * 24 * 60 * 60 * 1000).toUTCString()};path=/`
      document.cookie = cookie
    }
    read(args) {
      const name = args.name
      const cookies = document.cookie.split(';')
      let value = ''
      cookies.forEach(cookie => {
        const [key, val] = cookie.split('=')
        if (
          key.trim() === `ccw_custom_cookie_${window.location.href}_${name}`
        ) {
          value = val.trim()
        }
      })
      return value
    }
    delete(args) {
      const name = args.name
      document.cookie = `ccw_custom_cookie_${window.location.href}_${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`
    }
  }
  // The following snippet ensures compatibility with Turbowarp / Gandi IDE. If you want to write Turbowarp-only or Gandi-IDE code, please remove corresponding code
    // For Gandi
    window.tempExt = {
      Extension: SkydogCookie,
      info: {
          name: "SkydogCookie.name",
          description: "SkydogCookie.descp",
          extensionId: "SkydogCookie",
          iconURL: SkydogCookiePictureUrl,
          insetIconURL: SkydogCookieIconUrl,
          featured: true,
          disabled: false,
          collaborator: "多bug的啸天犬 @ CCW"
      },
      l10n: {
          "zh-cn": {
              "SkydogCookie.name": "啸天犬的Cookie",
              "SkydogCookie.descp": "操纵Cookie！设置过期时间！"
          },
          en: {
              "SkydogCookie.name": "Skydog's Cookie",
              "SkydogCookie.descp": "Manipulate cookies! Set expiration time!"
          }
      }
  };
  
})(Scratch)
