function getTemplate_t1(){
    template_1 = 
            `
               
                    <div class="option1">
                        <img src="./assets/img/quesstion1.png" alt="options">
                    </div>
                    <div class="option2">
                        <img src="./assets/img/question2.png" alt="options">
                    </div>
                    <div class="option3">
                        <img src="./assets/img/quesstion3.png" alt="options">
                    </div>
                
            `
    return template_1
}

function getTemplate_t2(ques, ans, img_link){
    var template_2 = `
                

                    <div class="answers-option-2-img">
                        <img src="./assets/img/ques-2.png" alt="options">
                    </div>
                    <div class="answers-option-2-choices">
                        <button class="btn-choice" id=" q1-choice1">${ans[0]}</button>
                        <button class="btn-choice" id=" q1-choice2">${ans[1]}</button>
                        <button class="btn-choice" id=" q1-choice3">${ans[2]}</button>
                    </div>

                

            `
    return template_2
}
function getTemplate_t3(ans){
    var template_3 = `
                

                    <div class="answers-option-2-img">
                        <img src="./assets/img/ques-2.png" alt="options">
                    </div>
                    <div class="answers-option-2-choices">
                        <button class="btn-choice" id=" q1-choice1">${ans[0]}</button>
                        <button class="btn-choice" id=" q1-choice2">${ans[1]}</button>
                        <button class="btn-choice" id=" q1-choice3">${ans[2]}</button>
                    </div>

                

            `
    return template_3;
}
var questionIndx=0;

correctAnswerList=[];
answerState=[];

currentAnswerSelected = null;

startQuix();

var imgChoice1; 
var imgChoice2;
var imgChoice3;
function setType1Events(){
    choice1, choice2, choice3 = null;
    imgChoice1 = document.getElementsByClassName('option1')[0];
    imgChoice1.addEventListener('click', e=>{
        console.log('chosen img-1');
        activateSelectedImg(imgChoice1);

    })

    imgChoice2 = document.getElementsByClassName('option2')[0];
    imgChoice2.addEventListener('click', e=>{
        console.log('chosen img-2');
        activateSelectedImg(imgChoice2);
    })

    imgChoice3 = document.getElementsByClassName('option3')[0];
    imgChoice3.addEventListener('click', e=>{
        console.log('chosen img-3');
        activateSelectedImg(imgChoice3);
    })
    
}
var choice1;
var choice2;
var choice3;
function setType2n3Events(){
    imgChoice1, imgChoice2, imgChoice3 = null;
    choice1, choice2, choice3 = null;
    choice1 = document.getElementById(" q1-choice1")

    choice1.addEventListener("click", e=>{
        removeAllActiveChoices(choice1);
    })

    choice2 = document.getElementById(" q1-choice2")
    choice2.addEventListener("click", e=>{
        removeAllActiveChoices(choice2);
    })

    choice3 = document.getElementById(" q1-choice3")
    choice3.addEventListener("click", e=>{
        removeAllActiveChoices(choice3);
    })
}


function removeAllActiveChoices(chosenBtn){
    choice1.classList.remove("btn-choice-active");
    choice2.classList.remove("btn-choice-active");
    choice3.classList.remove("btn-choice-active");
    
    chosenBtn.classList.add("btn-choice-active");
}

function activateSelectedImg(chosenImg){
    imgChoice1.firstElementChild.classList.remove("img-option-active");
    imgChoice2.firstElementChild.classList.remove("img-option-active");
    imgChoice3.firstElementChild.classList.remove("img-option-active");

    chosenImg.firstElementChild.classList.add("img-option-active");
}

function removeAllOptions(){
    console.log('removing all options');
}
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", e =>{ 
    console.log("submit clicked");
    var childrenImg = document.getElementsByClassName("answer-options")[0].children;
    console.log(`length of img children: ${childrenImg.length}`);
    var childrenOption = document.getElementsByClassName("btn-choice")

    if(childrenImg.length>0){
        console.log('type-1 submitted')
        for( var i=0; i<childrenImg.length; i++){
            if(childrenImg[i].firstElementChild.classList.contains("img-option-active")){
                console.log(`submitted image: ${i}`);
                console.log("remove options now");
                document.getElementsByClassName("answer-options")[0].innerHTML="";
                
                answerState.push(i);
                
            }
        }
    }
    else if(childrenOption.length>0){
        console.log("buttons exist");
        for(var i=0; i<childrenOption.length; i++){
            if(childrenOption[i].classList.contains("btn-choice-active")){
                console.log(`submitted btn: ${i}`);
                console.log("remove options now");
                document.getElementsByClassName("answers-option-2-choices")[0].innerHTML="";
                document.getElementsByClassName("answers-option-2")[0].innerHTML="";
                answerState.push(i);
            }
        }
    }
});

const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", e =>{ 
    console.log("clicked on next button");
    nextQuestion();
});


function nextQuestion(){
    if(questionIndx<=data.length-1){
        console.log(`answer question number ${questionIndx+1}`);

        correctAnswerList.push(data[questionIndx]["correct-indx"])

        quesNumTag = `<span>Question ${questionIndx+1}</span><span>/10</span>`;
        document.getElementsByClassName("question-number")[0].innerHTML = quesNumTag;

        question = `<p>${data[questionIndx]["ques"]}</p>`;
        document.getElementsByClassName("question")[0].innerHTML = question;
        var template;
        if(data[questionIndx]['type']==1){
            console.log("type 1");
            document.getElementsByClassName("answer-options")[0].innerHTML = getTemplate_t1();
            setType1Events();
        }
        else if(data[questionIndx]['type'] == 2){
            console.log("type 2");
            document.getElementsByClassName("answers-option-2")[0].innerHTML = getTemplate_t2( data[questionIndx]['ques'], data[questionIndx]["answer-opts"], data[questionIndx]["img"]);
            setType2n3Events();
        }
        else{
            console.log("type 3");
            document.getElementsByClassName("answers-option-2")[0].innerHTML = getTemplate_t3(data[questionIndx]['answer-opts']);
            setType2n3Events();
        }

        t1 = document.getElementsByClassName("answer-options")
        t2n3 = document.getElementsByClassName("answer-options")
        


        
        questionIndx++;
    }
    else if(questionIndx==data.length){
        document.getElementsByClassName("quiz-questions")[0].innerHTML += `
                                                                            <h1 style="color:#0062FF;text-align: center;">SCORE</h1>
                                                                            <h1 style="color:#60D91A; font-size:40px;text-align: center;">80%</h1>
                                                                            `;
        endQuiz();
    }
    
}

function startQuix(){
    nextQuestion();
}