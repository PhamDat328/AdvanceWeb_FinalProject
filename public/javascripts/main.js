// Start Login JS
const contentHolder = document.getElementById("content-holder");
$(document).ready(function() {
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

    $(document).on("click", ".login__submit", function(e) {

        e.preventDefault();
        const loginForm = document.getElementById("login__form")
        if (animating) return;

        animating = true;

        let that = this;

        ripple($(that), e);

        $(that).addClass("processing");
        setTimeout(function() {
            $(that).addClass("success");

            setTimeout(function() {
                $login.hide();
                $login.addClass("inactive");
                animating = false;
                $(that).removeClass("success processing");
                loginForm.submit();
            }, submitPhase2);
        }, submitPhase1);
    });
    window.onpopstate = (e) => {
        if (e.state) {
            contentHolder.innerHTML = e.state.pageData
        } else {
            if (window.location.pathname === "/") {
                window.location.href = "/";
            } else {
                getView(window.location.pathname)
            }

        }
    }
});

// End Login JS

//Start window load control

window.onload = () => {

    if (window.location.pathname === "/") {

        createUserChart();
    }
    if (window.location.pathname === "/deposit") {

        getView("/deposit", "deposit");
    }
    if (window.location.pathname === "/withdraw") {

        getView("/withdraw", "withdraw");
    }
    if (window.location.pathname === "/transfer") {

        getView("/transfer", "transfer");
    }
    if (window.location.pathname === "/buyphonecard") {

        getView("/buyphonecard", "buyphonecard")
    }
    if (window.location.pathname === "/transaction") {

        getView("/transaction", "transaction")
    }
    if (window.location.pathname === "/users/recover") {
        timer();
    }


}

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
    if (!event.target.matches(".bell-wrap") &&
        !event.target.matches(".notification-dropdown") &&
        !event.target.matches(".notification-box") &&
        !event.target.matches(".view-all-notification")
    ) {
        notificationMenu.classList.remove("show");
    }
    if (!event.target.matches(".profile-wrap") &&
        !event.target.matches(".userOption")
    ) {
        userOption.classList.remove("show");
    }
    if (body.clientWidth <= 1024) {
        if (!event.target.matches(".side-nav-bar") &&
            !event.target.matches(".hamburger") &&
            !event.target.matches(".bar1") &&
            !event.target.matches(".bar2") &&
            !event.target.matches(".bar3")
        ) {
            sideNav.classList.remove("side-nav-bar-expand");
            window_wrapper.classList.remove("wrapper-active");
            text_content.forEach((div) => {
                div.parentElement.classList.remove("menu-item-show");
            });
            hamburger.classList.remove("unchange");
            logoName.classList.remove("show-logo");
        }
    }
};

window.addEventListener("resize", () => {
    if (body.clientWidth > 768) {
        window_wrapper.classList.remove("wrapper-active");
        logoName.classList.remove("show-logo");
    }
    if (body.clientWidth > 1024) {
        sideNav.classList.remove("side-nav-bar-expand");
        hamburger.classList.remove("unchange");

        logoName.classList.remove("hide-logo");
        text_content.forEach((div) => {
            div.parentElement.classList.remove("menu-item-show");
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
            datasets: [{
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
            }, ],
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


const form2 = document.querySelector("#form-2");
const form1 = document.querySelector("#form-1");
const fullName = document.getElementsByName("fullName")[0];
const email = document.getElementsByName("email")[0];
const address = document.getElementsByName("address")[0];
const phoneNumber = document.getElementsByName("phoneNumber")[0];
const dateOfBirth = document.getElementsByName("dateOfBirth")[0];
const fontIdImage = document.getElementsByName("fontIdImage")[0];
const backIdImage = document.getElementsByName("backIdImage")[0];

const form = document.querySelector("#register form");

const fontIdImageError = document.getElementsByClassName("fontIdImage-error")[0];
const backIdImageError = document.getElementsByClassName("backIdImage-error")[0];
const fullNameError = document.getElementsByClassName("fullName-error")[0];
const emailError = document.getElementsByClassName("email-error")[0];
const addressError = document.getElementsByClassName("address-error")[0];
const phoneNumberError = document.getElementsByClassName("phoneNumber-error")[0];
const dateOfBirthError = document.getElementsByClassName("dateOfBirth-error")[0];

const allInputRegister = document.querySelectorAll("#register input");
const allErrorSpan = document.querySelectorAll("#register span");
allInputRegister.forEach((inp, index) => {
    inp.addEventListener("focus", () => {
        allErrorSpan[index].innerHTML = "";
    });
});

function registerNext() {

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
};

function registerBack() {

    form2.style.transform = "translateX(120%)";
    form1.style.transform = "translateX(50%)";
}

function registerSubmit() {
    if (fontIdImage.value === "") {
        fontIdImageError.innerHTML = "Please enter your font id image.";
    } else if (backIdImage.value === "") {
        backIdImageError.innerHTML = "Please enter your back id image.";
    } else {
        form.submit();
    }
};

const loadFrontIDImage = function(event) {
    let image = document.getElementById('FrontIdDIsplay');
    image.src = URL.createObjectURL(event.target.files[0]);

};

const loadBackIDImage = function(event) {
    let image = document.getElementById('BackIdDisplay');
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
        currentOTP.value = e.key
        if (next !== "") {
            nextOTP.removeAttribute('disabled');
            nextOTP.focus();
            currentOTP.setAttribute('disabled', '');

        }

    } else if (e.key === "Backspace") {

        if (currentOTP.value !== "") {
            currentOTP.value = "";
        } else if (previous !== "") {
            previousOTP.removeAttribute('disabled');
            previousOTP.focus();
            currentOTP.setAttribute('disabled', '');
        }
    }
}

function check_and_submit(e) {

    let get_otp6 = e.target;

    if (e.key !== "Backspace" && get_otp6.value !== "" && e.key !== "Space") {

        get_otp6.setAttribute('disabled', '')
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
                email: get_email
            },
            success: function(check_data) {

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
            }
        });

    } else {
        focusOTP(e, 'otp5', 'otp6', '');
    }
}

function timer() {
    let get_otp1 = document.querySelector(".code .code-item #otp1").focus();
    let deadline = 60000;
    let danger_alert = document.querySelector(".alert-box .alert-danger");
    let countdown_box = document.querySelector(".OTP_Form .countdown-box .timer .time");

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
            danger_alert.innerHTML = "The OTP code has expired.<br>Please click resend button.";
            danger_alert.style.display = "block";
        }
    }, 1000);
}



/*-------------------------------------------------- Enter Code JS ----------------------------------------------------- */

/*-------------------------------------------------- Get Homepage View ----------------------------------------------------- */



function getView(ViewPath, buttonName = '') {

    activateButton(buttonName)

    $.ajax({
        type: "GET",
        url: ViewPath,
        data: {
            getBy: 'client'
        },
        success: function(response) {

            contentHolder.innerHTML = response;
            if (history.pushState) {
                history.pushState({ pageData: response }, '', ViewPath);
            }

        }
    });

    return !history.pushState;
}

const deposit = document.getElementById("deposit")
const withdraw = document.getElementById("withdraw")
const transfer = document.getElementById("transfer")
const buy = document.getElementById("buy")
const transaction = document.getElementById("transaction")

function activateButton(buttonName) {
    deposit.classList.remove('menu-item-active')
    withdraw.classList.remove('menu-item-active')
    transfer.classList.remove('menu-item-active')
    buy.classList.remove('menu-item-active')
    transaction.classList.remove('menu-item-active')
    if (buttonName === 'deposit') {
        deposit.classList.add("menu-item-active")
    }
    if (buttonName === 'withdraw') {
        withdraw.classList.add("menu-item-active")
    }
    if (buttonName === 'transfer') {
        transfer.classList.add("menu-item-active")
    }
    if (buttonName === 'buyphonecard') {
        buy.classList.add("menu-item-active")
    }
    if (buttonName === 'transaction') {
        transaction.classList.add("menu-item-active")
    }
}

/*-------------------------------------------------- Get Homepage View ----------------------------------------------------- */