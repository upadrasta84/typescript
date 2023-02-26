
//Aliases - just another way to easily understand what the array is about.
//Type aliases allow you to create a new name for an existing type.


type PlayerArray = Array<string> //when you use 'type', we are using Alias. 
let players : PlayerArray = ["Karthik", "Guhan", "Seyon"]
console.log(players)

//It’s useful to create type aliases for union types. For example:

type alphanumeric = string | number;
let input: alphanumeric;
input = 100; // valid
input = 'Hi'; // valid
//input = false; // Compiler error

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
// Generics

//basically anytthing we see between < > are generics
function insertAtBeginning2(array: any[], value: any) { //here, the inferred type is 'any[]'. however, TS could do a bit more as below example in next section
    const newArray = [value, ...array];
    return newArray;
  }
  
  const demoArray1 = [1, 2, 3];
  
  const updatedArray1 = insertAtBeginning2(demoArray1, -1); // [-1, 1, 2, 3]


//simple generics:


  
//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

//generics - actual ones

//by doing something like the below, TS understands that it should look at the concrete values of the arguments. 
//we are telling that the type of the individual values of the 'array' and 'value' should be same and so should the return type of the function.
function insertAtBeginning<T>(array: T[], value: T) {  
  const newArray = [value, ...array]; 
  return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd'); //this is ok as well as they are all strings.
//const mixedArray = insertAtBeginning(['a', 'b', 'c'], -1); //this is not ok! cannot mix types

// updatedArray[0].split(''); //since updatedArray[0] is a type of number, we cannot do a split on it and TS inferred it as number array.

function merged<T,U>(obj1:T, obj2:U) { //if you hover over merged, you will see that TS inferred the return type rightly as 'T & U'
	return Object.assign(obj1, obj2)
} 

const merge1 = merged({},{})
const merge2 = merged({name1:'kar'}, {age:37} )
const merge3 = merged({name1:'kar', gen:'M'}, {age:37} )
console.log(merge3.age) //this is fine!

//the types of T and U are inferred at runtime during the actual function call.

//the above generic function merged is fine but it has a limitation that we can do below. however the 2nd parameter is not an object and the results can be confusing.
var merge4 = merged({},30) 


function merged1<T extends object,U extends object>(obj1:T, obj2:U) { 
	return Object.assign(obj1, obj2)
} 

//var merge4 = merged1({},30)  //now this is not ok as we are stating explicity that both our parameters must be of object types.

function merged2<T extends object,U extends number>(obj1:T, obj2:U) { 
	return Object.assign(obj1, obj2)
} 

var merge4 = merged2({},30) //now this is ok!

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
//another generics example with interface to enforce that only those elements which has length property such as string/array can be sent as a parameter
interface Lengthy {
	length: number;
  }
  
  function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
	let descriptionText = 'Got no value.';
	if (element.length === 1) {
	  descriptionText = 'Got 1 element.';
	} else if (element.length > 1) {
	  descriptionText = 'Got ' + element.length + ' elements.';
	}
	return [element, descriptionText];
  }
  
  console.log(countAndDescribe(['Sports', 'Cooking']));
  console.log(countAndDescribe('Sports'))

  //below is an example of generic function with 'keyof' usage. this ensures that the 2nd parameter must be a key of the first parameter

  function extractAndConvert<T extends object, U extends keyof T>(
	obj: T,
	key: U
  ) {
	return 'Value: ' + obj[key];
  }
  
  extractAndConvert({ name: 'Max' }, 'name');
  //extractAndConvert({ name2: 'Max' }, 'name'); //not ok as name is not a valid key
//extractAndConvert({ name: 'Max' }, 'name2'); //not ok as name2 is not a valid key  

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

class DataStorage<T extends string | number | boolean | object> {
	private data: T[] = [];
  
	addItem(item: T) {
	  this.data.push(item);
	}
  
	removeItem(item: T) {
	  if (this.data.indexOf(item) === -1) {
		return;
	  }
	  this.data.splice(this.data.indexOf(item), 1); // -1
	}
  
	getItems() {
	  return [...this.data];
	}
  }
  
  const textStorage = new DataStorage<string>();
  textStorage.addItem('Max');
  textStorage.addItem('Manu');
  textStorage.removeItem('Max');
  console.log(textStorage.getItems());
  
  const numberStorage = new DataStorage<number>();
  
   const objStorage = new DataStorage<object>();
   const maxObj = {name: 'Max'};
   objStorage.addItem(maxObj);
   objStorage.addItem({name: 'Manu'});
  
   objStorage.removeItem(maxObj);
   console.log(objStorage.getItems());

//Union types are useful in places where we are free to use any type. Generic types are useful where we want to lock in a specific type for that particular usage
//Generics however as seen in above examles can be used for multiple types at runtime, but only one type at a time!

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
//arrow functions
var fullName = (first, last) => {
	return first + " " + last;
}
console.log(fullName('Jordan', 'Hudgens')); 

console.log(fullName2('Jordan', 'Hudgens')); //even though fullName2 is not yet defined at this stage (defined below but not above), JS performs something called
//JS hoisting to move the function above when running it. 

// Function declaration
function fullName2(first : string, last : string) : string {
	return first + " " + last;
}


// console.log(otherFullName('Jordan', 'Hudgens')); //we cannot call functions declared as expressions before declaration. They have to be defined before getting called.

// Function expression
var otherFullName : (first : string, last : string) => string;


otherFullName = function (first : string, last : string) {
	return first + " " + last;	
}

var thirdFullName : (first : string, last : string) => string = function (first : string, last : string) {
	return first + " " + last;	
}

console.log(otherFullName('Jordan', 'Hudgens'));
console.log(thirdFullName('Jordan', 'Hudgens'));

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-


// Immediately invoked version - when interpreter comes to below line, it gets invoked immediately
//below one is with arguments - Tiffany and Hudgens
(function(first : string, last : string) {
	console.log(first + " " + last);	
})('Tiffany', 'Hudgens');

//Because our application could include many functions and global variables from different source files, it's important to limit the number of global variables. 
//If we have some initiation code that we don't need to use again, we could use the IIFE pattern. As we will not reuse the code again, 
//using IIFE in this case is better than using a function declaration or a function expression.

(function () {
    // some initiation code
    let firstVariable;
    let secondVariable;
  })();
  
// firstVariable and secondVariable will be discarded after the function is executed.

/*
Immediately invoked function expressions can be used to avoid variable hoisting from within blocks, protect against polluting the global environment and 
simultaneously allow public access to methods while retaining privacy for variables defined within the function.

Variables declared with var are lexically scoped at a function level, while ones with let or const have a block level scope. Since declarations are processed before 
any code is executed, a variable can be assigned to and used prior to being declared in the code. This is referred to as hoisting, and it is equivalent to variables 
being forward declared at the top of the function or block.

With var, let, and const statements, only the declaration is hoisted; assignments are not hoisted. Thus a var x = 1 statement in the middle of the function is equivalent 
to a var x declaration statement at the top of the function, and an x = 1 assignment statement at that point in the middle of the function. This means that values cannot 
be accessed before they are declared; forward reference is not possible. With var a variable's value is undefined until it is initialized. Variables declared with let or 
const cannot be accessed until they have been initialized, so referencing such variables before will cause an error.
*/

var names : string[] = ['Jordan', 'Tiffany', 'Kristine'];
var counter : number = 0;

(function() {
	for (let name in names) {
		counter++;
	}
})();

console.log(counter);


{
	let age = 37
}
//console.log(age) //not ok as let is block scoped. even simple curly braces like above are sufficient to create block


{
	var age = 37
}
console.log(age) //with var, this is justttt ok!

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

// functions have access to any public variables in the outer scope

function nameFunction2(name: string) : void {
	var n : string = name;

	function printName() {
		console.log(n);
	}

	printName();
}

nameFunction2('Jordan');

//The inner function maintain access to the outer scope even AFTER the values are returned!

function nameFunction(name: string) {
	var n : string = name;

	return function() {
		console.log(n);
	}
}

var nameAgain = nameFunction('Tiffany');
nameAgain();


function lineup() {
	var nowBatting : number = 1;

	return {
		nextBatter() { nowBatting++ },
		currentBatter() { return nowBatting }
	}
}

let batters = lineup();

console.log(batters.currentBatter());
batters.nextBatter();
console.log(batters.currentBatter());
batters.nextBatter();
console.log(batters.currentBatter());

let pitchers = lineup();
console.log(pitchers.currentBatter());

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
class Invoice {
	total : number;

	constructor(total : number) {
		this.total = total;
	}

	printTotal() {
		console.log(this.total);
	}

	printLater(time : number) {
		setTimeout(function() {
			console.log(this.total); //will print undefined. We cannot use 'this' inside nested functions. 'this' tells the function to look in the 'functions context' 
		}, time);
	}

	printLater2(time : number) {
		setTimeout(() => {
			console.log(this.total); //to fix the above, we can use arrow functions and it will work fine.
		}, time);
	}
}

var invoice = new Invoice(400);
invoice.printTotal();
invoice.printLater(1000);
invoice.printLater2(1000);



//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
//we have this concept in node also - look at 04_advanced_callback.js in the node project
// Higher-order functions are functions that work on other functions, meaning that they take one or more functions as an argument and can also return a function.

var dbQuery = function() : number { //callback function. See here that we are returning number from dbQuery. however as a callback it is expecting to return void in loadPage. This is ok because what we are saying in the loadPage is that though the callback function is going to return a value, we will not be using that value at all. however, parameter types and number of parameters have to match exactly for callbacks.
	setTimeout(() => {
		console.log('Query results');
	}, 3000);
	return 30;
}

function loadPage(q : () => void) { //higher order function using callback function as an argument
	console.log("Header");
	q(); //will be asynchronous
	console.log("Sidebar");
	console.log("Footer");
}

loadPage(dbQuery); 

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

//namespaes are used to organize codes with same class names so that 2 developers working on same class but different intent can create their own namespaces and 
//work within that space without impacting the other developers

namespace Blog {
	export interface IPost {
	  title: string;
	  body: string;
	}

	export class Post implements IPost {
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
}

namespace Content {
	export interface IPost {
	  title: string;
	  body: string;
	  slug: string;
	  seoKeywords: string;
	}

	export class Post implements IPost {
	  title: string;
	  body: string;
	  slug: string;
	  seoKeywords: string;

	  constructor(post: IPost) {
	    this.title = post.title;
	    this.body = post.body;
	    this.slug = post.slug;
	    this.seoKeywords = post.seoKeywords;
	  }

	  printPost() {
	  	console.log(this.title);
	  	console.log(this.body);
	  	console.log(this.slug);
	  	console.log(this.seoKeywords);
	  }
	}
}


var blogPost = new Blog.Post({
	title: "My Great Post",
	body: "Some content"
});

blogPost.printPost();

var contentPost = new Content.Post({
	title: "My Great Post",
	body: "Some content",
	slug: 'my-great-post',
	seoKeywords: 'any, words'
});

contentPost.printPost();



//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

//intersection types

type Admin = {
	name: string;
	privileges: string[];
  };
  
  type Employee = {
	name: string;
	startDate: Date;
  };
  
  // interface ElevatedEmployee extends Employee, Admin {}
  
  type ElevatedEmployee = Admin & Employee;
  
  const e1: ElevatedEmployee = {
	name: 'Max',
	privileges: ['create-server'],
	startDate: new Date()
  };
  



//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
//type guards

type UnknownEmployee = Employee | Admin; //this kind of union is called Discriminating unions

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);
  if ('privileges' in emp) { //we need to use this way as at runtime we dont know whether UnknownEmployee is Employee or Admin and depending on type, privileges might not be a valid property on that object.
    console.log('Privileges: ' + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate);
  }
  

}

printEmployeeInformation({ name: 'Manu', startDate: new Date() });

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
  type Combinable = string | number;
  type Numeric = number | boolean;
  
  type Universal = Combinable & Numeric;



  function add(a: string, b: string) : string //function overloads
  function add(a: number, b: number) : number //function overloads 
  function add(a: Combinable, b: Combinable) {
		if (typeof a === 'string' || typeof b === 'string') {
	  return a.toString() + b.toString();
	}
	return a + b;
  }
  
  const var1  = add(1,1)
  const var2 = add('mystr', 'mystr')
  var2.split(' ') //without function overloads, we couldnt have done this as TS wouldnt know whether var2 is a Combinable or a string



//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-


//usage of instanceof. we can use it with classes only. we cannot use it in above examples as they are not classes but are Type (UnknownEmployee example)
//instanceof does not work with interfaces either
class Car {
	drive() {
	  console.log('Driving...');
	}
  }
  
  class Truck {
	drive() {
	  console.log('Driving a truck...');
	}
  
	loadCargo(amount: number) {
	  console.log('Loading cargo ...' + amount);
	}
  }
  
  type Vehicle = Car | Truck;
  
  const v1 = new Car();
  const v2 = new Truck();
  
  function useVehicle(vehicle: Vehicle) {
	vehicle.drive();
	if (vehicle instanceof Truck) {
	  vehicle.loadCargo(1000);
	}
  }
  
  useVehicle(v1);
  useVehicle(v2);
  
//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

//more discriminating unions
interface Bird {
	type: 'bird';
	flyingSpeed: number;
  }
  
  interface Horse {
	type: 'horse';
	runningSpeed: number;
  }
  
  type Animal = Bird | Horse;
  
  function moveAnimal(animal: Animal) {
	let speed;
	switch (animal.type) {
	  case 'bird':
		speed = animal.flyingSpeed;
		break;
	  case 'horse':
		speed = animal.runningSpeed;
	}
	console.log('Moving at speed: ' + speed);
  }
  
  moveAnimal({type: 'bird', flyingSpeed: 10});

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

  
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!; //the exclamation at the end is the developer guaranteeing TS that the value will not be null
//the above method of typecasting is fine. but this may not work in React projects. For react support, we use below alternative
const userInputElement2 = document.getElementById('user-input');

if (userInputElement2) {
  (userInputElement2 as HTMLInputElement).value = 'Hi there!';
}

const userInputElement3 = document.getElementById('user-input') as HTMLInputElement;


//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
//indexed types - used with interfaces generally

interface States {
    [state: string]: boolean;//indexer
}

let s: States = {'enabled': true, 'maximized':false};
console.log(s);
console.log(s['maximized']);


//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
/*
we could import javascript libraries using npm and use them with TS but we will get compiler errors. To avoid errors, we can use 'noEmitOnErrors' to false 
in tsconfig file. However we will see compiler errors but a js file will be emitted and we will get right outputs but its a workaround way of using them.

For this, there is something called 'types' of a library such as lodash. Using those will act as a bridge between the js libraries and ts libraries.
They contain some .d.ts files which are called 'definitely typed' files. 

the 'd.ts' files themselves are coming form another 3rd party git repository called 'definitely typed' and are available for most popular js libraries.

*/


//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
/*

if we need to use some variable defined in an html file or another js file in ts file, then when we try to use it and ts doesnt know about it,
then it will throw compiler errors. To avoid that, when we know that a variable definitely is defined somewhere and we definitely need to use it,
then we can use it as below:
*/

declare var GLOBAL_IN_ANOTHER_FILE : any;

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-


