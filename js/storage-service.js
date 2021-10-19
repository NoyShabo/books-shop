'use strict';

function loadFromStorage(key) {
    var jsonString = localStorage.getItem(key);
    return JSON.parse(jsonString);
}

function saveToStorage(key, val) {
    var stringJson = JSON.stringify(val);
    localStorage.setItem(key, stringJson);
}