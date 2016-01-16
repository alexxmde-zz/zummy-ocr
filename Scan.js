/*jslint node: true */
/*jslint nomen: true */
'use strict';
var path = require('path');
var exec = require('child_process').exec;

var Scan = {
	options: {
		scannerName: "",
        imagesPath: __dirname + '/images/',
        imageName: "temporary",
        imageFormat: "tiff",
        imageExtension: ".tiff"
    },
    
    process: function (options, callback) {
        
        if (typeof (options) === 'function') {
            callback = options;
        }
        //Full output path of the image file to be scaned.
        var output = path.resolve(Scan.options.imagesPath + Scan.options.imageName + Scan.options.imageExtension),
            command = 'scanimage --format ' + Scan.options.imageFormat + ' > ' + output;
        
        exec(command, function (error, stdout, stderr) {
            if (error) {
                callback(error, null);
                return;
            }
            
            callback(null, output);
        });
    }
};

module.exports.process = Scan.process;


