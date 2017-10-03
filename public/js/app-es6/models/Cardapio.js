class Cardapio{
	
	constructor(nome, valorPorPessoa, aluguel, dj, decoracao, convidados){
		this.nome = nome ? nome : '';
		this.valorPorPessoa = valorPorPessoa ? parseFloat(valorPorPessoa) : 0;
		this.aluguel = aluguel ? parseFloat(aluguel) : 0;
		this.dj = dj ? parseFloat(dj) : 0;
		this.decoracao = decoracao ? parseFloat(decoracao) : 0;
		this.convidados = convidados ? convidados : 100;
	}
	
	get aluguelPessoas(){
		return this.aluguel + (this.valorPorPessoa * this.convidados);
	}
	get aluguelPessoas2(){
		return this.aluguel + (this.valorPorPessoa * 400);
	}
}
