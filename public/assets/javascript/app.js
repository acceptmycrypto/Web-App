$.ajax({
    url: '/api/cryptos_venues',
    method: 'GET'
  }).then(function(data) {
    console.log(data);
    var venue_name = '';
    var venue_description = '';
    var venue_link = '';
    var venue_id = ;
  
    for (var i = 0; i < data.length; i++) {
      var table, row, div_venue, div_desc, div_crypto, cryptoList;




{/* <div class="cell" data-title="vendors">
    # of Vendors Accepting (TBD)
</div> */}
