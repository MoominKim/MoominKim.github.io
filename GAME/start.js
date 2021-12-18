$(document).ready(() => {
  let babelsolved;
  let chairsolved;
  let runsolved;
  let page;
  let nowspeed = 1;
  $("#foreground").hide();
  const buttonpos = {
    /*key:value*/
    start: [
      {
        arr: "squashfront",
        pos: "top: 70%; left: 20%;",
        img: "img/arrow.png",
        rot: "transform: rotate( -45deg );",
      },
      {
        arr: "gymfront",
        pos: "top: 70%; left: 75%;",
        img: "img/arrow.png",
        rot: "transform: rotate( 53deg );",
      },
    ],
    gymfront: [
      { arr: "run", pos: "top:50%;left:40%;", img: "img/button3.png" },
      { arr: "dead", pos: "top:19%;left:19%;", img: "img/button4.png" },
      { arr: "gymchair", pos: "top:30%;left:3%;", img: "img/button5.png" },
      {
        arr: "start",
        pos: "bottom:0%; left: 1%;",
        img: "img/arrow.png",
        rot: "transform: rotate( -90deg );",
        size: "width:10%;",
      },
    ],
    gymchair: [
      { arr: "chairpuzzle", pos: "top:25%;left:40%;", img: "img/button6.png" },
    ],
    chairpuzzle: [
      {
        arr: "chairpuzzle2",
        pos: "top: 55%;left: 40%;",
        img: "img/button7.png",
      },
    ],
    chairpuzzle2: [
      {
        arr: "advancedchair",
        pos: "bottom:0%;left:1%;",
        img: "img/arrow.png",
        rot: "transform: rotate( -90deg );",
      },
    ],
    advancedchair: [
      { arr: "openchair", pos: "top:70%;left:15%;", img: "img/button9.png" },
    ],
    openchair: [
      { arr: "modal", pos: "top:65%;left:49%;", img: "img/button10.png" },
    ],
    run: [{ arr: "onrun", pos: "top:50%;left:59%;", img: "img/button11.png" }],
    onrun: [
      { arr: "up", pos: "top:85.5%;left:53.3%;", img: "img/button12.png" },
      { arr: "down", pos: "top:85.5%;left:48.5%;", img: "img/button12.png" },
      {
        arr: "gymfront",
        pos: "top:0%; right: 1%;",
        img: "img/arrow.png",
        rot: "transform: rotate( -90deg );",
        size: "width:10%;",
      },
    ],
    dead: [{ arr: "babel", pos: "top:15%;left:8%;", img: "img/button13.png" }],
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
      desc: "그에게 고통을 준 바벨",
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

  function changespeed(isup) {
    if (isup) {
      if (nowspeed == 3) makemodal("overspeed");
      else {
        $("#background").prop(
          "src",
          "onrun" + (nowspeed = nowspeed + 1) + ".jpg"
        );
      }
    } else {
      if (nowspeed == 1) makemodal("zerospeed");
      else
        $("#background").prop(
          "src",
          "onrun" + (nowspeed = nowspeed - 1) + ".jpg"
        );
    }
  }
  /*const->상수 ,let->변수,var(x)->쓰지마셈 ㅇㅋ*/
  $(document).on("click", ".start", () => {
    changepage("start");
  });
  $(document).on("click", ".squashfront", () => {
    changepage("squashfront");
  });
  $(document).on("click", ".gymfront", () => {
    changepage("gymfront");
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
  $(document).on("click", "#foreground, .exit", function (e) {
    if (e.target === this) {
      $(".popup").remove();
      $("#foreground").hide();
      $(".button").show();
      if (page == "openchair") {
        chairsolved = true;
        changepage("gymfront");
      }
      if (page == "dead") {
        babelsolved = true;
        changepage("gymfront");
      }
      if (page == "onrun" && nowspeed == 1) changepage("onrun");
      if (page == "onrun" && nowspeed == 3) {
        runsolved = 1;
        changepage("gymfront");
      }
    }
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
  changepage("gymfront");
});
