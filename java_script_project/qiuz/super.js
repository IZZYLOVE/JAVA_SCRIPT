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
var coursesAs = 'Course'
var COURSEID = 0
var CLASSNAME= ''
var CLASSobj;
var candidateAS = 'student'
var ADMINSobj;


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
    




const useAdminsParams = function(){
    let params = (new URL(document.location)).searchParams;
    myId = params.get('id');
    Examid = params.get('ex');
    goRetrieveAdminData()
}
        
        
const retrieveAdminData = function(url, id = null){  
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
    myResult.firstName = data[0].firstName;
    myResult.middleName = data[0].middleName;
    myResult.lastName = data[0].lastName;
    myResult.adminusername = data[0].adminusername;
    myResult.level = data[0].level;
  if(data[0].approved !== "yes"){
    alert("ACCOUT HAS NOT YET BEEN APPROVED, SEE SUPPER ADMIN TO APPROVE ACCOUNT")
    logout()
  }
    
    if(data[0].level >= 10){
        subMenumenus1=document.getElementById('subMenumenus1');
        subMenumenus1.innerHTML = `
        <li onclick='OurCourses()'> ${coursesAs.toUpperCase()}</li>
        
        <a href='admin.html?id=${myId}&ex=${Examid}'>
        <li > AS&nbsp;REGULAR&nbsp;ADMIN</li> </a> `
    }else{
        location.href = `index.html?res=accessDenied`; 
        
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
    if(myResult.adminusername !== ''){
        setQuizmenus()
    demo2=document.getElementById('demo2');
    demo2.innerHTML = `<h3 style="text-align: center;">WELCOME (SUPER) ${myResult.firstName.toUpperCase()} ${myResult.lastName.toUpperCase()}</h3>`   
    isloading=document.getElementById('notice');
    isloading.innerHTML = "...loading..."
    FetchExamsData('http://localhost:8001/Exams')
}
}


const setQuizmenus = function(){   
    subMenumenus=document.getElementById('subMenumenus');
    subMenumenus.innerHTML = ` 
    <ul> 
        <li >
            <select id="aClasses" onChange="setAdminClassId()">
            <option value='${0}'>select&nbsp;class</option>
            </select>
        </li>
        <li onclick='setQuestion()'> SET_QUESTION</li>
        <li onclick='setExam()'> SET_EXAM</li>
    </ul>
            `  
    navHeader=document.querySelector('.navHeader');
    navHeader.innerHTML = ` 
    <ul> 
    <li >
        <select id="aExams" onChange="setAdminExamId()">
        <option value='${0}'>select&nbsp;${coursesAs.toLowerCase()}</option>
        </select>
        </li>
        <li onclick='submenu()'> MENU</li>
    </ul>
    `
    populateClassList()
    goRetrieveAdminData() 
}


const adminRetrievedata = function(url, id = null){  
    hideSubmenu()  
        
    
    if (id !== null && id !== 0){ 
       // add id to the url to get the target exam
       url = url+id
    }
    else{
        url = url+1
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


    head.innerHTML = `<h3 style="text-align: center;">ALL ${CLASSNAME.toUpperCase()}: ${ExamName.toUpperCase()} QUESTIONS</h3>`   
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
    <select id="aClasses" class="coverInput" onChange="setAdminClassId()">
    <option  value='${0}'>Select&nbsp;Class</option>
    </select>
    <div class='buttoncontainer'>
    <button onclick="checkExam('http://localhost:8001/Exams')"><strong>SET</strong></button>
    </div>
    `;   
    populateClassList('no')

}

const checkExam = function(url){
    
    examname=(document.getElementById('examname').value).trim();
    duration=(document.getElementById('duration').value).trim();
    numQuestion=(document.getElementById('numQuestion').value).trim();
    aClasses=(document.getElementById('aClasses').value).trim();
    //url = url+'/'+examname
    url = url
    //alert(url)
   const MyNewExam = {
       adminusername: myResult.adminusername,
       exam: examname,
       duration: duration,
       Questions: numQuestion,
       Class: aClasses
    }
    
    if(examname !== '' && duration !== '' &&
    numQuestion !== '' && aClasses !== ''){
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
            //console.log(data);
            })
        }
        fetchData(url)
    }
    else{
        alert('please, do not leave any field empty')
    }
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

const setAdminClassId = function(val){
    CLASSobj.length > 0 ? ( CLASSobj.map((datax, i) => {
        if(CLASSID == 0 || datax.id == val){
            CLASSID =datax.id
            CLASSNAME = datax.class
        }
    })
):(
    console.log("class obj not set")
)
setAdminExamId()
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
        //console.log(data);
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
    Dataz.length > 0 ? (Dataz.map((datav, i) => {
        if(datav.id == id){
            updteini = 1
            
            body.innerHTML = `
        <div id='isloading' style="text-align: center;"></div>
        <h1 style="text-align: center;">EDIT ${ExamName.toUpperCase()} QUESTION </h1>
        <p class='setExamMenu'> 
        <span title='Open emphasize div' onClick="setHtmlTag('xodivx')">open&nbsp;div</span>
        <span title='Close emphasize div' onClick="setHtmlTag('xcdivx')">close&nbsp;div</span>
        <span title='Open paragraph' onClick="setHtmlTag('xpox')">open&nbsp;pragraph</span>  
        <span title='Close paragraph' onClick="setHtmlTag('xpcx')">close&nbsp;pragraph</span>  
        <span title='use tab' onClick="setHtmlTag('xtabx')">tab</span> 
        <span title='new line' onClick="setHtmlTag('xbrx')">new&nbsp;line</span> </p>
        <input  class="coverInput"  id="question" type='text' placeholder="Enter Exam question" value="${datav.question}" />
        <input  class="coverInput"  id="option1" type='text' placeholder="Enter option1"  value="${datav.option1}" />
        <input  class="coverInput"  id="option2" type="text" placeholder="Enter option2"  value="${datav.option2}" />
        <input  class="coverInput"  id="option3" type="text" placeholder="Enter option3"  value="${datav.option3}" />
        <input  class="coverInput"  id="option4" type="text" placeholder="Enter option4"  value="${datav.option4}" />
        <input  class="coverInput"  id="correctAnswer" type="text" placeholder="Copy and past correct answer"  value="${datav.Correctanswer}" />
        <div class='buttoncontainer'> 
        <button onclick="UpdateQuestion('http://localhost:8001/exam${Examid}/', ${datav.id})"><strong>UPDATE</strong></button>
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
       //console.log(data);
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
                <select id="aClasses" onChange="setAdminClassIdRecords()">
                <option value='${0}'>select&nbsp;class</option>
                </select>
                </li>
                <li onclick='submenu()'> MENU</li>
                </ul>
                `
        populateClassList()


    head=document.getElementById('head');
    body=document.getElementById('body');
    notice=isloading=document.getElementById('notice');    
    result=document.getElementById('result');
    root=document.getElementById('root');
    head.innerHTML = notice.innerHTML = '',
    result.innerHTML = root.innerHTML = '',
    isloading.innerHTML = "...loading..."
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

const retrieveRecords = function(){
    
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
            let k = 0
            isClass = 0
            body.innerHTML = `
            <div id='isloading' style="text-align: center;"></div>
            <h2 style="text-align: center;">${CLASSNAME.toUpperCase()} <br> ${candidateAS.toUpperCase()} RECORDS</h2>
            </div>
            `,
            data.length > 0 ? (data.map((datax, i) => {
                
                datax.Result
                datax.Result.length > 0 ? (
                    datax.Result.map((dataz) => {
                        //console.log(dataz)
                        
                        if(CLASSID == dataz.class){
                            isClass = 1
                            if(CLASSID == 0){
                                CLASSID = dataz.class  
                            }
                            
                            k++
                            k % 2 == 0 ? myMapClass="class='mapBackround10'" : myMapClass="class='mapBackround20'" 
                            body.innerHTML += `<div ${myMapClass}>
                            ${k}, ${candidateAS.toUpperCase()}: <strong>${datax.firstName.toUpperCase()} ${datax.middleName.toUpperCase()} ${datax.lastName.toUpperCase()}</strong><br/>
                            Exam:<strong>${dataz.myExamName}</strong>,
                            Right answer(s):<strong>${dataz.correct}</strong>,
                            Wrong answer(s):<strong>${dataz.wrong}</strong>,
                            Score:<strong>${dataz.score}%</strong> 
                            </div>`
                            
                            //alert(CLASSID+' retrieveRecords '+dataz.class +'  ' +myval) 
                        }
                        if(isClass == 0 && k >= data.length ){
                            body.innerHTML += '<p style="text-align: center;">Sorry, No record available yes for thois class! </p>'
                        }
                    })
                    

                    ):(
                        console.log(`NO RECORD YET`),
                        body.innerHTML += '<p style="text-align: center;">Sorry, No record available! </p>',
                        isloading.innerHTML = ""
                        )
                    })
                    ):(
            isClass = 2,
            body.innerHTML = `
                 <div id='isloading' style="text-align: center;"></div>
                 <h2 style="text-align: center;">${CLASSNAME.toUpperCase()} <br> ${candidateAS.toUpperCase()} RECORDS</h2>
                 </div>
                 `,
                 body.innerHTML += '<p style="text-align: center;">Sorry, No record available! </p>',
                 isloading.innerHTML = ""
                 )
                })
                
                if(isClass == 0){
                    body.innerHTML = `
                    <div id='isloading' style="text-align: center;"></div>
                    <h2 style="text-align: center;">${CLASSNAME.toUpperCase()} <br> ${candidateAS.toUpperCase()} RECORDS</h2>
                    </div>
                    `; 
                    body.innerHTML += '<p style="text-align: center;">Sorry, No record available for this class, please try another class! </p>'
                    isloading.innerHTML = ""
                }    
        }
        fetchData(url)               
    }
    
    
function logout(){
        location.href = `index.html?`;
}
    
    
const OurCourses = function(){
    hideSubmenu()
    subMenumenus=document.getElementById('subMenumenus');
    let setCourse = `
    <li onclick='setACourse()'> ADD&nbsp;${coursesAs.toUpperCase()}</li>
    <li onclick='assignCourses()'> ASSIGN&nbsp;${coursesAs.toUpperCase()}</li>
    `
    subMenumenus.innerHTML = ` 
    <ul> 
    ${setCourse} 
    </ul>
    `  
    navHeader=document.querySelector('.navHeader');
    navHeader.innerHTML = ` 
    <ul> 
    <li >
    <select id="aClasses" onChange="setAdminClassIdCourses()">
    <option value='${0}'>select&nbsp;class</option>
    </select>
    </li>
    <li onclick='submenu()'> MENU</li>
    </ul>
    `
    populateClassList(header='yes')
    head=document.getElementById('head');
    body=document.getElementById('body');
    isloading = notice=isloading=document.getElementById('notice');    
    result=document.getElementById('result');
    root=document.getElementById('root');
    head.innerHTML = notice.innerHTML = '';
    result.innerHTML = root.innerHTML = '';
    isloading.innerHTML = "...loading..."
    if(header == 'yes'){
    body.innerHTML = `
    <h1 style="text-align: center;"> ${CLASSNAME.toUpperCase()} ${coursesAs.toUpperCase()} </h1>
    </div>
    `; 
    }
    retrieveCourseList()   
    //    isloading.innerHTML = ""  
}



const MyClasses = function(){
    hideSubmenu()
    subMenumenus=document.getElementById('subMenumenus');
    let setClass = `
    <li onclick='classHeads()'> CLASS&nbsp;HEADS</li>`
    subMenumenus.innerHTML = ` 
    <ul> 
    ${setClass} 
    <li onclick='setClass()'> ADD&nbsp;CLASS</li>
    <li onclick='assignClassHead()'> ASSIGN&nbsp;CLASS&nbsp;HEAD</li>
    
    </ul>
    `  
    navHeader=document.querySelector('.navHeader');
    navHeader.innerHTML = ` 
    <ul> 
    ${setClass} 
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
        <h1 style="text-align: center;">CLASSES</h1>
        </div>
    
        `;    
        retrieveClassList()     
    }
    
    
const retrieveClassList = function(){
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
            body=document.getElementById('body'),
            
            data.length > 0 ? (data.map((datax, i) => {
                i % 2 == 0 ? myMapClass="class='mapBackround1'" : myMapClass="class='mapBackround2'" 
                body.innerHTML += `
                <div ${myMapClass}>
                <span style=" flex-grow: 1; background-color: inherit;">${i+1}, ${datax.class} </span> 
                <span style="background-color: inherit;"><span class="mapBackroundButton"
                onClick="setEditClass('${datax.class}', ${datax.id})">EDIT</span> 
                <span class="mapBackroundButton" onClick="deleteClass(${datax.id})">DELETE</span></span>
                </div>` 
               
            })
            ):(
                body=document.getElementById('body'),
                body.innerHTML += '<p style="text-align: center;">Sorry, No class available! </p>',
                isloading.innerHTML = ""
                )
            })
        }
        fetchData(url)               
    }
    
    
const setClass = function(){
    hideSubmenu()
    head=document.getElementById('head');
    body=document.getElementById('body');
    notice=isloading=document.getElementById('notice');    
    result=document.getElementById('result');
    root=document.getElementById('root');
    head.innerHTML = notice.innerHTML = '',
    result.innerHTML = root.innerHTML = '',
    isloading.innerHTML = "...loading..."
    
    body.innerHTML = `
    <h1 style="text-align: center;">ADD CLASS </h1>
    <input  class="coverInput" id="tClass" type='text' placeholder="Enter class name" />
    <div class='buttoncontainer'>
    <button onclick="addClass('http://localhost:8001/Classes')"><strong>ADD</strong></button>
    </div>
    `;    
    isloading.innerHTML = ""
    
}


const setEditClass = function(name, id){
    head=document.getElementById('head');
    body=document.getElementById('body');
    notice=isloading=document.getElementById('notice');    
    result=document.getElementById('result');
    root=document.getElementById('root');
    head.innerHTML = notice.innerHTML = '',
    result.innerHTML = root.innerHTML = '',
    isloading.innerHTML = "...loading..."
    
    body.innerHTML = `
    <h1 style="text-align: center;">UPDATE CLASS </h1>
    <input  class="coverInput" id="tClass" type='text' value='${name}' placeholder="Enter class name" />
    <div class='buttoncontainer'>
    <button onclick="editClass('http://localhost:8001/Classes/${id}')"><strong>UPDATE</strong></button>
    </div>
    `;    
    isloading.innerHTML = ""
    
}


const retrieveCourseList = function(){
    url = 'http://localhost:8001/Courses'
    
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
                body=document.getElementById('body'),
                
                data.length > 0 ? (data.map((datax, i) => {
                    i % 2 == 0 ? myMapClass="class='mapBackround1'" : myMapClass="class='mapBackround2'" 
                   // alert(CLASSID +' == '+ datax.classId)
                    if(CLASSID == datax.classId){
                        body.innerHTML += `
                        <div ${myMapClass}>
                        <span style=" flex-grow: 1; background-color: inherit;">${i+1}, ${datax.course} </span>
                        <span style="background-color: inherit;"><span class="mapBackroundButton" onClick="editCourse(${datax.id}, '${datax.course}')">EDIT</span> 
                        <span class="mapBackroundButton" onClick="deleteCourse(${datax.id})">DELETE</span></span>
                        </div>`
                    }
                })
                ):(
                    notice=isloading=document.getElementById('notice'),  
                    isloading.innerHTML = "",
                    body=document.getElementById('body'),
                    body.innerHTML += `<p style="text-align: center;">Sorry, No ${coursesAs} available! </p>`
                    )
                })
            }
            fetchData(url)               
}
        
        
const setACourse = function(){
    head=document.getElementById('head');
    body=document.getElementById('body');
    notice=isloading=document.getElementById('notice');    
    result=document.getElementById('result');
    root=document.getElementById('root');
    head.innerHTML = notice.innerHTML = '',
    result.innerHTML = root.innerHTML = '',
    isloading.innerHTML = "...loading..."
    
    body.innerHTML = `
    <h1 style="text-align: center;">ADD ${coursesAs.toUpperCase()} </h1>
    <input  class="coverInput" id="tcourse" type='text' placeholder="Enter ${coursesAs} name" />
    <select id="aClasses" class="coverInput">
    <option value='${0}'>select&nbsp;class</option>
    </select>
    <div class='buttoncontainer'>
    <button onclick="addCourse('http://localhost:8001/Courses')"><strong>ADD</strong></button>
    </div>
    `;    
    isloading.innerHTML = ""
    populateClassList('no')
    
    
}


const addCourse= function(url){
    tcourse=(document.getElementById('tcourse').value).trim();
    tcourse=convert(tcourse)
    aClasses=(document.getElementById('aClasses').value).trim();
    aClasses=convert(aClasses)
    
    isloading=document.getElementById('notice');
    isloading.innerHTML = "...loading..."
    
    const MyNewCourse = {
        course: tcourse,
       classId: aClasses
    }
    
    const fetchData = async (url) => {
        await fetch(url, {method: "POST",
        headers: {"Content-Type" : "application/json;charset=utf-8"},
        body: JSON.stringify(MyNewCourse)
    })
    .then(res => {
        if(!res.ok){
            throw Error('could not fetch the data for that resource')
        }
        return res.json();
    })
    .then(data => {
        //console.log(data);
        location.href = `super.html?id=${myId}&ex=${Examid}&r=COURSES`; 
        isloading.innerHTML = ""
    })
}
fetchData(url)           
}     

const assignCourses = function(){
    
    head=document.getElementById('head');
    body=document.getElementById('body');
    notice=isloading=document.getElementById('notice');    
    result=document.getElementById('result');
    root=document.getElementById('root');
    head.innerHTML = notice.innerHTML = '',
    result.innerHTML = root.innerHTML = '',
    isloading.innerHTML = "...loading..."
    
    body.innerHTML = `
    <h1 style="text-align: center;">ASSIGN ${coursesAs.toUpperCase()} </h1>
    <select id="aClasses" class="coverInput" onChange="setAdminClassId()">
    <option  value='${0}'>Select&nbsp;Class</option>
    </select>
    <select id="aCourses" class="coverInput" onChange="setAdminClassId()">
    <option  value='${0}'>Select&nbsp;${coursesAs}</option>
    </select>
    <select id="aAdmins" class="coverInput" onChange="setAdminClassId()">
    <option  value='${0}'>Select&nbsp;admin</option>
    </select>
    <div class='buttoncontainer'>
    <button onclick="saveAssignedCourse('http://localhost:8001/Courses')"><strong>ADD</strong></button>
    </div>
    `;    
    isloading.innerHTML = ""
    
    populateClassList('no')
    populateCourseList('no')
    populateAdminList('no')
    
}


const populateCourseList = function(){
    url = 'http://localhost:8001/Courses'
    
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
                aCourses=document.getElementById('aCourses'),
                
                data.length > 0 ? (data.map((datax, i) => {
                    i % 2 == 0 ? myMapClass="class='mapBackround1'" : myMapClass="class='mapBackround2'" 
               aCourses.innerHTML += `
               <option  value='${datax.id}'>${datax.course}</option>
               `
            })
          ):(
              isloading.innerHTML = ""
              )
        })
    }
    fetchData(url)               
}

const populateAdminList = async function(id=0){
    url = 'http://localhost:8001/Admins'
if(id > 0){
    url = 'http://localhost:8001/Admins/'+id
}
    
    const fetchData = async (url) => {
        return(await fetch(url)
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
            })
            .then(data => {
                ADMINSobj = data
                //console.log(ADMINSobj)
                if(id > 0){
                    alert('bbbhere')
                    return ({firstName:data.firstName, MiddleName:data.middleName, lastName:data.lastName})
                    //return(1)
                }else{
                notice=isloading=document.getElementById('notice');    
                isloading.innerHTML = ""
                aAdmins=document.getElementById('aAdmins'),
                data.length > 0 ? (data.map((datax, i) => {
                   i % 2 == 0 ? myMapClass="class='mapBackround1'" : myMapClass="class='mapBackround2'" 
                   aAdmins.innerHTML += `
                   <option  value='${datax.id}'>${datax.firstName} ${datax.middleName} ${datax.lastName}</option>
                   `
                })
                ):
                (
                    isloading.innerHTML = ""
                )
                return(0)
                }
        })
        )
    }
    if(id > 0){
        const promise1 = await fetchData(url)
        return(promise1)
    }else{
        fetchData(url)
    }               
}


const populateClassList =  function(header = 'yes', head = 'no', sec='n0'){
    notice=document.getElementById('notice');
    notice.innerHTML = '...loading...'
    notice=isloading=document.getElementById('notice');  
      if(sec == 'yes'){
        aClasses=document.getElementById('aClasses2');
    }else{  
        aClasses=document.getElementById('aClasses');
      }
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
               isloading.innerHTML = ""
               CLASSobj = data
               data.length > 0 ? (data.map((datax, i) => {
                
                   
                   if(CLASSID == 0){
                       CLASSID = datax.id
                       CLASSNAME = datax.class
                    }
                    if(header == 'yes'){
                        body.innerHTML = `
                        <h1 style="text-align: center;"> ${CLASSNAME.toUpperCase()} ${coursesAs.toUpperCase()} </h1>
                        `; 
                    }
                    
                    i % 2 == 0 ? myMapClass="class='mapBackround1'" : myMapClass="class='mapBackround2'"                     
                    aClasses.innerHTML += `
                    <option  value='${datax.id}'>${datax.class}</option>
                    `
                })
                ):(
                isloading.innerHTML = ""
                )
        })
    }
    fetchData(url)               
}
    
    
const addClass= function(url){
        tClass=(document.getElementById('tClass').value).trim();
        tClass=convert(tClass)
        
        isloading=document.getElementById('notice');
        isloading.innerHTML = "...loading..."
        
        const MyNewClass= {
            class: tClass
        }
        
        const fetchData = async (url) => {
            await fetch(url, {method: "POST",
            headers: {"Content-Type" : "application/json;charset=utf-8"},
            body: JSON.stringify(MyNewClass)
        })
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then(data => {
            //console.log(data);
       location.href = `super.html?id=${myId}&ex=${Examid}&r=CLASSES`; 
       isloading.innerHTML = ""
    })
}
fetchData(url)           
}

const editClass= function(url){
    tClass=(document.getElementById('tClass').value).trim();
    tClass=convert(tClass)
    
    isloading=document.getElementById('notice');
    isloading.innerHTML = "...loading..."
    
    const MyNewClass= {
        class: tClass
    }
    
    const fetchData = async (url) => {
        await fetch(url, {method: "PATCH",
        headers: {"Content-Type" : "application/json;charset=utf-8"},
        body: JSON.stringify(MyNewClass)
    })
    .then(res => {
        if(!res.ok){
            throw Error('could not fetch the data for that resource')
        }
        return res.json();
    })
    .then(data => {
        location.href = `super.html?id=${myId}&ex=${Examid}&r=CLASSES`; 
        isloading.innerHTML = ""
    })
}
fetchData(url)           
}

const deleteClass = function(id){
    url = 'http://localhost:8001/Classes/'
    //alert(url + id)
    fetch(url + id, { method: 'DELETE' })
    .then(() => {
        //redirectTo('/');
        location.href = `super.html?id=${myId}&ex=${Examid}&r=CLASSES`; 
    })
}

const setAdminClassIdRecords = function(val){
    aClasses=document.getElementById('aClasses').value;
    CLASSID =  aClasses; 
    CLASSobj.length > 0 ? ( CLASSobj.map((datax, i) => {
        if(CLASSID == datax.id){
            CLASSID =datax.id
            CLASSNAME = datax.class
            body.innerHTML = `
            <div id='isloading' style="text-align: center;"></div>
            <h2 style="text-align: center;">${CLASSNAME.toUpperCase()} <br> ${candidateAS.toUpperCase()} RECORDS</h2>
            </div>
            `;  
        }
        })
    ):
    (
        console.log("class obj not set")
    )
    candidatesRecords()
}

    
const setAdminClassIdCourses = function(val){
        aClasses=document.getElementById('aClasses').value;
        CLASSID =  aClasses; 
    CLASSobj.length > 0 ? ( CLASSobj.map((datax, i) => {
        if(CLASSID == datax.id){
            CLASSID =datax.id
            CLASSNAME = datax.class
            body=document.getElementById('body')
            body.innerHTML = `
            <h1 style="text-align: center;"> ${CLASSNAME.toUpperCase()} ${coursesAs.toUpperCase()} </h1>
            </div>
            `; 
        }
    })
    ):(
        console.log("class obj not set")
    )
    OurCourses()
}

const assignClassHead = function(){
    hideSubmenu()
    head=document.getElementById('head');
    body=document.getElementById('body');
    notice=isloading=document.getElementById('notice');    
    result=document.getElementById('result');
    root=document.getElementById('root');
    head.innerHTML = notice.innerHTML = '',
    result.innerHTML = root.innerHTML = '',
    isloading.innerHTML = "...loading..."
    
    body.innerHTML = `
    <h1 style="text-align: center;">ASSIGN CLASS HEAD </h1>
    <select id="aClasses" class="coverInput"  onChange="showCurrentHead()">
    <option  value='${0}'>Select&nbsp;Class</option>
    </select>
    <div id="currentHead" style="text-align: center;"></div>

    <p style="text-align: center; margin-top: 15px;"><strong>SELECT HEAD:</strong></p>
    <select id="aAdmins" class="coverInput" >
    <option  value='${0}'>Select&nbsp;admin</option>
    </select>
    <div class='buttoncontainer'>
    <button onclick="saveAssignClassHead('http://localhost:8001/Classes')"><strong>ASSIGN</strong></button>
    </div>
    `;    
    populateClassList('no', 'yes')
    populateAdminList('no')
    isloading.innerHTML = ""
    
}


const saveAssignedCourse= function(url){
    let aCourses=(document.getElementById('aCourses').value).trim();
    aCourses=convert(aCourses)
    let aClasses=(document.getElementById('aClasses').value).trim();
    aClasses=convert(aClasses)
    let aAdmins=(document.getElementById('aAdmins').value).trim();
    aAdmins=convert(aAdmins)
    
    
    isloading=document.getElementById('notice');
    isloading.innerHTML = "...loading..."
    
    const MyNewCourse = {
        course: aCourses,
       classId: aClasses,
       admin: aAdmins
    }
    
    const fetchData = async (url) => {
        await fetch(url, {method: "POST",
        headers: {"Content-Type" : "application/json;charset=utf-8"},
        body: JSON.stringify(MyNewCourse)
    })
    .then(res => {
        if(!res.ok){
            throw Error('could not fetch the data for that resource')
        }
        return res.json();
    })
    .then(data => {
        //console.log(data);
        location.href = `super.html?id=${myId}&ex=${Examid}&r=COURSES`; 
        isloading.innerHTML = ""
    })
}
fetchData(url)           
} 

const saveAssignClassHead= function(url){
    let aClasses=(document.getElementById('aClasses').value).trim();
    aClasses=convert(aClasses)
    let aAdmins=(document.getElementById('aAdmins').value).trim();
    aAdmins=convert(aAdmins)
    
    
    isloading=document.getElementById('notice');
    isloading.innerHTML = "...loading..."
    
    const MyNewCourse = {
        headId: aAdmins,
        headName: aAdmins,
    }

    url = url+'/'+aClasses
    
    const fetchData = async (url) => {
        await fetch(url, {method: "PATCH",
        headers: {"Content-Type" : "application/json;charset=utf-8"},
        body: JSON.stringify(MyNewCourse)
    })
    .then(res => {
        if(!res.ok){
            throw Error('could not fetch the data for that resource')
        }
        return res.json();
    })
    .then(data => {
        location.href = `super.html?id=${myId}&ex=${Examid}&r=CLASSES`; 
        isloading.innerHTML = ""
    })
}
fetchData(url)           
} 

const showCurrentHead = function(){
    let aClasses=(document.getElementById('aClasses').value).trim();
    aClasses=convert(aClasses)
    let headId

    let currentHeadName = function(headx){
    let currentHead = document.getElementById('currentHead');
    let ishead = 0

    ADMINSobj.length > 0 ? ( ADMINSobj.map((datab, i) => {
        if(headx == datab.id){
            ishead = 1
            currentHead.innerHTML = `<strong>CURRENT HEAD:</strong><br />${datab.firstName} ${datab.middleName} ${datab.lastName}`
        }
    })
    ):(
        console.log("class obj not set")
    )

    if(ishead == 0){
        currentHead.innerHTML = `<strong>CURRENT HEAD:</strong><br /> NONE`
    }
    }



    CLASSobj.length > 0 ? ( CLASSobj.map((datax, i) => {
        if(aClasses == datax.id){
            headId = datax.headId
            currentHeadName(headId)
        }
    })
    ):(
        console.log("class obj not set")
    )
}

const MyAdmins= function(){
    hideSubmenu()
    subMenumenus=document.getElementById('subMenumenus');
    let setClass = ``
    subMenumenus.innerHTML = ` 
    <ul> 
    ${setClass}
    </ul>
    `  
    navHeader=document.querySelector('.navHeader');
    navHeader.innerHTML = ` 
    <ul> 
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
        <h1 style="text-align: center;">ADMINS</h1>
        </div>
    
        `;    
        retrieveAdminList()     
}


const retrieveAdminList = function(){
        url = 'http://localhost:8001/Admins'
        
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
                body=document.getElementById('body'),
                
                data.length > 0 ? (data.map((datax, i) => {
                    i % 2 == 0 ? myMapClass="class='mapBackround1'" : myMapClass="class='mapBackround2'" 
                   
                        if(datax.approved == "no"){
                            val = "APPROVE"
                           action = `onClick="approveAdmin(${datax.id}, '${val}')">${val}</span>` 
                        }
                        else{
                            val = "SUSPEND"
                            action = `onClick="approveAdmin(${datax.id}, '${val}')">${val}</span>` 
                        }
                        body.innerHTML += `
                        <div ${myMapClass}>
                        <span style=" flex-grow: 1; background-color: inherit;">${i+1}, ${datax.firstName} ${datax.middleName} ${datax.lastName} </span>  
                        <span style="background-color: inherit;"><span class="mapBackroundButton" 
                        ${action}
                        <span  class="mapBackroundButton"  onClick="deleteAdmin(${datax.id})">DELETE</span></span>
                        </div>`
                    
                })
                ):(
                    notice=isloading=document.getElementById('notice'),  
                    isloading.innerHTML = "",
                    body=document.getElementById('body'),
                    body.innerHTML += `<p style="text-align: center;">Sorry, No admin available! </p>`
                )
            })
        }
    fetchData(url)               
}


const approveAdmin= function(id, status){
    url = 'http://localhost:8001/Admins'

    isloading=document.getElementById('notice');
    isloading.innerHTML = "...loading..."
    let MyNewCourse = {}
    if(status == "APPROVE"){
        //approve
        MyNewCourse = {
            approved: "yes",
        }
    }else{
        //suspend
       MyNewCourse = {
            approved: "no",
        }
    }

    url = url+'/'+id
    
    const fetchData = async (url) => {
        await fetch(url, {method: "PATCH",
        headers: {"Content-Type" : "application/json;charset=utf-8"},
        body: JSON.stringify(MyNewCourse)
    })
    .then(res => {
        if(!res.ok){
            throw Error('could not fetch the data for that resource')
        }
        return res.json();
    })
    .then(data => {
        location.href = `super.html?id=${myId}&ex=${Examid}&r=ADMINS`; 
        isloading.innerHTML = ""
    })
}
fetchData(url)           
} 


const deleteAdmin = function(id){
    url = 'http://localhost:8001/Admins/'
    //alert(url + id)
    fetch(url + id, { method: 'DELETE' })
    .then(() => {
        //redirectTo('/');
        location.href = `super.html?id=${myId}&ex=${Examid}&r=CLASSES`; 
    })
}


const deleteCourse = function(id){
    url = 'http://localhost:8001/Courses/'
    //alert(url + id)
    fetch(url + id, { method: 'DELETE' })
    .then(() => {
        //redirectTo('/');
        location.href = `super.html?id=${myId}&ex=${Examid}&r=COURSES`; 
    })
}


const editCourse = function(id, name){
    head=document.getElementById('head');
    body=document.getElementById('body');
    notice=isloading=document.getElementById('notice');    
    result=document.getElementById('result');
    root=document.getElementById('root');
    head.innerHTML = notice.innerHTML = '',
    result.innerHTML = root.innerHTML = '',
    isloading.innerHTML = "...loading..."
    
    body.innerHTML = `
    <h1 style="text-align: center;">EDIT ${coursesAs.toUpperCase()} </h1>
    <input  class="coverInput" id="tcourse" type='text' value="${name}" placeholder="Enter ${coursesAs} name" />
    <select id="aClasses2" class="coverInput" >
    <option value='${0}'>select&nbsp;class</option>
    </select>
    <div class='buttoncontainer'>
    <button onclick="updateCourse('http://localhost:8001/Courses', ${id})"><strong>UPDATE</strong></button>
    </div>
    `;    
    isloading.innerHTML = ""
    populateClassList('no', 'no', 'yes')
    
    
}

const updateCourse = function(url, id){
    tcourse=(document.getElementById('tcourse').value).trim();
    tcourse=convert(tcourse)
    aClasses=(document.getElementById('aClasses2').value).trim();
    aClasses=convert(aClasses)
    
    isloading=document.getElementById('notice');
    isloading.innerHTML = "...loading..."
    
    const MyNewCourse = {
        course: tcourse,
       classId: aClasses
    }
    url = url+'/'+id
    const fetchData = async (url) => {
        await fetch(url, {method: "PATCH",
        headers: {"Content-Type" : "application/json;charset=utf-8"},
        body: JSON.stringify(MyNewCourse)
    })
    .then(res => {
        if(!res.ok){
            throw Error('could not fetch the data for that resource')
        }
        return res.json();
    })
    .then(data => {
        //console.log(data);
        location.href = `super.html?id=${myId}&ex=${Examid}&r=COURSES`; 
        isloading.innerHTML = ""
    })
}
fetchData(url)           
} 


const classHeads = function(){
    hideSubmenu()

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
        <h1 style="text-align: center;">CLASS HEADS</h1>
        </div>
    
        `;    
        showClassHeads()   
        isloading.innerHTML = ""      
}


const showClassHeads = function(){
    body=document.getElementById('body')
    let i = 0
    CLASSobj.length > 0 ? (CLASSobj.map((datax) => {
                headId = datax.headId

            ADMINSobj.length > 0 ? ( ADMINSobj.map((datab) => {
              //  alert(headId +' == '+ datab.id)
            if(headId == datab.id){
                i % 2 == 0 ? myMapClass="class='mapBackround1'" : myMapClass="class='mapBackround2'" 
                body.innerHTML += `
                <div ${myMapClass}>
                <span style=" flex-grow: 1; background-color: inherit;">${i+1}, ${datab.firstName} ${datab.middleName} ${datab.lastName},
                <br /> CLASS: <strong>${datax.class}</strong> </span>  
                <span style="background-color: inherit;"><span class="mapBackroundButton" 
                <span  class="mapBackroundButton"  onClick="removeHead(${datax.id})">REMOVE</span></span>
                </div>`
                i++
            }
            })
            ):(
                console.log("admin obj not set")
            )
    })
    ):(
        console.log("class obj not set")
    )

}



const setCLASSobj =  function(){
    notice=document.getElementById('notice');
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
               isloading.innerHTML = ""
               CLASSobj = data
               //console.log(CLASSobj)
               notice.innerHTML = ''
                })     
    }
    fetchData(url)               
}

const setADMINSobj =  function(){
    notice=document.getElementById('notice');
    notice.innerHTML = '...loading...'
    url = 'http://localhost:8001/Admins'
    
    const fetchData = async (url) => {
        await fetch(url)
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch the data for that resource')
            }
               return res.json();
            })
            .then(data => {
               isloading.innerHTML = ""
               ADMINSobj= data
               //console.log(ADMINSobj)
               notice.innerHTML = ''
               setCLASSobj()
            })     
              
    }
    fetchData(url)               
}


const removeHead = function(id){
    isloading=document.getElementById('notice');
    isloading.innerHTML = "...loading..." 
    const MyNewCourse = {
        headId: "",
    }
    url = 'http://localhost:8001/Classes'
    url = url+'/'+id
    const fetchData = async (url) => {
        await fetch(url, {method: "PATCH",
        headers: {"Content-Type" : "application/json;charset=utf-8"},
        body: JSON.stringify(MyNewCourse)
    })
    .then(res => {
        if(!res.ok){
            throw Error('could not fetch the data for that resource')
        }
        return res.json();
    })
    .then(data => {
        //console.log(data);
        location.href = `super.html?id=${myId}&ex=${Examid}&r=HEADS`; 
        isloading.innerHTML = ""
    })
}
fetchData(url)           
}