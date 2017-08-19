/* JavaScript は myArray.foo が存在しないことを確認後、
次に Array.prototype.foo を探す。
しかしこのプロパティも存在しないため、
次に Object.prototype.foo を探す。
これも存在しな いため、undefinedを返す。 */
var myArray = [];
console.assert(myArray.foo === undefined);

// myArray は配列オブジェクト
var myArray = ['foo', 'bar'];
console.assert(myArray.join() === 'foo,bar'); // 動作する
// しかし、myArray.join は実際には Array.prototype.join で定義されている

//myArray 自身は join プロ パティを持っていない
console.assert(myArray.hasOwnProperty('join') === false);

// myArray と Array.prototype は toLocaleString() メソッドを持っていない
var myArray = ['foo', 'bar'];
// toLocaleString() は Object.prototype.toLocaleString で定義されている
console.assert(myArray.toLocaleString() === 'foo,bar'); // 出力:'foo,bar'
