$(document).ready(function () {
    let page;
    let nowmodal;
    let isball = localStorage.getItem("ball");
    let isracket = localStorage.getItem("racket");
    localStorage.removeItem("ball");
    localStorage.removeItem("racket");
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
            if (nowmodal == "getball") {
                isball = true;
                localStorage.setItem("ball", 1);
            }
            if (nowmodal == "getracket") {
                isracket = true;
                localStorage.setItem("racket", 1);
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
        if (myclass == "balls") {
            makemodal("getball");
            return;
        }
        if (myclass == "rackets") {
            makemodal("getracket");
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
});
