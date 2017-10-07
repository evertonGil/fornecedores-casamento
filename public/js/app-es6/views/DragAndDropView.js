class DragAndDropView extends View{

    constructor(elemento){
		super(elemento)
    }

    template(model){
        if(model === 'finalizado'){
            return `
            
            <img src="/images/cloud-upload.png" class="imgUpload" />
            <div class="uploadSelect">
                <input id="upload" name="upload" multiple="multiple" type="file" onchange="cadastroController.anexaArquivos(event)" />
            </div>
            <p class="texto">ou solte os arquivos aqui</p>
            `
        }
        if(model === "emProgresso"){
            return `
            <div class="uploadEmProcesso">
                <img src="/images/loader-gif2.gif" class="imgUpload" />
                <p class="texto">Upload em andamento!</p>
            </di>
            `
        }
        
    }

}