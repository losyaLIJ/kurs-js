'use strict';

const filterText = function(text){
    if(typeof(text) != "string"){
        return "Переданный параметр не является строкой";
    }
    const clearText = text.trim();
    if(clearText.length > 30){
        return clearText.slice(0, 30) + "...";
    } else {
        return clearText;
    }
}