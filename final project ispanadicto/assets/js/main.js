$(document).ready(function () {
  $(".navbar-nav li").click(function () {
    $(".navbar-nav li").removeClass("active");
    $(this).addClass("active");
  });

  $(".languages .btn").click(function () {
    $(".languages .btn").removeClass("purple");
    $(this).addClass("purple");
  });

  $(".languages-toggle .btn").click(function () {
    $(".languages-toggle .btn").removeClass("purple");
    $(this).addClass("purple");
  });

  $("#intro .search input[type='text']").click(function (e) {
    e.preventDefault();

    if ($("#intro .search ul").children().length > 0) {
      $("#intro .search .box").css("display", "block");
    }
  });

  window.addEventListener("click", function (e) {
    if (
      !$(e.target).hasClass("words") &&
      !$(e.target).hasClass("box") &&
      !$(e.target).hasClass("rounded-pill") &&
      !$(e.target).hasClass("search-icon") &&
      !$(e.target).hasClass("text-white") &&
      !$(e.target).hasClass("star") &&
      !$(e.target).hasClass("trash")
    ) {
      $("#intro .search .box").css("display", "none");
    }
  });

  $("#intro .search .search-icon").click(function () {
    let searched = $("#intro .search input[type='text']").val().toLowerCase();

    fetch("https://api.3sual.az/api/task")
      .then((response) => response.json())
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          let list = $("#intro .search .box ul");
          let word = searched;
          let az = json[i].azerbaijani;
          let es = json[i].espanol;

          if (searched == json[i].espanol) {
            //var add =list.innerHtml =`<li class="words">${word} (${az})<div class="icons"><span  class="trash text-danger d-none" data-icon="&#xe905;"></span><span  class="star text-warning" data-icon="&#xe908;"></span></div></li>`
            let add = (list.innerHtml = `<li class="words">${word} (${az})<i  class="star fas fa-star"></i></li>`);
            list.append(add);
          }

          if (searched == json[i].azerbaijani) {
            //var add =list.innerHtml =`<li class="words">${word} (${es})<div class="icons"><span  class="trash text-danger d-none" data-icon="&#xe905;"></span><span  class="star text-warning" data-icon="&#xe908;"></span></div></li>`
            let add = (list.innerHtml = `<li class="words">${word} (${es})<i  class="star fas fa-star"></i></li>`);
            list.append(add);
          }
        }

        let fav = document.querySelectorAll(".box ul li i");
        for (let j = 0; j < fav.length; j++) {
          fav[j].addEventListener("click", function (e) {
            console.log("K");
            var favorites = localStorage.getItem("favorites");
            var favs = [];
            if (favorites) {
              favs = JSON.parse(favorites);
            }
            if (favs.includes(j)) {
              var temp = favs;
              favs = temp.filter((fav) => fav !== favs[j]);
              $(this).removeClass("fa-trash-alt");
              $(this).addClass("fa-star");
            } else {
              favs.push(j);

              $(this).removeClass("fa-star");
              $(this).addClass("fa-trash-alt");
            }

            localStorage.setItem("favorites", JSON.stringify(favs));
          });
        }
      });

    document.forms[0].reset();
  });

  $(".content-audio .first").click(function () {
    var audio = document.getElementById("audio1");
    audio.play();
  });

  $(".content-audio .second").click(function () {
    var audio = document.getElementById("audio2");
    audio.play();
  });

  fetch("https://api.3sual.az/api/task")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);

      var mostSearched = $(".content-audio .most");
      var random1 = Math.floor(Math.random() * json.length);
      mostSearched.append(json[random1].espanol);
      var day = $(".content-audio .day");
      var random2 = Math.floor(Math.random() * json.length);
      day.append(json[random2].espanol);
    });
});
