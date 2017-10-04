class FormataNumeracao{
    static reais(string){
       return string.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
}