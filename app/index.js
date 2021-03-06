var generators = require('yeoman-generator');
var path = require('path');
var mkdirp = require('mkdirp');
var slug = require('slug');
var glob = require('glob');
var _ = require('lodash');

module.exports = generators.Base.extend({
	constructor: function() {
		generators.Base.apply(this, arguments);

    //add skip-install option
    this.option('skip-install');

		this.slug = slug;
	},

	prompting: {
		appname: function() {
			if (this.options.appname !== undefined) {
				return true;
			}

			var done = this.async();
			var prompt = [{
				type: 'input',
				name: 'appname',
				message: 'Enter a name for your app'
			}];

			this.prompt(prompt, function(response) {
				this.appname = response.appname;
				done();
			}.bind(this));
		},

		dir: function() {
			if (this.options.createDirectory !== undefined) {
				return true;
			}

			var done = this.async();
			var prompt = [{
				type: 'confirm',
				name: 'createDirectory',
				message: 'Would you like to create a new directory for your project?'
			}];

			this.prompt(prompt, function(response) {
				this.options.createDirectory = response.createDirectory;
				done();
			}.bind(this));
		},

		dirname: function() {
			if (!this.options.createDirectory || this.options.dirname) {
				return true;
			}

			var done = this.async();
			var prompt = [{
				type: 'input',
				name: 'dirname',
				message: 'Enter directory name'
			}];

			this.prompt(prompt, function(response) {
				this.options.dirname = response.dirname;
				done();
			}.bind(this));
		},

		datasource: function() {
			if (this.options.datasource !== undefined) {
				return true;
			}

			var done = this.async();
			var prompt = [{
				type: 'input',
				name: 'datasource',
				message: 'Enter the primary application datasource name'
			}];

			this.prompt(prompt, function(response) {
				this.datasource = response.datasource;
				done();
			}.bind(this));
		},

		reloadpw: function() {
			if (this.options.reloadPassword !== undefined) {
				return true;
			}

			var done = this.async();
			var prompt = [{
				type: 'password',
				name: 'reloadPassword',
				message: 'Enter the password used to reload the application in production'
			}];

			this.prompt(prompt, function(response) {
				this.reloadPassword = response.reloadPassword;
				done();
			}.bind(this));
		},

    subsystems: function() {
      if (this.options.subsystems !== undefined) {
        return true;
      }

      var done = this.async();
      var prompt = [{
        type: 'confirm',
        name: 'useSubsystems',
        message: 'Would you like add subsystems now?'
      }];

      this.prompt(prompt, function(response) {
        this.options.subsystems = response.useSubsystems;
        done();
      }.bind(this));
    },

    subsystemnames: function() {
      if (!this.options.subsystems) {
        return true;
      }

      var done = this.async();
      var prompt = [{
        type: 'input',
        name: 'systemnames',
        message: 'Enter the name of your initial subsystems separated by a comma (",")'
      }];

      this.prompt(prompt, function(response) {
        this.options.subsystemnames = response.systemnames;
        done();
      }.bind(this));
    },

    dependencyManager: function() {
      if (this.options.dependencyManager !== undefined) {
        return true;
      }

      var done = this.async();
      var prompt = [{
        type: 'list',
        name: 'dependencyManager',
        message: 'Select a front-end dependency manager',
        choices: ['Bower', 'NPM', 'None']
      }];

      this.prompt(prompt, function(response) {
        this.dependencyManager = response.dependencyManager;
        done();
      }.bind(this));
    }
	},

	writing: {
		buildEnv: function() {
			//create directory
			if (this.options.createDirectory) {
				this.destinationRoot(this.options.dirname);
			}

      //need to know if user skipped bower and npm to determine whether to
      //load css and js files in default layout.
      if (this.options['skip-install']) {
        this.skipInstall = true;
      } else {
        this.skipInstall = false;
      }

			//copy FW/1
			this.sourceRoot(path.join(__dirname, 'fw1', 'framework'));
			this.directory('.', 'framework');

      //copy application.cfc and index.cfm
      this.sourceRoot(path.join(__dirname, 'fw1'));
      this.copy('application.cfc','./application.cfc');
      this.copy('index.cfm','./index.cfm');

      //copy config folder
      this.sourceRoot(path.join(__dirname, 'fw1', 'config'));
      this.directory('.', 'config');

      //copy app scaffolding
      this.sourceRoot(path.join(__dirname, 'fw1', 'scaffolding'));
      this.directory('.', 'app');

      //no default files for the 'model' folder, so need to create manually
      mkdirp.sync('app/model/services');
      mkdirp.sync('app/model/beans');

      //create subsystems folder and build out subystem scaffolding if necessary
      if (this.options.subsystems) {
        mkdirp.sync('app/subsystems');
        var subsystems = this.options.subsystemnames.split(',');
        var system;
        if (_.trim(subsystems).length > 0) {
          for (var i=0; i<subsystems.length; i++) {
            system = slug(_.trim(subsystems[i]));
            //copy app scaffolding
            this.sourceRoot(path.join(__dirname, 'fw1', 'scaffolding'));
            this.directory('.', 'app/subsystems/' + system);
            //no default files for the 'model' folder, so need to create manually
            mkdirp.sync('app/subsystems/' + system + '/model/services');
            mkdirp.sync('app/subsystems/' + system + '/model/beans');
          }
        }
      }

			//copy tools
			this.sourceRoot(path.join(__dirname, 'tools'));
			this.directory('.', '.');

      //copy bower settings if selected as front-end dependency manager
      if (this.dependencyManager === 'Bower') {
        this.sourceRoot(path.join(__dirname, 'bower'));
        this.directory('.', '.');
      }
		},

		assetsDirs: function() {
			mkdirp.sync('assets');
			mkdirp.sync('assets/src');
			mkdirp.sync('assets/src/js');
			mkdirp.sync('assets/src/css');
			mkdirp.sync('assets/src/img');
		}
	},

	install: function() {
		if (!this.options['skip-install']) {
      this.npmInstall();
      if (this.dependencyManager === 'Bower') {
        this.bowerInstall();
      }
		}
	}
});
