export async function _loadDeals() {
  const dealsList = await fetch("http://localhost:3001/api/deals");
  const deals = await dealsList.json();

  const venuesList = await fetch("http://localhost:3001/api/venues_cryptos");
  const cryptosAccepted = await venuesList.json();

  return {deals, cryptosAccepted}
}

export async function _loadDealItem (deal_name) {
  const dealItemArr = await fetch(`http://localhost:3001/api/deals/${deal_name}`);
  const dealItem = await dealItemArr.json();

  return dealItem
}
