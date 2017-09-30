class Validacoes{

	validaRegExp(array){
		return array.some((item, index, arr) => {
			let pai = item.parentElement;
			if(item.required){
				let patternRegex = new RegExp(item.pattern); 
				if(patternRegex.test(item.value) && item.value != ''){
					/*
					var errorInfo = pai.querySelector(".error-info");
					if(errorInfo){
						errorInfo.remove();
					}
					*/
					$(`#${item.id}`).popover("hide");

					item.classList.remove("is-invalid");
					//console.log(item.id , "valido");
					return false;
				}
				else{
					var errorInfo = pai.querySelector(".error-info");
					if(errorInfo){
						errorInfo.remove();
					}
					/*
					let div = document.createElement("div");
					div.classList.add("tooltip", "bs-tooltip-top");
					div.innerHTML = item.getAttribute("title");

					pai.appendChild(div);
					*/
					$(item).popover({
						placement: 'bottom',
						template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-header"></div></div>'
					}).popover("show");

					item.addEventListener('change', () => $(item).popover("hide"))

					console.log(item.id, "invalido");
					item.classList.add("is-invalid");
					item.focus();
					return true;
				}
			}
		});
	}
}