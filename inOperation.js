// in演算子を使って、オブジェクトがプロパティを保持しているかを確認する
var myObject = {foo: 'value'};
console.assert('foo' in myObject);

// prototypeを辿ってプロパティの保持を確認する
console.assert('toString' in myObject);
