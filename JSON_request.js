// Sending and receiving data in JSON format using POST method
//
var content = "dfdfdfsdfsf";
var title = "banana boy finds banana";
var url1 = "https://www.washingtonpost.com/health/2021/05/14/cdc-mask-update-decision-confusion/";

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var url = "http://38e217093420.ngrok.io/fakebox/check";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json);
    }
};
var data = JSON.stringify({
	"url": url1,
	"title": title,
	"content": content
});
xhr.send(data);

//var smth = JSON[0].content;
//var score = Math.round(smth.score * 100);

//document.getElementById("score_val").innerHTML = score;
