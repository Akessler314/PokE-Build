/* eslint-disable indent */
/* eslint-disable prettier/prettier */

let viewAllRunning = false;

$('.searchBtn').on('click', event => {
  event.preventDefault();

  $('.searchResults').empty();

  searchAll(`/api/pokemon/search/${$('.searchBar').val()}`);

});

$('.searchBar').on('keydown', key => {
  if (key.keyCode !== 13) {
    $('.error').slideUp('slow');
    $('.searchResults').slideUp('slow');
  
    if (key.keyCode === 8) {
      if ($('.searchBar').val().trim() === '') {
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
  if ($('.searchBar').val().trim() === '' && !viewAllRunning) {
    $('.searchResults').slideUp('slow');
    $('.buttonRow').slideDown('slow');
  }
});

$('body').delegate('.pokemonSearch', 'click', function(event) {
  event.preventDefault();

  $('.searchResults').slideUp('slow');

  setTimeout(() => {
    $('.searchResults').empty();

    $.ajax({
      url: '/api/pokemon/' + $(this).attr('data-id')
    }).then(results => {
      $('.searchBar').val('');

      const type1 = findType(results.type1);

      const div = $('<div>').addClass('col-lg-12');

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
        .append($('<p>').text(`Attack: ${results.stats.attack}`))
        .append($('<p>').text(`Defense: ${results.stats.defense}`))
        .append($('<p>').text(`Speed: ${results.stats.defense}`));

      div.append(card);

      card.append(cardBody);

      cardBody.append(img);

      cardBody.append(text);

      $('.searchResults').append(div);

      $('.searchResults').slideDown('slow');
    });
  }, 1000);
});

$('.viewAll').click((event) => {
  event.preventDefault();

  viewAllRunning = true;

  $('.buttonRow').slideUp('slow');
  $('.searchResults').empty();

  setTimeout(() => {
    searchAll('/api/pokemon/index/0');
  }, 1000);
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

      div.append(link);
      link.append(card);
      card.append(cardBody);
      cardBody.append(img);
      cardBody.append(name);
      cardBody.append(type);

      $('.searchResults').append(div);
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
