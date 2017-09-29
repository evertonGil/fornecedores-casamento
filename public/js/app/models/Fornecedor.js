class Fornecedor{
	
	constructor(id, nome, qtdMax, local, tipo, observacoes, listaCardapios){
		this._id = id ? id : '';
		this.nome = nome ? nome : '';
		this.qtdMax = qtdMax ? parseFloat(qtdMax) : 0;
		this.local = local ? local : '';
		this.tipo = tipo ? tipo : '';
		this.observacoes = observacoes ? observacoes : '';
		//this.cardapios = listaCardapios ? listaCardapios : [];
		this.cardapios = listaCardapios ? new Cardapios(listaCardapios.lista) : new Cardapios();
	}

	get id(){
		return this._id;
	}
	
	get listaCardapios(){
		return this._listaCardapios;
	}

	setaValores(id, nome, qtdMax, local, tipo, observacoes, listaCardapios){
		this._id = id ? id : '';
		this.nome = nome ? nome : '';
		this.qtdMax = qtdMax ? parseFloat(qtdMax) : 0;
		this.local = local ? local : '';
		this.tipo = tipo ? tipo : '';
		this.observacoes = observacoes ? observacoes : '';
		this.cardapios = listaCardapios ? listaCardapios : new Cardapios();
		//console.log("Fornecedor.cardapios:", listaCardapios)
	}

	limpa(){
		this._id = '';
		this.nome = '';
		this.qtdMax =  0;
		this.local = '';
		this.tipo = '';
		this.observacoes ='';
		this.cardapios = new Cardapios();
	}

}