class ListaAnexosView extends View{
	constructor(elemento){
		super(elemento)
    }

    template(model){
       // console.log("anexosView", model);
        return `<ul>
        ${model.lista.map((anexo, index, array) =>`
            <li>
                <a class="linkAnexo" href="${anexo.link}" target="_blank">${anexo.nome}</a>
                <a href="#" class="text-danger removeAnexo" onclick="cadastroController.removeAnexo(event, ${index});" ><i class="fa fa-trash"></i></a>
            </li>
        `).join('')}
        </ul>`
    }
}