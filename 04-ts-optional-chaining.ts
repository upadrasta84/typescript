/*
The optional chaining operator (?.) enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.

The ?. operator is like the . chaining operator, except that instead of causing an error if a reference is nullish (null or undefined), the expression short-circuits with a return value of undefined. When used with function calls, it returns undefined if the given function does not exist.
*/

const adventurer = {
    name: 'Alice',
    cat: {
      name: 'Dinah'
    }
  };
  
  const dogName = adventurer.dog?.name;
  console.log(dogName);
  // expected output: undefined
  
  console.log(adventurer.someNonExistentMethod?.());
  // expected output: undefined

  
  //The nullish coalescing operator may be used after optional chaining in order to build a default value when none was found:



  const adventurer2 = {
    name: 'Alice',
    cat: {
      name: 'Dinah'
    }
  };
  
  const dogName2 = adventurer2.dog?.name;
  console.log(dogName);
  // expected output: undefined
  
  console.log(adventurer2.someNonExistentMethod?.());
  // expected output: undefined
  

//nullish coalescing operator:

const nullValue = null;
const emptyText = ""; // falsy
const someNumber = 42;

const valA = nullValue ?? "default for A";
const valB = emptyText ?? "default for B";
const valC = someNumber ?? 0;

console.log(valA); // "default for A"
console.log(valB); // "" (as the empty string is not null or undefined)
console.log(valC); // 42
