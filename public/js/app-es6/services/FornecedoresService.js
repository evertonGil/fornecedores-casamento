class FornecedoresService{
	constructor(){
		this._http = new HttpService();
	}
	obterListaFornecedores(convidados){
		return new Promise((resolve, reject) => {

			this._http.get('v1/fornecedores')
			.then(res => {
				resolve(
					res
					.sort((a, b) =>{
						
						if(a.nome.toLowerCase() > b.nome.toLowerCase()){
							return 1;
						}
						if(a.nome.toLowerCase() < b.nome.toLowerCase()){
							return -1;
						}
						return 0;
					})
					.map(objeto => {
						let listaCardapios = new Cardapios();
						let listaAnexos = new Anexos();

						objeto.cardapios
		            	.map(item => new Cardapio(item.nome, item.valorPorPessoa, item.aluguel, item.dj, item.decoracao, convidados))
		            	.forEach(cardapio => {
		            		listaCardapios.adiciona(cardapio)
						});
						
						objeto.anexos
						.map(item => {
							//console.log(item.link);
							return new Anexo(item.link);
						})
						.forEach(anexo =>{
							listaAnexos.adiciona(anexo);
							//console.log(listaAnexos);
						})
		            	
		            	var forn = new Fornecedor(objeto._id, objeto.nome, objeto.qtdMax, objeto.local, objeto.tipo, objeto.observacoes, listaCardapios , objeto.link, listaAnexos);

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

		let header = {'content-type': 'application/json'};
		//console.log('dados', dado, 'header', header);
		return new Promise((resolve, reject) => {
			this._http.post('v1/fornecedores', JSON.stringify(dado), header)
			.then(res => resolve(res))
			.catch(err =>{
				//console.log(err);
			    reject(err)
			});
		})
	}

	editaFornecedor(id, dado){

		let header = {'content-type': 'application/json'};

		return new Promise((resolve, reject) => {

			this._http.put(`v1/fornecedores/${id}`, dado, header)
			.then(res => resolve(res))
			.catch(err =>{
				//console.log(err);
			    reject(err)
			});
		})
	}

	deletaFornecedorPorId(id){
		let header = {};

		return new Promise((resolve, reject) =>{

			this._http.delete(`v1/fornecedores/${id}`, header)
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

		let header = {'content-type': 'application/json'};

		return new Promise((resolve, reject) => {

			this._http.post(`v1/tipofornecedor`, JSON.stringify(dado), header)
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

		let header = {'content-type': 'application/json'};

		return new Promise((resolve, reject) => {

			this._http.post(`v1/localfornecedor`, JSON.stringify(dado), header)
			.then(res => resolve(res))
			.catch(err =>{
			    reject(err);
			});

		})
	}

	sobeAnexo(dado, subDiretorio, fileName, idfornecedor){
		let header = {
			'content-type': 'application/octet-stream',
			'Accept': 'application/json',
			'filename': fileName,
			'subdiretorio': subDiretorio,
			'idfornecedor': idfornecedor
		}

		return new Promise((resolve, reject) => {
			//console.log("adiciona local", this);
			this._http.post(`v1/upload`, dado, header)
			.then(res => resolve(res))
			.catch(err =>{
			    reject(err);
			});

		})
	}

	deletaAnexo(arquivo, subdir, idFornecedor){
		console.log("idFornecedor", idFornecedor);
		let header = { idfornecedor: idFornecedor }
		return new Promise((resolve, reject) =>{
			this._http.delete(`v1/upload/${subdir}/${arquivo}`, header)
			.then(res => resolve(res))
			.catch(err =>{
				console.log(err);
				reject('Não foi possível deletar os fornecedores.')
			});
		})
	}

}