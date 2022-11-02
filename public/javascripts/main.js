// Start Login JS
// $(document).ready(function () {
//   let animating = false,
//     submitPhase1 = 1500,
//     submitPhase2 = 400,
//     $login = $(".login");

//   function ripple(elem, e) {
//     $(".ripple").remove();
//     let elTop = elem.offset().top,
//       elLeft = elem.offset().left,
//       x = e.pageX - elLeft,
//       y = e.pageY - elTop;
//     let $ripple = $("<div class='ripple'></div>");
//     $ripple.css({ top: y, left: x });
//     elem.append($ripple);
//   }

// $(document).on("click", ".login__submit", function (e) {
//   if (animating) return;

//   animating = true;

//   let that = this;

//   ripple($(that), e);

//   $(that).addClass("processing");
//   setTimeout(function () {
//     $(that).addClass("success");

//     setTimeout(function () {
//       $login.hide();
//       $login.addClass("inactive");
//       animating = false;
//       $(that).removeClass("success processing");
//       // if()
//       // window.location.href = "/";
//     }, submitPhase2);
//   }, submitPhase1);
// });
// });

// End Login JS

//Start Side Nav Control (! Do not fix anything !)
const body = document.body;
const sideNav = document.getElementsByClassName("side-nav-bar")[0];
const mainSection = document.getElementsByClassName("main")[0];
const hamburger = document.getElementsByClassName("hamburger")[0];
const text_content = document.querySelectorAll(".side-nav-text");
const header = document.getElementById("nav-bar-header");
const logoName = document.getElementById("logo-Name");

function SideNavControl(button) {
  if (body.clientWidth >= 1024) {
    //remove below 1024px screen property
    sideNav.classList.remove("side-nav-bar-expand");
    mainSection.classList.remove("content-expand");
    // header.classList.remove("minimize-navbar")

    logoName.classList.toggle("hide-logo");
    text_content.forEach((div) => {
      div.parentElement.classList.toggle("menu-item-hide");
      // div.classList.toggle("menu-item-text-hide")
    });
    //add new property
    sideNav.classList.toggle("side-nav-bar-minimize");
    mainSection.classList.toggle("content-minimize");
    // header.classList.toggle("full-navbar")
  } else {
    //remove on 1024px screen property
    sideNav.classList.remove("side-nav-bar-minimize");
    mainSection.classList.remove("content-minimize");
    // header.classList.remove("full-navbar")

    //add new property
    sideNav.classList.toggle("side-nav-bar-expand");
    mainSection.classList.toggle("content-expand");
    // header.classList.toggle("minimize-navbar")
  }

  hamburger.classList.toggle("expand-hamburger");
  button.classList.toggle("change");
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
window.onclick = (event) => {
  if (
    !event.target.matches(".bell-wrap") &&
    !event.target.matches(".notification-dropdown") &&
    !event.target.matches(".notification-box") &&
    !event.target.matches(".view-all-notification")
  ) {
    notificationMenu.classList.remove("show");
  }
  if (
    !event.target.matches(".profile-wrap") &&
    !event.target.matches(".userOption")
  ) {
    userOption.classList.remove("show");
  }
};

//Start User Chart JS

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

//End User Chart JS

// -------------------------------------------------------------
// Register page

const registerNextBtn = document.querySelector("#register-next-btn");
const registerBackBtn = document.querySelector("#register-back-btn");
const form2 = document.querySelector("#form-2");
const form1 = document.querySelector("#form-1");
const fullName = document.getElementsByName("fullName")[0];
const email = document.getElementsByName("email")[0];
const address = document.getElementsByName("address")[0];
const phoneNumber = document.getElementsByName("phoneNumber")[0];
const dateOfBirth = document.getElementsByName("dateOfBirth")[0];
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

const allInputRegister = document.querySelectorAll("#register input");
const allErrorSpan = document.querySelectorAll("#register span");
allInputRegister.forEach((inp, index) => {
  inp.addEventListener("focus", () => {
    allErrorSpan[index].innerHTML = "";
  });
});

registerNextBtn.addEventListener("click", () => {
  console.log("click");
  if (fullName.value === "") {
    fullNameError.innerHTML = "Please enter your full name.";
  } else if (dateOfBirth.value === "") {
    dateOfBirthError.innerHTML = "Please enter your date of birth.";
  } else if (email.value === "") {
    emailError.innerHTML = "Please enter your email.";
  } else if (address.value === "") {
    addressError.innerHTML = "Please enter your address.";
  } else if (phoneNumber.value === "") {
    phoneNumberError.innerHTML = "Please enter your phone number.";
  } else {
    form2.style.transform = "translateX(-50%)";
    form1.style.transform = "translateX(-120%)";
  }
});
registerBackBtn.addEventListener("click", () => {
  // console.log("click");
  form2.style.transform = "translateX(120%)";
  form1.style.transform = "translateX(50%)";
});

submitBtn.addEventListener("click", (e) => {
  if (fontIdImage.value === "") {
    fontIdImageError.innerHTML = "Please enter your font id image.";
  } else if (backIdImage.value === "") {
    backIdImageError.innerHTML = "Please enter your back id image.";
  } else {
    form.submit();
  }
});
// ||
//     email === "" ||
//     address === "" ||
//     phoneNumber === "" ||
//     dateOfBirth === ""
