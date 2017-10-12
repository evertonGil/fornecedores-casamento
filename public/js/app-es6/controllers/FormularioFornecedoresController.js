class FormularioFornecedoresController{
	constructor(){
		
		let $select = document.querySelector.bind(document);

		this._mensagem =  new Bind(
			new Mensagem(),
			new MensagemView($select("#mensagemView")),
			'novaMsg');

		this._conectaDB = new FornecedoresService();

		this._validacoes = new Validacoes();
		

		let fileDrag = document.querySelector("#filedrag");

		this.dragAndDropView = new DragAndDropView($select("#filedrag"));
		this.dragAndDropView.update("finalizado");

		filedrag.addEventListener("dragover", this.fileDragHover, false);
		filedrag.addEventListener("dragenter", this.fileDragHover, false);
		filedrag.addEventListener("dragstart", this.fileDragHover, false);
		filedrag.addEventListener("dragend", this.fileDragHover, false);
		filedrag.addEventListener("dragleave", this.fileDragHover, false);
		filedrag.addEventListener("drop", this.anexaArquivos.bind(this), false);
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

		this._fornecedor.anexos =  new Bind(
				new Anexos(),
				new ListaAnexosView(document.querySelector("#listaAnexosView")),
				'adiciona', 'exclui', 'limpa');

		let formUpload = document.querySelector(".arquivos-anexos");

		
		

		//console.log('init.fornecedor.cardapios.lista', this._fornecedor.cardapios.lista);
		this._easyAutocomplete("/v1/tipofornecedor", "#fornecedorView #tipo");
		this._easyAutocomplete("/v1/localfornecedor", "#fornecedorView #local");
		
		//console.log($select('#fornecedorView #nome'));
		if(cb){
			cb();
						
		}


		///console.log("id", this._fornecedor);
		if(this._fornecedor._id){
			
			formUpload.classList.add("aberto");	
			
		}
		else{
			formUpload.classList.remove("aberto");	
		}
		
	}

	end(){

		$('.modal').modal("hide");
		this._fornecedor = {};
		//console.log('end.fornecedor.cardapio', this._fornecedor.cardapios);
	}

	_easyAutocomplete(url, classe){
			let header = {}
			let token = null;

			if(window.sessionStorage.token){
				token = window.sessionStorage.token;
			}

			if(token){
				header['x-access-token'] = token;
			}

		var options = {
			url: url,
			getValue: function(element) {
				return Captalize.string(element.nome);
			},
			ajaxSettings: {
				'headers' : header
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
					//console.log(item);
					item.cardapios.lista.forEach((cardapio, index) =>{
						this._fornecedor.cardapios.adiciona(cardapio);
					});

					item.anexos.lista.forEach((anexo, index) =>{
						this._fornecedor.anexos.adiciona(anexo);
					});

					this._fornecedor.setaValores(item.id, item.nome, item.qtdMax, item.local, item.tipo, item.observacoes, this._fornecedor.cardapios, item.link, this._fornecedor.anexos);
							
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

	anexaArquivos(event){
		this.fileDragHover(event);

		let ListaDeArquivos = event.target.files || event.dataTransfer.files;
		//console.log("ListaDeArquivos: ", ListaDeArquivos);

		this.enviaAnexos.call(this, ListaDeArquivos);	
	}

	fileDragHover(event) {
		event.preventDefault();
		//console.log(event);

		if(event.target.id == "filedrag"){
			event.target.className = (event.type == "dragover" ? "hover" : "");
		}
		if(event.path[1].id == "filedrag"){
			event.path[1].className = (event.type == "dragover" ? "hover" : "");
		}
		
	}

	enviaAnexos(files){
		//console.log("1 this:", this,"files:", files);
		this.dragAndDropView.update("emProgresso");
		for(var i = 0; i < files.length; i++){
			let leitor = new FileReader();
			let iterador = i;
			leitor.readAsArrayBuffer(files[i]);
			//console.log("2 this:", this,"files:", files);
			leitor.onload = progressEvent =>{
				//console.log("3 this:", this,"files:", files);
				let promise = this._conectaDB.sobeAnexo(leitor.result, this._fornecedor.id, files[iterador].name, this._fornecedor.id);
				promise
				.then(res =>{
					//console.log(res);
					let anexo = new Anexo(res.statusFile.pathFile);
					if(res.statusDB.nModified > 0){
						this._fornecedor.anexos.adiciona(anexo);
						fornecedoresController.importa();
						this._mensagem.novaMsg('Anexo adicionado com sucesso.', "success", 3400);
					}
					else{
						
						this._mensagem.novaMsg('Anexo Atualizado com sucesso.', "success", 3400);
					}

					this.dragAndDropView.update("finalizado");					
					
				})
				.catch(err =>{
					this._mensagem.novaMsg('Não foi possível adicionar anexo.', "danger", 4400);
					console.log(err);
				})
			};
		}
		
		
	}

	removeAnexo(event, index){	

		event.preventDefault();

		let anexo = this._fornecedor.anexos.lista[index];

		console.log("Arquivo:", anexo.nome,"Sub-diretorio:", anexo.subDiretorio, "_id:", this._fornecedor.id);
	

		let promise = this._conectaDB.deletaAnexo(anexo.nome, anexo.subDiretorio, this._fornecedor.id);
		promise
		.then(res =>{
			console.log("res:", res);
			this._fornecedor.anexos.exclui(index);
		})
		.catch(err => {
			this._mensagem.novaMsg('Não foi possível adicionar anexo.', "danger", 4400);
			console.log(err);
		});

		fornecedoresController.importa();

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
		fornecedor.anexos.lista.forEach((anexo, i, arr) =>{
			
			let propValidas = [ 'link'];

			for(var prop in anexo){
				if( !propValidas.includes(prop)) Object.defineProperty(anexo, prop, {enumerable: false})
			}
			
			return anexo;
		});

		fornecedor.cardapios = fornecedor.cardapios.lista;
		fornecedor.anexos = fornecedor.anexos.lista;

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
			trataErrorsInput(err.json());
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