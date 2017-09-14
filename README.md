# template-dir

> Copies files and folders from source directory to destination directory (all directories recursively or just files from the source directory) with template style from [template-file](https://github.com/gsandf/template-file#readme)

[![Build Status](https://travis-ci.org/aichbauer/node-template-dir.svg?branch=master)](https://travis-ci.org/aichbauer/node-template-dir)
[![Build status](https://ci.appveyor.com/api/projects/status/6xmc4f007uoacpcl?svg=true)](https://ci.appveyor.com/project/aichbauer/node-template-dir)
[![Coverage Status](https://coveralls.io/repos/github/aichbauer/node-template-dir/badge.svg?branch=master)](https://coveralls.io/github/aichbauer/node-template-dir?branch=master)

## Installation

```sh
$ npm i template-dir --save
```

or

```sh
$ yarn add template-dir
```

## Usage

In this section you will see two example usages. [One example](#example-one) copies the complete source directory tree to the destination and replaces all variables within the templates. [The other example](#example-two) will only copy files within the source directory to the destination directory and replaces all variables within the templates.

The given source directory tree:

```
.
+-- source/directory/
    |
    +-- dir-1
    |   |
    |   +-- file-2
    |
    +-- dir-2
    |   |
    |   +-- file-3
    |
    +-- template-1
```

The given `template-1`:

```txt
My name is {{name}} and I am {{age}} years old.
```

### example one

The `template-dir` module example **WITH** copying recursive all files and directories:

```js
const templateDir = require('template-dir'); // import templateDir from 'template-dir';

// if we set the third arguement to false it copies the complete sourcetree
// from 'source/directory' to 'destination/directory'
templateDir('source/directory', 'destination/directory', false, {
  name: 'Lukas',
  age: '25',
});
```

The example above will copy the source directory tree to the 'destination/directory' and replace all variables within all files

The destination directory tree: 

```
.
+-- destination/directory/
    |
    +-- dir-1
    |   |
    |   +-- file-2
    |
    +-- dir-2
    |   |
    |   +-- file-3
    |
    +-- template-1
```

The template-1 with filled variables:

```txt
My name is Lukas and I am 25 years old.
```

### example two

The `template-dir` module example **WITHOUT** copying recursive all files and directories:

```js
const templateDir = require('template-dir'); // import templateDir from 'template-dir';

// if we set the third arguement to true it copies only the files
// within 'source/directory' to 'destination/directory'
templateDir('source/directory', 'destination/directory', true, {
  name: 'Lukas',
  age: '25',
});
```

The example above will only copy the files within the source directory and will not recursively copy all directories and files.

The destination directory tree: 

```
.
+-- destination/directory/
    |
    +-- template-1
```

The template-1 with filled variables:

```txt
My name is Lukas and I am 25 years old.
```

## LICENSE

MIT © Lukas Aichbauer
