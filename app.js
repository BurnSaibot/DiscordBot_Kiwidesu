var auth = require('./auth.json');
const Discord = require("discord.js");
const client = new Discord.Client();
const isAWord = new RegExp("[a-zA-Z]{1,}")

var regUrl = new RegExp(
    // protocol identifier (optional)
    // short syntax // still required
    "(?:(?:(?:https?|ftp):)?\\/\\/)" +
    // user:pass BasicAuth (optional)
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:" +
      // IP address exclusion
      // private & local networks
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broacast addresses
      // (first & last IP address of each class)
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
      // host & domain names, may end with dot
      // can be replaced by a shortest alternative
      // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
      "(?:" +
        "(?:" +
          "[a-z0-9\\u00a1-\\uffff]" +
          "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
        ")?" +
        "[a-z0-9\\u00a1-\\uffff]\\." +
      ")+" +
      // TLD identifier name, may end with dot
      "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
    ")" +
    // port number (optional)
    "(?::\\d{2,5})?" +
    // resource path (optional)
    "(?:[/?#]\\S*)?" +
  "$", "gi"
);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {    
  if(!(msg.author.id == "488408796520251408")) {
      //console.log("Test : " + regUrl.test(msg.content));
    if (regUrl.test(msg.content)){
      var wtf = " " + msg.content
      var splicedMsg = wtf.split(" ");
      var editedMsg = [];
      splicedMsg.forEach(function(word,index){
        if (regUrl.test(word)){
          editedMsg.push("<" + word + ">");
        } else {
          editedMsg.push(word)
        }
        //console.log("Mot d'origine : " + word +"\nrésultat du test : " + regUrl.test(word)+ "\nmot édité " + editedMsg[index])
      })
      var finalMsg = "";
      editedMsg.forEach(function(word,index){
        finalMsg += word + " ";
      })
      console.log(finalMsg);
      var currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});;
      msg.channel.send("A " + currentTime+ ", " + msg.author + " a envoyé : \n " + finalMsg.substr(1,finalMsg.length-1));
      msg.delete();
    } else if (msg.content === 'ping') {
      msg.reply('Pong!');
    } else if (isAWord.test(msg.content)){
          console.log("C'est un mot");
        } else {
          console.log("C'est pas un mot");
        } 
        console.log("content : \""+msg.content+"\"");
    }
});

client.login(auth.token);
