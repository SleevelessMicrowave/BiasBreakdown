var url1;
var content;
var title;

init();

function init() {
  chrome.tabs.query({ 'active': true }, function (tabs) {
    this.url1 = tabs[0].url;
    //module.exports = { url1 };
    this.title = tabs[0].title;
    chrome.extension.getBackgroundPage().console.log(url1);
    //chrome.extension.getBackgroundPage().console.log(title);
    findContent();
  })
}

function findContent() {
  chrome.extension.getBackgroundPage().console.log("banana");
  //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  const data = null;
  //const { url1 } = require('./bundle.js')

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  //url1 = new String(url1);

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      //console.log(this.responseText);
      const res = JSON.parse(this.responseText);
      //console.log(res);
      chrome.extension.getBackgroundPage().console.log(url1);
      //chrome.extension.getBackgroundPage().console.log(res);

      for (const key in res) {
        if (key == 'article') {
          var obj = res[key]
          //console.log(obj);
          for (const k in obj) {
            if (k == 'text') {

              content = obj[k];
              //chrome.extension.getBackgroundPage().console.log(content);
              biasedCheck(content);

              // if (content != "") {
              //   module.exports = { content };
              //   chrome.extension.getBackgroundPage().console.log("hi");

              // }
              // else {
              //   $("#message").html("<b> Sorry, we couldn't analyze this article. </b>");
              //   chrome.extension.getBackgroundPage().console.log("cant detec");
              // }
            }
          }
        }
      }
    }
  });

  //chrome.extension.getBackgroundPage().console.log(content);


  xhr.open("GET", "https://lexper.p.rapidapi.com/v1.1/extract?url=" + url1 + "&media=1");
  chrome.extension.getBackgroundPage().console.log("https://lexper.p.rapidapi.com/v1.1/extract?url=" + url1 + "&media=1");
  xhr.setRequestHeader("x-rapidapi-key", "642e534696msh2a5509fe56ba3a1p12acc8jsna2d91b3c6924");
  xhr.setRequestHeader("x-rapidapi-host", "lexper.p.rapidapi.com");
  xhr.send(data);

}

var json;
function biasedCheck(str) {
  // Sending and receiving data in JSON format using POST method
  //
  //const title = "banana boy goes to school";
  var contentString = new String(str);
  console.log(str);
  if (contentString.length >= 7000)
  {
    contentString = contentString.substring(0,3500) + contentString.substring(contentString.length-3500, contentString.length);
  }
  console.log(contentString.length);


  chrome.extension.getBackgroundPage().console.log(contentString.length);

  //chrome.extension.getBackgroundPage().console.log(arguments);
  var xhrTwo = new XMLHttpRequest();
  var url = "http://107a1ee4efce.ngrok.io/fakebox/check";
  xhrTwo.open("POST", url, true);
  xhrTwo.setRequestHeader("Content-Type", "application/json");
  xhrTwo.onreadystatechange = function () {
    if (xhrTwo.readyState === 4 && xhrTwo.status === 200) {
      json = JSON.parse(xhrTwo.responseText);
      obj = xhrTwo.responseText;
      console.log(json);
      chrome.extension.getBackgroundPage().console.log(json);
      var score = json.content.score;
      var hold = score;
      if (hold == 0.33232277631759644)
      {
        score = json.title.score;    
      }
      var math = score * 335 - 5;
      score = Math.round(score * 100);
      
      document.getElementById("p-bias").innerHTML = score + "%";
      document.getElementById("p-bias").style.left = String(math) + "px";
      document.getElementById("inside").style.width = String(score) + "%";

      if(score >= 0 && score<45)
      {
        document.getElementById("inside").style.background = "#cc0000";
        document.getElementById("description").innerHTML = "This article has a low impartiality score. High amounts of bias were detected.";
      }
      else if(score < 61)
      {
        document.getElementById("inside").style.background = "#ffe700";
        document.getElementById("description").innerHTML = "This article has a mid-range impartiality score. Some amounts of bias were detected.";

      }
      else
      {
        document.getElementById("inside").style.background = "#38761d";
        document.getElementById("description").innerHTML = " This article has a high impartiality score. Low amounts of bias were detected.";

      }

    }
    // else print error message to user

  };
  var output = JSON.stringify({
    "url": url1,
    "title": title,
    "content": contentString
  });
  xhrTwo.send(output);

  //chrome.extension.getBackgroundPage().console.log(data);

}



