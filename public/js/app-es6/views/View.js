class View{
	
	constructor(elemento){
		this._elemento = elemento;
		// console.log();
	}

	template(model){
		throw Error('O método template deve ser implementado')
	}

	update(model) {
    this._elemento.innerHTML = this.template(model);
	}

}