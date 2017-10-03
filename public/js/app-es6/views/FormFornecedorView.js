class FormFornecedorView extends View{
	constructor(elemento){
		super(elemento)
	}

	template(model){
		return `
		<div class="form-group col-md-8">
	        <div class="form-group">
	            <label for="nome" class="">Nome Fornecedor:</label>
	            <input type="text" id="nome" class="form-control form-control-sm"  title="Campo não pode ser em branco" required autofocus onchange="cadastroController.setValPropFornecedor(event)" value="${model.nome}"/>        
            </div>
	        <div class="form-row">
			    <div class="col">
		            <label for="qtdMax" class="">Qtd Máxima Convidados</label>
		            <input type="number" min="1" step="1" id="qtdMax" class="form-control form-control-sm " title="Campo não pode ser em branco" required value="${model.qtdMax}" onchange="cadastroController.setValPropFornecedor(event)"/>
	            </div>
		        <div class="col">
		            <label for="local" class="">Local</label>
		            <input id="local" type="text" class="form-control form-control-sm " value="${model.local}"  title="Campo não pode ser em branco"  required onchange="cadastroController.setValPropFornecedor(event)" />
		        </div>
		        <div class="col">
		            <label for="tipo" class="">Tipo</label>
		            <input id="tipo" type="text" class="form-control form-control-sm " value="${model.tipo}"  title="Campo não pode ser em branco"  required onchange="cadastroController.setValPropFornecedor(event)" />
	        	</div>
	        </div>
        </div>

        <div class="form-group col-md-4 form-row">
            <label for="observacoes" class="">Observações</label>
            <textarea id="observacoes" class="form-control form-control-sm" style="height: 106px;" onchange="cadastroController.setValPropFornecedor(event)">${model.observacoes}</textarea>
        </div>
        <div class="form-group col-md-12 form-row">
            <label for="link" class="">Link</label>
		    <input id="link" type="text" class="form-control form-control-sm " value="${model.link}"  title="Campo não pode ser em branco"  onchange="cadastroController.setValPropFornecedor(event)" />
        </div>
		`
	};
}

