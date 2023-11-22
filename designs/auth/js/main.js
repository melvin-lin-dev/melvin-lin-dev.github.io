function togglePassword(el) {
    let passwordEl = document.querySelector('.password input#password');

    if (el.className.match('slash')) {
        el.className = el.className.replace('-slash', '');
        passwordEl.type = 'password';
    } else {
        passwordEl.type = 'text';
        el.className += '-slash';
    }
}
