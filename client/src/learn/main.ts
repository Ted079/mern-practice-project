// function and type
function getAge(name?: string):number{
    return 25;
};

const getAge2 = (name?: string):number => 25;


type TypeChannelReturn = {
    name: string,
};

function getChannel (name: string): TypeChannelReturn{
    return {name};
}

type TypeChannelFunc = (name: string) => TypeChannelReturn;

const getChannel2:TypeChannelFunc = (name) => {
    return {name};
} 


//========================/
// REST operators /

const rest = (...args: number[]) => {
    return args
};

const getFullName = (firstName: string, ...names: string[]) => {
    return firstName + "" + names.join(" ");
}; 
// Rauf Seydaliyev Imamovich

//========================/
// Функциональные перегрузки - это когда мы указываем сигнатуру функции до его вызова(до его реализации чтобы мы могли принимать его функции к примеру разные аргументы )  /

// вот так она работает
//1
function getCar(name: string): string;
function getCar(name: string, price: number): string;   // мы создаем фунцию (сигнатуру функции)

function getCar(name: string, price?: number): string{  // потом реализуем фунцию
   return price ? `Название машины и цена: ${name} ${price}` : `Название машины: ${name}`
};

getCar("mercedes");
getCar("mercedes", 120000);

//2

function getInfo(name: string): string;
function getInfo(age: number): number;
function getInfo(isMarried: boolean): boolean;

function getInfo(value: any): any {
    return value;
};

const result = getInfo("Kate");
const result1 = getInfo(21);
const result3 = getInfo(false);







