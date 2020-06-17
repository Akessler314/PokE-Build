/* eslint-disable prettier/prettier */

$('.searchBtn').on('click', event => {
  event.preventDefault();

  $.ajax({
    url: '/api/pokemon/search/' + $('.searchBar').val()
  }).then(results => {
    console.log(results);

    // Show an error if the there are no search results
    if (results.length === 0) {
      $('.error').text('Couldn\'t find any Pokemon with that name');
      $('.error').slideDown('slow');
      return;
    }

    // Go through each of the pokemon from the search and add them to the list
    results.forEach(pokemon => {
      const div = $('<div>').addClass('col-lg-3');

      const link = $('<a>').attr({'href': `/api/pokemon/${pokemon.id}`, 'data-id': pokemon.id}).addClass('pokemonSearch');

      const img = $('<img>')
        .attr({
          src: pokemon.sprite,
          alt: `Picture of ${pokemon.name}`
        })
        .addClass('resultImg');

      const card = $('<div>').addClass('card resultCard');

      const cardBody = $('<div>').addClass('card-body');

      const text = $('<p>').text(`Name: ${pokemon.name}`).addClass('resultText');

      div.append(link);
      link.append(card);
      card.append(cardBody);
      cardBody.append(img);
      cardBody.append(text);

      $('.searchResults').append(div);
    });

    // Show the results
    $('.searchResults').slideDown('slow');
  });
});

$('.searchBar').on('keydown', key => {
  $('.searchResults').slideUp('slow');

  if (key.keyCode === 8) {

    if ($('.searchBar').val().trim() === '') {
      $('.buttonRow').slideDown('slow');
      $('.searchResults').empty();
    }

    $('.error').slideUp('slow');
  } else {
    $('.buttonRow').slideUp('slow');
    $('.searchResults').empty();
  }
});

$(document).click(() => {
  if ($('.searchBar').val().trim() === '') {
    $('.searchResults').slideUp('slow');
    $('.buttonRow').slideDown('slow');
  }
});

$('a').click(function(event) {
  event.preventDefault();
  console.log($(this));
});