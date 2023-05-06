document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        var scroll = window.scrollY;
        var arrow = document.querySelector('.arrow');
        if (scroll >= 1) {
            arrow.classList.add('fade');
        } else{
            arrow.classList.remove('fade');
        }
    });
});