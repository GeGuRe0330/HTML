// 전체 document 메모리에 모두 로드가 되었을 때 onLoad() 함수 call
function onLoad() {
    // id 패턴 검색을 진행할 이벤트 정의
    let idPattern = /^[\w]{3,12}$/;
    let pwPattern = /^[\w]{6,8}$/;
    let namePattern = /^[가-힣]{1,4}|[a-zA-Z]{1}[a-zA-Z\x20]{1,10}$/;
    let nicknamePattern = /^(?:(?=[가-힣0-9]*[가-힣]{2,})|(?=[a-zA-Z0-9]*[a-zA-Z]{4,}))[가-힣a-zA-Z0-9]+$/;
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let id = document.querySelector("#id");
    let pw = document.querySelector("#pw");
    let name = document.querySelector("#name");
    let pwCheck = document.querySelector("#pwCheck");
    let nickname = document.querySelector("#nickname");
    let submit = document.querySelector("#submit");

    id.addEventListener("blur", () => {
        validata(id, idPattern, "영문자, 숫자, _만 입력 가능. 최소 3자이상 12자 이하만 입력하세요.");
    });

    pw.addEventListener("blur", () => {
        validata(pw, pwPattern, "영문자, 숫자, _만 입력 가능. 최소 6자이상 8자 이하만 입력하세요.");
    });

    pwCheck.addEventListener("blur", () => {
        if (pw.value === pwCheck.value) {
            pwCheck.nextElementSibling.innerHTML = "비밀번호가 일치합니다.";
            pwCheck.nextElementSibling.style.color = "blue";
            return true;
        } else {
            pwCheck.nextElementSibling.innerHTML = "영문자, 숫자, _만 입력 가능. 최소 6자이상 8자 이하만 입력하세요.";
            pwCheck.nextElementSibling.style.color = "tomato";
            pwCheck.value = "";
            pwCheck.focus();
            return false;
        }
    });

    name.addEventListener("blur", () => {
        validata(name, namePattern, "1-4자의 한글 또는 영어로 입력해주세요.");
    });

    nickname.addEventListener("blur", () => {
        validata(nickname, nicknamePattern, "공백없이 한글,영문,숫자만 입력 가능 (한글2자, 영문4자 이상)");
    });

    email.addEventListener("blur", () => {
        validata(email, emailPattern, "정확한 이메일을 입력해주세요.");
    });

    // 회원가입 전송 기능 점검
    submit.addEventListener("click", function () {
        // 아이디
        let idReturn = validate(id, idPattern, "값을 정확하게 입력해주세요.");
        let pwReturn = validate(pw, idPattern, "값을 정확하게 입력해주세요.");
        let nameReturn = validate(name, namePattern, "값을 정확하게 입력해주세요.");
        if (nameReturn === false) {
            return;
        }
        // 패스워드
        alert('서버에 전송');
        let form = document.querySelector("form");
        form.submit();
    });

    // 공동으로 사용되는 함수
    function validata(inputObj, pattern, message) {
        if (inputObj.value.match(pattern)) {
            inputObj.nextElementSibling.innerHTML = "성공";
            inputObj.nextElementSibling.style.color = "blue";
            return true;
        } else {
            inputObj.nextElementSibling.innerHTML = message
            inputObj.nextElementSibling.style.color = "tomato";
            inputObj.value = "";
            inputObj.focus();
            return false;
        }
    };
}

//  자바크립트파일 변수추가
let addrSearch = document.querySelector("#addrSearch");
let zipcode = document.querySelector("#zipcode");
let addr1 = document.querySelector("#addr1");
// 이벤트리스너 생성
addrSearch.addEventListener("click", () => {
    new daum.Postcode({
        oncomplete: function (data) {
            if (data !== null && data !== undefined) {
                console.log("zipcode", data.zonecode);
                console.log("data.roadAddress", data.roadAddress);
                zipcode.value = data.zonecode;
                addr1.value = data.roadAddress;
            } else {
                addrSearch.nextElementSibling.innerHTML = "api오류 발생 직접입력바람";
                zipcode.focus();
            }
        }
    }).open();
});


