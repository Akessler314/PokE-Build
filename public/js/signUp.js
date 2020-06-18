/* eslint-disable prettier/prettier */
$(document).ready(() => {
  $('.signUpBtn').on('click', signUp);

  $.ajax({
    url: '/api/auth/user'
  }).then(res => {
    $('.userNameText').text(res.username);

    if ($('.userNameText').text() === '') {
      $('.dropdown-menu').append($('<a>').attr({ href: '/signup' }).addClass('dropdown-item').text('Sign up'));
      $('.dropdown-menu').append($('<a>').attr({ href: '/login' }).addClass('dropdown-item').text('Sign in'));
    } else {
      $('.dropdown-menu').append($('<a>').attr({ href: '/api/auth/logout' }).addClass('dropdown-item').text('Log out'));
    }
  });
});

function signUp(event) {
  event.preventDefault();

  $.ajax({
    url: '/api/auth/signup',
    method: 'POST',
    data: {
      username: $('#signUpUsername').val(),
      password: $('#signUpPassword').val()
    }
  }).then(() => {
    window.location.replace('/');
  });
}
