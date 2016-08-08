const Display = require('@ali/alitv-display-base')

/**
 * <%= projectName %>
 * @class
 */
export class <%= projectName %> extends Display {
  constructor(opt) {
    super(opt)
  }

  /**
   * initView 模板方法
   * @memberOf <%= projectName %>.prototype
   * @method initView
   * @param {Object} style 样式参数
   * @param {Object} data 数据参数
   * @return {Node} dom对象
   */
  initView(style, data) {
    return document.createElement('div')
  }

  /**
   * render 重绘方法
   * @memberOf <%= projectName %>.prototype
   * @method render
   * @param {Node} node initView方法返回的dom对象
   * @param {Object} style 样式参数
   * @param {Object} data 数据参数
   */
  render(node, style, data) {
    node.innerHTML = ''
  }

  /**
   * renderCallback 重绘之后调用方法
   * @memberOf <%= projectName %>.prototype
   * @method renderCallback
   */
  renderCallback() {

  }

  /**
   * makeStyle 根据opt参数返回style对象
   * @memberOf <%= projectName %>.prototype
   * @method makeStyle
   * @param {Object} opt constructor参数
   * @return {Object} 样式对象
   */
  makeStyle(opt) {
    return {}
  }
  /**
   * getName 获取组件名称
   * @memberOf <%= projectName %>.prototype
   * @method getName
   * @return {String}
   */
  getName() {
    return '<%= projectName %>'
  }
}
