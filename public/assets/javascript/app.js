$.ajax({
    url: '/api/cryptos_venues',
    method: 'GET'
  }).then(function(data) {
    console.log(data);
    var numOfVenues = 'select count(venue_id) as total from cryptos_venues where crypto_id = 1';



{/* <div class="cell" data-title="vendors">
    # of Vendors Accepting (TBD)
</div> */}
