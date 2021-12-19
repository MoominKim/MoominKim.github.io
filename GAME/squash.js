$(document).ready(function () {
    let page;
    let nowmodal;
    let isball = localStorage.getItem("ball");
    let isracket = localStorage.getItem("racket");
    let gamesolved = localStorage.getItem("game");
    localStorage.removeItem("ball");
    localStorage.removeItem("racket");
    localStorage.removeItem("game");
    $("#foreground").hide();
    const arrowpos = {
        squash: [
            {
                arr: "start",
                pos: "bottom:0%; left: 1%;",
                rot: "transform: rotate( -90deg );",
            },
        ],
        squashin: [
            {
                arr: "squash",
                pos: "bottom:0%; left: 1%;",
                rot: "transform: rotate( -90deg );",
            },
        ],
    };
    const buttonpos = {
        squash: [
            {
                arr: "squashin",
                pos: "top:70%;left:15%;",
                img: "img/button14.png",
            },
            {
                arr: "squashroom",
                pos: "top:70%;left:75%;",
                img: "img/button14.png",
            },
        ],
        squashin: [
            {
                arr: "balls",
                pos: "top:70%;left:70%;",
                img: "img/button14.png",
            },
            {
                arr: "rackets",
                pos: "top:30%;left:70%;",
                img: "img/button14.png",
            },
        ],
    };
    const Mod = {
        getracket: {
            name: "!",
            desc: "스쿼시 라켓을 얻었다",
            id: "getracket",
        },
        getball: {
            name: "!",
            desc: "스쿼시 공을 얻었다",
            id: "getball",
        },
        noracket: {
            name: "ㅠㅠ",
            desc: "스쿼시 라켓이 없다..",
            id: "noracket",
        },
        noball: {
            name: "ㅠㅠ",
            desc: "스쿼시 공이 없다..",
            id: "noball",
        },
        hasracket: {
            name: "?",
            desc: "이미 라켓이 있다",
            id: "hasracket",
        },
        hasball: {
            name: "?",
            desc: "이미 공이 있다",
            id: "hasball",
        },
        gamedesc: {
            name: "!",
            desc: "반짝이는 곳을 공으로 맞춰라!",
            id: "gamedesc",
        },
        gethint: {
            name: "의문의 분노가 차오른다",
            desc: "스쿼시볼을 잘 알아볼것 같다",
            id: "gethint",
        },
        getrelic: {
            name: "상해를 가한 스쿼시볼",
            desc: "내년에 ㅎㅎ가 수능을 망치면 이걸 머리에 맞은 탓입니다. 아 암튼 그럼.)",
            id: "relic",
        },
    };

    /*




            *********************
            모달시작
        *********************


    */
    const pos = [
        {
            leftX: 340,
            rightX: 405,
            upY: 100,
            lowY: 170,
        },
        {
            leftX: 960,
            rightX: 1050,
            upY: 365,
            lowY: 450,
        },
        {
            leftX: 550,
            rightX: 650,
            upY: 245,
            lowY: 320,
        },
        {
            leftX: 900,
            rightX: 1000,
            upY: 100,
            lowY: 250,
        },
    ];
    function makegame() {
        changepage("game");
        let now = 0;
        let x;
        let y;
        let top = (pos[now].upY + pos[now].lowY) / 2;
        let left = (pos[now].leftX + pos[now].rightX) / 2;
        let gamebutton = {
            pos: "top:" + top + ";left:" + left,
            img: "img/gamebutton.png",
        };
        //alert(gamebutton.pos + " " + gamebutton.img);
        makebutton(gamebutton);
        $(document).on("click", function (e) {
            x = e.pageX;
            y = e.pageY;
            if (
                pos[now].leftX <= x &&
                x <= pos[now].rightX &&
                pos[now].upY <= y &&
                y <= pos[now].lowY
            ) {
                //alert(x + " " + y);
                if (now == 3) {
                    makemodal("gethint");
                    $(".button").remove();
                    return;
                }
                $(".button").remove();
                now += 1;
            }
        });
    }
    function makemodal(modalname) {
        const c = Mod[modalname];
        nowmodal = modalname;
        $(".button").hide();
        $("#foreground").show();
        $("#foreground").html(
            `
                  <div class="popup" id="${c.id}">
                  <button class="exit">X</button>
                  <h1>${c.name}</h1>
                  <span>${c.desc}</span>
                  ${c.img ? `<img src="${c.img}" />` : ""}
                  </div>
              `
        );
        return;
    }
    $(document).on("click", "#foreground, .exit", function (e) {
        if (e.target === this) {
            $(".popup").remove();
            $("#foreground").hide();
            $(".button").show();
            if (nowmodal == "getball") {
                isball = true;
                localStorage.setItem("ball", 1);
            }
            if (nowmodal == "getracket") {
                isracket = true;
                localStorage.setItem("racket", 1);
            }
            if (nowmodal == "gamedesc") {
                makegame();
            }
            if (nowmodal == "gethint") {
                gamesolved = 1;
                localStorage.setItem("game", 1);
                changepage("squash");
            }
        }
    });
    /*









    */

    function makearrow(info) {
        return `<img class="arrow ${info.arr}" style="${info.pos} ${info.rot}" src="img/arrow.png">`;
    }
    function makebutton(info) {
        return `<img class="button ${info.arr}" style="${info.pos} ${info.rot}" src="${info.img}">`;
    }
    function changepage(background) {
        page = background;
        $("#background").prop("src", "background/" + page + ".jpg");
        $(".button").remove();
        $(".arrow").remove();
        if (buttonpos[background]) {
            buttonpos[background].forEach((info) => {
                $("body").append(makebutton(info));
            });
        }
        if (arrowpos[background]) {
            arrowpos[background].forEach((info) => {
                $("body").append(makearrow(info));
            });
        }
        if (page == "squashroom") {
            makemodal("gamedesc");
        }
    }
    /*







    */
    $(document).on("click", ".button", function (e) {
        let myclass = $(this).attr("class").split(" ")[1];
        if (myclass == "balls") {
            if (gamesolved == true) {
                makemodal("getrelic");
                return;
            }
            if (isball == true) {
                makemodal("hasball");
            }
            if (isball != true) {
                makemodal("getball");
            }
            return;
        }
        if (myclass == "rackets") {
            if (isracket == true) {
                makemodal("hasracket");
            } else {
                makemodal("getracket");
            }
            return;
        }
        if (myclass == "squashroom") {
            if (isball != true) {
                makemodal("noball");
                return;
            }
            if (isracket != true) {
                makemodal("noracket");
                return;
            }
        }
        changepage(myclass);
    });
    $(document).on("click", ".arrow", function (e) {
        let myclass = $(this).attr("class").split(" ")[1];
        if (myclass == "start") {
            location.href = "start.html";
            return;
        }
        changepage(myclass);
    });
    changepage("squash");
    //makegame();
});
