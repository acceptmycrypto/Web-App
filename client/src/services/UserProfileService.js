
export async function _updateCryptoTable (id, crypto_address){
        const settings = {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, crypto_address })
          };
      
          const data = await fetch("http://localhost:3001/profile/addAddress?_method=PUT", settings)
            .then(response => response.json())
            .then(json => {
              return json;
            })
            .catch(e => {
              return e
            });
      
          const userProfileData = await fetch("http://localhost:3001/profile");
          const user_info = await userProfileData.json();
      
          const userCryptoData = await fetch("http://localhost:3001/profile/crypto");
          const user_crypto = await userCryptoData.json();
          const crypto_view = await "owned";
          const add_address = await false;
      
          return { user_info, user_crypto, crypto_view, add_address };
}

export const _loadProfile = () => {
  return Promise.all([
    fetch("http://localhost:3001/profile"),
    fetch("http://localhost:3001/profile/crypto"),
    fetch("http://localhost:3001/profile/friends"), 
    fetch("http://localhost:3001/profile/user/transactions")
  ])
    .then(([res1, res2, res3, res4]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json()]));
}


