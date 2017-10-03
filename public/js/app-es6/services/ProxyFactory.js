class ProxyFactory{

	static create(objeto, props, acao){
		
		return new Proxy(objeto, {

			  get(target, prop, receiver) {

			        if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {

			            return function(){

			             	//console.log(`Model: '${target.__proto__.constructor.name}' diz: método '${prop}' interceptado`);
			             	//console.log(target, acao);
			             	let retorno = Reflect.apply(target[prop], target, arguments);
			             	//console.log("target", target, acao);
			             	acao(target);
			             	return retorno;
			             }
			     	}
			     	
			    	return Reflect.get(target, prop, receiver);
			  },
			  set(target, prop, value, receiver) {
                    
                    let retorno = Reflect.set(target, prop, value, target);
                    //console.log(`propriedade '${prop}' interceptado`);

                    if(props.includes(prop)) acao(target);
                    //console.log(target, prop, value, target);
                    return retorno;
                }

		});
	}

	static _ehFuncao(func){
		return typeof(func) == typeof(Function)
	}
}