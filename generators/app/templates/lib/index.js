const Component = require('@ali/alitv-component-base')

export class <%= projectName %> extends Component {
  constructor(obj) {
    super()
  }
  /**
   * 需重写
   * 获取组件名称，自定义
   *
   */
  getName() {
    return '<%= projectName %>'
  }
  /**
   * 需重写
   * 通讯回执，调用其他组件执行完之后回调此方法
   *
   */
  receipt() {

  }

  /**
   * 需重写
   * 组件开放出口数据
   *
   */
  exportData() {
    return null
  }

  /**
   * 需重写
   * 其他组件通讯调用方法
   * 接受其他组件传入的数据
   * 数据格式
   *
   *  {
          id: this.getId(),
          component: this,
          name: this.getName(),
          data: this.exportData()
        }
   */
  change() {

  }
}
