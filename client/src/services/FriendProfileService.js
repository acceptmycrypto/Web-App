export const _loadFriendProfile = (id) => {
    return Promise.all([
      fetch(`http://localhost:3001/friend/profile/${id}`),
      fetch(`http://localhost:3001/friend/profile/crypto/${id}`),
      fetch(`http://localhost:3001/friend/profile/friends/${id}`), 
      fetch(`http://localhost:3001/friend/profile/user/transactions/${id}`)
    ]).then(([res1, res2, res3, res4]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json()]));
  }