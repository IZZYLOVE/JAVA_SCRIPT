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
var MYCLASS = ''
var CLASSID = 0
var isClass = 0


//alert('nh' + myId)

function home(){
    location.href = `home.html?id=${myId}`;
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
            Examid = params.get('ex');
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
    // console.log('myResult '+data[0].adminusername);
    myResult.firstName = data[0].firstName;
    myResult.lastName = data[0].lastName;
    myResult.adminusername = data[0].adminusername;
    myResult.level = data[0].level;

    if(data[0].level >= 10){
        subMenumenus1=document.getElementById('subMenumenus1');
        subMenumenus1.innerHTML = `<a href='admin.html?id=${myId}&ex=${Examid}'>
            <li > REGULAR&nbsp;ADMIN</li> </a>
            `
    }
    // console.log('myResult2 '+myResult.adminusername);
    isloading=document.getElementById('notice');
    isloading.innerHTML = ""
    if(use_Update == 'on' && myResult.adminusername !== ''){
     use_Update = 'off'
    // console.log(use_Update)
    


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
    setQuizmenus()
    demo2=document.getElementById('demo2');
    demo2.innerHTML = `<h3 style="text-align: center;">WELCOME (ADMIN) ${myResult.firstName.toUpperCase()} ${myResult.lastName.toUpperCase()}</h3>`   
    isloading=document.getElementById('notice');
    isloading.innerHTML = "...loading..."
    FetchExamsData('http://localhost:8001/Exams')
}
}
        

const setQuizmenus = function(){   
    subMenumenus=document.getElementById('subMenumenus');
    subMenumenus.innerHTML = ` 
            <ul> 
                <li onclick='setQuestion()'> SET_QUESTION</li>
                <li onclick='setExam()'> SET_EXAM</li>
            </ul>
        `  
    navHeader=document.querySelector('.navHeader');
    navHeader.innerHTML = ` 
    <ul> 
        <li >
            <select id="aExams" onChange="setAdminExamId()">
            </select>
        </li>
        <li onclick='submenu()'> MENU</li>
    </ul>
    `
    goRetrieveAdminData()
}


const adminRetrievedata = function(url, id = null){  
    hideSubmenu()
    subMenumenus=document.getElementById('subMenumenus');
    subMenumenus.innerHTML = ` 
            <ul> 
                <li onclick='setQuestion()'> SET&nbsp;QUESTION</li>
                <li onclick='setExam()'> SET&nbsp;EXAM</li>
            </ul>
        `  
    

if (id !== null && id !== 0){ 
       // add id to the url to get the target exam
        url = url+id
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
        //console.log(data);
                                
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
    body=document.getElementById('body');
    notice=document.getElementById('notice');    
    result=document.getElementById('result');
    root=document.getElementById('root');
    head.innerHTML = notice.innerHTML = '',
    result.innerHTML = root.innerHTML = '',


    head.innerHTML = `<h3 style="text-align: center;">ALL ${ExamName.toUpperCase()} QUESTIONS</h3>`   
    body.innerHTML = '',
    
    data.length > 0 ? (  data.map((datax, i) => {
        datax.question=revert(datax.question)
        datax.option1=revert(datax.option1)
        datax.option2=revert(datax.option2)        
        datax.option3=revert(datax.option3)       
        datax.option4=revert(datax.option4)


    body.innerHTML += `<p class='examp'><h3>QUESTION ${i+1}</h3>`;
                            
    body.innerHTML += `<label>${datax.question}</label>`;
    body.innerHTML += `<div class='options' >
    <input type="radio" id="option1${i}"  onclick="enablebutton('${i}')"  name="options" value="${datax.option1}">
    <label class='options'for="option1${i}">${datax.option1}</label>
    </div>`;
    body.innerHTML += `<div class='options' >
    <input type="radio" id="option2${i}"  onclick="enablebutton('${i}')"  name="options" value="${datax.option2}">
    <label class='options' for="option2${i}">${datax.option2}</label>
    </div>`;            
    body.innerHTML += `<div class='options'>
    <input type="radio" id="option3${i}"  onclick="enablebutton('${i}')"  name="options" value="${datax.option3}">
    <label class='options' for="option3${i}">${datax.option3}</label>
    </div>`;            
    body.innerHTML += `<div class='options'>
    <input type="radio" id="option4${i}"  onclick="enablebutton('${i}')"  name="options" value="${datax.option4}">
    <label class='options'  for="option4${i}">${datax.option4}</label>
    </div>
    <div class='buttoncontainer'>                          
    <button id='mybutton${i}' onclick="deleteItem('http://localhost:8001/exam${Examid}/', ${datax.id})" disabled >DELETE</button>
    <button  onclick="editQuestion(${datax.id})"  >EDIT</button>
    </div>
    </p>
  `;
                                    
     })

    ) :(
        notice.innerHTML += '<p style="text-align: center;">Sorry, no question has been set for this exam</p>',
        notice.innerHTML += '<p style="text-align: center;">Please set questions</p>'
       
    )
}


const deleteItem = function(url, id){
   //alert(url + id)
    fetch(url + id, { method: 'DELETE' })
    .then(() => {
        //redirectTo('/');
    })
}

const setExam = function(){
    hideSubmenu()
    head=document.getElementById('head');
    body=document.getElementById('body');
    notice=document.getElementById('notice');    
    result=document.getElementById('result');
    root=document.getElementById('root');
    head.innerHTML = notice.innerHTML = '',
    result.innerHTML = root.innerHTML = '',
        
        body.innerHTML = `
    <div id='isloading' style="text-align: center;"></div>
    <h1 style="text-align: center;">SET EXAM </h1>
    <input  class="coverInput" id="examname" type='text' placeholder="Enter Exam name" />
    <input  class="coverInput"  id="duration" type='text' placeholder="Enter Exam duration in minutes" />
    <input  class="coverInput"  id="numQuestion" type='text' placeholder="Enter munber of questions" />
    <div class='buttoncontainer'>
    <button onclick="checkExam('http://localhost:8001/Exams')"><strong>SET</strong></button>
    </div>

    `;         
 }

 const checkExam = function(url){

 examname=(document.getElementById('examname').value).trim();
 duration=(document.getElementById('duration').value).trim();
 numQuestion=(document.getElementById('numQuestion').value).trim();
//url = url+'/'+examname
url = url
//alert(url)
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
    //console.log(data)  
    
    data.length > 0 ? ( data.map((datax) => {  
        if(datax.adminusername == myResult.adminusername){
            if(Examid == 0){
                //set initial exam
                Examid = datax.id
                ExamName = datax.exam
            }
            else if(Examid == datax.id){
                ExamName = datax.exam
            }

            myExamNames={...myExamNames, [datax.id]:datax.exam}
            //console.log(myExamNames)
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

const setAdminExamId = function(){
        isloading=document.getElementById('notice');
        isloading.innerHTML = "...loading..."
        Examid=document.getElementById('aExams').value;
        ExamName=myExamNames[Examid]
        //location.href = `admin.html?id=${myId}&ex=${Examid}`; 
        //console.log(Examid)
        adminRetrievedata('http://localhost:8001/exam', Examid);
        }


 const setQuestion = function(){
    hideSubmenu()
    head=document.getElementById('head');
    body=document.getElementById('body');
    notice=document.getElementById('notice');
    head.innerHTML = notice.innerHTML = '',
        body.innerHTML = `
        <div id='isloading' style="text-align: center;"></div>
        <h1 style="text-align: center;">SET ${ExamName.toUpperCase()} QUESTION </h1>
        <p class='setExamMenu'> 
        <span title='Open emphasize div' onClick="setHtmlTag('xodivx')">open&nbsp;div</span>
        <span title='Close emphasize div' onClick="setHtmlTag('xcdivx')">close&nbsp;div</span>
        <span title='Open paragraph' onClick="setHtmlTag('xpox')">open&nbsp;pragraph</span>  
        <span title='Close paragraph' onClick="setHtmlTag('xpcx')">close&nbsp;pragraph</span>  
        <span title='use tab' onClick="setHtmlTag('xtabx')">tab</span> 
        <span title='new line' onClick="setHtmlTag('xbrx')">new&nbsp;line</span> </p>

        <input  class="coverInput"  id="question" type='text' placeholder="Enter Exam question" />
        <input  class="coverInput"  id="option1" type='text' placeholder="Enter option1" />
        <input  class="coverInput"  id="option2" type='text' placeholder="Enter option2" />
        <input  class="coverInput"  id="option3" type='text' placeholder="Enter option3" />
        <input  class="coverInput"  id="option4" type='text' placeholder="Enter option4" />
        <input  class="coverInput"  id="correctAnswer" type='text' placeholder="Copy and past correct answer" />
        <div class='buttoncontainer'>
        <button onclick="PostQuestion('http://localhost:8001/exam', ${Examid})"><strong>SET</strong></button>
        </div>

        `;         
}
        
const PostQuestion = function(url, exId){
    question=(document.getElementById('question').value).trim();
    question=convert(question)
    option1=(document.getElementById('option1').value).trim();
    option1=convert(option1)
    option2=(document.getElementById('option2').value).trim();
    option2=convert(option2)
    option3=(document.getElementById('option3').value).trim();
    option3=convert(option3)
    option4=(document.getElementById('option4').value).trim();
    option4=convert(option4)
    Correctanswer=(document.getElementById('correctAnswer').value).trim();
    Correctanswer=convert(Correctanswer)

    isloading=document.getElementById('notice');
    isloading.innerHTML = "...loading..."
   url = url+exId
  
   const MyNewQuestion = {
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        Correctanswer: Correctanswer
   }
   
   const fetchData = async (url) => {
       await fetch(url, {method: "POST",
        headers: {"Content-Type" : "application/json;charset=utf-8"},
        body: JSON.stringify(MyNewQuestion)
   })
    .then(res => {
        if(!res.ok){
            throw Error('could not fetch the data for that resource')
        }
        return res.json();
    })
    .then(data => {
       console.log(data);
       location.href = `admin.html?id=${myId}&ex=${Examid}`; 
       isloading.innerHTML = ""
    })
   }
   fetchData(url)           
}     




const editQuestion = function(id){
    let updteini = 0;
    
    head=document.getElementById('head');
    body=document.getElementById('body');
    notice=document.getElementById('notice');    
    result=document.getElementById('result');
    root=document.getElementById('root');
    head.innerHTML = notice.innerHTML = '',
    result.innerHTML = root.innerHTML = '',
    Dataz.length > 0 ? (Dataz.map((datax, i) => {
        if(datax.id == id){
         updteini = 1

        body.innerHTML = `
        <div id='isloading' style="text-align: center;"></div>
        <h1 style="text-align: center;">EDIT ${ExamName.toUpperCase()} QUESTION </h1>
        <p style="text-align: center;"> 
        <span title='Open emphasize div' onClick="setHtmlTag('xodivx')">open&nbsp;div</span>
        <span title='Close emphasize div' onClick="setHtmlTag('xcdivx')">close&nbsp;div</span> 
        <span title='Open paragraph' onClick="setHtmlTag('xpox')">open&nbsp;pragraph</span>  
        <span title='Close paragraph' onClick="setHtmlTag('xpcx')">close&nbsp;pragraph</span>  
        <span title='use tab' onClick="setHtmlTag('xtabx')">tab</span> 
        <span title='new line' onClick="setHtmlTag('xbrx')">new&nbsp;line</span> </p>
        <input  class="coverInput"  id="question" type='text' placeholder="Enter Exam question" value="${datax.question}" />
        <input  class="coverInput"  id="option1" type='text' placeholder="Enter option1"  value="${datax.option1}" />
        <input  class="coverInput"  id="option2" type="text" placeholder="Enter option2"  value="${datax.option2}" />
        <input  class="coverInput"  id="option3" type="text" placeholder="Enter option3"  value="${datax.option3}" />
        <input  class="coverInput"  id="option4" type="text" placeholder="Enter option4"  value="${datax.option4}" />
        <input  class="coverInput"  id="correctAnswer" type="text" placeholder="Copy and past correct answer"  value="${datax.Correctanswer}" />
        <div class='buttoncontainer'> 
        <button onclick="UpdateQuestion('http://localhost:8001/exam${Examid}/', ${datax.id})"><strong>UPDATE</strong></button>
        </div>

        `;      
        }

    })
    
    ) :(
        console.log(null)
    )

    if(updteini == 0){
        alert('Sorry, the question you want to edit does not exist')
    }
}


function convert(str)
{
  str = str.replace(/&/g, "&amp;");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/"/g, "&quot;");
  str = str.replace(/'/g, "&#039;");
  return str;
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

const UpdateQuestion = function(url, id){

    question=(document.getElementById('question').value).trim();
    question=convert(question)
    option1=(document.getElementById('option1').value).trim();
    option1=convert(option1)
    option2=(document.getElementById('option2').value).trim();
    option2=convert(option2)
    option3=(document.getElementById('option3').value).trim();
    option3=convert(option3)
    option4=(document.getElementById('option4').value).trim();
    option4=convert(option4)
    Correctanswer=(document.getElementById('correctAnswer').value).trim();
    Correctanswer=convert(Correctanswer)

    isloading=document.getElementById('notice');
    isloading.innerHTML = "...loading..."

   url = url+id
  
   const EditedQuestion = {
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        Correctanswer: Correctanswer
   }
   
        //alert(url)
        const fetchData = async (url) => {
    await fetch(url, {method: "PATCH",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(EditedQuestion) 
        })
    .then(res => {
        if(!res.ok){
            throw Error('could not fetch the data for that resource')
        }
        return res.json();
    })
    .then(data => {
       console.log(data);
       //alert('updated')
        isloading.innerHTML = ""
       location.href = `admin.html?id=${id}&ex=${ExamId}`; 
    })
}
fetchData(url)

}


const setHtmlTag = function(val){
    question=document.getElementById('question');
    questionx=(question.value).trim();
    question.value =  questionx+" "+val+" ";   
}

const candidatesRecords = function(){
    hideSubmenu()
    subMenumenus=document.getElementById('subMenumenus');
    subMenumenus.innerHTML = ` 
            <ul> 
                <li onclick='retrieveRecords()'> PRINT&nbsp;RECORDS</li>
            </ul>
        `  
        navHeader=document.querySelector('.navHeader');
        navHeader.innerHTML = ` 
        <ul> 
            <li >
                <select id="aClasses" onChange="setAdminClassId()">
                <option value='${0}'>select&nbsp;class</option>
                </select>
            </li>
            <li onclick='submenu()'> MENU</li>
        </ul>
        `

    head=document.getElementById('head');
    body=document.getElementById('body');
    notice=isloading=document.getElementById('notice');    
    result=document.getElementById('result');
    root=document.getElementById('root');
    head.innerHTML = notice.innerHTML = '',
    result.innerHTML = root.innerHTML = '',
    isloading.innerHTML = "...loading..."
        
        body.innerHTML = `
    <div id='isloading' style="text-align: center;"></div>
    <h1 style="text-align: center;">CANDIDATES RECORDS</h1>

    </div>

    `;    
    retrieveRecords()     
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

const retrieveRecords = function(CLASSID){
    url = 'http://localhost:8001/StudentsRecords'

    const fetchData = async (url) => {
        await fetch(url)
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch the data for that resource')

            }
            return res.json();
        })
        .then(data => {
           data ? (data.map((dataz) => {
            if(dataz.classId == CLASSID){
                isClass = 1



            }

            
           })

          
           ):(
            isClass = 2,
            body=document.getElementById('body'),
            body.innerHTML += '<p style="text-align: center;">Sorry, No record available! </p>',
            isloading.innerHTML = ""

           )
       
        })

        if(isClass == 0){
            body=document.getElementById('body'),
            body.innerHTML += '<p style="text-align: center;">Sorry, No record available for this class, please try another class! </p>'
            isloading.innerHTML = ""

           }

    }
    fetchData(url)               
}
       
function logout(){
    location.href = `index.html?`;
}