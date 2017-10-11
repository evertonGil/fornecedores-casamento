class UsuariosService{
	constructor(){
		this._http = new HttpService();
	}

	SubmeterLogin(dado){
		let header = {
			'content-type': 'application/json'
		}

		return new Promise ((resolve, reject) =>{
			this._http.post('v1/login', dado, header)
			.then(res =>{
				window.location = "/";
			})
			.catch(err =>{
				console.log(err);
			    reject('Login e senha invalidos.')
			});

		})
	}

	
}