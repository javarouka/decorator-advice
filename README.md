# ES7 aspect decorator

## Usage

```js

import { before, after, error, around } from 'decorator-advice'

const logging = msg => console.log(msg);
class User {

  @before(message => logging(message) )
  getUser() {
    // ... implementation ...
  }

}

```

If you use this in CommonJS or AMD environment, add 'default'!

```js
var aspectModule = require('decorator-advice');
var aspect = aspectModule.default;
var before = aspectModule.before;
```

## License
MIT