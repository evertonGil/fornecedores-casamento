class Anexo{
    constructor(link){
        this.link = link ? link : '';
    }

    get nome(){
        let split = this.link.split("/");
        if(split){
           // console.log(split[split.length - 1]);
            return split[split.length - 1];
        }
    }
    get subDiretorio(){
        let split = this.link.split("/");
        if(split){
           // console.log(split[split.length - 1]);
            return split[split.length - 2];
        }
    }

}