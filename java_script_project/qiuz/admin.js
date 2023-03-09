var myResult={
    firstName: '',
    lastName: '',
    adminusername: '',
    level: 0
};

var Dataz;
var myUser;
var datax;
var isData ='no';
var myId  = 0;
var myScore  = 0;
var use_Update= 'on';
var use_Data= 'on';
var mySubmit = 'on'
var mySubmited = 'off'
var ok = 0;
var TotalQuestion = 5
var Examid=0
var myExamNames={}
var ExamName = ''
var ORGNAME = 'OrgName'


//alert('nh' + myId)

function home(){
    location.href = 'index.html';
    }


    const createAdmin = function(){
        fname=(document.getElementById('fname').value).trim();
        lname=(document.getElementById('lname').value).trim();
        const myRecord = {
        firstName: fname,
        lastName: lname,
        adminusername: fname+lname,
        level: 0
        }
    
        let url = 'http://localhost:8001/Admins';
    
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
    })
    }
fetchData(url)
    }
    else{
        alert('Please, your names can not be zero or empty!')
    }
    }
    

const checkAdminRecord =function(url=null, id=null){

    fname=(document.getElementById('fname').value).trim();
    lname=(document.getElementById('lname').value).trim();
        const myRecord = {
        firstName: fname,
        lastName: lname,
        adminusername: fname+lname,
        level: 0
    }
    let aUser = null;

  

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
                    location.href = `admin.html?id=${datax.id}&ok=${datax.score}`; 
                    return{aUser}
                }
                i++;  
                
            }
            
            if(aUser == null && i >= (myArra.length-1)){
                aUser = false
                console.log('aUser='+aUser)
                //alert("aUser="+aUser)
                createAdmin();
            }
            })

        }
        else{
            alert('Please, your names can not be zero or empty!')
        }
}
    

        const useAdminsParams = function(){
            let params = (new URL(document.location)).searchParams;
            myId = params.get('id');
            goRetrieveAdminData()
        }




const retrieveAdminData = function(url, id = null){
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
    console.log('myResult '+data[0].adminusername);
    myResult.firstName = data[0].firstName;
    myResult.lastName = data[0].lastName;
    myResult.adminusername = data[0].adminusername;
    myResult.level = data[0].level;
    console.log('myResult2 '+myResult.adminusername);
    if(use_Update == 'on' && myResult.adminusername !== ''){
     use_Update = 'off'
    console.log(use_Update)
    console.log(myResult)

    //alert('name'+myResult.lastName) 
    setAdminData();
     }
    })
}
 fetchData(url)
}



const goRetrieveAdminData = function(){
    if(myId > 0){
        retrieveAdminData('http://localhost:8001/Admins', myId);
    }
}


const setAdminData = function(){
// alert('lastname'+myResult.lastName)
if(myResult.adminusername !== ''){

    demo=document.getElementById('demo');
    demo.innerHTML = `        <nav class="navHeader">
            <ul> 
                <li onclick='home()'> ADD_QUESTION</li>
                <li onclick='setExam()'> SET_EXAM</li>
                

            </ul>
        </nav>`   
    

    demo2=document.getElementById('demo2');
    demo2.innerHTML = `<h3 style="text-align: center;">WELCOME (ADMIN) ${myResult.firstName.toUpperCase()} ${myResult.lastName.toUpperCase()}</h3>`   
    
    FetchExamsData('http://localhost:8001/Exams')
}
}
                
 const adminRetrievedata = function(url, id = null){
 //alert(url)
 //alert(id)                       
if (id !== null && id !== 0){ 
       // add id to the url to get the target exam
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
        console.log(data);
                                
        Dataz = data;
        isData ='yes' 
        adminUseData(Dataz)
        })
        }
        fetchData(url)                                        
  }
         
  const enablebutton = function(id){
    let button = document.getElementById(`mybutton${id}`);
    button.disabled = false;
}

const adminUseData = function(data){
    
    head=document.getElementById('head');
    head.innerHTML = `<h3 style="text-align: center;">ALL ${ExamName.toUpperCase()} QUESTIONS</h3>`   
    

    data.length > 0 ? (  data.map((datax, i) => {
    body.innerHTML += `<p><h3>QUESTION ${i+1}</h3>`;
                            
    body.innerHTML += `<label>${datax.question}</label>`;
    body.innerHTML += `<div style="padding:5px;" >
    <input type="radio" id="option1"  onclick="enablebutton('${i}')"  name="options" value="${datax.option1}">
    <label for="option1">${datax.option1}</label>
    </div>`;
    body.innerHTML += `<div style="padding:5px;" >
    <input type="radio" id="option2"  onclick="enablebutton('${i}')"  name="options" value="${datax.option2}">
    <label for="option2">${datax.option2}</label>
    </div>`;            
    body.innerHTML += `<div style="padding:5px;">
    <input type="radio" id="option3"  onclick="enablebutton('${i}')"  name="options" value="${datax.option3}">
    <label for="option3">${datax.option3}</label>
    </div>`;            
    body.innerHTML += `<div style="padding:4px;">
    <input type="radio" id="option4"  onclick="enablebutton('${i}')"  name="options" value="${datax.option4}">
    <label for="option4">${datax.option4}</label>
    </div>
                                    
    <button id='mybutton${i}' onclick="deleteItem('http://localhost:8001/quiz/', ${datax.id})" disabled >DELETE</button>
    </p>
  `;
                                    
     })

    ) :(
        alert('Sorry, no question has been set for this exam')
    )
}


const deleteItem = function(url, id){
   // alert(url + id)
    fetch(url + id, { method: 'DELETE' })
    .then(() => {
        //redirectTo('/');
    })
}

const setExam = function(){
    let todocover = document.querySelector(".cover");
//alert('hrr')
    

    todocover.innerHTML = `
    <div id='isloading' style="text-align: center;"></div>
    <h1>SET EXAM </h1>
    <input  class="coverInput" id="examname" type='text' placeholder="Enter Exam name" />
    <input  class="coverInput"  id="duration" type='text' placeholder="Enter Exam duration in minutes" />
    <input  class="coverInput"  id="numQuestion" type='text' placeholder="Enter munber of questions" />

    <button onclick="checkExam('http://localhost:8001/Exams')">SET</button>
    `;         
 }

 const checkExam = function(url){

 examname=(document.getElementById('examname').value).trim();
 duration=(document.getElementById('duration').value).trim();
 numQuestion=(document.getElementById('numQuestion').value).trim();
//url = url+'/'+examname
url = url
alert(url)
const MyNewExam = {
    adminusername: myResult.adminusername,
    exam: examname,
    duration: duration,
    Questions: numQuestion
}

const fetchData = async (url) => {
    await fetch(url, {method: "POST",
     headers: {"Content-Type" : "application/json;charset=utf-8"},
     body: JSON.stringify(MyNewExam)
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
            listExamsAdmin(data)
         })
     }
     fetchData(url)                    
}

const listExamsAdmin = function(data){
    aExams=document.getElementById('aExams');
    console.log(data)  
    data.length > 0 ? ( data.map((datax) => {  
        if(datax.adminusername == myResult.adminusername){
            if(Examid == 0){
                //set initial exam
                Examid = datax.id
                ExamName = datax.exam
            }
            myExamNames={[datax.id]:datax.exam}
            aExams.innerHTML += `<option value='${datax.id}'>${datax.exam}</option>`
        }  
    })
    ):(
        alert('Sorry, you have not set any exam')
    )
    adminRetrievedata('http://localhost:8001/exam', Examid);
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

const setAdminExamId = function(){
        Examid=document.getElementById('aExams').value;
        console.log('new ExamId='+Examid)
        ExamName=myExamNames[Examid]
        //console.log(ExamName)
        adminRetrievedata('http://localhost:8001/exam', Examid);
        }