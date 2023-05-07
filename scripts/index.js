document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        let scroll = window.scrollY;
        let arrow = document.querySelector('.arrow');
        if (scroll >= 1) {
            arrow.classList.add('fade');
        } else{
            arrow.classList.remove('fade');
        }

    });
});