
;(function (Scratch) {
  const SkydogCookieIconUrl ='data:image/png;base64,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VeeSqqSDmDOho5DmM1CRjIpSMD5SDfKwQgLaovREux5QDs5XtilljrJaX0b46TjyyJc023fJd4gRRK7nh99u+N5PSnria0kYuH6wffDT+x8+0rzScwHyTM//SoHKXsSeTy0+046bZ4ow2BDpZQQwjQh62dK14wzbHjMdp2wVCsLgManUnS/n89BZ7JRBDegEOM4NyVPQuMabBkGSyrSpUMWETvFDOiWA8kicVlfAxDxCgFQa1fAxUFEAwUnN6vbQa+745ZF2e0Sku00vueV139l26xNPIB0We6RLfXTve8mA6r7sN48if+WbeledMCLeGpv5Nwort1I3HWZU9LAAAAGmSURBVN20HemcUoZYE8Jv1u3ID804EQaHpdKuRt/z5NhP08QvxwRx7TfZP5IuLvaUZ+3Jczgo/eE1Er/RSCI/CLQk8jWqJSDgIvEtROKm/k89/eOjW9pj++7/MECNA9qZ7xp21i/1Bpx8odcXjmPYOWEaVMJloOabxoEFrziiTZ2vxf55YZSclAhH0AElsraBmJ6MA8p6ccXi6CX0Ghk+4ZpCUneh7/peMLlzMr7fNvHDZf14nOyQkSSTSb0wVfmrjUedmjiWUP2HAeq5boqawOdPHs5d+7bkZRbidUEsltIISjc2rARauWglxwmhj0DThzTd6Ek0bUuSaDuiODlYD2LfsYRr61rA/pAsxgk81194dFe8dWYhfvTSm37Rmjb5XNfyUjz/awPUMy3OmWNw/q8ze0YuWF88LdbEWqHZqwwjNxoK8zYhcN+86235yM27G5OztertO3DUeaGXAiT2Xl6qLz6G3ytuOw/6CacO23bRMfWiZbixYRix06xblr91wQ7+Yfz25KZWlu8YfvOv8KP+MwD1K1yul+6r/guol27tX9A3///iIHNLD9spxgAAAABJRU5ErkJggg=='
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
      'SkydogCookie.delete': '删除名为[name]的cookie',
      'Skydog.newCookie.help':'⚠️注意：cookie大小限制在4KB以内'
    },
    en: {
      'SkydogCookie.name': "Skydog's Cookie",
      'SkydogCookie.newCookie':
        'Create or modify a cookie named [name] with value [value] and expiration time [time]',
      'SkydogCookie.read': 'Read the value of the cookie named [name]',
      'SkydogCookie.delete': 'Delete the cookie named [name]',
      'Skydog.newCookie.help':'⚠️Note: Cookie size limit is 4KB'
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
        id: 'Cookie',
        name: i10n('SkydogCookie.name'),
        color1: '#996026',
        color2: '#996026',
        blockIconURI:SkydogCookieIconUrl,
        menuIconURI:SkydogCookieIconUrl,
        blocks: [
          "---" + i10n("Skydog.newCookie.help"),
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
      const host = window.location.pathname
      // 加入前缀，防止读取非作品信息
      const cookie = `ccw_custom_cookie_${host}_${name}=${value};expires=${new Date(Date.now() + time * 24 * 60 * 60 * 1000).toUTCString()};path=/`
      if (cookie.length > 4096) {
        throw new Error("Cookie size exceeds 4k limit!");
      }
      else{
        document.cookie = cookie;
      }
    }
    read(args) {
      const name = args.name
      const cookies = document.cookie.split(';')
      let value = ''
      cookies.forEach(cookie => {
        const [key, val] = cookie.split('=')
        if (
          key.trim() === `ccw_custom_cookie_${window.location.pathname}_${name}`
        ) {
          value = val.trim()
        }
      })
      return value
    }
    delete(args) {
      const name = args.name
      document.cookie = `ccw_custom_cookie_${window.location.pathname}_${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`
    }
  }
  // The following snippet ensures compatibility with Turbowarp / Gandi IDE. If you want to write Turbowarp-only or Gandi-IDE code, please remove corresponding code
    // For Gandi
    window.tempExt = {
      Extension: SkydogCookie,
      info: {
          name: "SkydogCookie.name",
          description: "SkydogCookie.descp",
          extensionId: "Cookie",
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
