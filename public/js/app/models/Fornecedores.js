class Fornecedores{
	constructor( ){
		this._lista = [];
		this._listaFiltrada = this._lista;
		this.teste = [1,2];
	}

	adiciona(fornecedor){
		this._lista.push(fornecedor);
	}
	exclui(index){
		//console.log(index);
		//console.log(this._listaFiltrada[index]);
		this._listaFiltrada.splice(index, 1);
	}
	ordena(criterio){
		this._listaFiltrada.sort(criterio);
	}
	ordenaReverse(){
		this._listaFiltrada.reverse();
	}
	filtra(criterio){
		this._listaFiltrada = this._lista.filter(criterio);
	}
	limpa(teste){
		this._lista = [];
		this._listaFiltrada = this._lista;
		//console.log('Fornecedores.limpa.this._lista', this._lista);
		//console.log('Fornecedores.limpa.this._listaFiltrada', this._listaFiltrada);
	}

	get lista(){
		return this._listaFiltrada;
	}
}