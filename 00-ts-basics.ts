// Primitives: number, string, boolean, any
// More complex types: arrays, objects, 
//others: void, tuple, enum

// Function types, parameters

//Operators - +, -, *, / , %, ++, --

//features of typescript are compiled to 'javascript' workarounds. It also adds next-gen JS features, which can be compiled down to older browsers also
//JS has no compilation step but at runtime, you can check for certain types (e.g. in if conditions). TS on the other hand allows you to catch certain 
//errors during development since it checks types during compilation as well.


//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
// Primitives

//var declaration is function scoped and let declaration is block scoped.
// demo: var
for(var i =0 ; i<5 ; i++){
    console.log(i) 
 }//finally i =5
 console.log(i) // i=5
 
 // demo: let 
 for(let ii = 0; ii<5;ii++){
    console.log(ii)
 }
 //console.log(ii)// ii is undefined


//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
//lastly, with var, we can declare a variable twice with same name but with let we cannot. this, for some reason, come in more handy in angular development


var ka : string = 'test'
var ka  = '1'

let ka2: string = 'test'
//let ka2 = '1' //cannot redeclare block-scoped variable is the error that will be returned here


const abc = '1'

//abc = '2' //not ok as abc is a constant.



 //-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

let age: number; //variable declaration - Number with upper case N will also work but we usually use lower case primitive type. Number is object type in normal JS

age = 12;

age = 13; //ok

//age = '13' //not ok 
//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

let userName: string | string[]; //similary String can be used but string needs to be used as in Number vs number.

userName = 'Max';

let isInstructor: boolean;

isInstructor = true;

// More complex types

let hobbies: string[];

hobbies = ['Sports', 'Cooking'];

var ages : number[] = [1,2,3] //numbers array

let player : [number, string] //Tuple
player = [3, 'Kart'] 

let player2 : [number, string, string] //Tuple
// player2 = [3, 'Kart'] //error, third value is missing
player2 = [37, 'Kar', 'Upa'] //ok now
player.push('blah') //this is also possible strangely

enum ApproveStates  {Approved,Pending,Rejected}; //internally Approved = 0, Pending = 1, Rejected = 2
enum ApproveStates2  {Approved=10,Pending=20,Rejected=30}; //we can also assign our own identifiers
enum ApproveStates3  {Approved='APPROVED',Pending='PEND',Rejected=30}; //this is also ok
let jobState : ApproveStates = ApproveStates.Approved;
let jobState2: ApproveStates

if(jobState2 === ApproveStates.Pending) {
  console.log('Pending state')
}

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

//conditionals

let x = 3
if(x == 1) {
    console.log('x is 1')
} else if(x == 2) {
    console.log('x is 2')
} else {
    console.log('x is something else')
}

if((x == 1 || x==2 || x==0 || x==3) && (x!=0) && !(x==3)) { //dumb condition but only for sake of demo - conditional unions ||, &&, !
    console.log('x is 1')
}

//conditional operators -  !=, ==, ===, <. <=, >, >=

//triple equals ( === ) will do the same comparison as double equals (including the special handling for NaN , -0 , and +0 ) but without type 
//conversion; if the types differ, false is returned.


//below examples not ok as we are comparing number to string
/*
if(x == "3") {
    console.log('x is 3') //in JS, this results true
}

if(x === "3") {
    console.log('x is 3') //in JS, this results false as types are not same
}
*/

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
//loops

 var x1 : number = 0;

while (x1 < 10) {
 	console.log(x1);
 	x1++;
}

let players2 : number[] = [3, 10, 4, 5, 1];

// for in
console.log("For/In"); 
for (let player in players2) { //for in iterates over the index
	console.log(player); //we get 0 1 2 3 4 with this
}

// for of
console.log("For/Of");
for (let player of players2) { //for of iterates over the values
	console.log(player); //we get 3 10 4 5 1
}


//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-


let karthik; //this is ok even without a type. TS will assign it to type 'any' and is forgiving that way but that defeats the purpose of TS

//we can then assign anything to the above variable
karthik={
  age: 37,
  lastname: 'Upadrasta',
};


//we can use the above like this:

let karthik2: {
  age: number,
  lastname: string,
} = {age: 37, lastname: 'UP'};

//and then do:
karthik2={
  age: 37,
  lastname: 'Upadrasta',
};

/*
doing below will result in error because of 'age2' instead of age.
karthik2={
  age2: 37,
  lastname: 'Upadrasta',
};
*/


//we can also have 'unknown' type similar to any. however, unknown is a bit more restrictive than any.

let numorstr : unknown
numorstr = 4
numorstr = 'str'

let str : string
//str = numorstr //this will result in error

if(typeof numorstr == 'string') { //this is ok. this way, unknown is a bit better than any.
  str = numorstr;
}
console.log('str ', str);

let numorstr2 : any;
numorstr2 = 'str';
str = numorstr2 //above is not ok for unknown but for any it is ok
numorstr2 = 4;
str = numorstr2
console.log('str ', str);


//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

//but right way to use objects is as below
type Person = {
  name: string;
  age: number;
};

let person: Person;

person = {
  name: 'Max',
  age: 32,
};

//creating the object's blueprint will allow us to stop some incorrect usage like the below.
// person = {
//   isEmployee: true
// };

//to create multiple persons or people object we could do:
type people= {
    name: string;
    age: number;
  }[]; //notice this is an array of objects
  
//or we could do this also instead of the above
let people: Person[];


//we can also create an object without declaring a class this way:
var realUser = {
	email: 'test@test.com',
	firstName: 'Jordan',
	lastName: 'Hudgens',
	sayHi() { //no need to say 'function sayHi()' inside objects
		return "Hey there!";
	}
};

console.log(realUser.email);
console.log(realUser.firstName);
console.log(realUser.lastName);
console.log(realUser.sayHi());


//object can also be done as below:

const person4: object = {
  name: 'kar',
  age: 37
}

//console.log(person4.name); //the above object does have name but while TS recognizes person4 as object, it will not be aware of the members of such object

//declaring the object like below is a better way to do that.
const person5: {
  name: string;
  age: number;
} = {
  name: 'kar',
  age: 37
}

console.log(person5.age) //no problem now

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

// Type inference

//we could do this:
let course1 = 'my test course'; //here ts will 'infer' the type as string automatically. 

//doing
//course1 = 12; //will result in an error as course is inferred as a String. however, JS power comes with the fact we can assign anything and sometimes thats what we want
//to allow that TS allows us to do something like the below doing which we can have both number and string values assigned to course variable.

let course: string | number = 'React - The Complete Guide'; //this is called 'Union type' .. we can have as many types as we need

course = 12341;

export type TestWF = 
 | "LOADING"
 | "REGISTRATION"
 | "LOGIN";

let myvar :TestWF = "LOADING"; //As we initialize the value to LOADING, the IDE shows what values are acceptable. 
//let myvar2 :TestWF = "LOAD"; //Assigning a different value which is not in the list will result in error

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

// Functions & types

function addNumbers(a: number, b: number) { //by hovering over the function name, addNumbers, we can see the type that TS infers as the 'return' type, in this case - number
  return a + b;
}

//so right way is as below. If we leave out the return, then TS will complain that a 'number' has to be returned
function addNumbers2(a: number, b: number): number {  
    return a + b;
  }

  //we can also have 'union' types as return 
  function addNumbers3(a: number, b: number): number|boolean|string { 
    return a + b;
  }  

  function printOutput(value: any) { //functions like this that do not return anything have an inferred type of 'void'. this cannot be 'undefined'
    console.log(value);
  }

  function printOutput33(value: any) :any { //with no return type, any/void is acceptable.
    console.log(value);
  }
    
function printOutput4(value: any) : undefined { //functions like this that do not return anything but have a return can be 'void' or 'undefined'
  console.log(value);
  return;
}

function printOutput2(value?: any) { //here, the value argument is optional
    if(value) {
        console.log(value);
    } else {
        console.log('dummy')
    }
}
  
 printOutput2('test')
 printOutput2()
 
 /* Optional and required arguments
 function printOutput3(value?: any, value2: string) { //required parameter of value2 CANNOT come after an optional argument.
    console.log(value);
  }
*/
//however, we can have a variable that has a default value AFTER an optional argument.
function printOutput3(value?: any, zip= 411014) { //note that we have '=' to set default value and not ':'
    if(value) {
        console.log(value);
    } else {
        console.log('dummy')
    }
}
//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

/*A rest parameter allows you a function to accept zero or more arguments of the specified type. 
In TypeScript, rest parameters follow these rules: A function has only one rest parameter. The rest parameter appears last in the parameter list. 
The type of the rest parameter is an array type. In the below, the ...players is a rest parameter
*/
function lineupCard(team: string, ...players: string[]) { //this ... is called spread operator
	console.log('Team: ' + team);
	for (let player of players) {
		console.log(player);
	}
}

lineupCard('Astros', 'Altuve', 'Correra', 'Bregman'); //the 2nd argument onwards are converted to an array.
//lineupCard('Astros', ['Altuve', 'Correra', 'Bregman']);  //cannot do this.. let TS do some work!

const hobbies1 = ['sports', 'cooking']
const activeHobbies = ['cycling', ...hobbies1]

//activeHobbies.push(hobbies1) //this is not ok
activeHobbies.push(...hobbies1)  //but this is ok

const myPerson = {
  name: 'Kar', age:37
}


const anotherPerson = myPerson //this will be a pointer to myPerson but not a 'copy'

const anotherPerson1 = {...myPerson} //this will create a copy of myPerson.

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
//object destructuring

const mynumbers = [123,435,654]
const [mynum1, mynum2, ...myremainingNums] = mynumbers // this will cause mynum1 to have 123, 2nd one to have 435, and  remining numbers to have 645 and anything else if additional elements exist 

const[mynum3] = mynumbers //mynum3 = 123

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
//we can also have abstract classes
//we can extend interfaces
//class can implement multiple interfaces
//interfaces can extend multiple interfaces
//classes cannot extend from multilpe classes but can extend from only one other class
//we can also have static methods and properties
//we 



class Student {
  // firstName: string; //even these type of declarations are valid but redundant if they are defined in the constructor also.
  // lastName: string;
  // age: number;
  // private courses: string[];

  //instead of declaring members, we can show our intentions by putting them directly in the constructor. 
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number,
    private  courses: string[],
    private readonly gender: string,
     protected middleName: string = 'Bablu' //protected usage is similar to java
  ) {
//this.firstName = firstName;
//this.lastName = lastName; // and so on are not needed because of this kind of shorthand notation of constructor.

  }

  enrol(courseName: string) {
    this.courses.push(courseName);
    //this.gender = 'Female' //cannot do this as gender is readonly.
  }

  listCourses() {
    return this.courses.slice();
  }
}

const student = new Student('Max', 'Schwarz', 32, ['Angular'], 'Male');
//const student2 = new Student( 'Schwarz', 32, ['Angular']); //one argument is missing so this will not work!

student.enrol('React'); //ok to call the method

 student.listCourses(); //ok to call as well.

// student.courses => Angular, React //we cannot do this as this is a private member variable!

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
//String interpolation
var kr = 'karthik'
console.log('hello '+kr);
console.log(`hello ${kr}`); //this is String interpolation and is exactly same as the above. Notice these are back quotes above 'tab' key but not single quotes


//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

interface Human { //interfaces will not be output to JS when compiled. it is just for developers' usage
  firstName: string;
  readonly age: number; //now classes which implement this interface will also have age as readonly
  //private lastName: string; //not allowed
  //public lastName: string; //not allowed

  greet: () => void;
} //we cannot have private/public members but we can have readonly members


let max: Human; //this can be done similar to 'Person' above as a 'type' instead of interface.

max = {
  firstName: 'Max',
  age: 32,
  greet() {
    console.log('Hello!');
  },
};


//with interfaces, you can have the class implement it and fulfil the interface's contract. 
class Instructor implements Human {
  firstName: string;
  age: number;
  greet() {
    console.log('Hello!!!!');
  }
}
//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

//below is an example of another interface, without any functions but just members. We can use it directly without creating a class:
interface User {
	email : string;
	firstName? : string;
	lastName? : string;
}

function profile(user: User) : string {
	return `Welcome, ${user.email}`;
}

var realUser2 = {
	email: 'test@test.com'
};

console.log(profile(realUser2));

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
//or we can have interface to just implement a method contract
interface InvoiceFunc {
	(name : string, total : number) : void;
}

let myInvoice : InvoiceFunc;
myInvoice = function(n, t) {
	console.log(n);
	console.log(t);
}

myInvoice('Google', 500);
//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-


class Report {
	companyProfile : string;

	constructor(public name : string) {
		this.companyProfile = name;
	}
}

class Invoice extends Report {
  constructor(public name : string, public total : number) { super(name); }

  printInvoice() {
  	return this.name + ", " + this.total;
  } 
}

class BillOfLading extends Report {
	constructor(public name : string, public city : string, public state : string) { super(name); }

	printBol() {
  	return this.name + ", " + this.city + ", " + this.state;
  } 
}

var invoice = new Invoice('Google', 200);
var bol = new BillOfLading('Google', 'Scottsdale', 'AZ');

console.log(invoice.printInvoice());
console.log(bol.printBol());


//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-


// Loosely connected Interface with Class
interface User {
	email: string;
	firstName? : string;
	lastName? : string;
}

class Admin { //we are not implementing the interface and hence loosely connected
	role : string;
	constructor(public email : string) {
		this.role = 'Admin';
	}
}

function profile2(user: User) : string {
	return `Welcome, ${user.email}`;
}

var joe = new Admin('joe@example.com');
console.log(joe.role);

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

// Direct implementation
interface IPost {
	title: string;
	body: string;
}

class Post implements IPost {
	title: string;
	body: string;

	constructor(post: IPost) {
		this.title = post.title;
		this.body = post.body;
	}

	printPost() {
		console.log(this.title);
		console.log(this.body);
	}
}

var post = new Post({ title: "My Great Title", body: "Some content"});
console.log(post.title);
console.log(post.body);
post.printPost();



//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

//map functions

const familyNames = ["Jordan", "Tiffany", "Kristine"];

// let capitalizedNames: string[] = [];

// for (var i = 0; i < familyNames.length; i++) {
//     capitalizedNames.push(familyNames[i].toUpperCase())
// }

// console.log(capitalizedNames)

const capitalizedNames = familyNames.map((name: string) => (name.toUpperCase())) //implicit return
//const capitalizedNames3 = familyNames.map((name: string) => {name.toUpperCase()}) //same as above but uses curly brases instead of parenthesis but this gives 
//error as curly braces expect a return statement whereas parenthesis means implicit return
const capitalizedNames3 = familyNames.map((name: string) => {return name.toUpperCase()}) //explicit return


const capitalizedNames2 = familyNames.map((name: string) => { //with explicit return, we can do a little bit more to the iterated values as below
    if (name === "Tiffany") {
        return name.toUpperCase()
    } else {
        return name.toLowerCase()
    }
})

console.log(capitalizedNames2)

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
function combine(
  input1: number | string,
  input2: number | string,
  resultConversion: 'as-number' | 'as-text' //these are not union types but are called 'literal-types'
) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') { 
    result = +input1 + +input2; //the + before the input will force TS to convert it to a 'number' type
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;

  //passing the 3rd parameter to this function as 'literal-type' avoids the below code. 

  // if (resultConversion === 'as-number') {
  //   return +result; //this + converts the return value to a number
  // } else {
  //   return result.toString();
  // }
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);
//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
//we can have a variable of type function also

function addme(var1: number, var2: number) {
  return var1+var2
}


let combineValues2 
combineValues2 = addme
console.log(combineValues2(1,2)) //3

combineValues2 = 2 //this is ok to do.. 

//to avoid that, we can declare variable type as a Function
let combineValues: Function
combineValues = addme
console.log(combineValues(1,2)) //3

//combineValues = 3 //this is not allowed now


//however, declaring variable as just function can still result in issues:

function addme2(var1: number) :void {
  console.log(var1)
}

combineValues = addme2 //this is ok as addme2 is still a problem
console.log(combineValues(1,2)) //this is still ok though addme2 takes only 1 argument and we will get unintended results now.

//to avoid, we can use 'function types' as below:
let newType2 : (a: number) => void;  //newType is now of type function which takes a single 'number' argument and returns void

newType2 = addme2 //this is ok as addme2 takes a number and returns void
//newType = addme //this is not ok  as addme takes 2 parameters

let newType : (a: number, b: number) => number; 
newType = addme

//we can also have interfaces as function types. Below we have anonymous function in interface but TS understands it and makes us stick to the contract when implementing such an interface
interface AddFn {
  (a: number, b: number): number; //anonymous function
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};



//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

//we can also have never type. it is typically used for generic functions that are used JUST to throw errors

function generateError(errorMsg: string) : never { //this means that this method will NEVER return any value
  throw { message: errorMsg}
}


//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
