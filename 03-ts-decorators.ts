//method decorators

class Post {

    @processOne()
    @processTwo('kart')
    someFunction() {}  //remember that decorators are for adding additional functionality to a function
    
    /*above was giving an error like 
Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.    
adding this file to tsconfig.json fixed  this error
*/
  }
  
  function processOne() {
    console.log("processOne has run");
    return function (target, propertyKey : string, descriptor : PropertyDescriptor) { //this signature is mandatory for method decorators
      console.log("processOne has been called");
    }
  }
  
  function processTwo(test: string) {
    console.log("processTwo has run", test);
    return function (target, propertyKey : string, descriptor : PropertyDescriptor) {
      console.log("processTwo has been called");
    }
  }
  
  // processOne has run
  // processTwo has run
  // processTwo has been called
  // processOne has been called

  /*
Even though none of the methods are called or the object instantiated for class Post, the code still runs
Thsi happens at run time and not at object creation time. 
  */

//------------------------------------------------------------------------------------------------------------------------

//Class decorators

@detailedLog('billing') //class decorators run as soon as the interpreter 'finds' that class but not when the object of that class is instantiated.
class AccountsPayable {
	constructor() {}
}

@detailedLog('warehouse')
class ProductManager {
	constructor() {}
}

function detailedLog(dashboard : string) {
	if(dashboard == 'billing') {
		console.log('Working in the billing department');
		return function (target : Object) {}; //this return is mandatory for class decorators
	} else {
		console.log('Working in the somethingelse department');
		return function (target : Object) {};
	}
}

//------------------------------------------------------------------------------------------------------------------------

//method and class decorators together
@detailedLog2('billing')
class AccountsPayable2 {
	constructor() {}

	@admin
	deleteAccount() {
		console.log('Deleting account...');
	}
}

function detailedLog2(dashboard : string) {
	if(dashboard == 'billing') {
		console.log('Working in the billing department');
		return function (target : Object) {};
	} else {
		return function (target : Object) {};
	}
}

function admin(target : Object, propertyKey : string, descriptor : TypedPropertyDescriptor<any>) : any {
	console.log("Doing admin check");
	return descriptor;
}

var post = new AccountsPayable2;
post.deleteAccount();

// Doing admin check --> method decorator runs first
// Working in the billing department --> class decorator runs next 
// Deleting account...

//------------------------------------------------------------------------------------------------------------------------
//Decorator factory. 
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@Logger('LOGGING - PERSON') //this is call to a decoratoe factor because we are not calling a function that returns a decorator.
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);

//------------------------------------------------------------------------------------------------------------------------

//below kind of WithTemplate kind of decorators are very common in Angular

function Logger2(logString: string) {
  console.log('LOGGER FACTORY');
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');
  return function(constructor: any) {
    console.log('Rendering template');
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  };
}

// @Logger('LOGGING - PERSON')
@Logger2('LOGGING')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person2 {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers2 = new Person2();

console.log(pers2);
//------------------------------------------------------------------------------------------------------------------------

//Property decorators

function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator!');
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator!');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

/*
There is a well defined order to how decorators applied to various declarations inside of a class are applied:

1. Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each instance member.
2. Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each static member.
3. Parameter Decorators are applied for the constructor.
4. Class Decorators are applied for the class.
*/

//------------------------------------------------------------------------------------------------------------------------

function f(key: string): any {
  console.log("evaluate: ", key);
  return function () {
    console.log("call: ", key);
  };
}

@f("Class Decorator")
class C {
  @f("Static Property")
  static prop?: number;

  @f("Static Method")
  static method(@f("Static Method Parameter") foo) {}

  constructor(@f("Constructor Parameter") foo) {}

  @f("Instance Method")
  method(@f("Instance Method Parameter") foo) {}

  @f("Instance Property")
  prop?: number;
}


/* output:
evaluate:  Instance Method
evaluate:  Instance Method Parameter
call:  Instance Method Parameter
call:  Instance Method
evaluate:  Instance Property
call:  Instance Property
evaluate:  Static Property
call:  Static Property
evaluate:  Static Method
evaluate:  Static Method Parameter
call:  Static Method Parameter
call:  Static Method
evaluate:  Class Decorator
evaluate:  Constructor Parameter
call:  Constructor Parameter
call:  Class Decorator

You may notice that the evaluation of instance property is later than the instance method, however the evaluation of static property is earlier than the static 
method. This is because the evaluation order of property/accessor/method decorators is depends on their order of appearance in code.
*/