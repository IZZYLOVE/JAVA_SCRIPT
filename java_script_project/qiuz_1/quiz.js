var myResult={
    firstName: '',
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


//alert('nh' + myId)

function home(){
    location.href = 'index.html';
    }


    const asAdmin = function(){
        hideSubmenu()
        let todocover = document.querySelector(".todocover");
        todocover.innerHTML = `
        <div id='isloading' style="text-align: center;"></div>
        <h1>ADMIN LOGIN</h1>
        <input   id="fname" type='text' placeholder="First name" />
        <input   id="lname" type='text' placeholder="Last name" />

        <button onclick="checkAdminRecord('http://localhost:8001/admins', 0)">ENTER AS ADMIN</button>
        `;         
     }
     

     const asCandidate = function(){
        hideSubmenu()
        let todocover = document.querySelector(".todocover");
        todocover.innerHTML = `
        <div id='isloading' style="text-align: center;"></div>
        <h1>Credentials </h1>
        <input   id="fname" type='text' placeholder="First name" />
        <input   id="lname" type='text' placeholder="Last name" />

        <p style="text-align: center; padding:0px 10px">
        SELECT EXAM
    </p>
    <select id="exams" onChange="setExamId()">
        <option value='0' >Select Exam</option>
    </select>
        <button onclick="checkRecord('http://localhost:8001/StudentsRecords', 0)">ENTER</button>
        `;  
        
        FetchExamsData('http://localhost:8001/Exams')
     }
     


const checkRecord =function(url=null, id=null){

    fname=(document.getElementById('fname').value).trim();
    lname=(document.getElementById('lname').value).trim();
    isloading=document.getElementById('isloading');
    isloading=document.getElementById('isloading');
   
        isloading.innerHTML = "...loading..."
        const myRecord = {
        firstName: fname,
        lastName: lname,
        username: fname+lname,
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

        // if (id != null || id != 0){
        //     let search= new URLSearchParams({id: id})
        //      url = url+'?'+search
        //  }
   
    //alert(url)
    if(fname !== '' && lname !== '' && fname !== 0 && lname !== 0)
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
    

const createRecord = function(){
    fname=(document.getElementById('fname').value).trim();
    lname=(document.getElementById('lname').value).trim();
    const myRecord = {
    firstName: fname,
    lastName: lname,
    username: fname+lname,
    isdone: 'no',
    correct: 0,
    wrong: 0,
    score: 0,
    myExamId:0,
    myExamName:'',
    Result:[]

    }

    let url = 'http://localhost:8001/StudentsRecords';

  if(fname !== '' && lname !== '' && fname !== 0 && lname !== 0)
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
   
    checkRecord('http://localhost:8001/StudentsRecords')
})

    }
fetchData(url)
    
}
else{
   
    isloading.innerHTML = ""
    alert('Please, your names can not be zero or empty!')
}
}

const checkAdminRecord =function(url=null, id=null){

    fname=(document.getElementById('fname').value).trim();
    lname=(document.getElementById('lname').value).trim();
    isloading=document.getElementById('isloading');
    isloading.innerHTML = "...loading..."
        const myAdminRecord = {
        firstName: fname,
        lastName: lname,
        adminusername: fname+lname,
        rank: 0
    }
    let anAdmin = null;

  

         if(url === null){
        url = 'http://localhost:8001/Admin';
        }

        // if (id != null || id != 0){
        //     let search= new URLSearchParams({id: id})
        //      url = url+'?'+search
        //  }
   
    //alert(url)
    if(fname !== '' && lname !== '' && fname !== 0 && lname !== 0)
    {
        const fetchData = async (url) => {
  
           await fetch(url)
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
               while(data[i] && i < myArra.length && anAdmin == null){

                    //alert('checking for user' + myRecord.username);
                    datax = data[i];
                   if(datax.adminusername ==  myAdminRecord.adminusername && anAdmin !== true){
                    //alert('found admin' + datax);

                    anAdmin = true;
                   // console.log(datax)
                    console.log('anAdmin='+anAdmin)
                    // redirect to admin
                    location.href = `admin.html?id=${datax.id}&ex=${ExamId}`; 
                    return{anAdmin}
                }
                i++;  
                
            }
            
            if(anAdmin == null && i >= (myArra.length-1)){
                anAdmin = false
                console.log('anAdmin='+anAdmin)
                isloading.innerHTML = ""
                alert("wrong credential")
            }
            })
        }
        fetchData(url)
        }
        else{

                isloading.innerHTML = ""
            alert('Please, your names can not be zerong.. or empty!')
        }
        }
    

const retrievedata = function(url, id = null){
//alert(url)
    
    if (id !== null && id !== 0){
        url = url+id
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
          // console.log(data);
           shuffleData=data.sort(function(){return Math.random()-0.5;})     
            data =shuffleData;

            Dataz = data;
            isData ='yes' 
        })
    }
    fetchData(url)


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



    const useParams = function(){
        let params = (new URL(document.location)).searchParams;
        myId = params.get('id');
        ok = myScore = params.get('ok');
        myResult.myExamId=ExamId = params.get('ex');
        console.log("examId="+ExamId)
        console.log("myscore="+myScore)
        console.log("myResult.myExamId="+myResult.myExamId)
        console.log("ExamId="+ExamId);
        if(ExamName == ''){
         retrieveExamData('http://localhost:8001/Exams', ExamId);
        }

    }

    
    const useUpdate = function(id){
        //alert('useUpdate sub='+ mySubmit)
        if(myResult.score == 0 && mySubmit == 'off'){mySubmit = 'on'}
        //alert('useUpdate upsub='+ mySubmit )
        
        if(mySubmit == 'on'){
            url = 'http://localhost:8001/StudentsRecords';
            //let search= new URLSearchParams({id: myId})
            url = url+'/'+myId
            //alert(url)
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
//alert(url)
        
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
            //let myArra=Object.values(data)
           // alert('score '+data[0].score)
           if(myResult.myExamId == data[0].myExamId){
           console.log('myResult '+data[0].score);
           myResult.firstName = data[0].firstName;
           myResult.lastName = data[0].lastName;
           myResult.username = data[0].username;
           myResult.myExamId = data[0].myExamId;

           data && data.map((dataz) => {
              // alert('retrieveUserData x name1 '+dataz.score)
            if(dataz.myExamName == ExamName){
                myResult.correct = dataz.correct;
                myResult.wrong = dataz.wrong;
                myResult.score = dataz.score;

            }
           })

           // alert('retrieveUserData score '+data[0].Result.dataz)

           console.log('myResult.score'+myResult.score);
           console.log('myResult.wrong '+myResult.wrong);
           console.log('myResult.correct '+myResult.correct);
           if(use_Update == 'on' && myResult.score > 0){
                use_Update = 'off'
                console.log(use_Update)
                
            // alert('retrieveUserData is calling computeResult')  
                computeResult()
            }
        }
        })
    }
    fetchData(url)
               
}
        
 
            
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




            // for the timer
          //  <div id='demo'><div id='demo'></div><script>
 var x; var myTime; var runCountdown = 'on'
 function countdown(){
    var expire= myTime;
             
              
              
    // Get todays date and time
  var now = new Date().getTime();

  
  
  
  // Find the distance between now an the count down date
  var distance = expire - now;
  
  // Time calculations for days, hours, minutes and seconds

 var daysx =  distance / (60 * 60 * 24);

var days=Math.floor(daysx/1000);
  

if(days>1){
    
    //hr 
    var distance1d = distance - (days*(60 * 60 * 24)*1000);
    var hoursx = distance1d / ( 60 * 60);
    var hours = Math.floor(hoursx /1000);
    
    //min
    var distance1h= distance1d - (hours*(60 * 60)*1000);
 var minutesx = (distance1h /  60);		
var minutes = Math.floor(minutesx /1000);	

//sec
var distance1m= distance1h - (minutes*(60)*1000);	
var secondsx = distance1m -(60);	
var seconds = Math.floor(secondsx/1000);
 
if(seconds<10){var ps=0;}else{var ps='';}
if(minutes<10){var pm=0;}else{var pm='';}
if(hours<10){var ph=0;}else{var ph='';}
  
 
 
 // Display the result in the element with id='demo'
  document.getElementById('demo').innerHTML = days + 'days, ' + ph+hours + ':'
  +pm+minutes+ ':' +ps+seconds + 's ';  	
}


else if(days==1){

    //hr 
    var distance1d = distance - (days*(60 * 60 * 24)*1000);
    var hoursx = distance1d / ( 60 * 60);
    var hours = Math.floor(hoursx /1000);
    
    //min
    var distance1h= distance1d - (hours*(60 * 60)*1000);
 var minutesx = (distance1h /  60);		
var minutes = Math.floor(minutesx /1000);	

//sec
var distance1m= distance1h - (minutes*(60)*1000);	
var secondsx = distance1m -(60);	
var seconds = Math.floor(secondsx/1000);
 
if(seconds<10){var ps=0;}else{var ps='';}
if(minutes<10){var pm=0;}else{var pm='';}
if(hours<10){var ph=0;}else{var ph='';}
 
 
 
 // Display the result in the element with id='demo'
  document.getElementById('demo').innerHTML = days + 'day, ' +ph+hours + ':'
  +pm+minutes+ ':' +ps+seconds + 's ';  
  
        
}

  
else if(days<1 & distance>=3601000){
    
 var hoursx =  distance / (60 * 60 );
var hours=Math.floor(hoursx/1000);	

//min	
var distance1h= distance - (hours*(60 * 60)*1000);
 var minutesx = (distance1h /  60);		
var minutes = Math.floor(minutesx /1000);	

//sec
var distance1m= distance1h - (minutes*(60)*1000);	
var secondsx = distance1m -(60);	
var seconds = Math.floor(secondsx/1000);



if(seconds<10){var ps=0;}else{var ps='';}
if(minutes<10){var pm=0;}else{var pm='';}
if(hours<10){var ph=0;}else{var ph='';}

 
 // Display the result in the element with id='demo'
  document.getElementById('demo').innerHTML =  ph+hours + ':'
  +pm+minutes+ ':' +ps+seconds + 's ';  
  

}

else if( distance < 3601000){
    
    //alert( distance )
    
    //for minutes
        
 var minutesx =  distance / (60 );
var minutes=Math.floor(minutesx /1000);	
    
    
    var distance1m= distance - ((minutes)*60*1000);	
var seconds = Math.floor(distance1m /1000);

if(seconds<10){var ps=0;}else{var ps='';}
if(minutes<10){var pm=0;}else{var pm='';}

 
    
//alert('minutes: '+minutes+ ' seconds: '+seconds );

 // Display the result in the element with id='demo'
  document.getElementById('demo').innerHTML = pm+minutes+ ':' +ps+seconds + 's ';  
  
 

}


  // If the count down is finished, write some text 
  if (distance < 0) {
    clearInterval(x);
    
    document.getElementById('demo2').innerHTML = 'COUNTDOWN EXPIRED';
    document.getElementById('renew').style.display='none';
  } 
  
    }

//interval control 
function checkTime(){
   let nowx = new Date().getTime();
  // alert( myTime - nowx)
    if(myTime > nowx){
        countdown(); 
    }
    else if(myTime < nowx && runCountdown == 'on'){
       // alert("here ww")
        if(myResult.score == 0){
            myScore = 1
            myResult.correct = 1
            myResult.wrong= TotalQuestion - 1
            //alert(myScore +' gg'+myResult.correct)
        }
        runCountdown = 'off'
        checkAnswer(myId)
    }
}

function fint(){
x=setInterval('checkTime();' ,1000);
}
//fint();
            
//timer ends 


 const FetchExamsData = function(url){
    const fetchData = async (url) => {
        await fetch(url)
         .then(res => {
             if(!res.ok){
                 throw Error('could not fetch the data for that resource')
             }
             return res.json();
         })
         .then(data => {
                 listExams(data)
         })
     }
     fetchData(url)                    
}

const retrieveExamData = function(url, id = null){
    //alert('retrieveExamData id'+id)
    if (id !== null && id !== 0){
        let search= new URLSearchParams({id: id})
        url = url+'?'+search
    }
    const fetchData = async (url) => {
        await fetch(url)
         .then(res => {
             if(!res.ok){
                 throw Error('could not fetch the data for that resource')
             }
             return res.json();
         })
         .then(data => {
            console.log('examData='+data)

    //alert('retrieveExamData nnn'+data[0].exam)

            if(ExamId == data[0].id && ExamName == ''){
                ExamName = data[0].exam;
                Examtime = data[0].duration;
                TotalQuestion = data[0].Questions;
                console.log('retrieveExamData myExamName='+ExamName)
            }
            navHeader=document.getElementById('navHeader');
            navHeader.innerHTML = `<p style="text-align: center;">EXAM: <strong>${ExamName.toUpperCase()} </strong></p>`    
            if(myScore > 0){
                checkAnswer(1);  
            }
         })
     }
     fetchData(url)                    
}

const listExams = function(data){
//alert('mmm')
//console.log(data)
    exams=document.getElementById('exams');
data && data.map((datax) => {    
    exams.innerHTML += `<option value='${datax.id}' >${datax.exam}</option>`
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