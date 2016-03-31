const Display = require('@ali/alitv-display-base')

export class <%= projectName %> extends Display {
  constructor(obj) {
    super(obj)
  }
  initView(style, data) {
    return document.createElement('div')
  }
  render(node, style, data) {
    node.innerHTML = ''
  }
  renderCallback() {

  }
}
