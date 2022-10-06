function SideNavControl(button) {

    let sideNav = document.getElementsByClassName('side-nav-bar')[0]
    let mainSection = document.getElementsByClassName('main')[0]
    let text_content = document.querySelectorAll('.side-nav-text')
    if (sideNav.clientWidth > 100) {
        text_content.forEach((div) => {

            div.style.display = "none"

        });
        sideNav.style.width = "80px"
        mainSection.style.marginLeft = "80px"
        button.classList.toggle("change")


    } else {

        text_content.forEach((div) => {

            div.style.display = "block"

        });
        sideNav.style.width = "265px"
        mainSection.style.marginLeft = "265px"
        button.classList.toggle("change")
    }
}