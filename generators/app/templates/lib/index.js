const SilverBase = require('silver-base')

/**
 * <%= projectName %>
 * @class 
 */
export class <%= projectName %> extends SilverBase {
  constructor(opt) {
    super(opt)
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
