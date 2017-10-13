class LoginController{
	constructor(){
		let $select = document.querySelector.bind(document);
		this.login = $select("#login");
		this.senha = $select("#senha");
		this.form = $select("#form-login");
		this.usuarioService = new UsuariosService();
		this.mensagem =  new Bind(
			new Mensagem(),
			new MensagemView($select("#mensagemView")),
			'novaMsg');

		this.init();

	}

	init(){

		this.form.onsubmit = event => this.enviaLogin.call(this, event);
	}
	pegaDadoForm(){
		let loginVal = this.login.value;
		let senhaVal = this.senha.value;

		let json = {'login': loginVal,'senha': senhaVal};
		return json;
	}
	enviaLogin(event){
		
		console.log('this', this, 'event:', event);
		event.preventDefault();

		alert('um tempo');
		let promise = this.usuarioService.SubmeterLogin(this.pegaDadoForm());
		promise
		.then(res =>{
			window.location('/');
		})
		.catch(err =>{
			console.log(err);
			this.mensagem.novaMsg('login e senha invalidos.', "danger", 4400);
		});
	}

}