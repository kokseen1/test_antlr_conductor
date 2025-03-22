## Install Yarn

```shell
npm install --global yarn
```

## Wrong version of Yarn on windows

On elevated terminal:

```shell
corepack enable
```

## Getting started

```shell
yarn install
yarn generate-parser
yarn build
node main.js
```

## Importing `index.js` to sourceacademy playground

1. Go to <https://sourceacademy.org/playground>

2. Select settings from dropdown

![](img/sa_settings_dropdown.png)

3. Select Feature Flags

![](img/sa_settings.png)

4. Set `conductor.enable` to true and `conductor.evaluator.url` to the deployed `index.js` file URL

![](img/sa_feature_flags.png)

## Install rollup

```shell
npm install --global rollup
```

## Note

When building for iife, rollup's `typescript` module thinks that parser source files are in `parser/src` and not `parser/`, so import statements need to follow accordingly.
