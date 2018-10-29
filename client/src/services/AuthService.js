export const _signUp = (username, email, password, cryptoProfile) => {
	return fetch("http://localhost:3001/register/", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({username, email, password, cryptoProfile})
	  }).then(res => res.json())
}

export const _login = (email, password) => {
	return fetch("http://localhost:3001/signin/", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
			body: JSON.stringify({email, password})
		})
	}