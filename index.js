const xcon = require('x-con');
const babel = require('babel-core');
const fs = require('fs');
const browserify = require('browserify');
const babelify = require('babelify');
const exorcist = require('exorcist');
const compressor = require('node-minify');

module.exports = (obj) => {
	let compiler;
    console.log(`compiling ${obj.src.split('/').pop()} => ${obj.dev.split('/').pop()} (browserify/babel)`);
    compiler = browserify(obj.src, {
        debug: true
    }).transform("babelify", {
        sourceMap: true,
        presets: ['babel-preset-es2015'],
        "plugins": ["transform-remove-strict-mode", ["transform-es2015-template-literals", {
            "loose": true,
            "spec": true
        }]]
    }).bundle().pipe(exorcist(obj.dev + '.map')).pipe(fs.createWriteStream(obj.dev), 'utf8');
    compiler.on('finish', (arg) => {
        xcon.post([{
            style: ['#2dd01f', 'bold'],
            str: obj.dev.split('/').pop() + ' - Done!'
        }]);
        if (obj.min) {
            console.log(`minifying ${obj.dev.split('/').pop()} => ${obj.min.split('/').pop()}`);
            compressor.minify({
                compressor: 'babili',
                input: obj.dev,
                output: obj.min,
                options: {},
                callback: function (err, min) {
					xcon.off();
                    	xcon.post([{
	                        style: ['#2dd01f', 'bold'],
	                        str: 'minifying - Done!'
	                    }]);
	                    	obj.done();
                }
            });
        }
		else obj.done();
    });
};
