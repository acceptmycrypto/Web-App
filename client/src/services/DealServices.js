export async function _loadDeals() {
  const dealsList = await fetch("http://localhost:3001/api/deals");
  const deals = await dealsList.json();

  const venuesList = await fetch("http://localhost:3001/api/venues_cryptos");
  const cryptosAccepted = await venuesList.json();

  return {deals, cryptosAccepted}
}
