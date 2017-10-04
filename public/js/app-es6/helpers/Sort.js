class Sort{
	constructor(){
		this._colunaAtual = '';
	}

	toogleIcone(elemento, criterio, iconePadrao, iconeNovo){
		let elementoClass = elemento.classList;
		
		let allColunas = document.querySelectorAll(`.fa.${iconePadrao}`);
        	allColunas.forEach((item, i, arr) => {
        		if(!Object.is(item,elemento)){
        			item.className = `fa ${iconePadrao}`;
        		}
        	});

        if(elementoClass.contains(criterio)){
				elemento.classList.remove(criterio);
				elemento.classList.add(iconeNovo);
			}
			else{
        		elemento.classList.remove(iconeNovo);
        		elemento.classList.add(criterio);
			}
	}

	limpa(iconePadrao){
		this._colunaAtual = '';
		let allColunas = document.querySelectorAll(`.fa.${iconePadrao}`);

		allColunas.forEach((item, i, arr) => {
        			item.className = `fa ${iconePadrao}`;
        	});

	}
	ordena(event, coluna, model){

		if(this._colunaAtual == coluna) {
			this.toogleIcone(
				event.srcElement.querySelector('i'), 
				'fa-sort-desc', 
				'fa-sort', 
				'fa-sort-asc' );
            model.ordenaReverse();
        } else {
        	
        	this.toogleIcone(
				event.srcElement.querySelector('i'), 
				'fa-sort-desc', 
				'fa-sort', 
				'fa-sort-asc' );

			model.ordena((a, b) => {
				if (typeof a[coluna] == "string"){
					if (a[coluna].toLowerCase() > b[coluna].toLowerCase()) {
						return 1;
					}
					if (a[coluna].toLowerCase() < b[coluna].toLowerCase()) {
						return -1;
					}
					return 0;
				}
				if (typeof a[coluna] == "number"){
					return a[coluna] - b[coluna];
				}				
			});
		}
		this._colunaAtual = coluna;
	}
}