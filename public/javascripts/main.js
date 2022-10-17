function SideNavControl(button) {

    let sideNav = document.getElementsByClassName('side-nav-bar')[0]
    let mainSection = document.getElementsByClassName('main')[0]
    let header_profile = document.getElementsByClassName('nav-bar')[0]
    let hamburger = document.getElementsByClassName('hamburger')[0]
    let text_content = document.querySelectorAll('.side-nav-text')
    if (sideNav.clientWidth > 100) {
        text_content.forEach((div) => {

            div.style.display = "none"

        });
        sideNav.style.width = "80px"
        mainSection.style.marginLeft = "80px"
        header_profile.classList.toggle("full-navbar")
        hamburger.classList.toggle('expand-hamburger')
        button.classList.toggle("change")


    } else {

        text_content.forEach((div) => {

            div.style.display = "block"

        });
        sideNav.style.width = "265px"
        mainSection.style.marginLeft = "265px"
        header_profile.classList.toggle("full-navbar")
        hamburger.classList.toggle('expand-hamburger')
        button.classList.toggle("change")
    }
}

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