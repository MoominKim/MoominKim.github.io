$(document).ready(() => {
    $("#foreground").hide();
    const arrowpos = {};
    const buttonpos = {
        tenis: [
            {
                arr: "cabinralyfocus",
                pos: "top:29.5%;left:46%;",
                img: "img/button14.png",
            },
        ],
        cabinralyfocus: [
            {
                arr: "ralyfocus",
                pos: "top:30%;left:50%;",
                img: "img/button15.png",
            },
        ],
        ralyfocus: [
            {
                arr: "ralyfocus",
                pos: "top:30%;left:50%;",
                img: "img/button15.png",
            },
        ],
    };
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
    $(document).on("click", ".squash", () => {
        location.href = "squash.html";
    });
    $(document).on("click", ".gym", () => {
        location.href = "gym.html";
    });
    $(document).on("click", ".cabinralyfocus", () => {
        changepage("cabinralyfocus");
    });
    changepage("cabinralyfocus");
});
