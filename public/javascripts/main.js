// Start Login JS
$(document).ready(function () {
  let animating = false,
    submitPhase1 = 1500,
    submitPhase2 = 400,
    $login = $(".login");

  function ripple(elem, e) {
    $(".ripple").remove();
    let elTop = elem.offset().top,
      elLeft = elem.offset().left,
      x = e.pageX - elLeft,
      y = e.pageY - elTop;
    let $ripple = $("<div class='ripple'></div>");
    $ripple.css({ top: y, left: x });
    elem.append($ripple);
  }

  $(document).on("click", ".login__submit", function (e) {
    e.preventDefault();
    const loginForm = document.getElementById("login__form");
    if (animating) return;

    animating = true;

    let that = this;

    ripple($(that), e);

    $(that).addClass("processing");
    setTimeout(function () {
      $(that).addClass("success");

      setTimeout(function () {
        $login.hide();
        $login.addClass("inactive");
        animating = false;
        $(that).removeClass("success processing");
        loginForm.submit();
      }, submitPhase2);
    }, submitPhase1);
  });
});

// End Login JS

//Start window load control
const deposit = document.getElementById("deposit");
const withdraw = document.getElementById("withdraw");
const transfer = document.getElementById("transfer");
const buy = document.getElementById("buy");
const transaction = document.getElementById("transaction");
window.onload = () => {
  if (window.location.pathname === "/") {
    createUserChart();
  }
  if (window.location.pathname === "/deposit") {
    deposit.classList.add("menu-item-active");
  }
  if (window.location.pathname === "/withdraw") {
    withdraw.classList.add("menu-item-active");
  }
  if (window.location.pathname === "/transfer") {
    transfer.classList.add("menu-item-active");
  }
  if (window.location.pathname === "/buyphonecard") {
    buy.classList.add("menu-item-active");
  }
  if (window.location.pathname === "/transaction") {
    transaction.classList.add("menu-item-active");
  }
  if (window.location.pathname === "/users/recover") {
    timer();
  }
};

//End window load control

//Start Side Nav Control (! Do not fix anything !)
const body = document.body;
const sideNav = document.getElementsByClassName("side-nav-bar")[0];
const mainSection = document.getElementsByClassName("main")[0];
const text_content = document.querySelectorAll(".side-nav-text");
const header = document.getElementById("nav-bar-header");
const logoName = document.getElementById("logo-Name");
const hamburger = document.getElementsByClassName("hamburger")[0];

function SideNavControl(button) {
  if (body.clientWidth >= 1024) {
    //remove below 1024px screen property
    sideNav.classList.remove("side-nav-bar-expand");
    logoName.classList.remove("show-logo");
    button.classList.remove("unchange");

    logoName.classList.toggle("hide-logo");
    text_content.forEach((div) => {
      div.parentElement.classList.remove("menu-item-show");
      div.parentElement.classList.toggle("menu-item-hide");
    });
    //add new property
    sideNav.classList.toggle("side-nav-bar-minimize");
    mainSection.classList.toggle("content-minimize");
    button.classList.toggle("change");
  } else {
    //remove on 1024px screen property
    sideNav.classList.remove("side-nav-bar-minimize");
    mainSection.classList.remove("content-minimize");
    logoName.classList.remove("hide-logo");
    button.classList.remove("change");

    logoName.classList.toggle("show-logo");
    text_content.forEach((div) => {
      div.parentElement.classList.remove("menu-item-hide");
      div.parentElement.classList.toggle("menu-item-show");
    });

    //add new property
    sideNav.classList.toggle("side-nav-bar-expand");
    window_wrapper.classList.toggle("wrapper-active");
    button.classList.toggle("unchange");
  }
}

// End Side Nav Control (! Do not fix anything !)

// Start Notification Dropdown JS
const notificationMenu = document.querySelector(".notification-dropdown");

function showNotification() {
  notificationMenu.classList.toggle("show");
}

// End Notification Dropdown JS

// Start User Option Dropdown

const userOption = document.querySelector(".userOption");

function showUserOption() {
  userOption.classList.toggle("show");
}
// End User Option Dropdown

// Hide all dropdown when click anywhere on window
const window_wrapper = document.getElementById("window-wrapper");
window.onclick = (event) => {
  if (
    !event.target.matches(".bell-wrap") &&
    !event.target.matches(".notification-dropdown") &&
    !event.target.matches(".notification-box") &&
    !event.target.matches(".view-all-notification")
  ) {
    if (document.querySelector(".show") != null) {
      notificationMenu.classList.remove("show");
    }
  }
  if (
    !event.target.matches(".profile-wrap") &&
    !event.target.matches(".userOption")
  ) {
    if (document.querySelector(".show") != null) {
      userOption.classList.remove("show");
    }
  }
  if (body.clientWidth <= 1024) {
    if (
      !event.target.matches(".side-nav-bar") &&
      !event.target.matches(".hamburger") &&
      !event.target.matches(".bar1") &&
      !event.target.matches(".bar2") &&
      !event.target.matches(".bar3")
    ) {
      if (document.querySelector(".side-nav-bar-expand") != null) {
        sideNav.classList.remove("side-nav-bar-expand");
      }
      if (document.querySelector(".wrapper-active") != null) {
        window_wrapper.classList.remove("wrapper-active");
      }
      text_content.forEach((div) => {
        div.parentElement.classList.remove("menu-item-show");
      });
      if (document.querySelector(".unchange") != null) {
        hamburger.classList.remove("unchange");
      }
      if (document.querySelector(".show-logo") != null) {
        logoName.classList.remove("show-logo");
      }
    }
  }
};

window.addEventListener("resize", () => {
  if (body.clientWidth > 768) {
    if (document.querySelector(".wrapper-active") != null) {
      window_wrapper.classList.remove("wrapper-active");
    }

    if (document.querySelector(".show-logo") != null) {
      logoName.classList.remove("show-logo");
    }
  }
  if (body.clientWidth > 1024) {
    if (document.querySelector(".side-nav-bar-expand") != null) {
      sideNav.classList.remove("side-nav-bar-expand");
    }
    if (document.querySelector(".unchange") != null) {
      hamburger.classList.remove("unchange");
    }

    if (document.querySelector(".hide-logo") != null) {
      logoName.classList.remove("hide-logo");
    }
    text_content.forEach((div) => {
      if (document.querySelector(".menu-item-show") != null) {
        div.parentElement.classList.remove("menu-item-show");
      }
    });
  }
});

//Start User Chart JS

function createUserChart() {
  const userChart = document.getElementById("userMonthlyFluctuations");
  const monthlyBalanceFluctuationsChart = new Chart(userChart, {
    type: "bar",
    data: {
      labels: ["Black", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [10, 20, 30, 40, 50, 60],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],

          borderWidth: 1,
          barThickness: 30,
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Monthly Balance Fluctuations",
        },
      },

      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

//End User Chart JS

// -------------------------------------------------------------
// Register page
const allInputRegister = document.querySelectorAll("#register input");
const allErrorSpan = document.querySelectorAll("#register span");
allInputRegister.forEach((inp, index) => {
  inp.addEventListener("focus", () => {
    allErrorSpan[index].innerHTML = "";
  });
});

const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
let currentStep = formSteps.findIndex((step) => {
  return step.classList.contains("active");
});

const showCurrentStep = () => {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
};

if (currentStep < 0) {
  currentStep = 0;
  showCurrentStep();
}

multiStepForm.addEventListener("click", (e) => {
  let incrementor;
  if (e.target.matches("[data-next]")) {
    incrementor = 1;
  } else if (e.target.matches("[data-previous]")) {
    incrementor = -1;
  }
  if (incrementor == null) return;

  const inputs = [...formSteps[currentStep].querySelectorAll("#form-1 input")];

  // const allValid = inputs.every((input) => {
  //   return input.reportValidity();
  // });
  // let allValid = true;
  let countValid = 0;
  inputs.forEach((inp, index) => {
    if (inp.value === "") {
      allValid = false;
      allErrorSpan[index].innerText = "Please enter this field!";
    } else {
      countValid++;
    }
  });

  if (countValid === 5) {
    currentStep += incrementor;
    showCurrentStep();
  }
});

formSteps.forEach((step) => {
  step.addEventListener("animationend", (e) => {
    formSteps[currentStep].classList.remove("hide");
    e.target.classList.toggle("hide", !e.target.classList.contains("active"));
  });
});

const allSvgIconPath = [...document.querySelectorAll(".svg-icon path")];
allSvgIconPath.forEach((svg) => {
  svg.classList.remove("hide");
});

const fontIdImage = document.getElementsByName("fontIdImage")[0];
const backIdImage = document.getElementsByName("backIdImage")[0];
const submitBtn = document.querySelector("#register .submit-btn");
const form = document.querySelector("#register form");

const fontIdImageError =
  document.getElementsByClassName("fontIdImage-error")[0];
const backIdImageError =
  document.getElementsByClassName("backIdImage-error")[0];
const fullNameError = document.getElementsByClassName("fullName-error")[0];
const emailError = document.getElementsByClassName("email-error")[0];
const addressError = document.getElementsByClassName("address-error")[0];
const phoneNumberError =
  document.getElementsByClassName("phoneNumber-error")[0];
const dateOfBirthError =
  document.getElementsByClassName("dateOfBirth-error")[0];

submitBtn.addEventListener("click", (e) => {
  if (fontIdImage.value === "") {
    fontIdImageError.innerHTML = "Please enter your font id image.";
  } else if (backIdImage.value === "") {
    backIdImageError.innerHTML = "Please enter your back id image.";
  } else {
    form.submit();
  }
});

const loadFrontIDImage = function (event) {
  let image = document.getElementById("FrontIdDIsplay");
  image.src = URL.createObjectURL(event.target.files[0]);
};

const loadBackIDImage = function (event) {
  let image = document.getElementById("BackIdDisplay");
  image.src = URL.createObjectURL(event.target.files[0]);
};

/*-------------------------------------------------- Enter Code JS ----------------------------------------------------- */

function focusOTP(e, previous, curr, next) {
  e.preventDefault();
  let only1num = /[0-9]/;
  let previousOTP = document.getElementById(previous);
  let currentOTP = document.getElementById(curr);
  let nextOTP = document.getElementById(next);

  if (only1num.test(e.key)) {
    currentOTP.value = e.key;
    if (next !== "") {
      nextOTP.removeAttribute("disabled");
      nextOTP.focus();
      currentOTP.setAttribute("disabled", "");
    }
  } else if (e.key === "Backspace") {
    if (currentOTP.value !== "") {
      currentOTP.value = "";
    } else if (previous !== "") {
      previousOTP.removeAttribute("disabled");
      previousOTP.focus();
      currentOTP.setAttribute("disabled", "");
    }
  }
}

function check_and_submit(e) {
  let get_otp6 = e.target;

  if (e.key !== "Backspace" && get_otp6.value !== "" && e.key !== "Space") {
    get_otp6.setAttribute("disabled", "");
    let otp = document.querySelectorAll(".code input");
    let get_email = document.getElementsByName("otp_email")[0].value;
    let fullotp = "";

    for (otpvalue of otp) {
      fullotp += otpvalue.value;
    }

    $.ajax({
      type: "POST",
      url: "/database/check_otp.php",
      data: {
        fullotp: fullotp,
        email: get_email,
      },
      success: function (check_data) {
        let danger_alert = document.querySelector(".alert-box .alert-danger");
        let form = document.querySelector(".OTP_Form");
        if (check_data === "1") {
          form.submit();
        } else {
          danger_alert.innerText = check_data;
          danger_alert.style.display = "block";
          get_otp6.removeAttribute("disabled");
          get_otp6.focus();
        }
      },
    });
  } else {
    focusOTP(e, "otp5", "otp6", "");
  }
}

function timer() {
  let get_otp1 = document.querySelector(".code .code-item #otp1").focus();
  let deadline = 60000;
  let danger_alert = document.querySelector(".alert-box .alert-danger");
  let countdown_box = document.querySelector(
    ".OTP_Form .countdown-box .timer .time"
  );

  let set_countdown = setInterval(() => {
    deadline -= 1000;
    let second = Math.floor(deadline / 1000);
    let minute = Math.floor(second / 60);

    if (second < 10) {
      countdown_box.innerHTML = minute + ":0" + second;
    } else {
      countdown_box.innerHTML = minute + ":" + second;
    }

    if (deadline === 0) {
      clearInterval(set_countdown);
      let otp = document.querySelectorAll(".code input");
      for (otp_input of otp) {
        otp_input.setAttribute("disabled", "");
      }
      danger_alert.innerHTML =
        "The OTP code has expired.<br>Please click resend button.";
      danger_alert.style.display = "block";
    }
  }, 1000);
}

/*-------------------------------------------------- Enter Code JS ----------------------------------------------------- */

/*-------------------------------------------------- Get Homepage View ----------------------------------------------------- */

function getView(ViewPath) {
  let contentHolder = document.getElementById("content-holder");

  $.ajax({
    type: "GET",
    url: ViewPath,

    success: function (response) {
      contentHolder.innerHTML = response;
      window.history.pushState({ page_id: 1 }, "", ViewPath);
    },
  });
}

/*-------------------------------------------------- Get Homepage View ----------------------------------------------------- */
