$(document).ready(() => {
    let babelsolved = localStorage.getItem("babel");
    let chairsolved = localStorage.getItem("chair");
    let runsolved = localStorage.getItem("run");
    let page;
    let nowspeed = 1;
    $("#foreground").hide();
    const arrowpos = {
        gym: [
            {
                arr: "start",
                pos: "bottom:0%; left: 1%;",
                rot: "transform: rotate( -90deg );",
            },
            {
                arr: "tenis",
                pos: "top:25%; left: 13%;",
                rot: "transform: rotate( 15deg );",
            },
        ],
        chairpuzzle2: [
            {
                arr: "advancedchair",
                pos: "bottom:0%;left:1%;",
                rot: "transform: rotate( -90deg );",
            },
        ],
        onrun: [
            {
                arr: "gym",
                pos: "top:0%; right: 1%;",
                rot: "transform: rotate( -90deg );",
            },
        ],
    };
    const buttonpos = {
        /*key:value*/
        start: [],
        gym: [
            { arr: "run", pos: "top:32%;left:28%;", img: "img/러닝머신.png" },
            {
                arr: "dead",
                pos: "top:24%;left:22%;",
                img: "img/상체운동머신.png",
            },
            {
                arr: "gymchair",
                pos: "top:31%;left:2%;",
                img: "img/다리운동기계.png",
            },
        ],
        gymchair: [
            {
                arr: "chairpuzzle",
                pos: "top:25%;left:40%;",
                img: "img/button6.png",
            },
        ],
        chairpuzzle: [
            {
                arr: "chairpuzzle2",
                pos: "top: 55%;left: 40%;",
                img: "img/button7.png",
            },
        ],
        chairpuzzle2: [],
        advancedchair: [
            {
                arr: "openchair",
                pos: "top:70%;left:15%;",
                img: "img/button9.png",
            },
        ],
        openchair: [
            { arr: "modal", pos: "top:65%;left:49%;", img: "img/button10.png" },
        ],
        run: [
            { arr: "onrun", pos: "top:50%;left:59%;", img: "img/button11.png" },
        ],
        onrun: [
            {
                arr: "up",
                pos: "top:85.5%;left:53.3%;",
                img: "img/button12.png",
            },
            {
                arr: "down",
                pos: "top:85.5%;left:48.5%;",
                img: "img/button12.png",
            },
        ],
        dead: [
            { arr: "babel", pos: "top:15%;left:8%;", img: "img/button13.png" },
        ],
    };

    const Mod = {
        chair: {
            name: "쪽지",
            desc: "8레벨 이상을 극복해라",
            id: "chair",
        },
        cleared: {
            name: "?",
            desc: "더 이상 볼 일이 없는 듯 하다..",
            id: "cleared",
        },
        zerospeed: {
            name: "!",
            desc: "내려가지 않는다..",
            id: "zerospeed",
        },
        overspeed: {
            name: "!과부하!",
            desc: "'죽은' '상향'",
            id: "overspeed",
        },
        notnow: {
            name: "??",
            desc: "아직 별 볼일 없는 것 같다..",
            id: "notnow",
        },
        babel: {
            name: "+강재영의 바벨+",
            desc: "세상의 설계자중 한 명이 이 바벨로 운동하다가 허리가 나갈 뻔 했습니다. 무거우니 들고 갈때 조심하세요.",
            id: "babel",
        },
    };

    function makemodal(modalname) {
        const c = Mod[modalname];
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

    function changespeed(isup) {
        if (isup) {
            if (nowspeed == 3) makemodal("overspeed");
            else {
                $("#background").prop(
                    "src",
                    "background/onrun" + (nowspeed = nowspeed + 1) + ".jpg"
                );
            }
        } else {
            if (nowspeed == 1) makemodal("zerospeed");
            else
                $("#background").prop(
                    "src",
                    "background/onrun" + (nowspeed = nowspeed - 1) + ".jpg"
                );
        }
    }
    /*const->상수 ,let->변수,var(x)->쓰지마셈 ㅇㅋ*/
    $(document).on("click", "#foreground, .exit", function (e) {
        if (e.target === this) {
            $(".popup").remove();
            $("#foreground").hide();
            $(".button").show();
            if (page == "openchair") {
                chairsolved = true;
                localStorage.setItem("chair", 1);
                changepage("gym");
            }
            if (page == "dead") {
                babelsolved = true;
                localStorage.setItem("babel", 1);
                changepage("gym");
            }
            if (page == "onrun" && nowspeed == 1) changepage("onrun");
            if (page == "onrun" && nowspeed == 3) {
                runsolved = true;
                localStorage.setItem("run", 1);
                changepage("gym");
            }
        }
    });
    $(document).on("click", ".start", () => {
        location.href = "start.html";
    });
    $(document).on("click", ".gym", () => {
        changepage("gym");
    });
    $(document).on("click", ".gymchair", () => {
        if (chairsolved) makemodal("cleared");
        else changepage("gymchair");
    });
    $(document).on("click", ".chairpuzzle", () => {
        changepage("chairpuzzle");
    });
    $(document).on("click", ".chairpuzzle2", () => {
        $("body").hide();
        changepage("chairpuzzle2");
        $("body").fadeIn(2000);
    });
    $(document).on("click", ".advancedchair", () => {
        changepage("advancedchair");
    });
    $(document).on("click", ".openchair", () => {
        changepage("openchair");
    });
    $(document).on("click", ".modal", () => {
        if (".openchair") makemodal("chair");
    });
    $(document).on("click", ".run", () => {
        if (runsolved == true) makemodal("cleared");
        else if (chairsolved == true) changepage("run");
        else makemodal("notnow");
    });
    $(document).on("click", ".onrun", () => {
        changepage("onrun");
    });
    $(document).on("click", ".up", () => {
        changespeed(true);
    });
    $(document).on("click", ".down", () => {
        changespeed(false);
    });
    $(document).on("click", ".dead", () => {
        if (babelsolved == true) {
            makemodal("cleared");
        } else if (runsolved == true) {
            changepage("dead");
        } else {
            makemodal("notnow");
        }
    });
    $(document).on("click", ".babel", () => {
        makemodal("babel");
    });
    $(document).on("click", ".tenis", () => {
        localStorage.setItem("start", "tenis");
        location.href = "tenis.html";
    });
    changepage("gym");
});
