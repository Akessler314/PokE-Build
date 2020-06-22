let user;

/* eslint-disable indent */
/* eslint-disable prettier/prettier */
$(document).ready(() => {
  $('.loader').hide();

  $.ajax({
    url: '/api/auth/user'
  }).then(res => {
    user = res;

    $('.userNameText').text(res.username);

    $('.userBtn').append($('<a>').attr({ href: '/api/auth/logout' }).addClass('dropdown-item').text('Log out'));

    // Instead of running a switch in handlebars
    // This ajax call will grab the type number from the api
    // Then parse it using the findType function and replace the "TBD" in the correct spot on the html side 
    $.ajax({
      url: `/api/creators/${user.id}`,
      method: 'GET'
    }).then(results => {
      results.Pokemon.forEach((type, i) => {
        const savedBattleId = JSON.parse(sessionStorage.getItem('battleId1'));

        const typeName = findType(type.type1);

        if (savedBattleId !== null) {
          if ($(`.bb${i}`).attr('data-id') === savedBattleId.id) {
              $(`.bb${i}`).attr('disabled', true);
          }
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
    setTimeout(() => {
      // eslint-disable-next-line eqeqeq
      if (sessionStorage.getItem('battleId1') == null) {
        const battleObj = {
          img: $(this).parent().parent().find('img').attr('src'),
          id: $(this).attr('data-id')
        };
  
        sessionStorage.setItem('battleId1', JSON.stringify(battleObj));
  
        $(this).attr('disabled', true);
  
        $('#myModal').modal('show');
      } else {
        const battleObj = {
          img: $(this).parent().parent().find('img').attr('src'),
          id: $(this).attr('data-id')
        };

        sessionStorage.setItem('battleId2', JSON.stringify(battleObj));
  
        $('.pokemonCardRow').slideUp('slow');

        setTimeout(() => {
          $('.mainContent').slideUp('slow');
  
          const battleObj1 = JSON.parse(sessionStorage.getItem('battleId1'));
          const battleObj2 = JSON.parse(sessionStorage.getItem('battleId2'));
  
          $('.battleImg1').attr('src', battleObj1.img);
          $('.battleImg2').attr('src', battleObj2.img);
  
          setTimeout(() => {
            $('.letsBattleRow').slideDown();
  
            setTimeout(() => {
              $('.battleImg1').slideDown('fast');
  
              setTimeout(() => {
                $('.vs').slideDown('fast');
  
                setTimeout(() => {
                  $('.battleImg2').slideDown('fast');
  
                  setTimeout(() => {
                    const battleUrl = `/pokemon/battle/${battleObj1.id}/${battleObj2.id}`;
  
                    window.location.href = battleUrl;
  
                    sessionStorage.clear();
                  }, 1000);
                }, 500);
              }, 500);
            }, 500);
          }, 1000);
        }, 800);
      }
    }, 300);
});

// eslint-disable-next-line no-unused-vars
let deletePokemonId;
let deletePokemonName;

$('.trashATag').click(function(event) {
  event.preventDefault();

  deletePokemonId = $(this).data('id');
  deletePokemonName = $(this).data('name');

  $('.pokemonName').text($(this).data('name'));

  $('#deleteModal').modal('show');
});

$('.noBtn').click(() => {
  deletePokemonId = '';
  deletePokemonName = '';
});

$('.yesBtn').click(() => {
  const savedBattleId = JSON.parse(sessionStorage.getItem('battleId1'));
  
  if (savedBattleId !== null) {
    if (deletePokemonId === parseInt(savedBattleId.id)) {
      sessionStorage.removeItem('battleId1');
    }
  }

  $('.deleteModalHeader').slideUp('slow');
  $('.modalBody').slideUp('slow');
  $('.deleteModalFooter').slideUp('slow');

  setTimeout(() => {
    $('.deleteModalText').text(`Deleting ${deletePokemonName} from the Poke-Build database.`);
    $('.loader').show();
    $('.modalBody').slideDown('slow');

    setTimeout(() => {
      $.ajax({
        url: `/api/pokemon/delete/${deletePokemonId}`
      }).then(() => {
        console.log('test');
        window.location.href = `/view-own/${user.id}`;
      });
    }, 2000);
  }, 800);
});