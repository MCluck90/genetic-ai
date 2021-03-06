'use strict';
let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

let randWord = function(length){
    let word = "";
    for(let i = 0; i < length; ++i){
        word += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return word;
}

let randChar = function(){
    return possible.charAt(Math.floor(Math.random() * possible.length));
}

module.exports.word = randWord;
module.exports.char = randChar;
