// console.log('\nRECURSION');
// //eg1
// // calculating a factorial using recursion
//  const sum = function(n){
//     if(n === 1)
//     {
//         return n;
//     }
//     else
//     {
//         x = n + sum(n - 1);
//         return x   
//     }
// }




// console.log(sum(5));

// function myBio(){
//     let name = 'Kingdom';
//       let age = 90;
//       let state = 'Rivers';
//       console.log('Name '+ name, 'Age '+age, 'State ' + state );
//   }
//   myBio();

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
