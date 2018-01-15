# modern-node-backend

Modern and performant Node backend template.

## Tech choices

### [Express][express]

The default choice for a web framework in Node.js. Competitors don't offer
enough benefits to offset the advantage of Express being the most popular
choice.

### ES2015 modules with [@std/esm][esm]

Enable using ES2015 modules without a build step and align with how Node.js will
support modules in the future. The `.mjs` file extension is here to stay.

### Test with [Mocha][mocha], [Chai][chai] and [SuperTest][supertest]

Mocha and Chai are the most popular combination for testing Node.js
applications. This template uses the [Chai expect style][chai-expect] as that's
the one with the most readable syntax and less pitfalls.

In the future [Jest][jest] could be used to replace Mocha and Chai once it can
be [more easily used with @std/esm][jest-esm].

SuperTest is the easiest way to test endpoints with a fluent API and without
having to worry about starting/stopping the server.

### [pino logger][pino]

pino is a fast JSON logger with a good API and sensible defaults. Nicer to use
than Winston.

### [Prettier][prettier]

Automatic and opinionated code formatter. Don't worry about code style ever
again and just let the computer do that for you.

### [Yarn][yarn]

A fast and reliable package manager. In my experience the lockfile is much
more stable compared to npm and easier to work with in a team with several
members on different platforms. The lockfile is automerged on conflicts!

## Structure

### `src/`

All application source code is located here.

### `src/app.mjs`

The main file where all the middleware are attached. This file shouldn't have
inline middleware or side-effecting code. It should just setup app and export
it.

### `src/middleware/`

Custom Express middleware are located here. Modules in this directory should
default export a middleware function `(req, res, next) => {}` or a function
creating one if the middleware needs to be parametrized.

### `src/routes/`

All code that handle certain paths live here. Modules should default export an
Express router that is attached either in `app.mjs` or a module that strings
together several routes.

## Using this template

First clone this repo without history:

```bash
git clone --depth 1 git@github.com:Hilzu/modern-node-backend.git
```

Next you'll probably want to rewrite the message of the only commit:

```bash
git commit --amend -m "Initial template from https://github.com/Hilzu/modern-node-backend"
```

Then you should remove the LICENSE.md file and update the `license` and `author`
fields in `package.json`. This template is licensed with [CC0 1.0][cc0] which
basically means that you're free to use it in any way including relicensing
without attributing me.

After that you should ensure that you have the latest versions of all the 
dependencies by removing `yarn.lock` and running `yarn` or by running
`yarn upgrade --latest`.

[cc0]: https://creativecommons.org/publicdomain/zero/1.0/
[esm]: https://github.com/standard-things/esm
[express]: https://expressjs.com/
[mocha]: https://mochajs.org/
[chai]: http://chaijs.com/
[supertest]: https://github.com/visionmedia/supertest
[chai-expect]: http://chaijs.com/guide/styles/#expect
[jest]: https://facebook.github.io/jest/
[jest-esm]: https://github.com/facebook/jest/issues/4842
[pino]: https://getpino.io/
[prettier]: https://prettier.io/
[yarn]: https://yarnpkg.com/
