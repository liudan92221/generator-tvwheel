'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var urllib = require('urllib');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();
    this.pkg = require(path.join(__dirname, '../../package.json'));
    let noUpdate = null
    if (process && process.argv && process.argv[3]) {
      noUpdate = process.argv[3]
    }
    if (noUpdate !== '-noupdate') {
      this.log(
        chalk.yellow('正在检查更新...')
      );

      urllib.request('http://registry.npm.taobao.org/generator-tvwheel/latest', function (err, data, res) {
        if (err || res.statusCode != 200) {
          this.log(
            chalk.red('检查更新出错')
          );
        } else {
          data = JSON.parse(data.toString());

          if (data.version !== this.pkg.version) {
            this.log(
              '发现新版本：' + chalk.red(data.version) + ', 当前版本：' + chalk.yellow(this.pkg.version) + '.'
            );
            this.log(
              '版本有更新，建议更新：npm install -g generator-tvwheel'
            );
          } else {
            this.log(
              '当前版本为最新版本'
            );
          }
        }

        this.log(yosay(
          'Welcome to the polished ' + chalk.red('tvwheel') + ' generator!'
        ));

        done();

      }.bind(this));
    } else {
      done();
    }
  },

  writing: {
    init: function () {

    },

    askFor: function () {
      var cb = this.async();
      var fileName = path.basename(process.cwd());

      var prompts = [
        {
          type: 'rawlist',
          name: 'type',
          message: 'Type of Component?',
          choices: [
            {
              name: 'BaseComponent(无界面功能性组件)',
              value: '0'
            },
            {
              name: 'DisplayComponent(显示UI组件)',
              value: '1'
            },
            {
              name: 'FocusableComponent(有焦点切换组件,且基于FocusEngine)',
              value: '2'
            }
          ],
          default: '0',
          warning: ''
        },
        {
          name: 'projectName',
          message: 'Name of Component?',
          default: fileName,
          warning: ''
        },
        {
          name: 'author',
          message: 'Author Name:',
          default: '',
          warning: ''
        },
        {
          name: 'email',
          message: 'Author Email:',
          default: '',
          warning: ''
        },
        // {
        //   name: 'groupName',
        //   message: 'Group Name:',
        //   default: 'de',
        //   warning: ''
        // },
        {
          name: 'version',
          message: 'Version:',
          default: '0.0.1',
          warning: ''
        }
      ];

      // your-mojo-name => YourMojoName
      function parseMojoName(name) {
        return name.replace(/\b(\w)|(-\w)/g, function (m) {
          return m.toUpperCase().replace('-', '');
        });
      }

      this.prompt(prompts, function (props) {
        this.type = props.type;
        this.packageName = props.projectName;// project-name
        this.projectName = parseMojoName(this.packageName); //ProjectName
        this.author = props.author;
        this.email = props.email;
        this.version = props.version;
        // this.groupName = props.groupName;
        var base = '~0.0.1'
        var display = '~0.0.1'
        var focusable = '~0.0.1'
        if (props.type == '0') {
          this.dependencies = '{\n' +
            '\t\t"silver-base": "' + base + '"\n' +
            '\t}';
        } else if (props.type == '1') {
          this.dependencies = '{\n' +
            '\t\t"silver-base": "' + base + '",\n' +
            '\t\t"silver-display": "' + display + '"\n' +
            '\t}';
        } else {
          this.dependencies = '{\n' +
            '\t\t"silver-base": "' + base + '",\n' +
            '\t\t"silver-display": "' + display + '",\n' +
            '\t\t"silver-focusable": "' + focusable + '"\n' +
            '\t}';
        }
        cb();

      }.bind(this));
    },

    app: function () {
      this.template(
        this.templatePath('index.js'),
        this.destinationPath('index.js')
      );
      this.template(
        this.templatePath('index.mobile.js'),
        this.destinationPath('index.mobile.js')
      );
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('gulp'),
        this.destinationPath('gulp')
      );
      this.template(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_hubrc'),
        this.destinationPath('.hubrc')
      );
      this.fs.copy(
        this.templatePath('_docConfig.json'),
        this.destinationPath('docConfig.json')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.template(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );
      //this.template(
      //  this.templatePath('lib'),
      //  this.destinationPath('lib')
      //);

      this.mkdir('lib');
      this.mkdir('build');
      this.mkdir('demo');

      if (this.type == 1) {
        this.template(
          this.templatePath('lib/index-1.js'),
          this.destinationPath('lib/index.js')
        );
      } else if (this.type == 2) {
        this.template(
          this.templatePath('lib/index-2.js'),
          this.destinationPath('lib/index.js')
        );
      } else {
        this.template(
          this.templatePath('lib/index.js'),
          this.destinationPath('lib/index.js')
        );
      }
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    }
  },

  install: function () {
    //this.installDependencies();
  }
});
