//anim burger && open menu
(function () {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.header_menu');
    burger.addEventListener('click', () => {
        burger.classList.toggle('burger_active');
        menu.classList.toggle('menu_active');

    });
}());

//open popup on all buttons with class .open_popup
let popup_bg = document.querySelector('.popup_bg');
let popup = document.querySelector('.popup');
let open_popupButtons = document.querySelectorAll('.open_popup,.offer_submit');

open_popupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        popup_bg.classList.add('active');
        popup.classList.add('active');
    })
});

//close popup
document.addEventListener('click', (e) => {
    if (e.target === popup_bg) {
        popup_bg.classList.remove('active');
        popup.classList.remove('active');
    }
});

//close menu && popup on keydown Escape
let burger = document.querySelector('.burger');

document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && popup_bg.classList.contains('active')) {
        popup_bg.classList.remove('active');
        popup.classList.remove('active');
    } else if (e.code === 'Escape' && menu_open.classList.contains('menu_active')) {
        menu_open.classList.remove('menu_active');
        burger.classList.remove('burger_active');
    }
});

//lock scroll on opened menu && opened popup
let menu_open = document.querySelector('.header_menu');

document.addEventListener('click', () => {
    if (menu_open.classList.contains('menu_active') || popup_bg.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.paddingRight = '20px';
    } else {
        document.body.style.overflow = 'auto';
        document.documentElement.style.paddingRight = '0px';
    }
});

document.addEventListener('keydown', (e) => {
    if ((menu_open.classList.contains('menu_active') || popup_bg.classList.contains('active')) && e.code === 'Escape') {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.paddingRight = '20px';
    } else {
        document.body.style.overflow = 'auto';
        document.documentElement.style.paddingRight = '0px';
    }
});

//close menu on click in content space
document.getElementById("menu").addEventListener('click', e => {
    e._isClickWithInMenu = true;
});

document.getElementById("burger").addEventListener('click', e => {
    e._isClickWithInMenu = true;
});

document.body.addEventListener('click', e => {
    if(e._isClickWithInMenu) return;
    document.querySelector(".header_menu").classList.remove("menu_active");
    document.querySelector(".burger").classList.remove("burger_active");
});

// Scroll to anchors
(function () {

    const smoothScroll = function (targetEl, duration) {
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top;
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 400);
            });
        });
    };
    scrollTo();
}());