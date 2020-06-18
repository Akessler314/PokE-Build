/* eslint-disable indent */
/* eslint-disable prettier/prettier */
$(document).ready(() => {
    let user;

    $.ajax({
      url: '/api/auth/user'
    }).then(res => {
      user = res;

      $('.userNameText').text(res.username);
  
      if ($('.userNameText').text() === '') {
        $('.dropdown-menu').append($('<a>').attr({ href: '/signup' }).addClass('dropdown-item').text('Sign up'));
        $('.dropdown-menu').append($('<a>').attr({ href: '/login' }).addClass('dropdown-item').text('Sign in'));
      } else {
        $('.dropdown-menu').append($('<a>').attr({ href: '/api/auth/logout' }).addClass('dropdown-item').text('Log out'));
      }

      // Instead of running a switch in handlebars
      // This ajax call will grab the type number from the api
      // Then parse it using the findType function and replace the "TBD" in the correct spot on the html side 
      $.ajax({
        url: `/api/creators/${user.id}`
      }).then(results => {
        const savedBattleId = sessionStorage.getItem('battleId1');

        results.Pokemon.forEach((type, i) => {
            const typeName = findType(type.type1);

            if ($(`.bb${i}`).attr('data-id') === savedBattleId) {
               $(`.bb${i}`).attr('disabled', true);
            }

            $(`.type${i}`).text(typeName);
        
        });
      });
    });
});

function findType(num) {
    switch (num) {
      case 0:
        return 'None';
  
      case 1:
      return 'Normal';
  
      case 2:
      return 'Fighting';
  
      case 3:
      return 'Flying';
  
      case 4:
      return 'Poison';
  
      case 5:
      return 'Ground';
  
      case 6:
      return 'Rock';
  
      case 7:
      return 'Bug';
  
      case 8:
      return 'Ghost';
  
      case 9:
      return 'Steel';
  
      case 10:
      return 'Fire';
  
      case 11:
      return 'Water';
  
      case 12:
      return 'Grass';
  
      case 13:
      return 'Electric';
  
      case 14:
      return 'Psychic';
  
      case 15:
      return 'Ice';
  
      case 16:
      return 'Dragon';
  
      case 17:
      return 'Dark';
  
      case 18:
      return 'Fairy';
    }
}

// This is for when the user chooses to Battle a Pokemon
$('body').delegate('.battleBtn', 'click', function() {
    battleBtnRunning = true;
  
    setTimeout(() => {
      // eslint-disable-next-line eqeqeq
      if (sessionStorage.getItem('battleId1') == null) {
        sessionStorage.setItem('battleId1', $(this).attr('data-id'));
  
        $(this).attr('disabled', true);
  
        $('#myModal').modal('show');
      } else {
        sessionStorage.setItem('battleId2', $(this).attr('data-id'));
  
        $('.searchResults').slideUp('slow');
        
        setTimeout(() => {
          $('.searchRow').slideUp('slow');
  
          setTimeout(() => {
            $('.letsBattleRow').slideDown();
  
            const battleUrl = `/pokemon/battle/${sessionStorage.getItem('battleId2')}/${sessionStorage.getItem('battleId1')}`;
  
            sessionStorage.clear();
  
            setTimeout(() => {
              window.location.href = battleUrl;
            }, 1000);
          }, 1000);
        }, 800);
      }
  
      battleBtnRunning = false;
    }, 300);
});