export async function _loadDeals(token) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token})
  };

  const dealsList = await fetch("http://localhost:3001/api/deals", settings);
  const deals = await dealsList.json();

  return {deals}
}
