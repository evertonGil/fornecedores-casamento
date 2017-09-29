class FornecedoresController{
	constructor(){
		
		let $select = document.querySelector.bind(document);

		this._mensagem =  new Bind(
			new Mensagem(),
			new MensagemView($select("#mensagemView")),
			'novaMsg');

		this._listaDeFornecedores =  new Bind(
			new Fornecedores(), 
			new ListaFornecedoresView($select("#listaFornecedoresView")), 
			'adiciona', 'exclui', 'ordena', 'ordenaReverse','filtra', 'lista', 'limpa');
		
		this._sort = new Sort();
		this._convidados = $select("#convidados");

		this._consultaDB = new FornecedoresService();

		this.importa();
	}

	filtra(event){
		event.preventDefault();
		let filtro = event.srcElement.value;

		this._listaDeFornecedores.filtra((item, i, arr )=>{

			for (var property in item) {
				if (item.hasOwnProperty(property)) {
					let existe = false;
					if (FornecedoresController._ehString(item[property])){

						let valor = item[property].toLowerCase();

						if(existe == false){
							existe = valor.includes(filtro.toLowerCase());
						}
						if(existe){
							return true;
						}
					}
				}
			}
		});
		this._sort.limpa('fa-sort');
		this._mensagem.novaMsg(`Filtro realizado`,"info", 1400);
	}

	static _ehString(func){
		return typeof(func) == typeof("string")
	}
	importa(){
		
		this._listaDeFornecedores.limpa();

		let promisse = this._consultaDB.obterListaFornecedores(this._convidados.value);
		promisse
		/*
		.then(res => {
			return res.filter(fornecedor =>
				!this._listaDeFornecedores.lista.some(fornecedorExistente =>
					JSON.stringify(fornecedor._id) == JSON.stringify(fornecedorExistente._id)
					))
		})
		*/
		.then(res => res.forEach(fornecedor => 	{
			//console.log('importa.fornecedor',fornecedor);
			this._listaDeFornecedores.adiciona(fornecedor);
			//console.log('importa._listaDeFornecedores', this._listaDeFornecedores);
		}))
		.catch(err => {
			console.log(err);
			this._mensagem.novaMsg(err, "danger", 2400);
		});

		this._sort.limpa('fa-sort');

	}
	contaConvidados(event){
		this.teste = this._listaDeFornecedoresl;
		this._listaDeFornecedores.lista.forEach(fornecedor => fornecedor.cardapios.lista.forEach(cardapio => cardapio.convidados = event.srcElement.value));
		let template = new ListaFornecedoresView(document.querySelector("#listaFornecedoresView"));
		template.update(this._listaDeFornecedores);

		this._mensagem.novaMsg("Convidados Recalculado!","success", 2400);
	}

	ordena(event, coluna){
		this._sort.ordena(event, coluna, this._listaDeFornecedores);
		//this._mensagem.novaMsg(`Coluna ${coluna} ordenada`,"info", 1400);
	}

	excluiFornecedor(event, id, index){
		event.preventDefault();

		let promisse = this._consultaDB.deletaFornecedorPorId(id);

		promisse
		.then((verdadeiro) => {
			if(verdadeiro){
				this._mensagem.novaMsg("Item excluído da lista!", "success", 2400);
				this._listaDeFornecedores.exclui(index);	
			}
		})
		.catch(err => this._mensagem.novaMsg(err, "danger", 2400));
		
	}


	_limpaFormulario(){
		this._inputNomeProduto.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;
		this._inputNomeProduto.focus();
	}
	

}