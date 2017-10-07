class HttpService{

	_handleErrors(res){
		if(!res.ok) {
			console.log("errors disparado por HttpService");
			throw new Error(res.statusText)
		}
		return res
	}
	get(url){
		return fetch(url)
		.then(res => this._handleErrors(res))
		.then(res => res.json());
	}
	post(url, dado, header){
		return fetch(url, {
			headers: header,
			method: 'POST',
			body: dado
		})
		.then(res => this._handleErrors(res))
		.then(res => res.json());
	}
	delete(url, header){
		return fetch(url, {
			method: 'DELETE',
			headers: header
		})
		.then(res => this._handleErrors(res))
		.then(res => res.json());
	}
	put(url, dado){
		return fetch(url, {
			headers: {'content-type': 'application/json'},
			method: 'PUT',
			body: JSON.stringify(dado)
		})
		.then(res => this._handleErrors(res))
		.then(res => res.json());
	}
}