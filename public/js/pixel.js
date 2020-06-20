/* eslint-disable prettier/prettier */
const $colorPicker = $('#colorPicker');
//code for the pokemon stats
const $hp = $('#hp');
const $speed = $('#speed');
const $defense = $('#defense');
const $spDefense = $('#SP_Defense');
const $attack = $('#attack');
const $spAttack = $('#SP_Attack');

let nextName;
let creatorsId;
//Object to hold all of the objects being made for the 
const completedPokemonObject = {};
//helps with event listener for drawing 
let mouseDown = false;


$(document).ready(() => {
  $.ajax({
    url: '/api/auth/user'
  }).then(res => {
    creatorsId = res.id;

    $('.userNameText').text(res.username);

    $('.userBtn').append($('<a>').attr({ href: '/api/auth/logout' }).addClass('dropdown-item').text('Log out'));
  });

  addCellClickListener();
  //Call this on page load to give the initial amount of poitns avaialable.
  pointPoolUpdater();
  // appends all of the mvoes to the move selctor dropdowns on load
  appendMoves();

});
$(document.body).mousedown(() => {
  mouseDown = true;
});
$(document.body).mouseup(() => {
  mouseDown = false;
});


//Adds a color to the clicked on cell
function addCellClickListener() {
  $('table').mousemove(event => {
    if (mouseDown === true) {
      if ($('table').hasClass('enabled')) {
        if (event.target.matches('td')) {
          const color = $colorPicker.val();
          $(event.target).css('background-color', color);
        }
      }
    }
  });
  $('table').click(event => {
    
    if ($('table').hasClass('enabled')) {
      if (event.target.matches('td')) {
        const color = $colorPicker.val();
        $(event.target).css('background-color', color);
      }
    }
  });
}



// Toggles grid opacity
$('#toggle').click(() => {
  $('td').toggleClass('opacity');
});

$('#fname').on('keydown', () => {
  // eslint-disable-next-line prettier/prettier
  if ($('#fname').val().trim() !== '') {
    $('.nameNext').slideDown('slow');
  } else {
    $('.nameNext').slideUp('slow');
  }
});

$('#nameInputDiv').on('submit', event => {
  event.preventDefault();
  nextName = 'name';
  goToNext();
});

$('.nameNext').click(() => {
  //create object for pokemone name with a searchable name (lowercase) for db
  completedPokemonObject.name = $('#fname').val();
  nextName = 'name';
  goToNext();
});

$('.pixelNext').click(() => {
  nextName = 'pixel';
  //palceholder empty array to hold td cell color information.
  const pixels = [];
  //placeholder empty object to add the array

  //function to loop through the td cells and grab the css background color and push it into an array
  $('td').each(function () {
    const colorVals = $(this)
      .css('background-color')
      .match(/rgb\((\d+), (\d+), (\d+)\)/);
    pixels.push(parseInt(colorVals[1]), parseInt(colorVals[2]), parseInt(colorVals[3]), 255);
  });
  completedPokemonObject.sprite = pixels;
  $('table').toggleClass('enabled');
  goToNext();
});

//button to continue after selcting types
$('.typeNext').click(() => {
  nextName = 'type';
  goToNext();
});

function goToNext() {
  // If the first next button is clicked
  if (nextName === 'name') {
    $('.namePokemonImg').slideUp('slow');
    $('.nameNext').slideUp('slow');

    // Give the above animations time to finish
    setTimeout(() => {
      $('.pixelCreator').addClass('current');
      $('.pixelCreator').slideDown('slow');

      setTimeout(() => {
        $('html, body').animate({ scrollTop: 100 }, 'fast');
      }, 300);
    }, 700);
  }

  // If the second next button is clicked
  else if (nextName === 'pixel') {
    $('td').addClass('opacity');
    $('.drawPokemonImg').slideUp('slow');
    $('.tools').slideUp('slow');
    $('.pixelNext').slideUp('slow');

    // Make sure the above animations finish
    setTimeout(() => {
      $('.pixelCreator').removeClass('current');
      $('.chooseType').addClass('current');
      $('.chooseType').slideDown('slow');

      // Wait for the above animations to finish then scroll the page automatically
      setTimeout(() => {
        $('html, body').animate({ scrollTop: 250 }, 'fast');
      }, 300);
    }, 700);
  }

  // If the final next button is clicked
  else {
    // eslint-disable-next-line prettier/prettier
    if ($('.dropdown-2').text() === 'Second Type (optional)') {
      $('.dropdown-2').text('None');
      completedPokemonObject.type2 = 1;
    }

    $('.chooseTypeImg').slideUp('slow');
    $('.typeNext').slideUp('slow');

    // Wait for the above animations to finish
    setTimeout(() => {
      $('.chooseType').removeClass('current');
      $('.chooseStats').slideDown('slow');
      $('.chooseStats').addClass('current');

      setTimeout(() => {
        $('html, body').animate({ scrollTop: 800 }, 'slow');
      }, 500);
    }, 700);
  }
}

$('a').click(function (event) {
  if ($(this).hasClass('first')) {
    event.preventDefault();

    $('.dropdown-1').text($(this).text());

    completedPokemonObject.type1 = parseInt($(this).attr('data-id'));
  }

  else if ($(this).hasClass('second')) {
    event.preventDefault();

    $('.dropdown-2').text($(this).text());

    completedPokemonObject.type2 = parseInt($(this).attr('data-id'));
  }

  if ($('.dropdown-1').text().trim() !== 'First Type') {
    $('.typeNext').slideDown('slow');
  }
});

let usedPoints;
const availablePoints = 1000;

//Point updater
function pointPoolUpdater(prev, current) {
  //var for the initial point pool the user will have avialible.
  //this will add up the values of all the points put into stats, and store it in a variable to be used.
  usedPoints =
      parseInt($hp.val()) +
      parseInt($speed.val()) +
      parseInt($defense.val()) +
      parseInt($spDefense.val()) +
      parseInt($attack.val()) +
      parseInt($spAttack.val());


  if (parseInt($hp.val()) < 25) {
    $hp.val(25);
    pointChecker();
  }
  if (parseInt($speed.val()) < 25) {
    $speed.val(25);
  }
  if (parseInt($defense.val()) < 25) {
    $defense.val(25);
  }
  if (parseInt($spDefense.val()) < 25) {
    $spDefense.val(25);
  }
  if (parseInt($attack.val()) < 25) {
    $attack.val(25);
  }
  if (parseInt($spAttack.val()) < 25) {
    $spAttack.val(25);
  }


  if (usedPoints > 1000) {
    current.val(prev);

    pointChecker();

    //alert user they are over the aloted points
    $('.modalText').text('You ran out of points...');

    $('.modalImg').attr({
      src: '../img/snorlax.jpg',
      alt: 'Snorlax is not pleased'
    });

    $('#myModal').modal('show');
  } else {
    $('#pointPool').text(
      'Current Points Left: ' + (availablePoints - usedPoints)
    );
  }
}

//event listener for when a user changes the value of a stat
$('#hp, #speed, #defense, #SP_Defense, #attack, #SP_Attack').on('focus keypres', function () {
  $(this).data('num', $(this).val());
});

$('#hp, #speed, #defense, #SP_Defense, #attack, #SP_Attack').change(function () {
  const prevNum = $(this).data('num');
  const currentNum = $(this);

  pointPoolUpdater(prevNum, currentNum);
});

// function to append the moves into each move selector as well as the move name into a data-name attribute
function appendMoves() {
  let moveSet1;
  let moveSet2;
  $.ajax({
    url: 'https://pokeapi.co/api/v2/move-damage-class/physical',
    method: 'GET'
  }).then(response1 => {
    response1.moves.forEach(move => {
      moveSet1 = move.name;
      const moveId = move.url.match(/\/api\/v2\/move\/(\d+)/)[1];
      $(
        '#move1Dropdown, #move2Dropdown, #move3Dropdown, #move4Dropdown'
      ).append('<a class="dropdown-item move1" href="" data-id = "' + moveId + '">' + formatMoveName(moveSet1) + '</a>');
    });
  });

  $.ajax({
    url: 'https://pokeapi.co/api/v2/move-damage-class/special',
    method: 'GET'
  }).then(response2 => {
    response2.moves.forEach(move => {
      moveSet2 = move.name;
      const moveId = move.url.match(/\/api\/v2\/move\/(\d+)/)[1];
      $(
        '#move1Dropdown, #move2Dropdown, #move3Dropdown, #move4Dropdown'
      ).append('<a class="dropdown-item move1" href="" data-id = "' + moveId + '">' + formatMoveName(moveSet2) + '</a>');
    });
  });
}

let moveOne;
let moveTwo;
let moveThree;
let moveFour;

$('body').delegate('.move1, .move2', 'click', function (event) {
  event.preventDefault();

  $(this)
    .parent()
    .prev()
    .text($(this).text());

  if ($(this).parent().prop('id') === 'move1Dropdown') {
    moveOne = $(this).attr('data-id');
  }

  else if ($(this).parent().prop('id') === 'move2Dropdown') {
    moveTwo = $(this).attr('data-id');
  }

  else if ($(this).parent().prop('id') === 'move3Dropdown') {
    moveThree = $(this).attr('data-id');
  }

  else {
    moveFour = $(this).attr('data-id');
  }

  const move1Text = $('.move1Toggle').text().trim();
  const move2Text = $('.move2Toggle').text().trim();
  const move3Text = $('.move3Toggle').text().trim();
  const move4Text = $('.move4Toggle').text().trim();

  // This if statement is used just to check and make sure that the user has made a selection for
  // all four moves and nothing is left undefined.
  if (
    move1Text !== 'Move 1' &&
      move2Text !== 'Move 2' &&
      move3Text !== 'Move 3' &&
      move4Text !== 'Move 4'
  ) {
    $('#statSubmit').slideDown('slow');
  } else {
    $('#statSubmit').slideUp('slow');
  }

});

//event listiner for when the user submits stats
$('#statSubmit').click(() => {
  if (usedPoints > 1000) {

    //alert user they are over the aloted points if they try to submit a pokemon that has too many stats
    $('.modalText').text('Your Pokemon is too strong! Please nerf.');

    $('.modalImg').attr({
      src: '../img/pikachu-scare.jpg',
      alt: 'You scared Pikachu with how strong your Pokemon is! Please nerf your pokemon.'
    });

    $('#myModal').modal('show');
  } else {
    completedPokemonObject.stats = {
      hp: parseInt($hp.val()),
      speed: parseInt($speed.val()),
      defense: parseInt($defense.val()),
      spDefense: parseInt($spDefense.val()),
      attack: parseInt($attack.val()),
      spAttack: parseInt($spAttack.val())
    };

    moveOne = moveOne;
    moveTwo = moveTwo;
    moveThree = moveThree;
    moveFour = moveFour;

    completedPokemonObject.moves = {
      move1: parseInt(moveOne),
      move2: parseInt(moveTwo),
      move3: parseInt(moveThree),
      move4: parseInt(moveFour)
    };

    if (!completedPokemonObject.name) {
      completedPokemonObject.name = $('#fname').val();
    }

    $.ajax({
      url: `/api/creators/${creatorsId}/pokemon`,
      method: 'POST',
      data: completedPokemonObject
    }).then(() => {
      window.location.href = `/view-own/${creatorsId}`;
    });
  }
});

function formatMoveName(move) {
  const words = move.split('-');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
  }

  return words.join(' ');
}



function pointChecker() {
  usedPoints =
      parseInt($hp.val()) +
      parseInt($speed.val()) +
      parseInt($defense.val()) +
      parseInt($spDefense.val()) +
      parseInt($attack.val()) +
      parseInt($spAttack.val());


  $('#pointPool').text(
    'Current Points Left: ' + (availablePoints - usedPoints)
  );
}
