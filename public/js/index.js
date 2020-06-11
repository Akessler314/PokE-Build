$('.searchBtn').on('click', event => {
  event.preventDefault();

  $.ajax({
    url: '/api/pokemon/search/' + $('.searchBar').val()
  }).then(results => {
    console.log(results);
  });
});
