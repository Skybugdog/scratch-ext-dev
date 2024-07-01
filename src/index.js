import Bbcode from './module/bbcode.js'
import Swal from 'sweetalert2'
;(function (Scratch) {
  // 因为弹窗限制是所有积木统一共享，所以创建的是全局变量
  let lastOpenTime = 0
  const BetterMsgIconUrl =
    'https://m.ccw.site/user_projects_assets/0d3ec414f0339216c61c75922f68757f.svg'
  const BetterMsgPictureUrl =
    'https://m.ccw.site/user_projects_assets/5db8a064cf118bb46563e02718f3d761.svg'
  if (Scratch.extensions.unsandboxed === false) {
    throw new Error('Sandboxed mode is not supported')
  }
  // Your BetterMsgension's code
  Scratch.translate.setup({
    'zh-cn': {
      'BetterMsg.name': '更好的弹窗',
      // 注：虽然我使用的库支持HTML，但是有监管风险，故没有使用。
      'BetterMsg.help':"所有弹窗支持BBcode和Markdown，优先解析Markdown",
      'BetterMsg.thank':'感谢 白猫@CCW 提供的BBcode解析依赖！',
      'BetterMsg.openModal':
        '弹出覆盖式模态框，类型[type]标题[title]内容[content][anim] |可选| 字体颜色16进制代码[color] ',
      'BetterMsg.openModalAutoClose':
        '弹出覆盖式模态框，类型[type]标题[title]内容[content]并在[time]秒后自动关闭[anim] |可选| 字体颜色16进制代码[color] ',
      'BetterMsg.openModalRight':
        '弹出右上角通知弹窗，类型[type]内容[content]并在[time]秒后自动关闭 |可选| 字体颜色16进制代码[color] ',
      'BetterMsg.success': '成功',
      'BetterMsg.warning': '警告',
      'BetterMsg.error': '错误',
      'BetterMsg.info': '信息',
      'BetterMsg.question': '问题',
      'BetterMsg.animOk': '附带动画',
      'BetterMsg.animNo': '不附带动画',
      'BetterMsg.alerts': '[open]浏览器原生alert弹窗',
      'BetterMsg.oalert': '覆写',
      'BetterMsg.calert': '还原',
      "BetterMsg.error.time": "调用间隔不得小于3秒",
    },
    en: {
      'BetterMsg.name': "Skydog's Better Message",
      'BetterMsg.help':'All popups support BBcode and Markdown, prioritizing parsing of Markdown',
      'BetterMsg.thank':'Thanks to 白猫 @ CCW for the BBcode parsing dependency!' ,
      'BetterMsg.openModal':
        'Open modal dialog, type [type] title [title] content [content][anim] |optional| font color hex code [color]',
      'BetterMsg.openModalAutoClose':
        'Open modal dialog, type [type] title [title] content [content] and close in [time] seconds[anim] |optional| font color hex code [color]',
      'BetterMsg.openModalRight':
        'Open notification pop-up, type [type] content [content] and close in [time] seconds |optional| font color hex code [color]',
      'BetterMsg.success': 'Success',
      'BetterMsg.warning': 'Warning',
      'BetterMsg.error': 'Error',
      'BetterMsg.info': 'Info',
      'BetterMsg.question': 'Question',
      'BetterMsg.animOk': 'With animation',
      'BetterMsg.animNo': 'Without animation',
      'BetterMsg.alert': '[open] browser native alert dialog',
      'BetterMsg.oalert': 'Override',
      'BetterMsg.calert': 'Restore',
      "BetterMsg.error.time": "Call interval cannot be less than 3 seconds",
    }
  })
  function i10n(id){
    return Scratch.translate({ id, default: id, description: id })
  }

  class BetterMsg {
    constructor(runtime) {
      this.runtime = runtime
      this.maxParsedable = 100;
    }

    getInfo() {
      return {
        id: 'BetterMsg',
        name: i10n('BetterMsg.name'),
        color1: '#d9963a',
        color2: '#d9963a',
        blockIconURI: BetterMsgIconUrl,
        menuIconURI: BetterMsgIconUrl,
        blocks: [
          "---" + i10n('BetterMsg.help'),
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'openModal',
            text: i10n('BetterMsg.openModal'),
            arguments: {
              type: {
                type: Scratch.ArgumentType.STRING,
                menu: 'type'
              },

              title: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: i10n('BetterMsg.success')
              },
              content: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: i10n('BetterMsg.success')
              },
              anim: {
                type: Scratch.ArgumentType.STRING,
                menu: 'anim'
              },
              color: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#4CAF50'
              }
            }
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'openModalAutoClose',
            text: i10n('BetterMsg.openModalAutoClose'),
            arguments: {
              type: {
                type: Scratch.ArgumentType.STRING,
                menu: 'type'
              },

              title: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: i10n('BetterMsg.success')
              },
              content: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: i10n('BetterMsg.success')
              },
              anim: {
                type: Scratch.ArgumentType.STRING,
                menu: 'anim'
              },
              color: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#4CAF50'
              },
              time: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3
              }
            }
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'openModalRight',
            text: i10n('BetterMsg.openModalRight'),
            arguments: {
              type: {
                type: Scratch.ArgumentType.STRING,
                menu: 'type'
              },
              content: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: i10n('BetterMsg.success')
              },
              time: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3
              },
              color: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#4CAF50'
              }
            }
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'alerts',
            text: i10n('BetterMsg.alerts'),
            arguments: {
              open: {
                type: Scratch.ArgumentType.STRING,

                menu: 'open'
              }
            }
          },
          "---" + i10n('BetterMsg.thank')
        ],
        menus: {
          type: [
            {
              text: i10n('BetterMsg.success'),
              value: 'success'
            },
            {
              text: i10n('BetterMsg.warning'),
              value: 'warning'
            },
            {
              text: i10n('BetterMsg.error'),
              value: 'error'
            },
            {
              text: i10n('BetterMsg.info'),
              value: 'info'
            },
            {
              text: i10n('BetterMsg.question'),
              value: 'question'
            }
          ],
          anim: [
            {
              text: i10n('BetterMsg.animOk'),
              value: 'true'
            },
            {
              text: i10n('BetterMsg.animNo'),
              value: 'false'
            }
          ],
          open: [
            {
              text: i10n('BetterMsg.oalert'),
              value: 'open'
            },
            {
              text: i10n('BetterMsg.calert'),
              value: 'close'
            }
          ]
        }
      }
    }
    // code here
    
    openModal(args) {
      
      if(lastOpenTime !== 0){
        if (Date.now() - lastOpenTime < 3000) {
          return i10n("BetterMsg.error.time")
        }
        else {
          lastOpenTime = Date.now()
        }
      }
      else{
        lastOpenTime = Date.now()
      }

      
      // 识别是否有存在id为SkydogBetterMsg的link标签，如果有则跳过，没有则创建一个并导入https://s4.zstatic.net/ajax/libs/animate.css/4.1.1/animate.min.css里的所有样式
      const link = document.querySelector('#SkydogBetterMsg')
      if (!link) {
        const link = document.createElement('link')
        link.id = 'SkydogBetterMsg'
        link.rel = 'stylesheet'
        link.href =
          'https://s4.zstatic.net/ajax/libs/animate.css/4.1.1/animate.min.css'
        document.head.appendChild(link)
      }

      const content = "[md]" + args.content + "[/md]"
      const title = "[md]" + args.title + "[/md]"
      const type = args.type
      const anim = args.anim
      const color = args.color
      if (anim === 'true') {
        console.log('with animation')
        Swal.fire({
          title: new Bbcode.Parser().toHTML(title, this.runtime, this.maxParsedable),
          color: color,
          html: new Bbcode.Parser().toHTML(content, this.runtime, this.maxParsedable),
          icon: type,
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        })
      } else {
        Swal.fire({
          title: new Bbcode.Parser().toHTML(title, this.runtime, this.maxParsedable),
          color: color,
          html: new Bbcode.Parser().toHTML(content, this.runtime, this.maxParsedable),
          icon: type
        })
      }
    }
    openModalAutoClose(args) {
      
      if(lastOpenTime !== 0){
        if (Date.now() - lastOpenTime < 3000) {
          return i10n("BetterMsg.error.time")
        }
        else {
          lastOpenTime = Date.now()
        }
      }
      else{
        lastOpenTime = Date.now()
      }

      const link = document.querySelector('#SkydogBetterMsg')
      if (!link) {
        const link = document.createElement('link')
        link.id = 'SkydogBetterMsg'
        link.rel = 'stylesheet'
        link.href =
          'https://s4.zstatic.net/ajax/libs/animate.css/4.1.1/animate.min.css'
        document.head.appendChild(link)
      }
      const content = "[md]" + args.content + "[/md]"
      const title = "[md]" + args.title + "[/md]"
      const type = args.type
      const anim = args.anim
      const color = args.color
      const time = args.time
      if (anim === 'true') {
        Swal.fire({
          title: new Bbcode.Parser().toHTML(title, this.runtime, this.maxParsedable),
          color: color,
          html: new Bbcode.Parser().toHTML(content, this.runtime, this.maxParsedable),
          icon: type,
          timer: time * 1000,
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          },
          
        })
      } else {
        Swal.fire({
          title: new Bbcode.Parser().toHTML(title, this.runtime, this.maxParsedable),
          color: color,
          html: new Bbcode.Parser().toHTML(content, this.runtime, this.maxParsedable),
          icon: type,
          timer: time * 1000
        })
      }
    }
    openModalRight(args) {
      
      if(lastOpenTime !== 0){
        if (Date.now() - lastOpenTime < 3000) {
          return i10n("BetterMsg.error.time")
        }
        else {
          lastOpenTime = Date.now()
        }
      }
      else{
        lastOpenTime = Date.now()
      }

      const link = document.querySelector('#SkydogBetterMsg')
      if (!link) {
        const link = document.createElement('link')
        link.id = 'SkydogBetterMsg'
        link.rel = 'stylesheet'
        link.href =
          'https://s4.zstatic.net/ajax/libs/animate.css/4.1.1/animate.min.css'
        document.head.appendChild(link)
      }
      const color = args.color
      const content = "[md]" + args.content + "[/md]"
      const type = args.type
      const time = args.time * 1000
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: time,
        type: type,
        title: new Bbcode.Parser().toHTML(content, this.runtime, this.maxParsedable),
        color: color
      })
    }
    alerts(args) {
      // alert YUEN有做限制，我就不做了
      const open = args.open
      if (open === 'open') {
        window.alert = e => {
          Swal.fire({
            type: 'info',
            titleText: e
          })
        }
      } else {
        const f = document.createElement('iframe')
        f.style.cssText = 'border:0;width:0;height:0;display:none'
        document.body.appendChild(f)
        const d = f.contentWindow.document
        d.write(
          '<script type="text/javascript">window.parent.alert = alert;</script>'
        )
        d.close()
      }
    }

  }
  // For Gandi
  window.tempExt = {
    Extension: BetterMsg,
    info: {
      name: 'BetterMsg.name',
      description: 'BetterMsg.descp',
      extensionId: 'BetterMsg',
      iconURL: BetterMsgPictureUrl,
      insetIconURL: BetterMsgIconUrl,
      featured: true,
      disabled: false,
      collaborator: '多bug的啸天犬 @ CCW'
    },
    l10n: {
      'zh-cn': {
        'BetterMsg.name': i10n('BetterMsg.name'),
        'BetterMsg.descp': '更好的弹窗！美观|实用|丰富'
      },
      en: {
        'BetterMsg.name': "Skydog's Better Message",
        'BetterMsg.descp': 'Better pop-up windows! Beautiful | Practical | Rich'
      }
    }
  }
})(Scratch)
