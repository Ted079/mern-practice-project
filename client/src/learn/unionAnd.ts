// объединение - Union
console.log("it's typescript");

type MainInfo = {
  name: string;
  lastname: string;
};

type AdditionalInfo = {
  age: number;
};

type FullInfo = AdditionalInfo & MainInfo;

const info0: FullInfo = { name: "Rauf", lastname: "RS", age: 23 };
// const info1: FullInfo = { name: "Rauf", lastname: "RS" }
// const info2: FullInfo = { age: 23 }

if ("name" in info0) {
  console.log(info0.name);
}

console.log(info0);
console.log(info0.age);

// =================================
// SubType and SuperType
type SuperType = {
  name: string;
};

type SubType = {
  name: string;
  age: number;
};

// как наследование в ооп

const subType: SubType = { name: "rs", age: 22 };
const superType: SuperType = subType;
// supType можно присвоить к superType

// но обратно нельзяяя, т.е если присвоить superType к subType будет ошибка

console.log(subType);
console.log(superType);
