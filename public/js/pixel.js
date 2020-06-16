const $colorPicker = $('#colorPicker');
//code for the pokemon stats
const $hp = $('#hp');
const $speed = $('#speed');
const $defense = $('#defense');
const $spDefense = $('#SP_Defense');
const $attack = $('#attack');
const $spAttack = $('#SP_Attack');

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
    console.log(event.target.matches('td'));
    if (event.target.matches('td')) {
      const color = $colorPicker.val();
      $(event.target).css('background-color', color);
    }
  });
}

// Toggles grid opacity
$('#toggle').click(() => {
  $('table tr td').toggleClass('opacity');
});

//event listiner for when the user submits stats STILL NEED TO ADD REDUCTION FROM AVAILABLE POINT POOL.
$('#statSubmit').click(() => {
  const newPokeStats = Object.create(stats);
  newPokeStats.hp = $hp.val();
  newPokeStats.speed = $speed.val();
  newPokeStats.defense = $defense.val();
  newPokeStats.spDefense = $spDefense.val();
  newPokeStats.attack = $attack.val();
  newPokeStats.spAttack = $spAttack.val();
  console.log(newPokeStats);
});

//Point updater
function pointPoolUpdater() {
  //var for the initial point pool the user will have avialible.
  const avaialblePoitns = 100;
  //this will add up the values of all the points put into stats, and store it in a variable to be used.
  const usedPoints =
    parseInt($hp.val()) +
    parseInt($speed.val()) +
    parseInt($defense.val()) +
    parseInt($spDefense.val()) +
    parseInt($defense.val()) +
    parseInt($spAttack.val());
  $('#pointPool').text(
    'Current Points Left: ' + (avaialblePoitns - usedPoints)
  );
  // if (usedPoints <= 100) {
  //   console.log('You have run out of points!');
  // } else {
  //   $('#pointPool').text(
  //     'Current Points Left: ' + (avaialblePoitns - usedPoints)
  // });
}

//event listener for when a user changes the value of a stat
$('#hp, #speed, #defense, #SP_Defense, #attack, #SP_Attack').change(() => {
  pointPoolUpdater();
});
