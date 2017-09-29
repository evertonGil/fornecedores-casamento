class HttpService{

	get(url){
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.onreadystatechange = () => {
			    if(xhr.readyState == 4) {
			        if(xhr.status == 200) {
			            //console.log(JSON.parse(xhr.responseText));
			            resolve(JSON.parse(xhr.responseText));
			        } else {
			            //console.log(xhr.responseText);
			            reject(xhr.responseText)
			        }
			    }
			}
			xhr.send();
		})
	};

	post(url, dado){
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open('POST', url, true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.onreadystatechange = () => {
			    if(xhr.readyState == 4) {
			        if(xhr.status == 200) {
			            //console.log(JSON.parse(xhr.responseText));
			            resolve(JSON.parse(xhr.responseText));
			        } else {
			            //console.log(xhr.responseText);
			            reject(xhr.responseText)
			        }
			    }
			}
			xhr.send(JSON.stringify(dado));
			//console.log(JSON.stringify(dado));
		})
	};

	delete(url){
		return new Promise((resolve, reject) =>{
			let xhr = new XMLHttpRequest();
			xhr.open('DELETE', url);
			xhr.onreadystatechange = () => {
			    if(xhr.readyState == 4) {
			        if(xhr.status >= 200 && xhr.status <= 299) {
			            console.log(xhr);
			            resolve(true);
			        } else {
			            console.log(xhr.responseText);
			            reject(xhr.responseText)
			        }
			    }
			}
			xhr.send();
		})
	}

	put(url, dado){
		return new Promise((resolve, reject) =>{
			let xhr = new XMLHttpRequest();
			xhr.open('PUT', url, true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.onreadystatechange = () => {
			    if(xhr.readyState == 4) {
			        if(xhr.status >= 200 && xhr.status <= 300) {
			            console.log(xhr);
			            resolve(true);
			        } else {
			            console.log(xhr.responseText);
			            reject(xhr.responseText)
			        }
			    }
			}
			xhr.send(JSON.stringify(dado));
		})
	}


}