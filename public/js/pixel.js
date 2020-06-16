const $colorPicker = $('#colorPicker');
//code for the pokemon stats
const $hp = $('#hp');
const $speed = $('#speed');
const $defense = $('#defense');
const $spDefense = $('#SP_Defense');
const $attack = $('#attack');
const $spAttack = $('#SP_Attack');

let nextName;

//prottype object for pokemon stat object
const stats = {
  hp: 0,
  speed: 0,
  defense: 0,
  spDefense: 0,
  attack: 0,
  spAttack: 0
};

$(document).ready(() => {
  addCellClickListener();
  //Call this on page load to give the initial amount of poitns avaialable.
  pointPoolUpdater();
});

//Adds a color to the clicked on cell
function addCellClickListener() {
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
  nextName = 'name';
  goToNext();
});

$('.pixelNext').click(() => {
  nextName = 'pixel';
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
    if ($('.dropdown-2').text().trim() === 'Second Type (optional)') {
      $('.dropdown-2').text('None');
    }

    $('.chooseTypeImg').slideUp('slow');
    $('.typeNext').slideUp('slow');

    // Wait for the above animations to finish
    setTimeout(() => {
      $('.chooseType').removeClass('current');
      $('.statsRow').slideDown('slow');
    }, 700);
  }
}

$('a').click(function() {
  if ($(this).hasClass('first')) {
    $('.dropdown-1').text($(this).text());
  } else {
    $('.dropdown-2').text($(this).text());
  }

  $('.typeNext').slideDown('slow');
});

//Point updater
function pointPoolUpdater() {
  //var for the initial point pool the user will have avialible.
  const avaialblePoitns = 500;
  //this will add up the values of all the points put into stats, and store it in a variable to be used.
  const usedPoints =
    parseInt($hp.val()) +
    parseInt($speed.val()) +
    parseInt($defense.val()) +
    parseInt($spDefense.val()) +
    parseInt($defense.val()) +
    parseInt($spAttack.val());
  if (usedPoints > 500) {
    //alert user they are over the aloted points
    alert('You have run out of points!');
    // } else if ((usedPoints = isNaN)) {
    //   //Alert the user that an input was cleared
    //   alert('Please enter a value');
  } else {
    $('#pointPool').text(
      'Current Points Left: ' + (avaialblePoitns - usedPoints)
    );
  }

  //event listiner for when the user submits stats STILL NEED TO ADD REDUCTION FROM AVAILABLE POINT POOL.
  $('#statSubmit').click(() => {
    if (usedPoints > 500) {
      alert('Your pokemon is too strong!');
    } else {
      const newPokeStats = Object.create(stats);
      newPokeStats.hp = $hp.val();
      newPokeStats.speed = $speed.val();
      newPokeStats.defense = $defense.val();
      newPokeStats.spDefense = $spDefense.val();
      newPokeStats.attack = $attack.val();
      newPokeStats.spAttack = $spAttack.val();
      console.log(newPokeStats);
    }
  });
}

//event listener for when a user changes the value of a stat
$('#hp, #speed, #defense, #SP_Defense, #attack, #SP_Attack').change(() => {
  pointPoolUpdater();
});
