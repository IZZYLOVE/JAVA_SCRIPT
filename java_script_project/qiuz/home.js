var myResult={
    firstName: '',
    middleName:'',
    lastName: '',
    username: '',
    isdone: 'no',
    correct:0,
    wrong:0,
    score: 0,
    myExamId:0,
    myExamName:'',
    Result : []
};

var Dataz;
var myUser;
var anAdmin;
var datax;
var isData = 'no';
var myId  = 0;
var myScore  = 0;
var use_Update= 'on';
var use_Data= 'on';
var mySubmit = 'on'
var mySubmited = 'off'
var ok = 0;
var TotalQuestion = 0
var ExamId = 0
var ExamName = ''
var Examtime = 0;
var ORGNAME = 'OrgName'
var CLASSID=MYCLASS = 0


//alert('nh' + myId)


function home(){
    location.href = `home.html?id=${myId}`;
}


const asAdmin = function(){
        hideSubmenu()
        let todocover = document.querySelector(".todocover");
        todocover.innerHTML = `
        <div id="notice"></div>
        <div id='isloading' style="text-align: center;"></div>
        <h1>ADMIN</h1>
        <input   id="username" type='text' placeholder="FirstName MiddleName LastName" />
        <input   id="pw1" type='text' placeholder="password" />
        
        <button onclick="checkAdminRecord('http://localhost:8001/admins', 0)"><strong>LOGIN</strong></button>
        `;         
    }
     
    
    const asCandidate = function(){
        hideSubmenu()
        let todocover = document.querySelector(".todocover");
        todocover.innerHTML = `
        <div id="notice"></div>
        <div id='isloading' style="text-align: center;"></div>
        <h1>Credentials </h1>
        <input   id="username" type='text' placeholder="FirstName MiddleName LastName" />
        <input   id="pw1" type='text' placeholder="password" />
        
        <button onclick="checkRecord('http://localhost:8001/StudentsRecords', 0)"><strong>LOGIN</strong></button>
        `;  
        
        
     }
     
     
     const regExams = function(){
        hideSubmenu()
        let todocover = document.querySelector(".todocover");
        todocover.innerHTML = `
        <div id="notice"></div>
        <div id='isloading' style="text-align: center;"></div>
        <h1>REGISTER EXAMS </h1>
        <input   id="fname" type='text' placeholder="First name" />
        <input   id="mname" type='text' placeholder="Middle name" />
        <input   id="lname" type='text' placeholder="Last name" />
        <input   id="pw1" type='password' placeholder="password" />
        <input   id="pw2" type='password' placeholder="confirm password" />
        
        <p style="text-align: center; padding:0px 10px">
        SELECT CLASS
    </p>
    <select id="aClasses" class="coverInput" onChange="setClassId()">
        <option value='0' >Select&nbsp;Class</option>
        </select>

        
        <button onclick="checkRecordReg('http://localhost:8001/StudentsRecords', 0)"><strong>REGISTER</strong></button>
        `;  
        
        populateClassList()
    }
     
    
    const checkRecord =function(url=null, id=null){
    usernamex=(document.getElementById('username').value).trim();    
    password1=(document.getElementById('pw1').value).trim();
    isloading=document.getElementById('isloading');
    
    isloading.innerHTML = "...loading..."
    usernamex = usernamex.replace(/ /g, "");
    const myRecord = {
        username: usernamex,
    }
    let aUser = null;
    
    if(url === null){
        url = 'http://localhost:8001/StudentsRecords';
    }
    
    if(username !== '' && password1 !== '')
    {
        fetch(url)
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then(data => {
            
            let i = 0; 
            let myArra=Object.values(data)
            if(myArra.length > 0){
                while(data[i] && i < myArra.length && aUser == null){

                        //alert('checking for user' + myRecord.username);
                        datax = data[i];
                        if(datax.username == myRecord.username && aUser !== true){
                        //alert('found user' + datax);
                        
                        aUser = true;
                        // console.log(datax)
                        console.log('aUser='+aUser)
                        // redirect to quiz
                        location.href = `home.html?id=${datax.id}`; 
                        return{aUser}
                    }
                    i++;     
                }
                
                    if(aUser == null && i >= (myArra.length-1)){
                        aUser = false
                        console.log('aUser='+aUser)
                        isloading.innerHTML = ""
                        alert('WRONG CREDENTIALS OR YOU NOT REGISTERED FOR EXAMS')
                    }
            }
            else{
                isloading.innerHTML = ""
                alert('WRONG CREDENTIALS OR YOU NOT REGISTERED FOR EXAMS')
                
            }

        })
    }
    else{
        isloading.innerHTML = ""
        alert('Please, you should not leave any field empty!')
    }
}


const createRecord = function(){
    fname=(document.getElementById('fname').value).trim();
    mname=(document.getElementById('mname').value).trim();
    lname=(document.getElementById('lname').value).trim();
    password1=(document.getElementById('pw1').value).trim();
    password2=(document.getElementById('pw2').value).trim();
    myClass=+(document.getElementById('aClasses').value).trim();

    const myRecord = {
    firstName: fname,
    lastName: lname,
    middleName: mname,
    username: fname+mname+lname,
    mypass: password1,
    classId: myClass,
    isdone: 'no',
    correct: 0,
    wrong: 0,
    score: 0,
    myExamId:0,
    myExamName:'',
    Result:[]
    }
    
    let url = 'http://localhost:8001/StudentsRecords';
    
  if(fname !== '' && lname !== '' && fname !== 0 && lname !== 0 && mname !== 0 && password1 !== 0 && password1 == password2)
  {
    const fetchData = async (url) => {
    await fetch(url, {method: 'POST',
    headers: {"Content-Type": "application/json"}, 
    body: JSON.stringify(myRecord)
    })
    .then(res => {
            if(!res.ok){
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then(() => {
        console.log('new record added');
        isloading.innerHTML = ""
        alert('REGISTRATION SUCCESSFUL YOU ARE NOW ELIGIBLE TO TAKE EXAMS')
    })
}
fetchData(url)    
}
else{
    isloading.innerHTML = ""
    alert('Please, you should not leave any field empty!')
}
}

//
const checkRecordReg =function(url=null, id=null){
    fname=(document.getElementById('fname').value).trim();
    mname=(document.getElementById('mname').value).trim();
    lname=(document.getElementById('lname').value).trim();
    password1=(document.getElementById('pw1').value).trim();
    password2=(document.getElementById('pw2').value).trim();
    myClass=(document.getElementById('aClasses').value).trim();
    isloading=document.getElementById('isloading');
   
        isloading.innerHTML = "...loading..."
        const myRecord = {
            firstName: fname,
        lastName: lname,
        username: fname+mname+lname,
        isdone: 'no',
        correct:0,
        wrong:0,
        score: 0,
        myExamId:0,
        myExamName:'',
    }
    let aUser = null;
    
    
    
         if(url === null){
        url = 'http://localhost:8001/StudentsRecords';
    }
    
    if(fname !== '' && lname !== '' && fname !== 0 && lname !== 0 && mname !== 0 && password1 !== 0 && password1 == password2)
    {
  
        fetch(url)
        .then(res => {
            if(!res.ok){
                    throw Error('could not fetch the data for that resource')
                }
                return res.json();
            })
            .then(data => {
                 //console.log(data);
                 // data && data.map((datax, i) => {
                let i = 0; 
                let myArra=Object.values(data)
                //alert("data len "+ data +' ggg '+ myArra.length )
                while(data[i] && i < myArra.length && aUser == null){
                    
                    //alert('checking for user' + myRecord.username);
                    datax = data[i];
                   if(datax.username == myRecord.username && aUser !== true){
                       //alert('found user' + datax);
                       
                    aUser = true;
                    // console.log(datax)
                    console.log('aUser='+aUser)
                    // redirect to quiz
                    location.href = `quiz.html?id=${datax.id}&ex=${ExamId}&ok=${datax.score}`; 
                    return{aUser}
                }
                i++;  
                
            }
            
            if(aUser == null && i >= (myArra.length-1)){
                aUser = false
                console.log('aUser='+aUser)
                //alert("aUser="+aUser)
                createRecord();
            }
        })

    }
    else{
        
        isloading.innerHTML = ""
        alert('Please, your names can not be zero or empty!')
    }
        }
    
        
        
const checkAdminRecord =function(url=null, id=null){     
            adminusernamex=(document.getElementById('username').value).trim();    
            password1=(document.getElementById('pw1').value).trim();
            const myRecord = {
                adminusername: adminusernamex.replace(/ /g, "")
            }
            let anAdmin = null;
            if(url === null){
                url = 'http://localhost:8001/Admin';
                }
                
            if(adminusernamex!== '' && password1 !== '')
            {
                fetch(url)
                    .then(res => {
                        if(!res.ok){
                            throw Error('could not fetch the data for that resource')
                        }
                        return res.json();
                    })
                    .then(data => {
                             let i = 0; 
                             let myArra=Object.values(data)
                             while(data[i] && i < myArra.length && anAdmin == null){
                                 datax = data[i];
                                 if(datax.adminusername == myRecord.adminusername && anAdmin !== true){             
                                anAdmin = true;
                            location.href = `admin.html?id=${datax.id}&ex=${ExamId}&r=EXAMS`; 
                            return{anAdmin}
                        }
                        i++;   
                    }
                    if(anAdmin == null && i >= (myArra.length-1)){
                        anAdmin = false
                        alert("this admin does not exist")
                    }
                })
            }
            else{
                alert('Please, your names can not be zero or empty!')
            }
}
        
        
          
const useData = function(id){
            // alert('useData bbhh')
    let data = Dataz;
    //alert(data +' hhh'+id)
    let head = document.getElementById('head');
    let root = document.getElementById('root');
    let body = document.getElementById('body');
    let notice=document.getElementById('notice');
    notice.innerHTML = '',
    head.innerHTML = `<p class='examp'><h3>QUESTION ${id} of ${TotalQuestion}</h3>`;
    // data && data.map((data, i) => {
        // console.log(data);
        
        if(data && data[id-1] && id <= TotalQuestion){
            
            datax = data[id-1];
            datax.question=revert(datax.question)
            datax.option1=revert(datax.option1)
            datax.option2=revert(datax.option2)        
            datax.option3=revert(datax.option3)       
            datax.option4=revert(datax.option4)
            
            body.innerHTML = `<label>${datax.question}</label><p>`;
            body.innerHTML += `<div class='options' >
            <input type="radio" id="option1" onclick="enablebutton()" name="options" value="${datax.option1}">
            <label class='options' for="option1" >${datax.option1}</label>
            </div>`;
          body.innerHTML += `<div class='options' >
          <input type="radio" id="option2" onclick="enablebutton()" name="options" value="${datax.option2}">
          <label class='options' for="option2" >${datax.option2}</label>
        </div>`;            
        body.innerHTML += `<div class='options'  >
        <input type="radio" id="option3" onclick="enablebutton()" name="options" value="${datax.option3}">
        <label class='options' for="option3">${datax.option3}</label>
      </div>`;            
      body.innerHTML += `<div class='options'  >
      <input type="radio" id="option4" onclick="enablebutton()" name="options" value="${datax.option4}">
      <label class='options' for="option4">${datax.option4}</label>
      </div></p>`;

            
      id= +id+1;
      root.innerHTML = `<button id="mybutton" disabled onclick="checkAnswer(${id})"> NEXT>> </button></p>`;
      
        }
        else{
            
            if(mySubmited == 'off'){
                head.innerHTML = `<h3>GREAT, YOU ARE DONE WITH THIS QUIZ</h3>`;
                body.innerHTML = `<label>THANK YOU FOR PARTICIPATING </label>`;
                root.innerHTML = `<p>Do have a nice day.</p>
                <button onclick='home()'>HOME</button>`;
                //alert("useData wants to call computeResult()")
        mySubmited == 'on'
         computeResult();
        }
    }
}



const useData2 = function(id){
   // alert('useData2 bbhh')
   

   let data = Dataz;
   //alert(data +' hhh'+id)
    let head = document.getElementById('head');
    let root = document.getElementById('root');
    let body = document.getElementById('body');
    let notice=document.getElementById('notice');
    body.innerHTML = '',
    
    head.innerHTML = `<h2>GREAT, ${myResult.firstName.toUpperCase()} ${myResult.lastName.toUpperCase()}</h2>
    <h3>YOU ARE DONE WITH THIS ${ExamName.toUpperCase()} QUIZ/EXAM</h3>`;
    notice.innerHTML = `<label>THANK YOU FOR PARTICIPATING </label>`;
    root.innerHTML = `<p>Do have a nice day.</p>
    <button onclick='home()'> HOME</button>`;
        
}



const checkAnswer = function(id){
    // alert(id +' ggg1'+Dataz)
    //console.log('vvv'+Dataz)
    //alert('checkAnswer')
    let id2 = id - 1;
       if(datax == null){
        datax=[];

       } 

       else if(id2 <= Dataz.length){
           
           
           
        let optionx = vstatus ='';
        let ele = document.getElementsByName('options');
        let i;
        for(i = 0; i < ele.length; i++) {
            if(ele[i].checked){
            optionx =  ele[i].value;
            // document.getElementById("result").innerHTML
            // = " Gender: "+optionx;
            //alert('aaa'+ datax.Correctanswer+  '  hh   ' + optionx)
            break;
        }
    }
    //alert('saved answer='+datax.Correctanswer)
    datax.Correctanswer=revert(datax.Correctanswer)

    if(datax.Correctanswer == optionx)
    {
        //alert('Correct answer')
        vstatus = 'correct';
        myResult.correct += 1;
        myResult.score += 20
        myScore= myResult.score
        console.log(myResult);
        
    }else{
       // alert('wrong answer')
       vstatus = 'wrong';
       myResult.wrong += 1
       // console.log(myResult);
    }
    
    
    // document.getElementById("status").innerHTML
    // = "Status: "+ vstatus;
    
}

//alert('checkAnswer  wants to call useData(id)')
useData(id);
}

    const useHomeParams = function(){
        let params = (new URL(document.location)).searchParams;
        myId = params.get('id');
        retrieveUserData('http://localhost:8001/StudentsRecords', myId);

    }
    
    const useUpdate = function(id){
        //alert('useUpdate sub='+ mySubmit)
        if(myResult.score == 0 && mySubmit == 'off'){mySubmit = 'on'}
        //alert('useUpdate upsub='+ mySubmit )
        
        if(mySubmit == 'on'){
            url = 'http://localhost:8001/StudentsRecords';
            //let search= new URLSearchParams({id: myId})
            url = url+'/'+myId
            alert(url)
            const fetchData = async (url) => {
           await fetch(url, {method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                "score": myResult.score,
                "correct": myResult.correct,
                "wrong": myResult.wrong,
                "isdone": 'yes',
                "myExamId":ExamId,
                "myExamName": ExamName,
                "Result":[...myResult.Result, {
                    "myExamName": ExamName,
                    "score": myResult.score,
                    "correct": myResult.correct,
                    "wrong": myResult.wrong
                }]
            }) 
        })
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then(data => {
            //console.log(data);
            location.href = `quiz.html?id=${myId}&ex=${ExamId}&ok=${myScore}`; 
            //alert('Thank You For Participating')
        })
    }
    fetchData(url)
}
}


const useStartUpdate = function(id){
    // alert('useUpdate sub='+ mySubmit)
     if(myResult.score == 0 && mySubmit == 'off'){mySubmit = 'on'}
     // alert('useUpdate upsub='+ mySubmit )
     
     if(mySubmit == 'on'){
         url = 'http://localhost:8001/StudentsRecords';
         //let search= new URLSearchParams({id: myId})
         url = url+'/'+myId
         alert(url)
         const fetchData = async (url) => {
            alert("url= "+url)
            
            await fetch(url, {method: "PATCH",
            headers: {"Content-Type" : "application/json"},
         body: JSON.stringify({
             "isdone": 'yes'
            })
         
            
        })
     .then(res => {
         if(!res.ok){
             throw Error('could not fetch the data for that resource')
            }
         return res.json();
     })
     .then(data => {
         console.log(data);
         
     })
    }
    fetchData(url)
    
}

}


const computeResult = function(){
    // if(use_Data == 'on'){
        //     use_Data='off'
        if( myResult.score > 0 || myScore > 0){
            myResult.score = (myResult.correct / (TotalQuestion))* 100;
            document.getElementById("result").innerHTML
         = `you have ${myResult.correct} correct answer(s) and ${myResult.wrong} wrong answer(s), you scored ${myResult.score}%`;
         console.log(myResult);
        }
        // alert(myScore +' aa '+ myResult.score + 'use_Update ' + use_Update )
        if(myScore > 0 && myResult.score > 0 && use_Update == 'on'){
            //alert(myScore +' computeResult cc '+ myResult.score)
            // alert('computeResult  wants to call useUpdate()')
            useUpdate(myId);
        }
        else if(myScore > 0 && myResult.score > 0 && ok == 0){
            // alert('computeResult  wants to call useData()')
            useData()
        }
        else{
            // alert('computeResult  wants to call useData2()')
            useData2() 
        }
        // }
    }
    
    
    const retrieveUserData = function(url, id = null){   
        notice=document.getElementById('notice');    
        notice.innerHTML = '...loading...' 
        
        if (id !== null && id !== 0){
            let search= new URLSearchParams({id: id})
    url = url+'?'+search
}
//alert(url)
const fetchData = async (url) => {
       await fetch(url)
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then(data => {
            console.log('myResult '+data[0].score);
            myResult.firstName = data[0].firstName;
            myResult.lastName = data[0].lastName;
           myResult.middleName = data[0].middleName;
           myResult.username = data[0].username;
           myResult.myExamId = data[0].myExamId;
           myResult.Result = data[0].Result;
           CLASSID=MYCLASS= data[0].classId;

           data[0].Result && data[0].Result.map((dataz) => {
               if(dataz.myExamName == ExamName){
                   myResult.correct = dataz.correct;
                   myResult.wrong = dataz.wrong;
                   myResult.score = dataz.score;

                }
            })
            
            //setUserData()
            myRecords()
        
        })
    }
    fetchData(url)         
}


// const setUserData = function(){
//     //alert('lastname'+myResult.lastName)
//     if(myResult.username !== ''){
    //         demo2=document.getElementById('demo2');
    //         demo2.innerHTML = `<h3 style="text-align: center;">WELCOME ${myResult.firstName.toUpperCase()} ${myResult.middleName.toUpperCase()} ${myResult.lastName.toUpperCase()}</h3>`   
    //         // isloading=document.getElementById('notice');
    //         // isloading.innerHTML = "...loading..."
    //         // FetchExamsData('http://localhost:8001/Exams')
    //     }
    //     }

            
    const enablebutton = function(){
    let button = document.getElementById('mybutton');
    button.disabled = false;
}


const startQuiz = function(){
    myTime= (new Date().getTime() + (Examtime*60*1000)+(2*1000)),
// alert(myTime +' - '+ new Date().getTime() + ' = '+ (myTime -new Date().getTime()) ),
fint(),
checkAnswer(1)
    //useStartUpdate()
}




const FetchExamsData = function(url){
    notice=document.getElementById('notice');
    notice.innerHTML = '...loading...'
    const fetchData = async (url) => {
        await fetch(url)
         .then(res => {
             if(!res.ok){
                 throw Error('could not fetch the data for that resource')
                }
                return res.json();
            })
         .then(data => {
            notice=document.getElementById('notice'); 
            notice.innerHTML = ''
                 listExams(data) 
         })
     }
     fetchData(url)                    
}

const myRecords = function(url, id = null){
    //alert('myRecords')
    hideSubmenu()
    demo2=document.getElementById('demo2');
    head=document.getElementById('head');
    body=document.getElementById('body');
    notice=document.getElementById('notice');    
    result=document.getElementById('result');
    root=document.getElementById('root');
    head.innerHTML = notice.innerHTML = '',
    result.innerHTML = root.innerHTML = '',
 
    
    demo2.innerHTML = `<h3 style="text-align: center;">WELCOME ${myResult.firstName.toUpperCase()} ${myResult.middleName.toUpperCase()} ${myResult.lastName.toUpperCase()}</h3>
    `
    head.innerHTML = `<h3 style="text-align: center;">${myResult.firstName.toUpperCase()} ${myResult.middleName.toUpperCase()} ${myResult.lastName.toUpperCase()}</h3>
    EXAMS RECORD
    `   
 
    myResult.Result.length > 0 ? (myResult.Result.map((datax, i) => {  
        //console.log(datax)
        i % 2 == 0 ? myMapClass="class='mapBackround1'" : myMapClass="class='mapBackround2'" 
        body.innerHTML += `
        <div ${myMapClass}>
        ${i+1}, 
        Exam:<strong>${datax.myExamName}</strong>,
        Right answer(s):<strong>${datax.correct}</strong>,
        Wrong answer(s):<strong>${datax.wrong}</strong>,
        Score:<strong>${datax.score}%</strong>
        </div>`

        
        
    })
    ):(
        notice.innerHTML = '',
        body=document.getElementById('body'),
        body.innerHTML = `
        <p style="text-align: center; padding:10px">
        Sorry, You have no exam record yet! <br />
        Please take an exam
        </p>
        `   
    )
}

const listExams = function(data){ 
    //console.log(data)
    exams=document.getElementById('exams');
    exams.innerHTML = `<option value='0' >Select&nbsp;Exam</option>`

    data && data.map((datax) => {    
        if(datax.Class == CLASSID){
            exams.innerHTML += `<option value='${datax.id}' >${datax.exam}</option>`
    }
})
}


const setExamId = function(){
    //alert('mmm')
    console.log('old ExamId='+ExamId)
    ExamId=document.getElementById('exams').value;
    console.log('new ExamId='+ExamId)
    }

    const setOrgNane = function(){
        let orName = document.querySelector(".orgname")
        orName.innerHTML = ORGNAME
        if(MYCLASS == ''){
            MYCLASS = ORGNAME
        }
        setFooter()
    }
    
    const setFooter = function(){
        let DATE = new Date()
        let YY = DATE.getFullYear()
        let footer = document.getElementById('footer')
        footer.innerHTML += `&copy;&nbsp;${ORGNAME}&nbsp;${YY}`
    }
    
    
    const retrieveOrgName= function(url){
        const fetchData = async (url) => {
            await fetch(url)
         .then(res => {
             if(!res.ok){
                 throw Error('could not fetch the data for that resource')
             }
             return res.json();
         })
         .then(data => {
             ORGNAME = data;
            setOrgNane()
        })
     }
     fetchData(url)                    
    }

function revert(str)
{
  str = str.replace(/xodivx/g, "<div class='examx'>");
  str = str.replace(/xopx/g, "<p>");
  str = str.replace(/xcdivx/g, "</div>");
  str = str.replace(/xcpx/g, "</p>");
  str = str.replace(/xtabx/g, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
  str = str.replace(/xbrx/g, "<br />");
  
  return str;
}

const submenu = function(){
    let submenu=document.getElementById('submenu');
    if(submenu.style.display === 'none'){
        submenu.style.display = 'block'
    }else{
        submenu.style.display = 'none'
    }
}

const hideSubmenu = function(){
    let submenu=document.getElementById('submenu');
        submenu.style.display = 'none'
}

const MyExams = function(){
    hideSubmenu()
    head=document.getElementById('head');
    body=document.getElementById('body');
    notice=document.getElementById('notice');    
    result=document.getElementById('result');
    root=document.getElementById('root');
    head.innerHTML = notice.innerHTML = '',
    result.innerHTML = root.innerHTML = '',
    
    head.innerHTML = `<h3 style="text-align: center;">${myResult.firstName.toUpperCase()} ${myResult.middleName.toUpperCase()} ${myResult.lastName.toUpperCase()}</h3>
    ` 
    body.innerHTML = `
    
    <p style="text-align: center; padding:0px 10px">
    SELECT EXAM
    </p>
    <select id="exams" onChange="setExamId()">
        <option value='0' >Select&nbsp;Exam</option>
        </select>
    <div class='buttoncontainer'>                          
    <button onclick="enterExam()"><strong>ENTER EXAM</strong></button>
    </div>
    `;  
    
    FetchExamsData('http://localhost:8001/Exams')
}



const enterExam = function(){
    exams=document.getElementById('exams').value;
    if(exams > 0){
    location.href = `quiz.html?id=${myId}&ex=${ExamId}&ok=${myScore}&cl=${CLASSID}`;
}else{
    alert('Please select exam')
} 
}

function logout(){
    location.href = `index.html?`;
}

const populateClassList = function(){
    result=document.getElementById('result');
    notice.innerHTML = '...loading...'
    url = 'http://localhost:8001/Classes'
    
    const fetchData = async (url) => {
        await fetch(url)
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch the data for that resource')
               }
               return res.json();
            })
            .then(data => {
               notice=isloading=document.getElementById('notice');    
               isloading.innerHTML = ""
               aClasses=document.getElementById('aClasses'),

               data.length > 0 ? (data.map((datax, i) => {
               i % 2 == 0 ? myMapClass="class='mapBackround1'" : myMapClass="class='mapBackround2'" 
               aClasses.innerHTML += `
                 <option value='${datax.id}'>${datax.class} </option>
               `
            })
          ):(
              isloading.innerHTML = ""
           )
        })
   }
   fetchData(url)               
}


const regAdmins = function(){
    hideSubmenu()
    let todocover = document.querySelector(".todocover");
    todocover.innerHTML = `
    <div id="notice"></div>
    <div id='isloading' style="text-align: center;"></div>
    <h1>REGISTER ADMIN </h1>
    <input   id="fname" type='text' placeholder="First name" />
    <input   id="mname" type='text' placeholder="Middle name" />
    <input   id="lname" type='text' placeholder="Last name" />
    <input   id="pw1" type='password' placeholder="password" />
    <input   id="pw2" type='password' placeholder="confirm password" />

    
    <button onclick="checkAdminRecordReg('http://localhost:8001/StudentsRecords', 0)"> <strong>REGISTER</strong></button>
    `;     
}

checkAdminRecordReg =function(url=null, id=null){
    fname=(document.getElementById('fname').value).trim();
    mname=(document.getElementById('mname').value).trim();
    lname=(document.getElementById('lname').value).trim();
    password1=(document.getElementById('pw1').value).trim();
    password2=(document.getElementById('pw2').value).trim();
    isloading=document.getElementById('isloading');
   
        isloading.innerHTML = "...loading..."
        const myRecord = {
            firstName: fname,
            middleName: mname,
        lastName: lname,
        username: fname+mname+lname,
        isdone: 'no',
        correct:0,
        wrong:0,
        score: 0,
        myExamId:0,
        myExamName:'',
    }
    let anAdmin = null;
    
    
    
         if(url === null){
        url = 'http://localhost:8001/Admins';
    }
    
    if(fname !== '' && lname !== '' && fname !== 0 && lname !== 0 && mname !== 0 && password1 !== 0 && password1 == password2)
    {
  
        fetch(url)
        .then(res => {
            if(!res.ok){
                    throw Error('could not fetch the data for that resource')
                }
                return res.json();
            })
            .then(data => {
                let i = 0; 
                let myArra=Object.values(data)
                while(data[i] && i < myArra.length && anAdmin == null){
                    datax = data[i];
                   if(datax.username == myRecord.username && anAdmin !== true){
                       
                       anAdmin = true;
                    console.log('aUser='+anAdmin)
                    alert("this admin already exist")
                    return{anAdmin}
                }
                i++;  
                
            }
            
            if(anAdmin == null && i >= (myArra.length-1)){
                anAdmin = false
                console.log('anAdmin='+anAdmin)
                createAdminRecord();
            }
        })

    }
    else{
        
        isloading.innerHTML = ""
        alert('Please, your names can not be zero or empty!')
    }
}


        const createAdminRecord = function(){
            fname=(document.getElementById('fname').value).trim();
            mname=(document.getElementById('mname').value).trim();
            lname=(document.getElementById('lname').value).trim();
            password1=(document.getElementById('pw1').value).trim();
            password2=(document.getElementById('pw2').value).trim();
      
        
            const myRecord = {
            firstName: fname,
            lastName: lname,
            middleName: mname,
            adminusername: fname+mname+lname,
            mypass: password1,
            approved: "no",
            level:1,
            myExams:[],
            myClasses:[]
            }
            
            let url = 'http://localhost:8001/Admins';
            
          if(fname !== '' && lname !== '' && fname !== 0 && lname !== 0 && mname !== 0 && password1 !== 0 && password1 == password2)
          {
            const fetchData = async (url) => {
            await fetch(url, {method: 'POST',
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(myRecord)
            })
            .then(res => {
                    if(!res.ok){
                        throw Error('could not fetch the data for that resource')
                    }
                    return res.json();
                })
                .then(() => {
                console.log('new record added');
                isloading.innerHTML = ""
                alert('REGISTRATION SUCCESSFUL, REQUEST SUPPER ADMIN FOR APPROVAL')
            })
        }
        fetchData(url)    
        }
        else{
            isloading.innerHTML = ""
            alert('Please, you should not leave any field empty!')
        }
        } 