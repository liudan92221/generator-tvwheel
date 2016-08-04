const Component = require('@ali/alitv-component-base')

/**
 * <%= projectName %>
 * @class 
 */
export class <%= projectName %> extends Component {
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
