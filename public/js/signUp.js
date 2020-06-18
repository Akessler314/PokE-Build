$(document).ready(() => {
  $('.signUpBtn').on('click', signUp);
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
  });
}
