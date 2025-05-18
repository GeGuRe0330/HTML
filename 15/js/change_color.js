        // 1. 객체를 찾는다. Student stu = new Student(); => 객체배열 => Colletion Framework
        // document ( 화면에 있는 모든 UI 객체를 다 가지고 있다. ) => 어떻게 찾나? ( css 선택자 기능을 가지고! )
        // 한개만 찾고 싶으면 id를 줘야한다. => 그럼 class 이름으로 찾으면? => 객체 참조 배열 [첨자] 반복문을 이용하면 된다!
        h1obj = document.querySelector("#heading");

        // 2. 객체를 내 마음대로 설정 ( 기본속성, style속성, 이벤트 속성 : on , content )
        h1obj.onclick = () => {
            h1obj.style.color = "#ff0000";
            window.alert("클릭 해부렀으");
        };