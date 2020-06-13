const $tableElement = $('#pixelCanvas');
const $inputHeight = $('#inputHeight');
const $inputWidth = $('#inputWidth');
const $colorPicker = $('#colorPicker');

$('#sizePicker').submit(event => {
  event.preventDefault();

  const width = $inputWidth.val();
  const height = $inputHeight.val();

  $tableElement.html(''); //clear

  makeGrid(height, width);
  console.log('pixel grid created');
  addCellClickListener();
});

function makeGrid(height, width) {
  for (let i = 0; i < height; i++) {
    $tableElement.append('<tr></tr>');
  }

  for (let i = 0; i < width; i++) {
    $('tr').append('<td></td>');
  }
}

//Adds a color to the clicked on cell
function addCellClickListener() {
  $('td').click(event => {
    const color = $colorPicker.val();
    $(event.currentTarget).css('background-color', color);
  });
}

//removes the grid
$('#removeGrid').click(() => {
  $('table tr td').addClass('opacity');
});
//adds grid back
$('#returnGrid').click(() => {
  $('table tr td').removeClass('opacity');
});
