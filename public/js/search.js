/* eslint-disable prettier/prettier */

$(document).on('submit', event => {
  event.preventDefault();

  $('.pokemonRow').slideUp('slow');

  if ($('.pokemonRow:visible').length === 0) {
    searchForPokemon();
  } else {
    setTimeout(() => {
      searchForPokemon();
    }, 500);
  }
});

$(document).click(() => {
  $('.error').slideUp('slow');

  setTimeout(() => {
    if ($('.error:visible').length === 0) {
      $('.pokemonRow').slideDown('slow');
    }
  }, 800);
});

$('.searchBar').on('keydown', () => {
  $('.error').slideUp('slow');
});

function searchForPokemon() {
  const search = $('.searchBar').val().trim();

  if (search === '') {
    $('.error').text('You can\'t search for nothing...');
    $('.error').slideDown('slow');
    return;
  }

  $.ajax({
    url: '/api/pokemon/search/' + $('.searchBar').val()
  }).then((results) => {
    if (results.length === 0) {
      $('.error').text('Couldn\'t find any Pokemon with that name.');
      $('.error').slideDown('slow');
      return;
    }

    $('.pokemonRow').empty();

    results.forEach(pokemon => {
      const div = $('<div>').addClass('col-lg-3');
  
      const link = $('<a>').attr('href', `/pokemon/${pokemon.searchableName}`);
  
      const img = $('<img>')
        .attr({
          src: pokemon.sprite,
          alt: `Picture of ${pokemon.name}`
        })
        .addClass('resultImg');
  
      const card = $('<div>').addClass('card resultCard');
  
      const cardBody = $('<div>').addClass('card-body');
  
      const text = $('<p>').text(`Name: ${pokemon.name}`).addClass('resultText');
  
      div.append(card);
      card.append(link);
      link.append(cardBody);
      cardBody.append(img);
      cardBody.append(text);
  
      $('.pokemonRow').append(div);
    });
  
    // Show the results
    $('.pokemonRow').slideDown('slow');
  });
}
