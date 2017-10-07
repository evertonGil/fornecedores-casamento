class Anexos{
    constructor(lista){
        this._lista = lista ? lista : [];
    }
    adiciona(anexo){
        //console.log("adiciona");
        this._lista.push(anexo);
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