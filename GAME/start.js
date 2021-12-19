$(document).ready(() => {
    $("#foreground").hide();
    const arrowpos = {
        start: [
            {
                arr: "squash",
                pos: "top: 70%; left: 20%;",
                rot: "transform: rotate( -45deg );",
            },
            {
                arr: "gym",
                pos: "top: 70%; left: 75%;",
                rot: "transform: rotate( 53deg );",
            },
        ],
    };
    function makearrow(info) {
        return `<img class="arrow ${info.arr}" style="${info.pos} ${info.rot}" src="img/arrow.png">`;
    }
    function changepage(background) {
        page = background;
        $("#background").prop("src", "background/" + page + ".jpg");
        $(".arrow").remove();
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
    changepage("start");
});
