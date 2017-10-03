if(!Array.prototype.includes) {
    
        Array.prototype.includes = function(elemento) {
            return this.indexOf(elemento) != -1;
        };
    }
if(window.NodeList && !NodeList.prototype.forEach){
    NodeList.prototype.forEach = function (callback, argument) {

    argument = argument || window;
    for (var i = 0; i < this.length; i += 1) {
        callback.call(argument, this[i], i, this);
      }
    };
}