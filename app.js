var auth = require('./auth.json');
const Discord = require("discord.js");
const client = new Discord.Client();

const regUrl = new RegExp('/([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?)|(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$|(:[0-9]{4})$)){4}|([0-9a-f]){1,4}(:([0-9a-f]){1,4}){7}(:[0-9]{4})?/gi');
const isAWord = new RegExp('[a-zA-Z]{1,}');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (regUrl.test(msg.content)){
    msg.reply(" espèce de gros con à foutre des url sans cheuvrons.");
  } else if (msg.content === 'ping') {
    msg.reply('Pong!');
  } else {
    
    if(!(msg.author.id == "488408796520251408")) {
      if (isAWord.test(msg.content)){
        msg.reply("C'est un mot");
      } else {
        msg.reply("C'est pas un mot");
      } 
      console.log("regexp" + regUrl + "\nRes test : " + regUrl.test(msg.content));
      console.log("content : \""+msg.content+"\"");
    }
  }
});

client.login(auth.token);
