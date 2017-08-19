// 空のオブジェクト
let obj = new Object();

// オブジェクトリテラルで空のオブジェクトを生成
let obj2 = {};

Object.prototype.foo = 'foo';
let str = 'sample string';

console.assert(str.foo === 'foo');
