class FormCardapioView extends View{
	constructor(elemento){
		super(elemento)
	}

	template(model){

		/*		
		console.log('model', model.lista);

		model.lista.forEach((cardapio, index, array) =>{
			console.log('cardapio', cardapio );
		});
		*/
		
		return `
		${model.lista.map((cardapio, index, array) =>`
			<tr>
	        	<td class="col-nome">
		            <input type="text" id="nome" class="form-control form-control-sm " autofocus="" required value="${cardapio.nome}" onchange="cadastroController.setValPropCardapio(event, ${index})">
	        	</td>
        		<td class="col-valorPessoa">
		            <input id="valorPorPessoa" type="number" class="form-control form-control-sm "  step="0.01" value="${cardapio.valorPorPessoa}" onchange="cadastroController.setValPropCardapio(event, ${index})">
        		</td>
        		<td class="col-aluguel">
		            <input id="aluguel" type="number" class="form-control form-control-sm "  step="0.01" value="${cardapio.aluguel}" onchange="cadastroController.setValPropCardapio(event, ${index})">
        		</td>
        		<td class="col-dj">
		            <input id="dj" type="number" class="form-control form-control-sm "  step="0.01" value="${cardapio.dj}" onchange="cadastroController.setValPropCardapio(event, ${index})">
        		</td>
        		<td class="col-decoracao">
		            <input id="decoracao" type="number" class="form-control form-control-sm "  step="0.01" value="${cardapio.decoracao}" onchange="cadastroController.setValPropCardapio(event, ${index})">
        		</td>
	        	<td class="col-inclui">
	        		<a href="#" class="deletarCardapio text-danger" onclick="cadastroController.removeCardapio(event, ${index})"><i class="fa fa-minus-circle"></i></a>
	        	</td>
        	</tr>
		`).join('')}
		`
	};
}

