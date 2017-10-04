class FormularioFornecedoresController{
	constructor(){
		
		let $select = document.querySelector.bind(document);

		this._mensagem =  new Bind(
			new Mensagem(),
			new MensagemView($select("#mensagemView")),
			'novaMsg');

		this._conectaDB = new FornecedoresService();

		this._validacoes = new Validacoes();
	}

	init(cb){
		
		let $select = document.querySelector.bind(document);

		$('.modal').modal();

		$('.modal').on('shown.bs.modal', function () {
			$('#nome').focus();
		  });

		this._fornecedor = new Bind(
			new Fornecedor(),
			new FormFornecedorView($select("#fornecedorView")),
			'id', 'limpa', 'setaValores' );

		this._fornecedor.cardapios =  new Bind(
			new Cardapios(),
			new FormCardapioView(document.querySelector("#cardapiosView")),
			'adiciona', 'exclui', 'limpa');
		//console.log('init.fornecedor.cardapios.lista', this._fornecedor.cardapios.lista);
		this._easyAutocomplete("/v1/tipofornecedor", "#fornecedorView #tipo");
		this._easyAutocomplete("/v1/localfornecedor", "#fornecedorView #local");
		
		console.log($select('#fornecedorView #nome'));
		if(cb){
			cb();
						
		}
		
	}
	end(){

		$('.modal').modal("hide");
		this._fornecedor = {};
		//console.log('end.fornecedor.cardapio', this._fornecedor.cardapios);
	}

	_easyAutocomplete(url, classe){
		var options = {
			url: url,
			getValue: function(element) {
				console.log(this, element.nome);
				return Captalize.string(element.nome);
			},
			list: {
				match: {
					enabled: true
				}
			}
		};
		$(classe).easyAutocomplete(options);
	}

	_todosInputs(item){ 
		return Array.prototype.slice.call(document.querySelectorAll(".formulario_fornecedor input"));
	}

	editaFornecedor(event, id){
		event.preventDefault();

		this.init(() =>{
			
			let listaFornecedores = fornecedoresController._listaDeFornecedores.lista;

			listaFornecedores.forEach((item, index, arr) =>{

				if(item._id == id){
					
					item.cardapios.lista.forEach((cardapio, index) =>{
						this._fornecedor.cardapios.adiciona(cardapio);
					});

					this._fornecedor.setaValores(item.id, item.nome, item.qtdMax, item.local, item.tipo, item.observacoes, this._fornecedor.cardapios, item.link);
				}
			});
			
			this._easyAutocomplete("/v1/tipofornecedor", "#fornecedorView #tipo");
			this._easyAutocomplete("/v1/localfornecedor", "#fornecedorView #local");
		});
	}

	adicionaCardapio(event){
		event.preventDefault();
		let cardapio = new Cardapio();
		this._fornecedor.cardapios.adiciona(cardapio);
	}

	removeCardapio(event, index){
		event.preventDefault();
		this._fornecedor.cardapios.exclui(index);
	}

	setValPropFornecedor(event){

		let fornecedor = this._fornecedor;
		this.iteraObjeto(fornecedor, (propriedade, objeto) =>{
			if(propriedade == `${event.target.id}`) 
				objeto[propriedade] = event.target.value
		});

	}

	setValPropCardapio(event, index){
		this._fornecedor.cardapios.lista.forEach((cardapio, i, arr)=>{
			if(i == index){
				this.iteraObjeto(cardapio, (propriedade, objeto) =>{
					if(propriedade == `${event.target.id}`) 
						objeto[propriedade] = event.target.value;
				});	
			}
		})
	}

	iteraObjeto(objeto, funcao){
		var i = 0;
		for (var prop in objeto) {
			if (objeto.hasOwnProperty(prop)) {
				funcao(prop, objeto, i);
				i++
			}
		}
	}


	adiciona(event){

		event.preventDefault();
		
		let $select = document.querySelector.bind(document);
		let invalido = this._validacoes.validaRegExp(this._todosInputs());

		console.log('invalido: ', invalido);
		if(invalido)
		{
			this._mensagem.novaMsg('Por favor preencha os campos obrigatórios', "danger", 2400);
			return;
		}
		
		//criando o object para ser enviado
		let fornecedor = this._fornecedor;
				
		Object.defineProperty(fornecedor, '_id', {
			enumerable: false
		});

		fornecedor.cardapios.lista.forEach((cardapio, i, arr) =>{
			
			let propValidas = [ 'nome', 'valorPorPessoa', 'aluguel', 'dj', 'decoracao'];

			for(var prop in cardapio){
				if( !propValidas.includes(prop)) Object.defineProperty(cardapio, prop, {enumerable: false})
			}
			
			return cardapio;
		});

		fornecedor.cardapios = fornecedor.cardapios.lista;

		let promise;

		if(!fornecedor.id){	promise = this._conectaDB.enviarNovoFornecedor(fornecedor); }
		else{ promise = this._conectaDB.editaFornecedor(fornecedor.id, fornecedor); }
		
		promise
		.then(res => {
			this._mensagem.novaMsg('Forncedor incluido com sucesso', "success", 2400);
			this.end();
			fornecedoresController.importa();
			console.log(res);
		})
		.then(() => {
			this.helperCadastraSeNaoTiver(this._conectaDB.listaTipo(), 
				fornecedor.tipo, 
				this._conectaDB,
				this._conectaDB.adicionaTipo.bind(this._conectaDB));
		})
		.then(() => {

			this.helperCadastraSeNaoTiver(this._conectaDB.listaLocal(), 
				fornecedor.local, 
				this._conectaDB,
				this._conectaDB.adicionaLocal.bind(this._conectaDB));
		})
		.catch(err => {
			console.log(err);
			trataErrorsInput(err);
			this._mensagem.novaMsg('Não foi possível cadastrar o fornecedor.', "danger", 2400);
		});


	}

	helperCadastraSeNaoTiver(promise, param, connection, adiciona){

		let tipoObj = {nome: param.toLowerCase()};

		promise
		.then(res =>{
			if(res.length)
			{
				var Existe = res.some((item, i, arr) =>{ return item.nome.toLowerCase() == param.toLowerCase(); });

				if(!Existe){

					let promiseAdiciona = adiciona(tipoObj);
					promiseAdiciona.then(res => console.log(res)).catch(err => console.log(err));
				}
			}
			else{
				
				let promiseAdiciona = adiciona(tipoObj);
				promiseAdiciona.then(res => console.log(res)).catch(err => console.log(err));
			}
		})
		.catch(err =>{
			console.log(err);
		});
	}

	trataErrorsInput(err){
		var erros = JSON.parse(err).errors;

		this.iteraObjeto(erros, (prop, objeto, index) => {
			this._todosInputs().forEach(input => {
				if(input.id == prop){
					input.classList.add("is-invalid");
					 input.focus()
				}
				else{ 
					input.classList.remove("is-invalid");
				}
			})				
		});
	}
}