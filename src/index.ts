
;(function (Scratch) {
  const ExtIconUrl =''
  const ExtPictureUrl =''
  if (Scratch.extensions.unsandboxed === false) {
    throw new Error('Sandboxed mode is not supported')
  }
  // Your extension's code
  Scratch.translate.setup({
    'zh-cn': {
      'Ext.name': '啸天犬的Cookie',
    },
    en: {
      'Ext.name': "Skydog's Cookie",
    }
  })
  function i10n(id: string) {
    return Scratch.translate({ id, default: id, description: id })
  }

  class Ext implements Scratch.Extension {
    runtime: VM.Runtime
    constructor(runtime: VM.Runtime) {
      this.runtime = runtime
    }

    getInfo() {
      return {
        id: 'Ext',
        name: i10n('Ext.name'),
        color1: '#996026',
        color2: '#996026',
        blockIconURI:ExtIconUrl,
        menuIconURI:ExtIconUrl,
        blocks: [
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'newCookie',
            text: i10n('Ext.newCookie'),
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
          
        ]
      }
    }
    //extension's code here

    
  }
    // For Gandi
    window.tempExt = {
      Extension: Ext,
      info: {
          name: "Ext.name",
          description: "Ext.descp",
          extensionId: "Ext",
          iconURL: ExtPictureUrl,
          insetIconURL: ExtIconUrl,
          featured: true,
          disabled: false,
          collaborator: "多bug的啸天犬 @ CCW"
      },
      l10n: {
          "zh-cn": {
              "Ext.name": "啸天犬的Cookie",
              "Ext.descp": "操纵Cookie！设置过期时间！"
          },
          en: {
              "Ext.name": "Skydog's Cookie",
              "Ext.descp": "Manipulate cookies! Set expiration time!"
          }
      }
  };
  
})(Scratch)
