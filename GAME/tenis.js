$(document).ready(() => {
    let nowmodal;
    let locksolved;
    let ralysolved;
    let consolsolved;
    $("#foreground").hide();
    const arrowpos = {
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
        cabinlock: [
            {
                arr: "cabinfocus",
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
    };
    const buttonpos = {
        tenis: [
            {
                arr: "cabinralyfocus",
                pos: "top:29.5%;left:46%;",
                img: "img/button14.png",
            },
            {
                arr: "rackets",
                pos: "bottom:29.5%;left:2%;",
                img: "img/button14.png",
            },
        ],
        cabinralyfocus: [
            {
                arr: "ralyfocus",
                pos: "top:30%;left:50%;",
                img: "img/button15.png",
            },
            {
                arr: "cabinfocus",
                pos: "top : 1%,left: 1%;",
                img: "img/button16.png",
            },
        ],
        ralyfocus: [
            {
                arr: "table",
                pos: "top:30%;left:50%;",
                img: "img/button15.png",
            },
            {
                arr: "ralyconsole",
                pos: "top:1%;left:1%;",
                img: "img/button18.png",
            },
        ],
        cabinfocus: [
            {
                arr: "cabinlock",
                pos: "top:1%;left:1%;",
                img: "img/button16.png",
            },
        ],
        cabinlock: [
            {
                arr: "cabinopen",
                pos: "top:1%;left:1%",
                img: "img/button17.png",
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
            desc: "탁구채와 비슷한 크기의 홈이 파여 있다",
            id: "needball",
        },
        describe: {
            name: "랠리머신이다",
            desc: "아무것도 올라와 있지 않다..",
            id: "describe",
        },
        ralyin: {
            name: "랠리머신이다",
            desc: "빛나는 황금공이 올라왔다.",
            id: "ralyin",
        },
        actived: {
            name: "계기판이다",
            desc: "퍼즐을 풀면 작동할 수 있을 것 같다",
            id: "actived",
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
                changepage("ralyconsole");
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
    }
    /*







    */
    $(document).on("click", ".button", function (e) {
        let myclass = $(this).attr("class").split(" ")[1];
        if (myclass == "rackets" && locksolved != true) {
            makemodal("cantfind");
            return;
        }
        if (page == "cabinlock" && ralysolved != true) {
            makemodal("needball");
            return;
        }
        if (page == "cabinlock" && locksolved == true) {
            makemodal("cleared");
            return;
        }
        if (myclass == "table" && ralysolved != true) {
            makemodal("describe");
            return;
        }
        if (myclass == "table" && consolsolved != true) {
            makemodal("ralyin");
            return;
        }
        if (myclass == "table" && ralysolved == true) {
            makemodal("cleared");
            return;
        }
        if (myclass == "ralyconsole" && ralysolved != true) {
            makemodal("actived");
            return;
        }
        if (myclass == "ralyconsole" && ralysolved == true) {
            makemodal("cleared");
            return;
        }
        changepage(myclass);
    });
    $(document).on("click", ".arrow", function (e) {
        let myclass = $(this).attr("class").split(" ")[1];
        changepage(myclass);
    });
    changepage("tenis");
});
