"use strict";
$(document).ready(function () {
  if (localStorage.getItem("story")) {
    $(".modal__cookie").fadeOut();
  } else {
    $(".modal__cookie").fadeIn();
  }
  $(".modal__cookie-button").click(function () {
    localStorage.setItem("story", "true");
    $(".modal__cookie").fadeOut();
  });
  let modalMenu = false;
  let modalSign = false;
  if (localStorage.getItem("story-auth")) {
    $(".header-user").text("Log-out");
    $(".hero__nav").removeClass("show");
    $(".hero__nav").addClass("hide");
    $(".header__subtitle").css("margin-bottom", "0");
    $(".modal__sign").addClass("hide");
    $("body").css("overflow", "visible");
    /** @type {boolean} */
    modalSign = false;
  } else {
    $(".hero__nav").removeClass("hide");
    $(".hero__nav").addClass("show");
  }
  $(".header__menu").on("click", () => {
    if (!modalMenu) {
      $(".modal__menu").css("display", "flex");
      $(".modal__menu").animate({
        top: "0",
      });
      $(".header__menu-img").attr("src", "img/close.svg");
      /** @type {boolean} */
      modalMenu = true;
    } else {
      $(".modal__menu").animate({
        right: "-100%",
      });
      $(".modal__menu").css("display", "none");
      $(".header__menu-img").attr("src", "img/menu.svg");
      /** @type {boolean} */
      modalMenu = false;
    }
  });
  $("ul.modal__sign-nav").on("click", "li:not(.active)", function () {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active")
      .closest("div.modal__sign-block")
      .find("div.tabs__content")
      .removeClass("active")
      .eq($(this).index())
      .addClass("active");
  });
  $(".game-open-modal").on("click", () => {
    event.preventDefault();
    $(".modal__game").fadeIn();
    $("body").css("overflow", "hidden");
    $(".overlay").fadeIn();
  });
  $(".overlay").on("click", () => {
    $(".modal__game").fadeOut();
    $("body").css("overflow", "auto");
    $(".overlay").fadeOut();
  });
  $(".modal__close").on("click", () => {
    $(".modal__game").fadeOut();
    $("body").css("overflow", "auto");
    $(".overlay").fadeOut();
  });
  $(".header__btn__signup").on("click", () => {
    if (!modalSign) {
      $(".modal__sign").removeClass("hide");
      $(".modal__sign").addClass("show");
      $(".modal-login").removeClass("active");
      $(".modal__sign-log").removeClass("active");
      $(".modal__signUp").addClass("active");
      $(".modal__sign-up").addClass("active");
      $("body").css("overflow", "hidden");
      /** @type {boolean} */
      modalSign = true;
    }
  });
  $(".header__btn__login").on("click", () => {
    if (!modalSign) {
      $(".modal__sign").removeClass("hide");
      $(".modal__sign").addClass("show");
      $(".modal__signUp").removeClass("active");
      $(".modal__sign-up").removeClass("active");
      $(".modal-login").addClass("active");
      $(".modal__sign-log").addClass("active");
      $("body").css("overflow", "hidden");
      /** @type {boolean} */
      modalSign = true;
    }
  });
  $(".modal__sign-close").on("click", () => {
    if (modalSign) {
      $(".modal__sign").removeClass("show");
      /** @type {boolean} */
      modalSign = false;
      $("body").css("overflow", "visible");
    }
  });
  $(".modal__sign-up-form").validate({
    rules: {
      email: "required",
      password: {
        required: true,
        minlength: 6,
      },
      cfmPassword: {
        required: true,
        equalTo: "#signup-pass",
      },
    },
    messages: {
      email: "Please enter your Name",
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 6 characters long",
      },
      cfmPassword: {
        required: "Please confirm a password",
      },
    },
    errorPlacement: function (element, error) {
      if (error.is(":radio")) {
        element.appendTo(error.parents(".form-group"));
      } else {
        element.insertAfter(error);
      }
    },
    submitHandler: function () {
      $(".modal__sign-up-success").fadeIn().delay(2000).fadeOut();
      $(".modal__sign").removeClass("show");
      $(".modal__sign").addClass("hide");
      /** @type {boolean} */
      modalSign = false;
      $("body").css("overflow", "visible");
    },
  });
  $(".modal__sign-log-form").on("submit", function (event) {
    event.preventDefault();
    if ($("#signlog-email").val() != "admin@gmail.com") {
      $("#signlog-email").val("Error");
    } else {
      if ($("#signlog-pass").val() != "admin") {
        $("#signlog-pass").val("Error");
      } else {
        $.ajax({
          success: function (theDirectoryEntry) {
            localStorage.setItem("story-auth", "true");
            $(".modal__sign-log-success").fadeIn().delay(2000).fadeOut();
            $(".header-user").text("Log-out");
            $(".hero__nav").removeClass("show");
            $(".hero__nav").addClass("hide");
            $(".header__subtitle").css("margin-bottom", "0");
            $(".modal__sign").removeClass("show");
            $(".modal__sign").addClass("hide");
            /** @type {boolean} */
            modalSign = false;
            $("body").css("overflow", "visible");
          },
        });
        $("input[type=email]").val("");
        $("input[type=password]").val("");
      }
    }
  });
  $(".game-form").validate({
    rules: {
      email: "required",
      password: {
        required: true,
        minlength: 6,
      },
      cfmPassword: {
        required: true,
        equalTo: "#signup-pass",
      },
    },
    messages: {
      email: "Please enter your Email",
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 6 characters long",
      },
    },
    submitHandler: function () {
      console.log("fjdisf");
      $(".modal__sign-up-success").fadeIn().delay(2000).fadeOut();
      $(".modal__game").fadeOut();
      $(".overlay").fadeOut();
      $("body").css("overflow", "visible");
    },
  });
  $(".js-clear-story").on("click", function () {
    localStorage.removeItem("story-auth");
    location.reload(true);
  });
});
