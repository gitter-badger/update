# update [![NPM version](https://img.shields.io/npm/v/update.svg?style=flat)](https://www.npmjs.com/package/update) [![NPM downloads](https://img.shields.io/npm/dm/update.svg?style=flat)](https://npmjs.org/package/update) [![Build Status](https://img.shields.io/travis/jonschlinkert/update.svg?style=flat)](https://travis-ci.org/jonschlinkert/update)

<p align="center">
<a href="https://github.com/jonschlinkert/update">
<img height="250" width="250" src="https://raw.githubusercontent.com/jonschlinkert/update/master/docs/logo.png">
</a>
</p>

Update is a developer framework and CLI for automating updates of any kind in code projects. All updating is accomplished using plugins called _updaters_, which can be installed globally, locally, or in a local `updatefile.js`.

## TOC

- [Why use Update?](#why-use-update)
- [Fast track](#fast-track)
- [Init](#init)
- [The basics](#the-basics)
- [Features](#features)
- [Related projects](#related-projects)
- [Contributing](#contributing)
- [Running tests](#running-tests)
- [Author](#author)
- [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

## Why use Update?

You can install [updaters](docs/updaters.md) from npm, or create your own updaters to do things like:

* normalize configuration settings, verbiage, or preferences across all of your projects
* update files that are typically excluded from build cycles, and are often forgotten about after they're created. For example:
  - fix dates in copyrights, [licenses](https://github.com/update/updater-license) and banners
  - remove deprecated fields from [project manifests](https://github.com/update/updater-package)
  - update settings in [runtime config](https://github.com/update/updater-eslint) files, preferences in [dotfiles](https://github.com/update/updater-editorconfig)
* after initializing a new project with a project generator, like [generate](https://github.com/generate/generate) or Google's Yeoman, you can "normalize" all of the generated files to use your own preferences

## Fast track

The following instructions are intended to provide a basic demonstration of how Update works. Follow the links after this section for additional information.

**1. Install update**

To use Update's CLI, `update` must first be installed globally with [npm](https://www.npmjs.com/):

```sh
$ npm install --global update
```

This adds the `update` command to your system path, allowing it to be run from anywhere.

**2. Install an "updater"**

To see how updaters work, install `updater-example`:

```sh
$ npm install --global updater-example
```

**3. Create "example.txt"**

In the current working directory, create an empty file named `example.txt`.

**4. Run**

As a habit, when using `update` make sure your work is committed, then run:

```sh
$ update example
```

This simply appends the string `foo`. Visit the [updater-example](https://github.com/update/updater-example) project for additional steps and guidance.

**Next steps**

* Browse the [documentation](docs)
* Learn about [updaters](docs/updaters.md)
* Learn about the [built-in updaters](docs/cli/built-in-updaters.md)

## Init

Tell Update's CLI to automatically run certain updaters every time the `update` command is given:

```sh
$ update init
```

You can run this command whenever you want to update your preferences, like after installing new updaters.

## The basics

**Usage**

* Once installed globally, Update's CLI can be executed with the `$ update` command
* All of the actual _updating_ is accomplished by plugins called [updaters](docs/updaters.md)

**Updaters**

* You can create your own custom [updaters](docs/updaters.md), or install them from [npm](https://www.npmjs.com/)
* [Discover updaters on npm](https://www.npmjs.com/keywords/update-updater) using the `update-updater` keyword
* See the [updater API docs](docs/api/updater.md) to learn how to create updaters.
* From the command line, pass the names of one or more updaters to run after the `$ update` command. For example:
  - To run `updater-foo`, you would do: `$ update foo`
  - To run multiple updaters, like `foo`, `bar` and `baz`, you would do: `$ update foo bar baz`
* Using the API, pass the names of one or more updaters to run to the `.update` method. For example:
  - To run `updater-foo`, you would do: `app.update('foo', function(err) {})`
  - To run muliple updaters, you would do: `app.update(['foo', 'bar', 'baz'], function(err) {})`
* If using Update's API, updaters are registered with the `.register` or `.updater` methods (see the [updater docs](docs/updaters.md) for more details about these methods).
* Any updater can register other updaters, and any updater can be registered by other updaters
* Updaters always run _in series_, thus they will always wait for the previous updater to finish before executing.

**Tasks**

* Tasks can be defined inside updaters using the `app.task()` method
* Tasks are powered by [bach](https://github.com/gulpjs/bach) and use the same conventions as [gulp](http://gulpjs.com)
* From the command line:
  - To run task `abc` belonging to updater `foo`, you would run `$ update foo:abc`
  - To run tasks `abc` and `xyz` belonging to updater `foo`, you would run `$ update foo:abc,xyz`
* Tasks always run _in series_, thus they will always wait for the previous task to finish before executing.

**updatefile.js**

* If an [updatefile.js](docs/updatefile.md) exists in the current working directory, Update's CLI will load it and register it as the ["default" updater](docs/updaters.md#default-updater)
* Using an `updatefile.js` provides a convenient way of testing and developing updaters. But you can also create your own ["private" updaters](docs/updaters.md#private-updaters) this way
* Update's CLI will look on the default updater for tasks and (other) updaters to run before looking elsewhere.

**Publishing updaters**

* Updaters can be published to npm using the `updater-foo` naming convention, where `foo` is the updater's [alias](docs/faq.md#aliases).
* Updaters that are published to npm can be [installed locally or globally](docs/installing-updaters.md)

More [features](#features) listed below. See the [docs](docs) for more detail.

## Features

* **unparalleled flow control**: through the use of [updaters](https://github.com/update/getting-started), [sub-updaters](https://github.com/update/getting-started) and [tasks](https://github.com/update/getting-started)
* **templates, scaffolds and boilerplates**: update a single file, initialize an entire project, or provide ad-hoc "components" throughout the duration of a project using any combination of [templates, scaffolds and boilerplates](#templates-scaffolds-and-boilerplates).
* **any engine**: use any template engine to render templates, including [handlebars](http://www.handlebarsjs.com/), [lodash](https://lodash.com/), [swig](https://github.com/paularmstrong/swig) and [pug](http://jade-lang.com)
* **prompts**: asks you for data when it can't find what it needs, and it's easy to customize prompts for any data you want.
* **data**: gathers data from the user's environment to populate "hints" in user prompts and render templates
* **streams**: interact with the file system, with full support for [gulp](http://gulpjs.com) and [assemble](https://github.com/assemble/assemble) plugins
* **smart plugins**: Update is built on [base](https://github.com/node-base/base), so any "smart" plugin can be used
* **stores**: persist configuration settings, global defaults, project-specific defaults, answers to prompts, and so on.
* much more!

## Related projects

You might also be interested in these projects:

* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://github.com/assemble/assemble) | [homepage](https://github.com/assemble/assemble "Assemble is a powerful, extendable and easy to use static site generator for node.js. Used by thousands of projects for much more than building websites, Assemble is also used for creating themes, scaffolds, boilerplates, e-books, UI components, API docum")
* [base](https://www.npmjs.com/package/base): base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting… [more](https://github.com/node-base/base) | [homepage](https://github.com/node-base/base "base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting with a handful of common methods, like `set`, `get`, `del` and `use`.")
* [generate](https://www.npmjs.com/package/generate): The Santa Claus machine for GitHub projects. Scaffolds out new projects, or creates any kind… [more](https://github.com/generate/generate) | [homepage](https://github.com/generate/generate "The Santa Claus machine for GitHub projects. Scaffolds out new projects, or creates any kind of required file or document from any given templates or source materials.")
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://github.com/verbose/verb) | [homepage](https://github.com/verbose/verb "Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used on hundreds of projects of all sizes to generate everything from API docs to readmes.")

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for avice on opening issues, pull requests, and coding standards.

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/update/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on June 30, 2016._