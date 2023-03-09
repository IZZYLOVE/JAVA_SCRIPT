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

let vot = document.getElementById('vot');
vot.addEventListener('click', vote);


