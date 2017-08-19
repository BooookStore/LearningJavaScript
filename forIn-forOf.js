let cody = {
  age: 33,
  gender: 'male'
};

for (var key in cody) { // keyはループ内でそれぞれのプロパティ名を格納する変数
  // プロトタイプチェーンから継承されたプロパティを除く
  if (cody.hasOwnProperty(key)) {
    console.log(cody[key]);
  }
}
