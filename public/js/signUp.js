/* eslint-disable prettier/prettier */
$(document).ready(() => {
  $('.signUpBtn').on('click', signUp);

  $.ajax({
    url: '/api/auth/user'
  }).then(res => {
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
    url: `/api/creators/user/${$('#signUpUsername').val().trim()}`,
    method: 'GET'
  }).then((results) => {
    console.log(results);

    if (results !== null) {
      return $('#myModal').modal('show');
    } 

    $.ajax({
      url: '/api/auth/signup',
      method: 'POST',
      data: {
        username: $('#signUpUsername').val().trim(),
        password: $('#signUpPassword').val().trim()
      }
    }).then(() => {
      window.location.replace('/');
    });
  });
}
