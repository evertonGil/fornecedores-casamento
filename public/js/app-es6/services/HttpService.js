class HttpService{

	_handleErrors(res){
		if(!res.ok) {
			console.log("errors disparado por HttpService");
			throw new Error(res.statusText)
		}
		return res
	}
	_temTokenNaResposta(res){
		let token = res.headers.get('x-access-token');	
		if(token){
			window.sessionStorage.token = token;
		}
		return res;
	}
	_temtokenSessionStorage(){
		if(window.sessionStorage.token){
			return window.sessionStorage.token;
		}
		else{
			if(window.location.pathname != "/login.html"){
				window.location = "/login.html";
			}
			return null;
		}
	}
	_setaHeader(headers){
		let token = this._temtokenSessionStorage();
		if(token){
			headers['x-access-token'] = token;
		}
		return headers;
	}


	get(url){
		let header = {};

		return fetch(url, {
			headers: this._setaHeader(header)
		})
		.then(res => this._handleErrors(res))
		.then(res => res.json());
	}

	post(url, dado, header){
		return fetch(url, {
			headers: this._setaHeader(header),
			method: 'POST',
			body: dado
		})
		.then(res => this._handleErrors(res))
		.then(res => this._temTokenNaResposta(res))
		.then(res => res.json());
	}
	
	delete(url, header){
		return fetch(url, {
			method: 'DELETE',
			headers: this._setaHeader(header)
		})
		.then(res => this._handleErrors(res))
		.then(res => res);
	}

	put(url, dado, header){
		return fetch(url, {
			headers: this._setaHeader(header),
			method: 'PUT',
			body: JSON.stringify(dado)
		})
		.then(res => this._handleErrors(res))
		.then(res => res.json());
	}
}