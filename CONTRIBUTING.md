## Contributing

This repository is setup as a monorepo using [lerna](https://lerna.js.org/) and [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).

### Setup

If you haven't already, install `node`, `yarn` and `lerna`:

[Install Node](https://nodejs.org/)

Then run:

```
npm install -g yarn
yarn global add lerna
```

You may need to add the directory where yarn installs global packages like `lerna` to your path. For example, in `bash`:
```sh
# in ~/.bashrc
export PATH="$(yarn global bin):$PATH"
```

### Bootstrapping

The `lerna bootstrap` command is used to install all of the packages dependencies and link dependent packages. You can read more about it [here](https://github.com/lerna/lerna/tree/master/commands/bootstrap#readme).

Before you can build you'll need to bootstrap the project:

```
cd /path/to/lib-hubs
lerna bootstrap
```

### Building

To build all packages run the build script in the root directory:

```
cd /path/to/lib-hubs
yarn build
```

To build packages on each change run the watch script in the root directory:

```
cd /path/to/lib-hubs
yarn watch
```

This build script passes each of the packages to the typescript compiler so that [project references and incremental compiles](https://www.typescriptlang.org/docs/handbook/project-references.html) work correctly. Running `tsc` directly in a package directly may not work correctly. It is advised to always use the build script.

By default the build script builds two targets:
  - cjs - commonjs that uses the commonjs module target in typescript and targets es5 language feature. Available as `main` in the package's package.json
  - esm - esmodules that uses the es2015 module target in typescript and targets es2015 language features. Available as `module` in the package's package.json

In addition typescript definitions and typescript definition mappings are generated for integration with language servers and typescript.

These built files are located in each package's `lib` directory which is included in the published npm package.

### Linking a package into another project

If you want to use a development build of one of the packages in this repository in another project, use `yarn link`.

For example if you wanted to link [three-particle-emitter](packages/three-particle-emitter) into [hubs](https://github.com/mozilla/hubs):

```
cd /path/to/lib-hubs/packages/three-particle-emitter
yarn link

cd /path/to/lib-hubs
yarn watch
```

In another terminal session:

```
cd /path/to/hubs
yarn link three-particle-emitter
```

Now three-particle-emitter is linked into hubs and will rebuild whenever it is changed.

(Optional alternative) There is a script called `/scripts/setup-hubs-links.sh` that will attempt to setup links between this directory and your `hubs` directory. It makes sure that they refer to the same version of `THREE.js` and it avoids a naming conflict where `hubs` code refers to `<dir_hubs>/node_modules/lib-hubs` whereas the usual link method creates a directory at `<dir_hubs>/node_modules/@mozillareality/three-particle-emitter`, and so is not used by default.

### Publishing

Currently publishing is handled by `lerna publish`. This handles package versioning, tagging releases, pushing to git, and publishing to npm. This does not handle linting your code yet so please do so before publishing. At a later date we may automate this step via ci, but for now to publish run:

```
cd /path/to/lib-hubs
lerna publish
```

And follow the instructions.

### Creating a new package

Creating a new package in the mono repository is made easier with the `create-package` script.

```
cd /path/to/lib-hubs
yarn create-package <template-name> <package-name>
```

Templates are stored in the [templates folder](templates/) and are copied into the packages folder with the correct package name when running the `create-package` command.

Currently there are the following templates:

- `library`
  Creates a typescript library with package name `@mozillareality/{package-name}` and no dependencies.
- `example`
  Creates an example project with three and webpack setup correctly.

#### Project References

If your new package depends on another package in the mono repository you need to specify the [typescript project reference](https://www.typescriptlang.org/docs/handbook/project-references.html) or else that project will not be properly rebuilt on change.

For example see [three-particle-emitter's tsconfig.json file](packages/three-particle-emitter/tsconfig.json):

```
"references": [
  { "path": "../easing-functions" }
]
```

`three-particle-emitter` is dependent on `@mozillareality/easing-functions` located in `packages/easing-functions` so we need to add it as a project reference in `three-particle-emitter`'s `tsconfig.json`.

### Importing an existing package

It is possible to import an existing standalone repository as a package along with its git history using `lerna import` this process is [documented here](https://github.com/lerna/lerna/tree/master/commands/import).

### Linting / Code Style

This project uses [tslint](https://palantir.github.io/tslint/) and [prettier](https://prettier.io/) for linting and code formatting.

To set `tslint` up in your editor of choice see [this list of tools](https://palantir.github.io/tslint/usage/third-party-tools/).

If you want to run `tslint` directly run:

```
cd /path/to/lib-hubs
yarn lint
```

### FAQ

#### Why are my package's dependencies not located in its `node_modules` directory?
  This monorepository makes use of Yarn's workspaces which hoists packages into the root whenever possible. For more info you can read [this blog post](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/).
