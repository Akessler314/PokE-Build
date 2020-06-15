const $colorPicker = $('#colorPicker');
//code for the pokemon stats
// const avaialblePoitns = 100;
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
