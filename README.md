# Generator cfml-mvc
A Yeoman generator for scaffolding modern ColdFusion apps.

## Features
* MVC style folder structure with [FW/1](https://github.com/framework-one/fw1)
* Grunt build tool with file watching
* Bower package manager
* .editorconfig for consitent coding styles within text editors
* Define application level datasource
* Enable and define subsystems

## Getting Started
* Make sure you have [yo](http://yeoman.io) install: `npm install -g yo`
* Install the generator: `npm install -g generator-cfml-mvc`
* Run `yo cfml-mvc` and follow the prompts

## Overview
The generator will create `/app` folder that will be the base of the application for FW/1 and DI/1.

Two runtime environments are supported, development (dev) and production (prod). If 'dev' is found in the URL, e.g. `http://dev.myproject.com` the environment is set to 'dev'. If 'dev' is not found the application is set to 'prod'. This also determines what configuration settings to load from `/config/config.json`.

The `/config/config.json` file is read during setupApplication() and will load the setting for the current environment into application.config. This is a good place to keep admin email addresses, API keys, etc. You may want to take precautions to prevent this file from being viewable in a browser for security purposes.

A default layout will be generated with a simple bootstrap layout that loads all front-end components defined in bower.json.

## Grunt Configuration
Includes jshint, uglify, cssmin, and imagemin. It will watch for changes in all relevant files located in `/assets/src` and minimize to `/assets/dist`.

If you define the 'assetsFolder' properly for each environment in the config.json file, you can load resources specific to your environment. For example `<script src='assets/#applciation.config.assetsFolder#/js/myfile.js'></script>` will load the minified file in production, but load your full source in development (helpful when troubleshooting js errors).

## Bower Configuration
Includes Bootstrap, jQuery, and Font Awesome and will install to `/assets/components`.

## Options
* `--skip-install`
  Avoid running Bower and NPM

## Contributing
Contributions are welcome! Feel free to fork this repo and send pull requests. Disussions regarding bugs, ideas, and ways to improve the project can take place in [issues](https://github.com/stevemilburn/generator-cfml-mvc/issues)

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
