/*jslint node: true */
'use strict';

var scan = require('./Scan');
var ocr = require('./OCR');

scan.process(function (err, imagePath) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('image extracted to: ' + imagePath);
    ocr.process(imagePath, function (err, txtPath) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('text extracted to: ' + txtPath);
        return;
    });
});
