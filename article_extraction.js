var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const data = null;
const { url1 } = require('./bundle.js')

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		//console.log(this.responseText);
    const res = JSON.parse(this.responseText);
    //console.log(res);
  
    for (const key in res) {
      if(key == 'article'){
        var obj = res[key]
        //console.log(obj);
        for (const k in obj){
          if(k == 'text'){
            var content = obj[k];
            if (content != ""){
              module.exports = { content };
            }
            else{
              $("#message").html("<b> Sorry, we couldn't analyze this article. </b>");
            }
          }
        }
      }  
    }
	}
});

xhr.open("GET", "https://lexper.p.rapidapi.com/v1.1/extract?url="+ url1 +"&media=1");
xhr.setRequestHeader("x-rapidapi-key", "642e534696msh2a5509fe56ba3a1p12acc8jsna2d91b3c6924");
xhr.setRequestHeader("x-rapidapi-host", "lexper.p.rapidapi.com");

xhr.send(data);