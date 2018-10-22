export const _signUp = (username, email, password) => {
	return fetch("http://localhost:3001/signup/", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({username, email, password})
	  }).then(res => res.json())
}

export const _login = (username, password) => {
	return fetch("http://localhost:3001/signin", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({username, password})
	  }).then(res => res.json())
}