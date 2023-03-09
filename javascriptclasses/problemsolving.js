
// let result = document.getElementById('result');
// let result2 = document.getElementById('result2');
// // let p = Number(prompt("Enter pricipal: "));
// // let R = Number(prompt("Enter Rate: "));
// // let T = Number(prompt("Enter Time: "));
// not in place of Number we can use +
// let p = +(prompt("Enter pricipal: "));
// let R = +(prompt("Enter Rate: "));
// let T = +(prompt("Enter Time: "));

// let I = (p * R * T)/(100)

// result.innerHTML = I; 
// let A = I + p;
// result2.innerHTML = A;
// alert (`The sinmple interest for the principal ${p}, 
// rate ${R} over a period of ${T} year(s) is ${I}, 
// your return Amout is ${A} `)

// const findx = function(){
//     let result = document.getElementById('result');
//     let result2 = document.getElementById('result2');
//     let a = Number(prompt("Enter value for a: "));
//     let b = Number(prompt("Enter value for b: "));
//     let c = Number(prompt("Enter value for c: "));

//     if (a <= 0){ 
//         alert(`please enter value for a`);
//         findx();
//     }
//     let x1 = (-b + ((b**2) - (4*a*c))**(1/2))/(2*a)
//     let x2 = (-b - ((b**2) - (4*a*c))**(1/2))/(2*a)

//     result.innerHTML = x1; 
//     result2.innerHTML = x2;
//     alert (`the values of x are ${x1} and ${x2}`);
// } 
// findx();

// //ARRAY DESTRUCTURING
// const myArray = [10, 23, 15, 14, 7, 8, 5, 17];
// const [a, b, c, d, e, f, g] = myArray;
// console.log(a)
// //to skip array elements
// const [, b, , d, e, f, g] = myArray;
// console.log(a)
// //to skip array elements
// const [a, b] = myArra
// console.log(a)

// const myArray = [10, 23, 15, [5, 7], 14, 7,[6, 8], 8, 5, 17];
// const [a, b, c, d, e, f, g] = myArray;
// console.log(a)
// let myFlat = myArray.flat(2);
// console.log(myFlat)

// const myArray = [1, 2, 3, 4, [8, 9, 10], 5, [0, 6]];

// const [a, b, c, d, e, f, g, h, i, j] = myArray;
// const[x,y,z] = e;
// console.log(x)

// let arr = [6, 7, 8]
// let result = arr.every(e => e>7)
// console.log(result)


// const myArray = [1, 2, 3, 4, [8, 9, 10], 5, [0, 6]];
// const [a, b, c, d, e, f, g, h, i, j] = myArray;
// const[x,y,z] = e;
// console.log(x);


// let myJson = {
//     "name" : "king",
//     "age"  : 30,
//     "state" : "Rivers"
// };

// let myStringfied = JSON.stringify(myJson);
// console.log(myStringfied);

// let myParsed = JSON.parse(myStringfied);
// console.log(myParsed);

// function find_max(nums) {
//     let max_num = Number.NEGATIVE_INFINITY; // smaller than all other numbers
//     for (let num of nums) {
//     if (num > max_num) {
//     // (Fill in the missing line here)
//     max_num = num
//     }
//     }
//     return max_num;
//      }
//      console.log