
;(function (Scratch) {
  const EDPExtIconUrl =''
  const EDPExtPictureUrl =''
  if (Scratch.extensions.unsandboxed === false) {
    throw new Error('Sandboxed mode is not supported')
  }
  // Your extension's code
  // 已确认I10n无误
  Scratch.translate.setup({
    'zh-cn': {
      'EmbeddedProject.name': '作品内联',
      'EmbeddedProject.edp':'嵌入作品id为[id]的作品(覆盖舞台区) |⚠️| 作品id是作品详情页网址"detail/"后"?"前的数字与字母的组合',
      'EmbeddedProject.deledp':'删除作品id为[id]的内联作品'
    },
    en: {
      'EmbeddedProject.name': "Embedded Project",
      'EmbeddedProject.edp':'EmbeddedProject with work id [id] (covering the stage area) |⚠️| The work id is after "detail/"?" Before the combination of numbers and letters',
      'EmbeddedProject.deledp':'Delete inline work with work id [id]'
    }
  })
  function i10n(id: string) {
    return Scratch.translate({ id, default: id, description: id })
  }

  class EmbeddedProject implements Scratch.Extension {
    runtime: VM.Runtime
    constructor(runtime: VM.Runtime) {
      this.runtime = runtime
    }

    getInfo() {
      return {
        id: 'EmbeddedProject',
        name: i10n('EmbeddedProject.name'),
        color1: '#83c379',
        color2: '#83c379',
        blockIconURI:EDPExtIconUrl,
        menuIconURI:EDPExtIconUrl,
        blocks: [
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'edp',
            text: i10n('EmbeddedProject.edp'),
            arguments:{
              id:{
                type:'string',
                defaultValue:'66b2345e4f2841189434393b'
              }
            }
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'deledp',
            text: i10n('EmbeddedProject.deledp'),
            arguments:{
              id:{
                type:'string',
                defaultValue:'66b2345e4f2841189434393b'
              }
            }
          },
          
        ]
      }
    }
    //extension's code here
    edp(args){
      
      
      
      
      // 异步执行，防止嵌入操作阻塞线程
      async function edps(id){
        // 在class属性为gandi_stage_stage_1fD7k的DOM上叠加一层iframe，url为baidu.com
            
      const targetElement = document.querySelector('.gandi_stage_stage_1fD7k');

      if (targetElement) {
          
          const iframe = document.createElement('iframe');
          
          const iframeWindow = iframe.contentWindow;
          
          const iframeDocument = iframeWindow.document;
          
          iframe.src = 'https://www.ccw.site/player/'+ id;
          
          // 设置iframe的样式
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.border = 'none';
          iframe.style.position = 'absolute';
          iframe.style.top = '0';
          iframe.style.left = '0';
          iframe.id = 'ccw_user_extension_embedded_project_iframe' + id
          
          
          // 将iframe添加到目标DOM元素中
          targetElement.appendChild(iframe);

          // 监听 iframe 的全屏请求事件
          iframe.addEventListener('requestFullscreen', (event) => {
            event.preventDefault();
            return false;
          });
          //等待出现iframe内出现class为main-module_fullscreen-button_9f565的DOM元素，并点击
          function waitElement(selector, callback) {
            const element = iframeDocument.querySelector(selector);
            if (element) {
              callback();
            } else {
              setTimeout(() => {
                waitElement(selector, callback);
              }, 100);
            }
          }
          waitElement('.main-module_fullscreen-button_9f565', () => {
            const fullscreenButton = iframeDocument.querySelector('.main-module_fullscreen-button_9f565');
            fullscreenButton.click();

          });

          
      }
      }
      const id = args.id;
      edps(id);
        }
      deledp(args){
        const id = args.id;
        async function deledps(id){
        
        const targetElement = document.querySelector('#ccw_user_extension_embedded_project_iframe'+id);
        if(targetElement){
          targetElement.remove();
        }
        }
        deledps(id);
        
      }
  }
    // For Gandi
    window.tempExt = {
      Extension: EmbeddedProject,
      info: {
          name: "EmbeddedProject.name",
          description: "EmbeddedProject.descp",
          extensionId: "EmbeddedProject",
          iconURL: EDPExtPictureUrl,
          insetIconURL: EDPExtIconUrl,
          featured: true,
          disabled: false,
          collaborator: "多bug的啸天犬 @ CCW"
      },
      l10n: {
          "zh-cn": {
              "EmbeddedProject.name": "啸天犬的内联工程",
              "EmbeddedProject.descp": "在项目中内嵌其他项目！无缝衔接！无需跳转！"
          },
          en: {
              "EmbeddedProject.name": "Skydog's Embedded Project",
              "EmbeddedProject.descp": "Embed other items in your project! Seamless! No jump!"
          }
      }
  };
  
})(Scratch)
