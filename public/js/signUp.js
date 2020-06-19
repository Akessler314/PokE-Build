/* eslint-disable prettier/prettier */
$(document).ready(() => {
  $('.signUpBtn').click(event => {
    event.preventDefault();

    if ($('#signUpUsername').val().trim() === '') {
      return errorHandle('Username cannot be blank');
    }

    if ($('#signUpPassword').val().trim() === '' || $('#reEnterPassword').val().trim() === '') {
      return errorHandle('Both password fields must not be blank');
    }

    if ($('#signUpPassword').val().trim() !== $('#reEnterPassword').val().trim()) {
      return errorHandle('Passwords did not match.');
    }

    if ($('#signUpPassword').val().trim().length < 6 || $('#signUpPassword').val().trim().length > 128) {
      return errorHandle('Passwords must be between 6 and 128 characters');
    }

    signUp();
  });

  $.ajax({
    url: '/api/auth/user'
  }).then(res => {
    $('.userNameText').text(res.username);

    if ($('.userNameText').text() === '') {
      $('.userBtn').append($('<a>').attr({ href: '/signup' }).addClass('dropdown-item').text('Sign up'));
      $('.userBtn').append($('<div>').addClass('dropdown-divider'));
      $('.userBtn').append($('<a>').attr({ href: '/login' }).addClass('dropdown-item').text('Sign in'));
    } else {
      $('.userBtn').append($('<a>').attr({ href: '/api/auth/logout' }).addClass('dropdown-item').text('Log out'));
    }
  });
});

function signUp() {
  $.ajax({
    url: `/api/creators/user/${$('#signUpUsername').val().trim()}`,
    method: 'GET'
  }).then((results) => {
    // This will check to make sure that the username is not already taken
    // If it is already taken then this will throw an error
    if (results !== null) {
      return errorHandle('Sorry but that username is already taken.');
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

function errorHandle(str) {
  $('.modalText').text(str);

  $('#myModal').modal('show');
}
