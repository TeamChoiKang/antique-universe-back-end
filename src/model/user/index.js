class User {
  constructor(userId, name, nickname, phone, age) {
    this.userId = userId;
    this.name = name;
    this.nickname = nickname;
    this.phone = phone;
    this.age = age;
  }

  toObject() {
    return {
      userId: this.userId,
      name: this.name,
      nickname: this.nickname,
      phone: this.phone,
      age: this.age,
    };
  }
}

module.exports = User;
