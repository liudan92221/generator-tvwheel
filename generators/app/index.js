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

    this.log(
      chalk.yellow('正在检查更新...')
    );

    urllib.request('http://registry.npmjs.org/generator-tvwheel/latest', function (err, data, res) {
      if (err || res.statusCode != 200) {
        this.log(
          chalk.red('检查更新出错')
        );
      } else {
        data = JSON.parse(data.toString());

        if (data.version !== this.pkg.version) {
          this.log(
            '发现新版本：' + chalk.red(data.version) + ', 当前版本：'+chalk.yellow(this.pkg.version)+'.'
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
  },

  writing: {
    init: function() {

    },

    askFor: function () {
      var cb = this.async();
      var fileName = path.basename(process.cwd());

      var prompts = [
        {
          name: 'projectName',
          message: 'Name of Project?',
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
        {
          name: 'groupName',
          message: 'Group Name:',
          default: 'de',
          warning: ''
        },
        {
          name: 'version',
          message: 'Version:',
          default: '1.0.0',
          warning: ''
        }
      ];

      // your-mojo-name => YourMojoName
      function parseMojoName(name){
        return name.replace(/\b(\w)|(-\w)/g,function(m){
          return m.toUpperCase().replace('-','');
        });
      }

      this.prompt(prompts, function (props) {
        this.packageName = props.projectName;// project-name
        this.projectName = parseMojoName(this.packageName); //ProjectName
        this.author = props.author;
        this.email = props.email;
        this.version = props.version;
        this.groupName = props.groupName;
        cb();

      }.bind(this));
    },

    app: function () {
      this.template(
        this.templatePath('index.js'),
        this.destinationPath('index.js')
      );
      this.template(
        this.templatePath('mIndex.js'),
        this.destinationPath('mIndex.js')
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
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.template(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );
      this.template(
        this.templatePath('lib/index.js'),
        this.destinationPath('lib/index.js')
      );

      //this.mkdir('lib');
      this.mkdir('doc');
      this.mkdir('build');
      this.mkdir('test');

      this.template(
        this.templatePath('lib/index.js'),
        this.destinationPath('lib/index.js')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    //this.installDependencies();
  }
});
