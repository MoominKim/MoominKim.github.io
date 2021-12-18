$(document).ready(() => {
  let chairsolved;
  let page;
  $("#foreground").hide();
  const buttonpos = {
    /*key:value*/
    start: [
      { arr: "squashfront", pos: "top: 70%; left: 20%;", img: "img/arrow.png", rot: "transform: rotate( -45deg );" },
      { arr: "gymfront", pos: "top: 70%; left: 75%;", img: "img/arrow.png", rot: "transform: rotate( 53deg );" },
    ],
    gymfront: [
      { arr: "start", pos: "top:50%;left:40%;", img: "img/button3.png" },
      { arr: "start", pos: "top:19%;left:19%;", img: "img/button4.png" },
      { arr: "gymchair", pos: "top:30%;left:3%;", img: "img/button5.png" },
    ],
    gymchair: [{ arr: "chairpuzzle", pos: "top:25%;left:40%;", img: "img/button6.png" }],
    chairpuzzle: [{ arr: "chairpuzzle2", pos: "top: 55%;left: 40%;", img: "img/button7.png" }],
    chairpuzzle2: [{ arr: "advancedchair", pos: "bottom:0%;left:1%;", img: "img/arrow.png", rot: "transform: rotate( -90deg );", size: "width:10%;" }],
    advancedchair: [{ arr: "openchair", pos: "top:70%;left:15%;", img: "img/button9.png" }],
    openchair: [{ arr: "modal", pos: "top:65%;left:49%;", img: "img/button10.png" }],
  };

  const Mod = {
    chair: {
      name: "쪽지",
      desc: "8레벨 이상을 극복해라",
    },
    nochair: {
      name: "?",
      desc: "더 이상 볼 일이 없는 듯 하다..",
    },
  };

  function makemodal(modalname) {
    const c = Mod[modalname];
    $("#foreground").show();
    $("#foreground").html(
      `
                <div class="popup">
                <button class="exit">X</button>
                <h1>${c.name}</h1>
                <span>${c.desc}</span>
                ${c.img ? `<img src="${c.img}" />` : ""}
                </div>
            `
    );
    return;
  }

  function makebutton(info) {
    return `<img class="button ${info.arr}" style="${info.pos} ${info.rot}" src="${info.img}">`;
  }
  function changepage(background) {
    page = background;
    $("#background").prop("src", page + ".jpg");
    $(".button").remove();
    buttonpos[background].forEach((info) => {
      $("body").append(makebutton(info));
    });
  }

  /*const->상수 ,let->변수,var(x)->쓰지마셈 ㅇㅋ*/
  $(document).on("click", ".squashfront", () => {
    changepage("squashfront");
  });
  $(document).on("click", ".gymfront", () => {
    changepage("gymfront");
  });
  $(document).on("click", ".gymchair", () => {
    if (chairsolved) makemodal("nochair");
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
    makemodal("chair");
  });
  $(document).on("click", "#foreground, .exit", function (e) {
    if (e.target === this) {
      $(".popup").remove();
      $("#foreground").hide();
      chairsolved = true;
      changepage("gymfront");
    }
  });

  changepage("gymfront");
});
