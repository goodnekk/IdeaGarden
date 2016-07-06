var database = require("../database.js");
var bcrypt = require("bcryptjs");
database.addChallenge({
  "title": "Hoe zou jij het Centrum met Strijp-s verbinden?",
  "leader":{
    "image": "/static/route.png",
    "video": {
      "type": "youtube",
      "source": "https://www.youtube.com/embed/hseiRm-JzXg?showinfo=0"
    },
    "text": ""
  },
  "paragraphs": [
    {
      "title": "",
      "text": "Eindhoven nodigt je uit om jouw stad mooier, leuker, chiller en aantrekkelijker te maken!",
      "sequence": 0
    },
    {
      "title": "",
      "text": "Heel de maand juli kun je reageren op de vraag:",
      "sequence": 1
    },
    {
      "title": "HOE?",
      "text": "Een nieuw vervoersconcept? De reis spannender maken? Leuke ideeën? Doe Mee Met Jouw Idee! Je kunt ook de ideeën van anderen bekijken, aanvullen & stemmen op de ideeën die jou het meest aanspreken.",
      "sequence": 2
    },
    {
      "title": "WAAROM?",
      "text": "Strijp-s en het centrum van Eindhoven zijn nu twee gescheiden werelden. Je loopt niet voor je lol van het centrum naar Strijp-s of andersom. Dan pak je de trein of de bus of je gaat rechtstreeks naar huis. Hoe mooi zou het zijn als mensen die Strijp-s voor een evenement bezoeken, ook worden uitgenodigd de rest van Eindhoven te verkennen? Hoe mooi zou het zijn als winkelend publiek in het centrum ook even een hapje gaat eten op Strijp-s?",
      "sequence": 3
    },
    {
      "title": "",
      "text": "Bezoekers zien meer, inwoners genieten meer en studenten ontdekken meer als we beide gebieden op een leuke manier met elkaar verbinden. Bovendien kunnen ondernemers profiteren van meer traffic.",
      "sequence": 4
    }
  ],
  "disclaimer": "Dit crowdsourcing platform is een initiatief van de gemeente Eindhoven, en is als pilot ontwikkeld door Code for NL. Vragen? Neem contact op met info@ideeenvijver.nl"
}, function(challenge){
  console.log(challenge);
  database.addUser({
      name: "marcel",
      password: bcrypt.hashSync("test", 10),
      email: "test@test.nl"
  }, function(user){
    console.log(user);
      database.addIdea({
        title: "Monorail",
        summary: "Er moet een monorail komen van de Universiteit naar Strijp-S. Maar je moet zelf fietsen.",
        owner: database.mongoose.Types.ObjectId(user._id),
        downvotes:[
          "37.152.12.223",
          "80.101.119.9",
          "86.95.96.240",
          "62.163.142.205",
          "5.206.212.234",
          "145.15.244.17"
        ],
        upvotes:[
          "82.156.185.92",
          "80.57.105.183"
        ],
        additions: [
          {
            category: "addition",
            content: {
              title: "Monorail",
              description: "Er moet een monorail komen."
            },
            comments: []
          },
          {
            category: "image",
            content: {
              description: "Misschien kunnen we er zo'n fiets monorail van maken.",
              src: "static/fish logo.jpg"
            },
            comments: []
              },
              {
                category: "question",
                content: {
                  description: "Wie gaat dat allemaal betalen?"
                },
                comments: [
                  {
                    comment: "Gaat de gemeente dat niet betalen?"
                  },
                  {
                    comment: "Nee de gemeente kan dat allemaal niet betalen hoor, daar hebben ze geen geld voor."
                  },
                  {
                    comment: "Wij willen het wel bouwen maar alleen als we voor eeuwig de exploitatie rechten krijgen."
                  }
                ]
              }
          ]

      }, function(idea){
        console.log(idea);
        database.mongoose.disconnect();
        return;
      });
  });
});
