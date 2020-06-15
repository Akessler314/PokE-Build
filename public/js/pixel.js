const $colorPicker = $('#colorPicker');
//code for the pokemon stats
// let avaialblePoitns = 100;
// let $hp = $('#hp');
// let $speed = $('#speed');
// let $defense = $('#defense');
// let $spDefense = $('#SP_Defense');
// let $attack = $('#attack');
// let $spAttack = $('#SP_Attack');

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
