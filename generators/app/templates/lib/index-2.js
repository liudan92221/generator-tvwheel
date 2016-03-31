const Interactive = require('@ali/alitv-interactive-base')

export class <%= projectName %> extends Interactive {
  constructor(obj) {
    super(obj)
  }
  initView(style, data) {
    return document.createElement('div')
  }
  render(node, style, data) {
    node.innerHTML = ''
  }
}
