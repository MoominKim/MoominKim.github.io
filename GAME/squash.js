$(document).ready(function () {
    let page;
    let nowmodal;
    let isball = localStorage.getItem("ball");
    let isracket = localStorage.getItem("racket");
    let gamesolved = localStorage.getItem("game");
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
        cleared: {
            name: "?",
            desc: "더 이상 볼 일이 없는 듯 하다..",
            id: "cleared",
        },
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
            desc: "스쿼시볼을 잘 알아볼 것 같다",
            id: "gethint",
        },
        getrelic: {
            name: "상해를 가한 스쿼시볼",
            desc: "내년에 ㅎㅎ가 수능을 망치면 이걸 머리에 맞은 탓입니다. 아 암튼 그럼.)",
            id: "relic",
        },
    };
    /*


    
    */

    function makearrow(info) {
        return `<img class="arrow ${info.arr}" style="${info.pos} ${info.rot}" src="img/arrow.png">`;
    }
    function makebutton(info) {
        //alert(info.arr + " " + info.pos + " " + info.img);
        return `<img class="button ${info.arr}" style="${info.pos}" src="${info.img}">`;
    }
    function changepage(background) {
        //alert(background);
        page = background;
        $("#background").prop("src", "background/" + page + ".jpg");
        $("#ball").remove();
        $(".button").remove();
        $(".arrow").remove();
        if (buttonpos[background]) {
            buttonpos[background].forEach((info) => {
                //alert(info.arr + " " + info.pos + " " + info.img);
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




            *********************
            모달시작
        *********************


    */
    const pos = [
        {
            X: 12,
            Y: 21,
        },
        {
            X: 48,
            Y: 62,
        },
        {
            X: 33,
            Y: 35,
        },
        {
            X: 20,
            Y: 60,
        },
    ];
    function makeball() {
        return `<img id="ball" src="img/button14.png">`;
    }
    function makegame() {
        if (gamesolved == true) {
            changepage("squash");
            return;
        }
        changepage("game");
        $("body").append(makeball());
        let now = 0;
        let gamebutton = {
            arr: "game",
            pos: "top:" + pos[now].X + "%;left:" + pos[now].Y + "%;",
            img: "img/gamebutton.png",
        };
        var $ball = $("#ball");
        //alert(background);
        $("body").append(makebutton(gamebutton));
        $(document).on("click", ".button", function (e) {
            if (page != "game") return;
            if (now == 3) {
                $("#ball").remove();
                $(".button").remove();
                makemodal("gethint");
                now = 0;
                return;
            }
            $(".button").remove();
            now += 1;
            let gamebutton = {
                arr: "game",
                pos: "top:" + pos[now].X + "%;left:" + pos[now].Y + "%;",
                img: "img/gamebutton.png",
            };
            if (gamesolved == true) {
                makemodal("gethint");
                now = 0;
                $(".button").remove();
                return;
            }
            $("body").append(makebutton(gamebutton));
        });
        $(document).on("click", function (e) {
            if (page != "game") {
                $("#ball").remove();
                return;
            }
            var $ball = $("#ball");
            $ball.animate(
                {
                    // stop()을 넣어주면 애니메이션 도중에 다른 애니메이션을 실행시킬 수 있다.
                    left: e.clientX,
                    top: e.clientY,
                    width: "10%",
                },
                1000,
                function () {
                    $("#ball").remove();
                    $("body").append(makeball());
                }
            );
        });
    }
    function makemodal(modalname) {
        const c = Mod[modalname];
        if (modalname == "gethint") {
            //(page);
        }
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
                gamesolved = true;
                localStorage.setItem("game", true);
                changepage("squash");
            }
            //alert(nowmodal);
        }
    });
    /*









    */
    $(document).on("click", ".button", function (e) {
        if (page == "game") return;
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
            if (gamesolved == true) {
                makemodal("cleared");
            }
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
    //changepage("squash");
    makegame();
});
