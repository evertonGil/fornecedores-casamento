class ListaFornecedoresView extends View{

	constructor(elemento){
		super(elemento)
	}


	template(model){
		return `
		${model.lista.map((fornecedor, index) =>`
			<tr >
				<td colspan="14">
					<table width="100%">
						<tr  class="header_f">
							<td class="id" rowspan="${fornecedor.cardapios.lista.length + 1}">${fornecedor.id}</td>
			                <td class="fornecedor">${fornecedor.link ? `<a href="${fornecedor.link}" target="_blank">` : ``}${fornecedor.nome}${fornecedor.link ? `</a>` : ``}</td>
			                <td class="qtd_max">${fornecedor.qtdMax}</td>
			                <td class="local">${fornecedor.local}</td>
			                <td class="tipo">${fornecedor.tipo}</td>
			                <td class="valor_por_pessoa"></td>
			                <td class="aluguel"></td>
			                <td class="aluguel_pessas"></td>
			                <!--<td class="aluguel_pessas2"></td>-->
			                <td class="dj"></td>
			                <td class="decoracao"></td>
			                <td class="observacoes" rowspan="${fornecedor.cardapios.lista.length + 1}">${fornecedor.observacoes}</td>

			                <td class="editar" rowspan="${fornecedor.cardapios.lista.length + 1}"><a href="" onclick="cadastroController.editaFornecedor(event, '${fornecedor.id}')"><i class="fa fa-pencil edit" aria-hidden="true"></i></a></td>
			        		<td class="excluir" rowspan="${fornecedor.cardapios.lista.length + 1}"><a href="" onclick="fornecedoresController.excluiFornecedor(event, '${fornecedor.id}', ${index})"><i class="fa fa-trash fa-1x delete" aria-hidden="true"></i></a></td>
						</tr>
						
						${fornecedor.cardapios.lista.map((cardapio, index) =>`
							<tr class="sub">
				                <td class="nome">${cardapio.nome}</td>
				                <td class="qtd_max"></td>
				                <td class="local"></td>
				                <td class="tipo"></td>
				                <td class="valor_por_pessoa">${cardapio.valorPorPessoa > 0 ? cardapio.valorPorPessoa.toFixed(2) : ''}</td>
				                <td class="aluguel">${cardapio.aluguel > 0 ? cardapio.aluguel.toFixed(2) : ''}</td>
				                <td class="aluguel_pessas">${cardapio.aluguelPessoas > 0 ? cardapio.aluguelPessoas.toFixed(2) : ''}</td>
				                <!--<td class="aluguel_pessas2">${cardapio.aluguelPessoas2 > 0 ? cardapio.aluguelPessoas2.toFixed(2) : ''}</td>-->
				                <td class="dj">${cardapio.dj > 0 ? cardapio.dj.toFixed(2) : ''}</td>
				                <td class="decoracao">${cardapio.decoracao>0 ? cardapio.decoracao.toFixed(2) : ''}</td>
			        		</tr>
		        		`).join('')}
					</table>
				</td>
			</tr>
		`).join('')}
		`
		
	}
}