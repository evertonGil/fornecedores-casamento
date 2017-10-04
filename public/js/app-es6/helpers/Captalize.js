class Captalize{
    static string(string){
        //console.log('Captalize.this', this)
       return string.replace(/\b\w/g, function(l){ return l.toUpperCase() });
    }

}