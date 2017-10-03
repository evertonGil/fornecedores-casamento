class MensagemView extends View{
	constructor(elemento){
		super(elemento)
	}

	template(model){
		return model.texto ? `<p class="alert alert-${model.tipo} ">${model.texto}</p>${model.executaFade(this._elemento, "p")}` : '<p class=""></p>';
	};
}