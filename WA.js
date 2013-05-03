/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

"use strict";

// key: Uint8Array
// data: Uint8Array
var RC4 = (function () {
  var s = new Uint8Array(256);
  return function (key, data) {
    for (var i = 0; i < 256; ++i) {
      s[i] = i;
    }
    var j = 0;
    var keyLength = key.length;
    for (var i = 0; i < 256; ++i) {
      j = (j + s[i] + key[i % keyLength]) & 0xff;
      var x = s[i];
      s[i] = s[j];
      s[j] = x;
    }
    var dataLength = data.length;
    for (var y = 0; y < dataLength; ++y) {
      var i = (i + 1) & 0xff;
      var j = (j + s[i]) & 0xff;
      var x = s[i];
      s[i] = s[j];
      s[j] = x;
      data[y] ^= s[(s[i] + s[j]) & 0xff];
    }
    return data;
  };
})();

function print(s) {
  console.log(s);
}

var data = new Uint8Array([1,2,3]);
var key = new Uint8Array([4,5,6]);
print(data);
print(key);
RC4(key, data);
print(data);
RC4(key, data);
print(data);

