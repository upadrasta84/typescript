//promises need the latest version of es6. so when compiling TS, use target as es6 instead of ES5 inside tsconfig.json
//to compile this file, use 'npx tsc ts-more-advanced.ts --target es6'

"use strict";

// Start mowing -> Pending
// Complete mowing process -> Resolve
// Did not complete mowing process -> Reject

/*
A promise is a TypeScript object which is used to write asynchronous programs. A promise is always a better choice when it comes to managing multiple 
asynchronous operations, error handling and better code readability.

A promise is a placeholder for a future value.


In TypeScript, promise type takes an inner function, which further accepts resolve and rejects as parameters. Promise accepts a callback function as 
parameters, and in turn, the callback function accepts two other parameters, resolve and reject. If the condition is true, then resolve is returned; else, returns reject.
*/

let performUpload = function(imgStatus : string) : Promise<{imgStatus : string}> { //this method will return a Promise, which will contain a status.
	return new Promise((resolve) => { //notice that resolve is a parameter to the method here
		console.log(`Status: ${imgStatus}`);
		setTimeout(() => {
			resolve({ imgStatus: imgStatus }); //note that resolve is a parameter as per above, but we are calling it as a function similar to callback
		}, 1000);
	});
}

var upload;
var compress;
var transfer;

//We can attach multiple then handlers with Promise, this is known as chaining:
performUpload('uploading...')
.then((res) => {
	upload = res;
    console.log(upload)
	return performUpload('compressing...');
})
.then((res) => {
	compress = res;
    console.log(compress)
	return performUpload('transferring...');
})
.then((res) => {
	transfer = res;
    console.log(transfer)
	return performUpload('Image upload completed.');
});


//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-
//Promises are a replacement for callbacks. Callbacks are not flexible.

function asyncMethod(callBack) {
    setTimeout(() => {
      console.log("Async Callback");
      callBack();
    }, 1500);
  }
  
  asyncMethod(() => console.log("Async Callback Completed"));


//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

/*
A promise accepts callback function as a parameter.
Callback function accepts 2 parameter resolve and reject.
If condition is true then it returns resolve else it returns the reject.

pending	- This state refers to the first state when the promise is neither fulfilled nor rejected.
fulfilled - As the name suggested when the promise operation executed successfully.
rejected - This state refers to the state when the promise operation is failed.

*/

var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Async is done!");
      resolve('res');
    }, 1500);
});

function asyncAction()  {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Async is done2!");
        resolve('res2');
      }, 1500);
    });
    return promise;
  }

var test  = asyncAction()
test.then(() => {
    console.log('asyncAction is completed')
})

  console.log('asyncAction() is ', test)
  console.log('asyncAction() is ', test)

//-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

