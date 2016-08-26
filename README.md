# generator-tvwheel [![Build Status](https://secure.travis-ci.org/liudan92221/generator-tvwheel.png?branch=master)](https://travis-ci.org/liudan92221/generator-tvwheel)

> [Yeoman](http://yeoman.io) generator


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-tvwheel from npm, run:

```bash
npm install -g generator-tvwheel
```

Finally, initiate the generator:

```bash
yo tvwheel           // 初始化一个标准的项目，生成其目录结构
```

```bash
gulp                  // 进行项目构建
// gulp test          // 启动测试文件中测试代码
(sudo) gulp server    // 启动服务
gulp doc              // 根据注释生成对应文档
gulp demo             // demo文件夹中的文件copy到build目录下
```

```bash
└── project root
        ├── gulp.js          // gulp的脚本入口文件
        ├── gulp             // 存放gulp构建相关模块，可根据需要自行修改
        ├── package.json     // 存放项目基本信息和node的依赖关系配置
        ├── README.md        // 项目说明文档
        ├── index.js         // 入口文件
        ├── index.mobile.js  // 移动端入口文件
        ├── doc              // 存放生成项目API文档
        ├── test             // 存放测试文件
        ├── node_modules     // 存放项目的node模块
        ├── lib              // 项目源文件存放目录
        └── build            // 项目构建目录
```

## License

MIT
