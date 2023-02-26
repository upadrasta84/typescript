console.log('hello world')

function add3(a:number, b) { //we have error if we use function name as add. files across same directory also cannot have same function name. for now modifying to add3 to prevent error
    console.log(a+b)
}

const va = add('2', '3'); 