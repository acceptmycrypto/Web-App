
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

// export async function _verifyUser (token){
//     const settings = {
//       method: "POST",
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({token})
//     };
 
//   const user = await fetch("http://localhost:3001/user", settings)
//   const userID = await user.json();

//   return{userID};
// }



export async function _loadProfile (token) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token})
  };
  const profile = await fetch("http://localhost:3001/profile", settings)
  const user_info = await profile.json();

  const profile_crypto = await fetch("http://localhost:3001/profile/crypto", settings)
  const user_crypto = await profile_crypto.json();


  const profile_friends = await fetch("http://localhost:3001/profile/friends", settings)
  const friends_array = await profile_friends.json();

  const profile_transactions = await fetch("http://localhost:3001/profile/user/transactions", settings)
  const transactions = await profile_transactions.json();


  
  return({user_info, user_crypto, friends_array, transactions});
  // return Promise.all([
  //   fetch("http://localhost:3001/profile"),
  //   fetch("http://localhost:3001/profile/crypto"),
  //   fetch("http://localhost:3001/profile/friends"), 
  //   fetch("http://localhost:3001/profile/user/transactions")
  // ])
  //   .then(([res1, res2, res3, res4]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json()]));
}


