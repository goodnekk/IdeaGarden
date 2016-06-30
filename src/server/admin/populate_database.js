var database = require("../database.js");
var bcrypt = require("bcryptjs");
database.addUser({
    name: "marcel",
    password: bcrypt.hashSync("test", 10),
    email: "test@test.nl"
}, function(a){
    console.log(a);
    return;
});

database.addIdea({
    title: "Monorail",
    summary: "Er moet een monorail komen van de Universiteit naar Strijp-s. Maar je moet zelf fietsen.",
    votes: [
        {vote: 1},{vote:1},{vote:1},{vote:-1},{vote:1},{vote:1},{vote:-1},{vote:1}
    ],
    additions: [
        {
            message: "Kees heeft een idee geplant",
            category: "origin",
            content: {
                title: "Monorail",
                description: "Er moet een monorail komen."
            },
            comments: []
        },
        {
            message: "Anouk heeft een afbeelding toegevoegd",
            category: "image",
            content: {
                description: "Misschien kunnen we er zo'n fiets monorail van maken.",
                src: "static/shweeb.jpg"
            },
            comments: []
        },
        {
            message: "Peter stelde een vraag",
            category: "addition",
            content: {
                description: "Wie gaat dat allemaal betalen?"
            },
            comments: [
                {
                    name: "Anja",
                    comment: "Gaat de gemeente dat niet betalen?"
                },
                {
                    name: "Gijs",
                    comment: "Nee de gemeente kan dat allemaal niet betalen hoor, daar hebben ze geen geld voor."
                },
                {
                    name: "Fred",
                    comment: "Wij willen het wel bouwen maar alleen als we voor eeuwig de exploitatie rechten krijgen."
                }
            ]
        }
    ]

}, function(a){
  console.log(a);
  return;
});
