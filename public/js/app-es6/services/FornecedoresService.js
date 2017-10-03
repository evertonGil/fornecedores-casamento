class FornecedoresService{
	constructor(){
		this._http = new HttpService();
	}
	obterListaFornecedores(convidados){
		return new Promise((resolve, reject) => {

			this._http.get('v1/fornecedores')
			.then(res => {
				resolve(
					res.map(objeto => {

		            	let listaCardapios = new Cardapios();

		            	objeto.cardapios
		            	.map(item => new Cardapio(item.nome, item.valorPorPessoa, item.aluguel, item.dj, item.decoracao, convidados))
		            	.forEach(cardapio => {
		            		listaCardapios.adiciona(cardapio)
		            	});
		            	
		            	var forn = new Fornecedor(objeto._id, objeto.nome, objeto.qtdMax, objeto.local, objeto.tipo, objeto.observacoes, listaCardapios , objeto.link);

				 		return  forn;
				 })
				)
			})
			.catch(err =>{
				console.log(err);
			    reject('Não foi possível obter os fornecedores do servidor.')
			});

		})
	}

	enviarNovoFornecedor(dado){
		return new Promise((resolve, reject) => {
			this._http.post('v1/fornecedores', dado)
			.then(res => resolve(res))
			.catch(err =>{
				//console.log(err);
			    reject(err)
			});
		})
	}

	editaFornecedor(id, dado){
		return new Promise((resolve, reject) => {
			this._http.put(`v1/fornecedores/${id}`, dado)
			.then(res => resolve(res))
			.catch(err =>{
				//console.log(err);
			    reject(err)
			});
		})
	}

	deletaFornecedorPorId(id){
		return new Promise((resolve, reject) =>{
			this._http.delete(`v1/fornecedores/${id}`)
			.then(res => resolve(res))
			.catch(err =>{
				console.log(err);
			    reject('Não foi possível deletar os fornecedores.')
			});
		})
	}

	listaTipo(){
		return new Promise((resolve, reject) => {

			this._http.get(`v1/tipofornecedor`)
			.then(res => resolve(res))
			.catch(err =>{
			    reject(err);
			});

		})
	}

	adicionaTipo(dado){
		return new Promise((resolve, reject) => {
			//console.log("adiciona tipo", this);
			this._http.post(`v1/tipofornecedor`, dado)
			.then(res => resolve(res))
			.catch(err =>{
			    reject(err);
			});

		})
	}

	listaLocal(){
		return new Promise((resolve, reject) => {

			this._http.get(`v1/localfornecedor`)
			.then(res => resolve(res))
			.catch(err =>{
			    reject(err);
			});

		})
	}

	adicionaLocal(dado){
		return new Promise((resolve, reject) => {
			//console.log("adiciona local", this);
			this._http.post(`v1/localfornecedor`, dado)
			.then(res => resolve(res))
			.catch(err =>{
			    reject(err);
			});

		})
	}

}