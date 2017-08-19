class Person {

  constructor(age) {
    this.age = age;
  }

}

class Member extends Person {

  constructor(age, firstName, lastName) {
    super(age);
    this.firstName;
    this.lastName;
  }

  getName() {
    return this.lastName + this.firstName + '(' + this.age + ')';
  }

  static getTriangle(base, height) {
    return base * height / 2;
  }

}

const m = new Member(10, 'A', 'B');

// Computed property names
{
  let i = 0;
  let member = {
    name: '山田太朗',
    birth: new Date(1970, 5, 25),
    ['memo' + ++i]: '正規会員',
    ['memo' + ++i]: '支部会員',
    ['memo' + ++i]: '関東'
  };
}
