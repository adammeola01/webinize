#Webinize
<br>
an oppinionated wrapper for babel and node-minify.
<br/><br/>
It accepts a single object as it's argument, with the following properties:
<hr/>

* src: (your source file)

 <hr/>

* dev: ( development bundle destination - with working source map)

<hr/>

* min: (production bundle destination - minified and dead code removed)

<hr/>

* done: (callback)

<hr/>

##API example usage:

```javascript
const webinize = require('webinize');

webinize({
    src: '/sadf/asdf/asd/fas/dadg/foo.js'
    dev: '/sadf/asdf/asd/fas/dadg/foo.bundle.js'
    //min is optional, and signifigantly adds to compile time.
    min: '/sadf/asdf/asd/fas/dadg/foo.bundle.min.js'
    done: () => {
        // do stuff here
    }
});
```