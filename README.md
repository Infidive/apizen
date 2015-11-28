# apizen 
sane api with hapi 

[![Build Status](https://travis-ci.org/Infidive/apizen.svg?branch=master)](https://travis-ci.org/Infidive/apizen)

A robust sane api application bolierplate in Node with Hapi framework. That is the idea anyway.


### Modules and project organisation

- `config` App configurations
- `docs` Api documentation document
- `lib` Application logic
  - `index.js` - Defines the server
  - `start.js` - Starts the server
  - `resources` - Resource modules
    - `index.js` - Defines the resource class, link resources to the server.
  - `auth` - Authentication plugin for clients
    - `index.js` - A wrapper to a plugin or series of plugins and schemas for authentication
    - `client.js` - A siulates connection to client module.
  - `utils` - Utils to make code more clean an testable
  - `plugins` - Other plugins for the app
  - `models` - Data modules, to work with resources
  - `manifest.js`: Some server configurations.

- `test` Tests
  - `vise` - Put together files to make testing easy
  - `routes` - Tests for routes
  - `utils` - Tests for utils
  - `plugins` - Tests for plugins
  - `server.js` - Tests for the server
  - `auth.js` - Tests authentication
  - `.foo.js` - Dummy file to test lsdir

- `gulpfile.js` - Defining tasks for automations. Preferebly one should run `npm run watch` while writing code.
- `.travis.yml` - Travis CI
- `package.json`, `.gitignore` You know what these are :wink:!
- `LICENCE` current licence

### Coding conventions
Adopting the conventions by [hapi ](http://hapijs.com/styleguide)

### API conventions
Getting inspirations from [github API ](https://developer.github.com/v3/)

More [...]

### Coverage [![Build Status](https://travis-ci.org/Infidive/apizen.svg?branch=master)](https://travis-ci.org/Infidive/apizen)

Writting code for clarity and striving for 100% code coverage through out.


## Bugs, enhancements and issues

Got some inspiration for better things or stuff doesn't work, open an [issue ](https://github.com/Infidive/apizen/issues), and let's work on it.

## Contributions

Contributions are highly welcome. Fork the repo, make pull requests.
