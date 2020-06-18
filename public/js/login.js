/* eslint-disable prettier/prettier */
$(document).ready(() => {
  $('.logInBtn').on('click', signUp);

  $.ajax({
    url: '/api/auth/user'
  }).then(res => {
    user = res;

    $('.userNameText').text(res.username);

    if ($('.userNameText').text() === '') {
      $('.userBtn').append($('<a>').attr({ href: '/signup' }).addClass('dropdown-item').text('Sign up'));
      $('.userBtn').append($('<a>').attr({ href: '/login' }).addClass('dropdown-item').text('Sign in'));
    } else {
      $('.userBtn').append($('<a>').attr({ href: '/api/auth/logout' }).addClass('dropdown-item').text('Log out'));
    }
  });
});

function signUp(event) {
  event.preventDefault();

  $.ajax({
    url: '/api/auth/login',
    method: 'POST',
    data: {
      username: $('#logInUsername').val(),
      password: $('#logInPassword').val()
    },
    error: function() {
      $('#myModal').modal('show');
    }
  }).then(() => {
    window.location.replace('/');
  });
}
