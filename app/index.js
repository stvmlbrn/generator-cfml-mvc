var generators = require('yeoman-generator');
var path = require('path');
var mkdirp = require('mkdirp');
var slug = require('slug');
var glob = require('glob');

module.exports = generators.Base.extend({
	constructor: function() {
		generators.Base.apply(this, arguments);

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

		subsystems: function() {
			if (this.options.subsystems !== undefined) {
				return true;
			}

			var done = this.async();
			var prompt = [{
				type: 'confirm',
				name: 'useSubsystems',
				message: 'Would you like to enable subsystems?'
			}];

			this.prompt(prompt, function(response) {
				this.options.subsystems = response.useSubsystems;
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
				type: 'input',
				name: 'reloadPassword',
				message: 'Enter the password used to reload the application'
			}];

			this.prompt(prompt, function(response) {
				this.reloadPassword = response.reloadPassword;
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

			//copy FW/1, application.cfc, and index.cfm
			this.sourceRoot(path.join(__dirname, 'fw1'));
			this.directory('.', '.');

			//copy tool configs
			this.sourceRoot(path.join(__dirname, 'templates', 'extras'));
			this.directory('.', '.');
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
			//this.installDependencies();
		}
	}
});