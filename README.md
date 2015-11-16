Generator cfml-mvc
=
A Yeoman generator for scaffolding modern ColdFusion apps.

Features
-
* MVC style folder structure with [FW/1](https://github.com/framework-one/fw1)
* Grunt build tool with file watching
* Bower package manager
* .editorconfig for consitent coding styles within text editors
* Define application level datasource
* Enable and define subsystems

Getting Started
-
* Make sure you have [yo](https://github.com/yeoman/yo) install: `npm install -g yo`
* Install the generator: `npm install -g generator-cfml-mvc`
* Run `yo cfml-mvc` and follow the prompts

Grunt Configuration
-
Includes jshint, uglify, cssmin, and imagemin. It will watch for changes in all relevant files located in /assets/src and compile/minimize to /assets/src.

Bower Configuration
-
Includes Bootstrap, jQuery, Font Awesome, and HTML5 Boilerplate and will install to /assets/components.

Contributing
-
Contributions are welcome! Feel free to fork this repo and send pull requests. Disussions regarding bugs, ideas, and ways to improve the project can take place in [issues](https://github.com/stevemilburn/generator-cfml-mvc/issues)

License
-
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
