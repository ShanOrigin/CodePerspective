const obj = {
  name: {
    firstName: 'Shantanu',
    middleName: 'Manik',
    lastName: 'Suryawanshi'
  },
  wife: {
    fristWife: 'Queen Medusa',
    secondWife: 'ya fe'
  }
};

console.log(obj);

const upadated = {
  ...obj,
  wife: {
    ...obj.wife,
    secondWife: 'Yun Yun',
    thirdWife: 'ya fe'
  },
  childs: {
    'Queen Medusa': 'xian xian'
  }
};

console.log(upadated);
console.log(obj);
