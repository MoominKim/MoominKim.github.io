$(document).ready(function () {
    let page = localStorage.getItem("start");
    if (!page) page = "tenis";
    let nowmodal;
    let locksolved = localStorage.getItem("lock");
    let ralysolved = localStorage.getItem("raly");
    let consolesolved = localStorage.getItem("console");
    let lacketsolved = localStorage.getItem("lacket");
    //localStorage.clear();
    $("#foreground").hide();
    const arrowpos = {
        tenis: [
            {
                arr: "gym",
                pos: "bottom:0%; right: 1%;",
                rot: "transform: rotate( 90deg );",
            },
            {
                arr: "ending",
                pos: "bottom:0%; left: 1%;",
                rot: "transform: rotate( -90deg );",
            },
        ],
        cabinralyfocus: [
            {
                arr: "tenis",
                pos: "bottom:0%; left: 1%;",
                rot: "transform: rotate( -90deg );",
            },
        ],
        ralyfocus: [
            {
                arr: "cabinralyfocus",
                pos: "bottom:0%; left: 1%;",
                rot: "transform: rotate( -90deg );",
            },
        ],
        cabinfocus: [
            {
                arr: "cabinralyfocus",
                pos: "bottom:0%; left: 1%;",
                rot: "transform: rotate( -90deg );",
            },
        ],
        ralyconsole: [
            {
                arr: "ralyfocus",
                pos: "bottom:0%; left: 1%;",
                rot: "transform: rotate( -90deg );",
            },
        ],
        cabinlock: [
            {
                arr: "cabinfocus",
                pos: "bottom:0%; left: 1%;",
                rot: "transform: rotate( -90deg );",
            },
        ],
        rackets: [
            {
                arr: "tenis",
                pos: "bottom:0%; left: 1%;",
                rot: "transform: rotate( -90deg );",
            },
        ],
    };
    const buttonpos = {
        tenis: [
            {
                arr: "cabinralyfocus",
                pos: "top:29.5%;left:43.5%;height:23vh;width:35vh;",
                img: "img/cabinralyfocus.png",
            },
            {
                arr: "rackets",
                pos: "bottom:13.5%;left:0%;height:21vh;width:15vw;",
                img: "img/rackets.png",
            },
            {
                arr: "button14",
                pos: "bottom:50%;right:5%;",
                img: "img/button14.png",
            },
        ],
        cabinralyfocus: [
            {
                arr: "ralyfocus",
                pos: "top:23.5%;left:30%;height:76vh;width:124vh;",
                img: "img/ralyfocus.png",
            },
            {
                arr: "cabinfocus",
                pos: "top : 5.5%;left: 14%;height:65vh;width:40vh;",
                img: "img/cabinfocus.png",
            },
        ],
        ralyfocus: [
            {
                arr: "table",
                pos: "top:55%;left:20%;opacity: 1;",
                img: "img/table.png",
            },
            {
                arr: "ralyconsole",
                pos: "top:52%;left:0%;height:20vh;width:20vh;",
                img: "img/ralyconsole.png",
            },
        ],
        cabinfocus: [
            {
                arr: "cabinlock",
                pos: "top:1%;left:25%;",
                img: "img/button16.png",
            },
        ],
        cabinlock: [
            {
                arr: "cabinopen",
                pos: "top:10%;left:32%;opacity:1;",
                img: "img/goldencircle.png",
            },
        ],
        rackets: [
            {
                arr: "racket",
                pos: "top:27%;left:29.5%;width:27vh;",
                img: "img/button17.png",
            },
        ],
        cabinopen: [
            {
                arr: "jjokji",
                pos: "top:44%;left:20.5%;width:27vh;",
                img: "img/button57.png",
            },
        ],
    };
    const Mod = {
        cleared: {
            name: "?",
            desc: "더 이상 볼 일이 없는 듯 하다..",
            id: "cleared",
        },
        cantfind: {
            name: "??",
            desc: "다 똑같은 탁구채처럼 보인다..",
            id: "cantfind",
        },
        needball: {
            name: "??",
            desc: "봉인 중앙에 탁구공 크기의 공간이 있다.",
            id: "needball",
        },
        describe: {
            name: "랠리머신이다",
            desc: "아무것도 올라와 있지 않다..",
            id: "describe",
        },
        button14: {
            name: "이스터에그 버튼14",
            desc: "이 게임이 그래픽이란 것을 가지기 전에 존재했던 태초의 생명체",
            id: "button14",
        },
        ralyin: {
            name: "랠리머신이다",
            desc: "황금색의 탁구공이다. 어딘가 쓸데가 있을 듯 하다.",
            id: "ralyin",
        },
        actived: {
            name: "계기판이다",
            desc: "퍼즐을 풀어보자",
            id: "actived",
        },
        problem: {
            name: "비밀번호",
            desc: "ㄹ11 ㄹ6 → 뒤우주*10 qlalfqjsgh",
            id: "problem",
        },
        lockhint: {
            name: "탁구채",
            desc: "푸른하늘~ 푸른하늘 꿈이~ 담긴 나의 유물을 이곳에 남기노라”",
            id: "lockhint",
        },
        getlacket: {
            name: "LSI의 탁구채",
            desc: "디미 왕국의 탁구 챔피언이 쓰던 탁구채...와 같은 브랜드입니다. 건강증진센터의 전설이었던 플라톤이 애용하던 탁구채...와 비슷하게 생겼네요",
            id: "getlacket",
        },
        opendoor: {
            name: "!",
            desc: "황금공을 갖다대자 문이 열린다",
            id: "opendoor",
        },
    };

    /*




            *********************
            모달시작
            *********************


    */
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
            if (nowmodal == "actived") {
                makemodal("problem");
            }
            if (nowmodal == "ralyin") {
                ralysolved = "true";
                localStorage.setItem("raly", true);
                changepage("cabinralyfocus");
            }
            if (nowmodal == "lockhint") {
                locksolved = "true";
                localStorage.setItem("lock", true);
                changepage("cabinlock");
            }
            if (nowmodal == "cantfind") {
                changepage("tenis");
            }
            if (nowmodal == "getlacket") {
                changepage("tenis");
                lacketsolved = "true";
                localStorage.setItem("lacket", true);
            }
            if (nowmodal == "opendoor") {
                changepage("cabinopen");
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
        if (page == "cabinlock" && locksolved == "true") {
            $("#background").prop("src", "background/" + page + "2.jpg");
        } else {
            $("#background").prop("src", "background/" + page + ".jpg");
        }
        $(".button").remove();
        $(".arrow").remove();
        if (arrowpos[background]) {
            arrowpos[background].forEach((info) => {
                $("body").append(makearrow(info));
            });
        }
        if (buttonpos[background]) {
            if (ralysolved == "true" && page == "ralyfocus") {
                return;
            }
            if (locksolved != "true" && page == "rackets") {
                return;
            }
            buttonpos[background].forEach((info) => {
                if (page == "cabinlock" && locksolved == "true") {
                    info.pos = "top:10%;left:32%;opacity:0;";
                }
                if (info.arr == "table" && consolesolved != "true") {
                    info.pos = "top:5%;left:11%;";
                    info.img = "img/button100.png";
                }
                $("body").append(makebutton(info));
                if (info.arr == "table" && consolesolved != "true") {
                    info.img = "img/table.png";
                }
            });
        }
        if (page == "ralyconsole") {
            makemodal("actived");
        }
    }
    /*







    */
    $(document).on("click", ".button", function (e) {
        let myclass = $(this).attr("class").split(" ")[1];
        if (page == "rackets") {
            if (locksolved == "true") {
                makemodal("getlacket");
                return;
            } else {
                makemodal("cantfind");
                return;
            }
        }
        if (page == "cabinlock") {
            if (locksolved == "true") {
                makemodal("cleared");
                return;
            } else if (ralysolved == "true") {
                makemodal("opendoor");
                return;
            } else {
                makemodal("needball");
                return;
            }
        }
        if (myclass == "table") {
            if (ralysolved == "true") {
                makemodal("cleared");
                return;
            }
            if (consolesolved != "true") {
                makemodal("describe");
                return;
            }
            if (consolesolved == "true") {
                makemodal("ralyin");
                return;
            }
            if (ralysolved == "true") {
                makemodal("cleared");
                return;
            }
        }
        if (page == "ralyconsole") {
            if (ralysolved == "true") {
                makemodal("cleared");
                return;
            } else {
                makemodal("actived");
                return;
            }
        }
        if (myclass == "rackets" && lacketsolved == "true") {
            makemodal("cleared");
            return;
        }
        if (myclass == "button14") {
            makemodal("button14");
            return;
        }
        if (myclass == "jjokji") {
            makemodal("lockhint");
            return;
        }
        changepage(myclass);
    });
    $(document).on("click", ".arrow", function (e) {
        let myclass = $(this).attr("class").split(" ")[1];
        if (myclass == "gym") location.href = "gym.html";
        if (myclass == "ending") location.href = "ending.html";
        else changepage(myclass);
    });
    changepage(page);
});
