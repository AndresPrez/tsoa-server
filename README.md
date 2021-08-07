# tsoa-server

TypeScript Server with [tsoa](https://github.com/lukeautry/tsoa)

Dependency Description:

@babel/cli: A required install for using babel. It allows the use of Babel from the terminal and is available as ./node_modules/.bin/babel.
@babel/core: Core Babel functionality. This is a required installation.
@babel/node: This works exactly like the Node.js CLI, with the added benefit of compiling with babel presets and plugins. This is required for use with nodemon.
@babel/plugin-transform-runtime: This helps to avoid duplication in the compiled output.
@babel/preset-env: A collection of plugins that are responsible for carrying out code transformations.
@babel/register: This compiles files on the fly and is specified as a requirement during tests.
@babel/runtime: This works in conjunction with @babel/plugin-transform-runtime.


Potential dependecies:

apicache: Might be useful as a Request Caching solution that does not need much configuration.


REST API Best Practices: https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/
