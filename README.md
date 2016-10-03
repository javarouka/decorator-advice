# ES7 aspect decorator

[![Build Status](https://travis-ci.org/javarouka/decorator-advice.svg)](https://travis-ci.org/javarouka/decorator-advice)

## Getting Started

```sh
npm i decorator-advice
```

## Usage

```js

import { before, after, error, around } from 'decorator-advice'

const logging = msg => console.log(msg);
class User {

  @before(() => logging('hello') )
  getUser() {
    // ... implementation ...
  }

}

```

If you use this in CommonJS or AMD environment:

```js
var aspectModule = require('decorator-advice');
var aspect = aspectModule.default;
var before = aspectModule.before;
```

## License
MIT
