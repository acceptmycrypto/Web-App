export async function _loadPhoto (token) {
    const settings = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token})
    };
    const photo_data = await fetch("http://localhost:3001/navbar/photo", settings)
    const photo = await photo_data.json();
  

    
    return({photo});
    
  }

//   return fetch(`http://localhost:3001/navbar/photo`)
//   .then((res) => res.json())
//   .then(photo => this.setState({
//     photo: photo[0].photo
//   }));