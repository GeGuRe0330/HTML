function onLoad(){
    let id = document.querySelector("#id");
    let pwd = document.querySelector("#pw");
    let btnLogin = document.querySelector("#loginBtnTd");

    const loginId = "GeGuRe"
    const loginPwd = "1111"

    btnLogin.addEventListener("click",()=>{
        if(id.value === loginId && pwd.value === loginPwd){
            alert("개구리");
        }else{
            id.value = "";
            pwd.value = "";
            id.placeholder = "로그인정보를 확인하세요"
            
        }
    });
}