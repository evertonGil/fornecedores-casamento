class LoginController{
	constructor(){
		let $select = document.querySelector.bind(document);
		this.login = $select("#login");
		this.senha = $select("#senha");
		this.form = $select("#form-login");

		this.init();

	}

	init(){

		this.form.addEventListener('submit', function(event){
			event.preventDefault();

			
		});

	}
	enviaLogin(){
		

		
	}

}