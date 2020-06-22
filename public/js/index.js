/* eslint-disable indent */
/* eslint-disable prettier/prettier */

let viewAllRunning = false;
let battleBtnRunning = false;
let user;
let pageNum;

$(document).ready(() => {
  $.ajax({
    url: '/api/auth/user'
  }).then(res => {
    user = res;

    $('.userNameText').text(res.username);

    if ($('.userNameText').text() === '') {
      $('.userBtn').append($('<a>').attr({ href: '/signup' }).addClass('dropdown-item').text('Sign up'));
      $('.userBtn').append($('<div>').addClass('dropdown-divider'));
      $('.userBtn').append($('<a>').attr({ href: '/login' }).addClass('dropdown-item').text('Sign in'));
    } else {
      $('.userBtn').append($('<a>').attr({ href: '/api/auth/logout' }).addClass('dropdown-item').text('Log out'));
    }
  });

  pageNum = 0;
});

$('.searchBtn').on('click', event => {
  event.preventDefault();

  viewAllRunning = false;

  $('.searchResults').empty();

  $('.goToNext').slideUp('slow');
  $('.goToPrev').slideUp('slow');

  pageNum = 0;

  searchAll(`/api/pokemon/search/${$('.searchBar').val()}`);

});

$('.searchBar').on('keydown', key => {
  if (key.keyCode !== 13) {
    $('.error').slideUp('slow');
    $('.searchResults').slideUp('slow');

    $('.goToNext').slideUp('slow');
    $('.goToPrev').slideUp('slow');
  
    if (key.keyCode === 8) {
      if ($('.searchBar').val().trim() === '' && !$('.searchBar').is(':focus')) {
        $('.searchResults').slideUp('slow');

        setTimeout(() => {
          $('.buttonRow').slideDown('slow');
          $('.searchResults').empty();
        }, 600);

      }
    } else {
      $('.buttonRow').slideUp('slow');
      $('.searchResults').slideUp('slow');
    }
  }
});

$(document).click(() => {
  if ($('.searchBar').is(':focus') === false) {
    if ($('.searchBar').val().trim() === '' && !viewAllRunning && $('.searchResults').is(':hidden')) {
      $('.searchResults').slideUp('slow');
      $('.buttonRow').slideDown('slow');
    }
  }
});

// This is for when the user clicks to view a Pokemon
$('body').delegate('.pokemonSearch', 'click', function(event) {
  event.preventDefault();

  if (!battleBtnRunning) {
    $('.goToNext').slideUp('slow');
    $('.goToPrev').slideUp('slow');

    $('.searchResults').slideUp('slow');

    setTimeout(() => {
      $('.searchResults').empty();

      $.ajax({
        url: '/api/pokemon/' + $(this).attr('data-id')
      }).then(results => {
        let lastSearch;

        if ($('.searchBar').val().trim() === '') {
          lastSearch = 'View All';
        } else {
          lastSearch = $('.searchBar').val().trim();
        }

        $('.searchBar').val('');

        const type1 = findType(results.type1);

        const div = $('<div>').addClass('col-lg-12');

        const creator = $('<p>')
          .text(`Created by ${results.Creator.username}`)
          .addClass('creatorName');

        const card = $('<div>').addClass('card');

        const cardBody = $('<div>').addClass('card-body');

        const img = $('<div>').append(
          $('<img>')
            .attr({ src: results.sprite, alt: `Picture of ${results.name}` })
            .addClass('pokemonImg')
        );

        const text = $('<div>')
          .addClass('pokemonText')
          .append($('<p>').text(`Name: ${results.name}`))
          .append($('<p>').text(`Type: ${type1}`))
          .append($('<p>').text(`HP: ${results.stats.hp}`))
          .append($('<p>').text(`Speed: ${results.stats.speed}`))
          .append($('<p>').text(`Attack: ${results.stats.attack}`))
          .append($('<p>').text(`Defense: ${results.stats.defense}`))
          .append($('<p>').text(`SP Attack: ${results.stats.spAttack}`))
          .append($('<p>').text(`SP Defense: ${results.stats.spDefense}`));

        const goBack = $('<div>')
          .addClass('row')
          .addClass('pokemonBtnRow')
          .append(
            $('<div>').addClass('col-lg-12')
              .append($('<button>').append($('<img>')
                .attr({
                  'src': 'https://fontmeme.com/permalink/200617/54fe828c09c10c703837abef5daa4e99.png',
                  'alt': 'Click on this button to go back to the previous screen',
              }))
              .addClass('goBackBtn btn')
              .attr('data-search', lastSearch))
          );

        const battleBtn = $('<button>').append($('<img>')
            .attr({
              'src': 'https://fontmeme.com/permalink/200617/496fe144d8c773fefe9c9dbe2e35d2bf.png',
              'alt': 'Click on this button to battle this pokemon!',
          }))
          .addClass('battleBtn battleBtn2 btn')
          .attr('data-id', results.id);

          const battleId = JSON.parse(sessionStorage.getItem('battleId1'));
      
          if (battleId !== null) {
            if (parseInt(battleId.id) === results.id) {
              battleBtn.attr('disabled', true);
            }
          }

        text.append(battleBtn);

        div.append(creator).append(card).append(goBack);

        card.append(cardBody);

        cardBody.append(img).append(text);

        $('.searchBar').val('');

        $('.searchResults').append(div);

        $('.searchResults').slideDown('slow');

        setTimeout(() => {
          $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
        }, 500);
      });
    }, 1000);
  }
});

// This is for when the user chooses to Battle a Pokemon
$('body').delegate('.battleBtn', 'click', function() {
  battleBtnRunning = true;

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

      $('.goToNext').slideUp('slow');
      $('.goToPrev').slideUp('slow');

      sessionStorage.setItem('battleId2', JSON.stringify(battleObj));

      $('.searchResults').slideUp('slow');
      
      setTimeout(() => {
        $('.searchRow').slideUp('slow');

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

    battleBtnRunning = false;
  }, 300);
});

// This is for when the user clicks the go back button when viewing a Pokemon
$('body').delegate('.goBackBtn', 'click', function() {
  $('.searchResults').slideUp('slow');

  let lastSearchUrl;

  if ($(this).attr('data-search') === 'View All') {
    lastSearchUrl = `/api/pokemon/index/${pageNum}`;
  } else {
    $('.searchBar').val($(this).attr('data-search'));
    lastSearchUrl = `/api/pokemon/search/${$(this).attr('data-search')}`;
  }

  setTimeout(() => {
    $('.searchResults').empty();

    searchAll(lastSearchUrl);
  }, 1000);
});

$('.viewAll').click((event) => {
  event.preventDefault();

  viewAllRunning = true;

  $('.error').slideUp('slow');
  $('.buttonRow').slideUp('slow');
  $('.searchResults').empty();

  setTimeout(() => {
    searchAll(`/api/pokemon/index/${pageNum}`);
  }, 1000);
});

$('.viewYour').click(event => {
  event.preventDefault();

  if ($('.userNameText').text() === '') {
    window.location.href = '/login';
  } else {
    window.location.href = `/view-own/${user.id}`;
  }
});

$('.goToNextBtn').click(() => {
  $('.goToNext').slideUp('slow');

  setTimeout(() => {
    $('.searchResults').slideUp('slow');

    setTimeout(() => {
      pageNum++;

      $('.searchResults').empty();
      
      searchAll(`/api/pokemon/index/${pageNum}`);
    }, 700);
  }, 500);
});

$('.goToPrevBtn').click(() => {
  $('.goToPrev').slideUp('slow');
  
  setTimeout(() => {
    $('.error').slideUp('slow');
  
    $('.searchResults').slideUp('slow');

    setTimeout(() => {
      pageNum--;

      $('.searchResults').empty();
      
      searchAll(`/api/pokemon/index/${pageNum}`);
    }, 700);
  }, 500);
});

function searchAll(url) {
  $.ajax({
    url: url
  }).then(results => {

    // Show an error if the user tries searching for nothing
    if (results === null) {
      $('.error').text('You can\'t search for nothing...');
      $('.error').slideDown('slow');
      return;
    }


    // Show an error if the there are no search results
    else if (results.length === 0) {
      $('.error').text('Couldn\'t find any Pokemon with that name');
      $('.error').slideDown('slow');
      return;
    }

    else if (results.length === 0 && pageNum > 0) {
      $('.error').text('Sorry that was all the pokemon left :(');
      $('.error').slideDown('slow');
      $('.goToPrev').slideDown('slow');
      return;
    }

    // Go through each of the pokemon and add it to the searchResults div
    results.forEach(pokemon => {
      const type1 = findType(pokemon.type1);

      const div = $('<div>').addClass('col-lg-3');

      const link = $('<a>')
        .attr({ href: `/pokemon/${pokemon.id}`, 'data-id': pokemon.id })
        .addClass('pokemonSearch');

      const img = $('<img>')
        .attr({
          src: pokemon.sprite,
          alt: `Picture of ${pokemon.name}`
        })
        .addClass('resultImg');

      const card = $('<div>').addClass('card resultCard');

      const cardBody = $('<div>').addClass('card-body');

      const name = $('<p>')
        .text(`Name: ${pokemon.name}`)
        .addClass('resultText');

      const type = $('<p>')
        .text(`Type: ${type1}`)
        .addClass('resultText');

      const button = $('<button>')
        .append($('<img>').attr({
          'src': 'https://fontmeme.com/permalink/200617/3f39d10a8e1d4be552c1d41f697e8dcd.png',
          'alt': 'Click on this button to battle this pokemon!',
        }))
        .addClass('battleBtn btn')
        .attr('data-id', pokemon.id);

      const battleId = JSON.parse(sessionStorage.getItem('battleId1'));
      
      if (battleId !== null) {
        if (parseInt(battleId.id) === pokemon.id) {
          button.attr('disabled', true);
        }
      }

      div.append(link);
      link.append(card);
      card.append(cardBody);
      cardBody.append(img);
      cardBody.append(name);
      cardBody.append(type);
      cardBody.append(button);

      $('.searchResults').append(div);

      if (results.length >= 20) {
        $('.goToNext').slideDown('slow');
      }
      
      else if (results.length <= 20 && pageNum > 0) {
        $('.goToPrev').slideDown('slow');
      }
    });

    $('.searchResults').slideDown('slow');
  });
}

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
