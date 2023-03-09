console.log('CALLBACK FUNCTIONS');

// //function declaration
// function sumargs(...args){
//     let sum = 0;
//     for(let i = 0; i < args.length; i++)
//     {
//         sum = sum + args[i];
//         //console.log(sum);
//     }
//     return sum;
// }


//function expression
const sumargs = function(...args){
    let sum = 0;
    for(let i = 0; i < arguments.length; i++)
    {
        sum = sum + args[i];
        //console.log(sum);
    }
    return sum;
}

let mysum, mysum1, mysum2;
mysum1 = [20, 15, 70, 30, 16, 98];

mysum2 = [25, 36, 70, 30, 16, 78, 100, 50, 65];

//apply is used to pass array name as an argument
mysum = sumargs.apply(null,mysum1);

console.log(mysum);

const myCallbackfunction = function(a, b){

    console.log(`The sum of ${a} and ${b} is ${a+b}.`);
}

myCallbackfunction(sumargs.apply(null,mysum1), sumargs.apply(null,mysum2));


//eg 2
//callBack and forEach
let people = ['King', 'Frank', 'Luis', 'Green', 'Henry', 'Joy', 'Ruth'];

people.forEach(function(person){ console.log(person)});

//arrow function version
console.log('\narrow function version');
people.forEach(person => console.log(person));

//arrow function version and taking two parameters
console.log('\narrow function version and taking two parameters; the index and person');
people.forEach((person, index) => console.log(index, person));

//arrow function version and taking two parameters
//externalizing the callBack function
console.log('\nexternalizing the callBack function');
let logPerson = (person, index) => console.log(index, person);
people.forEach(logPerson);


//an other example of a callback function
const arr = [2, 3, 4, 5, 6, 7];
console.log(arr.map(e => e))

function grt(name){
    alert(`Welcome ${name}`);
}

function mycallBack(callback){
    let name = prompt("Enter name: ");
    callback(name);
};

mycallBack(grt);