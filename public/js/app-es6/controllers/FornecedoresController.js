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

		let filtroBusca = document.querySelector("#filtroBusca").value;
		let filtroTipo = document.querySelector("#selectTipo").value;
		let filtroLocal = document.querySelector("#selectLocal").value;

		console.log("filtro: ", filtroBusca);
		console.log("tipo: ", filtroTipo);

		this._listaDeFornecedores.filtra((item, i, arr )=>{
			var umaPropBate = false;
			var validador = {
				tipo: false,
				nome: false,
				qtdMax: false,
				local: false
				
			}

			for (var property in item) {
				if (item.hasOwnProperty(property)) {

					let valor = item[property];
					var propBate;

					switch(property){
						case "nome":
							valor = item[property].toLowerCase();
							validador.nome = valor.includes(filtroBusca.toLowerCase());
							//console.log('validador.nome', validador.nome,property ,item[property]);
						break;
						case "qtdMax":
							valor = item[property];
							validador.qtdMax = valor == filtroBusca;
							//console.log('validador.qtdMax', validador.qtdMax,property ,item[property]);
						break;
						case "local":
							valor = item[property].toLowerCase();
							validador.local = valor.includes(filtroLocal.toLowerCase());
							//console.log('validador.local', validador.local,property ,item[property]);
						break;
						case "tipo":
							valor = item[property].toLowerCase();
							validador.tipo = valor.includes(filtroTipo.toLowerCase());
							//console.log('validador.local', validador.local,property ,item[property]);
						break;
					}
				}
			}

			console.log(item, validador)

			if(validador.tipo && validador.local && (validador.nome || validador.qtdMax)){
				return true;
			}
			else{
				return false;
			}

		});
		this._sort.limpa('fa-sort');
		
	}

	importa(){
		
		this._listaDeFornecedores.limpa();

		let promisse = this._consultaDB.obterListaFornecedores(this._convidados.value);
		promisse
		.then(res => res.forEach(fornecedor => 	{
			this._listaDeFornecedores.adiciona(fornecedor);
		}))
		.then(() =>{
			this.propagaSelectTipo("#filtroTipo select", this._consultaDB.listaTipo());
			this.propagaSelectTipo("#filtroLocal select", this._consultaDB.listaLocal());
		})
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


	propagaSelectTipo(inputId, consulta){
		let promise = consulta;
		let input = document.querySelector(inputId);
		let option1 = document.createElement("option");

		while (input.length) {
	        input.remove(0);
	    }
	    option1.value = "";
	    option1.text = "...";
	    input.add(option1);

		promise.
		then(res =>{
			res.forEach((item, i) =>{
				let option = document.createElement("option");
				option.value =  item.nome;
				option.text = item.nome;

				input.add(option);
			});
			
		})
		.catch(err =>console.log(err));
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