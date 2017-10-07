class Cardapios{
	constructor(lista){
		this._lista = lista ? lista : [];
	}
	adiciona(cardapio){
		this._lista.push(cardapio);
	}
	exclui(index){
		this._lista.splice(index, 1);
	}
	limpa(){
		this._lista = [];
	}
	get lista(){
		return [].concat(this._lista);
	}
}