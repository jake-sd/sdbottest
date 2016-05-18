/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Send a message with attachments
* Send a message via direct message (instead of in a public channel)

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    token=<MY TOKEN> node demo_bot.js

# USE THE BOT:

  Find your bot inside Slack to send it a direct message.

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "Attach"

  The bot will send a message with a multi-field attachment.

  Send: "dm"

  The bot will reply with a direct message.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var Botkit = require('./lib/Botkit.js');


if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
 debug: false
});

controller.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});


controller.hears(['hello','hi'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"Hello, I'm Super Soul, you can get a list of options by typing: help");
});

// HELP
controller.hears(['help'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"*Type one of these options:*\nDeveloper Onboarding\nContacts\nValues\nFive C's\nBenefits\nPayroll\nWhy is your name Super Soul");
});

// 5 C's
controller.hears(['Five c\'s', '5 Cs', 'Five C', 'Five Cs', 'Five C\'s'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"Culture\nCompany\nClients\nCreative\nCommunity");
});

// Contacts
controller.hears(['contact', 'contacts', 'Developer Contacts'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"Beau: 816-271-3763\nDylan: 410-707-5302\nChaz: 202-498-5233\nPaige: 732-492-6499\nLuke: 978-270-8289\nJake: 202-549-9307\nTadeo: 703-577-0526");
});

// Health Benefits
controller.hears(['health', 'benefits', 'health benefits'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"Login to Zenefits https://secure.zenefits.com/accounts/login/");
});

// Payroll
controller.hears(['payroll', 'pay check', 'cheddar'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"Login to Gusto https://gusto.com/");
});


// Developer Onboarding
controller.hears(['Developer Onboarding', 'onboarding'],['direct_message','direct_mention'],function(bot,message) {

  var attachments = [];
  var attachment = {
    title: 'Welcome to Developer Onboarding',
    color: '#FFCC99',
    image_url: 'http://images.popmatters.com/misc_art/d/dvd-lifeaquatic-criterion-650.jpg',
    fields: [],
  };

  attachment.fields.push({
    label: 'Field',
    value: '<https://github.com/socialdriver/developer-onboarding/wiki/A-Common-Dev-Stack|Github - Developer Onboarding>',
    short: false,
  });

  attachments.push(attachment);

  bot.reply(message,{
    text: 'This is our Developer Repository...',
    attachments: attachments,
  },function(err,resp) {
    console.log(err,resp);
  });
});

// Values
controller.hears(['Values', 'Social Driver Values', 'What are our values', 'What are our values?'],['direct_message','direct_mention'],function(bot,message) {

  var attachments = [];
  var attachment = {
    image_url: 'http://socialdriver.com/wp-content/uploads/2015/07/ill-3.png',
    title: 'Social Driver Values',
    color: '#FFCC99',
    fields: [],
  };

  attachment.fields.push({
    label: 'Field',
    value: '1. Go beyond what\'s expected\n2. Put people above everything else\n3. Ask questions even if you think you know the answes\n 4. Believe we can do better\n5. Feel good at the end of the day',
    short: false,
  });

  attachments.push(attachment);

  bot.reply(message,{
    text: 'These are our values:',
    attachments: attachments,
  },function(err,resp) {
    console.log(err,resp);
  });
});


// Who Is Super Soul?
controller.hears(['Why is your name Super Soul','Why is your name supersoul'],['direct_message','direct_mention'],function(bot,message) {

  var attachments = [];
  var attachment = {
    title: 'This is who I am',
    color: '#FFCC99',
    image_url: 'http://caveofcult.co.uk/wp-content/uploads/2013/10/clvp.jpg',
    fields: [],
  };

  attachment.fields.push({
    label: 'Field',
    value: 'https://vimeo.com/38927008',
    short: false,
  });

  attachments.push(attachment);

  bot.reply(message,{
    text: 'See below...',
    attachments: attachments,
  },function(err,resp) {
    console.log(err,resp);
  });
});

controller.hears(['dm me'],['direct_message','direct_mention'],function(bot,message) {
  bot.startConversation(message,function(err,convo) {
    convo.say('Heard ya');
  });

  bot.startPrivateConversation(message,function(err,dm) {
    dm.say('Private reply!');
  });

});
