$(document).ready(function () {
    let babel = localStorage.getItem("babel");
    let angry = localStorage.getItem("angry");
    let lacket = localStorage.getItem("lacket");
    localStorage.setItem("start", "tenis");
    //localStorage.clear();
    $("#foreground").hide();
    const arrowpos = {
        ending: [
            {
                arr: "squash",
                pos: "bottom:0%; left: 1%;",
                rot: "transform: rotate( -90deg );",
            },
            {
                arr: "tenis",
                pos: "bottom:0%; right: 1%;",
                rot: "transform: rotate( 90deg );",
            },
        ],
    };
    const buttonpos = {
        ending: [
            {
                arr: "HI",
                pos: "top:0%;left:0%;",
                img: "img/button14.png",
            },
        ],
    };
    const Mod = {
        notnow: {
            name: "??",
            desc: "아무런 반응이 없다",
            id: "notnow",
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
        if (arrowpos[background]) {
            arrowpos[background].forEach((info) => {
                $("body").append(makearrow(info));
            });
        }
        if (buttonpos[background]) {
            buttonpos[background].forEach((info) => {
                $("body").append(makebutton(info));
            });
        }
    }
    /*







    */
    function makeball() {
        return `<img id="ending" src="img/S.png">`;
    }
    $(document).on("click", ".button", function (e) {
        let myclass = $(this).attr("class").split(" ")[1];
        if (babel == "true" && lacket == "true" && angry == "true") {
            $("body").append(makeball());
            var $ball = $("#ending");
            $ball.animate(
                {
                    // stop()을 넣어주면 애니메이션 도중에 다른 애니메이션을 실행시킬 수 있다.
                    bottom: "0px",
                    left: "0px",
                    width: "100%",
                    height: "100%",
                },
                1000
            );
            localStorage.clear();
        } else {
            makemodal("notnow");
            return;
        }
    });
    $(document).on("click", "#ending", function (e) {
        location.href = "start.html";
    });
    $(document).on("click", ".arrow", function (e) {
        let myclass = $(this).attr("class").split(" ")[1];
        location.href = myclass + ".html";
    });
    changepage("ending");
});
