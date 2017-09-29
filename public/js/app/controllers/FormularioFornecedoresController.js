class FormularioFornecedoresController{
	constructor(){
		
		let $select = document.querySelector.bind(document);

		this._mensagem =  new Bind(
			new Mensagem(),
			new MensagemView($select("#mensagemView")),
			'novaMsg');

		this._conectaDB = new FornecedoresService();
	}

	init(cb){
		
		//console.log('this:', this);
		let $select = document.querySelector.bind(document);

		$('.modal').modal();

		this._fornecedor = new Bind(
			new Fornecedor(),
			new FormFornecedorView($select("#fornecedorView")),
			'id', 'limpa', 'setaValores' );

		console.log('init.fornecedor', this._fornecedor.cardapios);

		this._fornecedor.cardapios =  new Bind(
			new Cardapios(),
			new FormCardapioView(document.querySelector("#cardapiosView")),
			'adiciona', 'exclui', 'limpa');

		console.log('init.fornecedor.cardapios.lista', this._fornecedor.cardapios.lista);

		if(cb){
			cb();			
		}
		
	}
	end(){

		$('.modal').modal("hide");
		this._fornecedor = {};
		//console.log('end.fornecedor.cardapio', this._fornecedor.cardapios);
	}

	_todosInputs(item){ 
		return Array.prototype.slice.call(document.querySelectorAll(".formulario_fornecedor input")).reverse();
	}

	editaFornecedor(evento, id){
		event.preventDefault();

		this.init(() =>{
			
			let listaFornecedores = fornecedoresController._listaDeFornecedores.lista;

			listaFornecedores.forEach((item, index, arr) =>{

				if(item._id == id){
					console.log('editaFornecedor.item:', item);
					console.log('editaFornecedor.fornecedor', this._fornecedor);
					
					item.cardapios.lista.forEach((cardapio, index) =>{
						this._fornecedor.cardapios.adiciona(cardapio);
					});

					this._fornecedor.setaValores(item.id, item.nome, item.qtdMax, item.local, item.tipo, item.observacoes, this._fornecedor.cardapios);
				}
			})
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
		
		let $select = document.querySelector.bind(document);
		let valido = true;
		var index_inputs = 0;

		//console.log(this._todosInputs());

		this._todosInputs().forEach((item, index, arr) => {

			if(item.validity.valid == false)
			{
				valido = item.validity.valid;
				//console.log(item.id, item.validity.valid, valido);
				item.classList.add("is-invalid");
				item.focus();
			}
			else{
				item.classList.remove("is-invalid");
				//console.log(item.id , "valido");
			}
		});

		if(!valido)
		{
			this._mensagem.novaMsg('Por favor preencha os campos obrigatórios', "danger", 2400);
			return;
		}
		
		event.preventDefault();
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


		if(!fornecedor.id){
			//console.log("id vazio", fornecedor.id);

			let promisse = this._conectaDB.enviarNovoFornecedor(fornecedor);
			promisse
			.then(res => {
				this._mensagem.novaMsg('Forncedor incluido com sucesso', "success", 2400);

				this.end();

				fornecedoresController.importa();
				//this._limpaFormulario();
				console.log(res);
			})
			.catch(err => {
				console.log(err);

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

				this._mensagem.novaMsg('Não foi possível cadastrar o fornecedor.', "danger", 2400);
			});
			
		}
		else{
			console.log("req id:", fornecedor.id);
			console.log("req body:", fornecedor);
			let promise = this._conectaDB.editaFornecedor(fornecedor.id, fornecedor);

			promise
			.then(res => {
				this._mensagem.novaMsg('Forncedor incluido com sucesso', "success", 2400);

				this.end();

				fornecedoresController.importa();
				console.log(res);
			})
			.catch(err => {
				console.log(err);

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

				this._mensagem.novaMsg('Não foi Atualizar o fornecedores.', "danger", 2400);
			});
			//console.log("id:", fornecedor.id);
		}
		

		


	}

	_limpaFormulario(){
		let primeiroInput = document.querySelector("#fornecedorView #nome");
		let formFornecedor = document.querySelector("#fornecedorView");
		let formCardapios = document.querySelectorAll(".cardapio");

		this._todosInputs().forEach((item, i) => {
			item.value = "";
		})

		//this._listaCardapios.limpa();

		//this._fornecedor.limpa();
		
		//console.log(this._fornecedor);
		primeiroInput.focus();
	}
}