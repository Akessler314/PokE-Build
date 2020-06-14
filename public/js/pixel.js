const $colorPicker = $('#colorPicker');

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
