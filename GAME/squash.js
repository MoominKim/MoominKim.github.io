$(document).ready(function () {
    let page;
    let nowmodal;
    $("#foreground").hide();
    const arrowpos = {};
    const buttonpos = {};
    const Mod = {};

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
        changepage(myclass);
    });
    $(document).on("click", ".arrow", function (e) {
        let myclass = $(this).attr("class").split(" ")[1];
        changepage(myclass);
    });
    changepage("squash");
});
