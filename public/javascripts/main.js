// Start Login JS
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
    };

    $(document).on("click", ".login__submit", function(e) {

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
                window.location.href = "/"
            }, submitPhase2);



        }, submitPhase1);

    });



});

// End Login JS

//Start Side Nav Control (! Do not fix anything !)
const body = document.body
const sideNav = document.getElementsByClassName('side-nav-bar')[0]
const mainSection = document.getElementsByClassName('main')[0]
const hamburger = document.getElementsByClassName('hamburger')[0]
const text_content = document.querySelectorAll('.side-nav-text')
const header = document.getElementById("nav-bar-header")
const logoName = document.getElementById("logo-Name")

function SideNavControl(button) {


    if (body.clientWidth >= 1024) {

        //remove below 1024px screen property
        sideNav.classList.remove("side-nav-bar-expand")
        mainSection.classList.remove("content-expand")
            // header.classList.remove("minimize-navbar")

        logoName.classList.toggle("hide-logo")
        text_content.forEach((div) => {

            div.parentElement.classList.toggle("menu-item-hide")
                // div.classList.toggle("menu-item-text-hide")


        });
        //add new property
        sideNav.classList.toggle("side-nav-bar-minimize")
        mainSection.classList.toggle("content-minimize")
            // header.classList.toggle("full-navbar")


    } else {
        //remove on 1024px screen property
        sideNav.classList.remove("side-nav-bar-minimize")
        mainSection.classList.remove("content-minimize")
            // header.classList.remove("full-navbar")

        //add new property
        sideNav.classList.toggle("side-nav-bar-expand")
        mainSection.classList.toggle("content-expand")
            // header.classList.toggle("minimize-navbar")

    }

    hamburger.classList.toggle('expand-hamburger')
    button.classList.toggle("change")

}


// End Side Nav Control (! Do not fix anything !)

// Start Notification Dropdown JS
const notificationMenu = document.querySelector(".notification-dropdown")



function showNotification() {

    notificationMenu.classList.toggle("show")

}


// End Notification Dropdown JS

// Start User Option Dropdown

const userOption = document.querySelector(".userOption")

function showUserOption() {
    userOption.classList.toggle("show")
}
// End User Option Dropdown

// Hide all dropdown when click anywhere on window
window.onclick = (event) => {

    if (!event.target.matches('.bell-wrap') && !event.target.matches('.notification-dropdown') && !event.target.matches('.notification-box') && !event.target.matches('.view-all-notification')) {
        notificationMenu.classList.remove("show")
    }
    if (!event.target.matches('.profile-wrap') && !event.target.matches('.userOption')) {
        userOption.classList.remove("show")
    }

}

//Start User Chart JS

const userChart = document.getElementById("userMonthlyFluctuations")
const monthlyBalanceFluctuationsChart = new Chart(userChart, {
    type: 'bar',
    data: {
        labels: ['Black', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [10, 20, 30, 40, 50, 60],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],

            borderWidth: 1,
            barThickness: 30
        }]
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
                beginAtZero: true
            }
        }

    }
});

//End User Chart JS