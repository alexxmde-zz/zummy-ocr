/*jslint node: true */
/*jslint nomen: true */
'use strict';

var tesseract = require('node-tesseract');
var fs = require('fs');
var path = require('path');

//Private Methods.
var createDirectoryIfNotExists = function (directoryPath, callback) {

    fs.exists(directoryPath, function (exists) {
        console.log(directoryPath);
        if (!exists) {
            console.log('directory doesnt exist');
            fs.mkdir(directoryPath, function (err) {
                console.log('creating directory');
                if (err) {
                    callback(err, null);
                    return;
                }
            });
        }
        
        callback();
        return;
    });
};

var ocr = {
    options:
        {
            textPath: __dirname + '/text/',
            textName: 'temporary',
            textExtension: '.txt',
            textFormat: 'txt'
        },

    
    process: function (imagePath, options, callback) {

        if (typeof (options) === 'function') {
            callback = options;
        }
        //Full output path of text file.
        var output = ocr.options.textPath + ocr.options.textName + ocr.options.textExtension;
        
        tesseract.process(imagePath, function (err, text) {
            if (err) {
                callback(err, null);
                return;
            }
            //Creates the text directory and writes the extracted text to file.
            createDirectoryIfNotExists(path.dirname(output), function () {
                fs.writeFile(output, text, function (err) {
                    if (err) {
                        callback(err, null);
                        return;
                    }
                    callback(null, output);
                    return;
                });
            });
        });
    }
    
};

module.exports.process = ocr.process;


