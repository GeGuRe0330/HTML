function onLoad(){
    //id 패턴검색 이벤트 정의
    let id = document.querySelector("#id");
    let idPattern = /^[\w]{3,12}/;
    let pwd = document.querySelector("#pw");
    let pwPattern = /^[\w]{6,8}/;
    let pwdCheck = document.querySelector("#pwCheck");
    let name = document.querySelector("#name");
    let namePattern = /^(?:[가-힣]{2,5}|[a-zA-Z ]{4,20})$/;;
    let nickname = document.querySelector("#nickname");
    let nicknamePattern = /^(?:[가-힣]{2,}|[a-zA-Z0-9]{4,})$/;
    let email = document.querySelector("#email");
    let emailPattern = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    let tel = document.querySelector("#tel");
    let telPattern = /^\d{3}-\d{3,4}-\d{4}$/;
    let phone = document.querySelector("#phoneNum");
    let phonePattern =/^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    let birthday = document.querySelector("#birthDay");
    let birthdayPattern = /^(?!\s*$).+/;
    let addrSearch = document.querySelector("#addrSearch");
    let zipcode = document.querySelector("#zipcode");
    let zipcodePattern = /^(?!\s*$).+/;
    let addr1 = document.querySelector("#addr1");
    let addr1Pattern = /^(?!\s*$).+/;
    let addr2 = document.querySelector("#addr2");
    let addr2Pattern = /^(?!\s*$).+/;

    let infoList = [id,pwd,name,nickname,email,tel,phone,birthday,addr1,addr2];
    let patternList = [idPattern,pwPattern,namePattern,nicknamePattern,emailPattern,telPattern,phonePattern,birthdayPattern,addr1Pattern,addr2Pattern];
    let messageList = ["영문자, 숫자, _만 입력가능, 최소 3자이상 12자이하로 입력하세요",
    "영문자, 숫자, _만 입력가능, 최소 6자이상 8자이하로 입력하세요",
    "이름형식에 맞는 입력값을 입력해주세요",
    "공백없이 한글,영문,숫자만 입력 가능 (한글2자, 영문4자 이상)",
    "이메일 형식에 맞는 입력값을 입력해주세요",
    "올바른 전화번호를 입력해주세요",
    "올바른 핸드폰번호를 입력해주세요",
    "생년월일을 입력해주세요",
    "기본주소를 입력해주세요",
    "상세주소를 입력해주세요"];
    let isCorrect = Array(infoList.length).fill(false);

    for(let i=0; i<infoList.length; i++){
        infoList[i].addEventListener("blur",()=>{
            isCorrect[i] = patternCheck(infoList[i],patternList[i],messageList[i]);
        })
    }

    let isSamepwd = false;
    pwdCheck.addEventListener("blur",()=>{
        if(pwdCheck.value === pwd.value){
            pwdCheck.nextElementSibling.innerHTML = "성공";
            pwdCheck.nextElementSibling.style.color = "blue";
            isSamepwd = true;
        }else{
            pwdCheck.nextElementSibling.innerHTML = "비밀번호와 같지않습니다.";
            pwdCheck.nextElementSibling.style.color = "red";
            isSamepwd = false;
        }
    });

    
    addrSearch.addEventListener("click",()=>{
        new daum.Postcode({
            oncomplete: function(data){
                if(data !== null && data !== undefined){
                    console.log("zipcode", data.zonecode);
                    console.log("data.roadAddress", data.roadAddress);
                    zipcode.value = data.zonecode;
                    addr1.value = data.roadAddress;
                }else{
                    addrSearch.nextElementSibling.innerHTML = "api오류 발생 직접입력바람";
                    zipcode.focus();
                }
            }
        }).open();
    });

    let signUp = document.querySelector("#signUp");
    signUp.addEventListener("click",()=>{
        const humanCheck = document.querySelector("#checkHuman");
        for (let i = 0; i < infoList.length; i++) {
            isCorrect[i] = patternCheck(infoList[i], patternList[i], messageList[i]);
        }
    
        if (isSamepwd === true) {
            let allTrue = true;
            for (let i = 0; i < isCorrect.length; i++) {
                if (!isCorrect[i]) {
                    allTrue = false;
                    break;
                }
            }
            const pathRadios = document.querySelectorAll('input[name="path"]');
            let pathChecked = false;
            for (let radio of pathRadios) {
                if (radio.checked) {
                    pathChecked = true;
                    break;
                }
            }
            if (allTrue && pathChecked && humanCheck === "RECAPCHA") {
                alert("전송완료");
                return;
            }
        }
    
        alert("입력값을 다시한번 확인해주세요");
    });

    let btnReset = document.querySelector("#reset");
    btnReset.addEventListener("click", ()=>{
        // let spans = document.querySelectorAll("span");
        // for(let i=2; i<spans.length; i++){
        //     spans[i].innerText = "";
        // }
        for(let i=0; i<infoList.length; i++){
            patternCheck(infoList[i],/a^/,"");
            pwdCheck.nextElementSibling.innerHTML = "";
        }
    });

    function patternCheck(item,pattern,message){
        if(item.value.match(pattern)){
            item.nextElementSibling.innerHTML = "성공";
            item.nextElementSibling.style.color = "blue";
            return true;
        }else{
            item.nextElementSibling.innerHTML = message;
            item.nextElementSibling.style.color = "red";
            item.value = "";
            return false;
        }
    }
}