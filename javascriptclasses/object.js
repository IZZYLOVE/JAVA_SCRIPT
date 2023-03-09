const myBio = {
    name: 'King',
    age: 60,
    state:'Rivers',
    pin: "0000",
    me(a=this.name, b=this.state, c=this.pin){
        console.log(`${a} ${b} ${c}`);
    }
};
console.log(myBio);
console.log(myBio["name"]);
myBio.me('uche', 'Ebonyi', 9090);
myBio.me();


// const myBiox = {
//     name,
//     state,
//     pin,
//     me(name, state, pin){
//         console.log(`${name} ${state} ${pin}`);
//     }
// };
// console.log(myBiox);
// myBiox.me('uche', 'Ebonyi', 9090);


function vote(){
    let name = prompt("Enter name")
    let age = Number(prompt("Enter age"))

    if (name.trim() !== '' && age > 0)
    {
        if (age < 18){
            alert(`${name} you are ${age} and below 18 years and you are not eligible to vote.`)
            console.log(`${name} you are ${age} and below 18 years and you are not eligible to vote.`)
        }
        else if (age > 100)
        {
            alert(`${name} you are above 100 years and you are not eligible to vote.`)
            console.log(`${name} you are above 100 years and you are not eligible to vote.`)
        }
        else
        {
            alert(`${name} you are eligible to vote.`)
            console.log(`${name} you are eligible to vote.`)
        }
    }
    else{
        alert(`Please age and name are required.`)
        console.log(`Please age and name are required.`)
        vote();
    }
}


vote(); 

