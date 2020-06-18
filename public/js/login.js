$(document).ready(() => {
  $('.logInBtn').on('click', signUp);
});

function signUp(event) {
  event.preventDefault();

  $.ajax({
    url: '/api/auth/login',
    method: 'POST',
    data: {
      username: $('#logInUsername').val(),
      password: $('#logInPassword').val()
    }
  }).then(() => {
    window.location.replace('/');
  });
}
