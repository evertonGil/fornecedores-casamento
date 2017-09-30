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
		            <input type="text" id="nome" class="form-control form-control-sm " autofocus="" title="Campo não deve ser em branco" required value="${cardapio.nome}" onchange="cadastroController.setValPropCardapio(event, ${index})">
	        	</td>
        		<td class="col-valorPessoa">
		            <input id="valorPorPessoa" type="number" class="form-control form-control-sm " step="0.01" pattern="[0-9]{0,}[.,]?([0-9]{1,2})$" title="Deve ter o seguinte padrão: 1000,00 ou 1000.00" required value="${parseFloat(cardapio.valorPorPessoa).toFixed(2)}" onchange="cadastroController.setValPropCardapio(event, ${index})">
        		</td>
        		<td class="col-aluguel">
		            <input id="aluguel" type="number" class="form-control form-control-sm " step="0.01" pattern="[0-9]{0,}[.,]?([0-9]{1,2})$" title="Deve ter o seguinte padrão: 1000,00 ou 1000.00" required value="${parseFloat(cardapio.aluguel).toFixed(2)}" onchange="cadastroController.setValPropCardapio(event, ${index})">
        		</td>
        		<td class="col-dj">
		            <input id="dj" type="number" class="form-control form-control-sm " step="0.01" pattern="[0-9]{0,}[.,]?([0-9]{1,2})$" title="Deve ter o seguinte padrão: 1000,00 ou 1000.00" required value="${parseFloat(cardapio.dj).toFixed(2)}" onchange="cadastroController.setValPropCardapio(event, ${index})">
        		</td>
        		<td class="col-decoracao">
		            <input id="decoracao" type="number" class="form-control form-control-sm " step="0.01" pattern="[0-9]{0,}[.,]?([0-9]{1,2})$" title="Deve ter o seguinte padrão: 1000,00 ou 1000.00" required value="${parseFloat(cardapio.decoracao).toFixed(2)}" onchange="cadastroController.setValPropCardapio(event, ${index})">
        		</td>
	        	<td class="col-inclui">
	        		<a href="#" class="deletarCardapio text-danger" onclick="cadastroController.removeCardapio(event, ${index})"><i class="fa fa-minus-circle"></i></a>
	        	</td>
        	</tr>
		`).join('')}
		`
	};
}

