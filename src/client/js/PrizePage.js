//=require Menu.js

var PrizePage = {
   view: function() {
       return m("div",[
           m.component(Menu),
           m("div", {class: "ui page"}, [
               m("div", {class: "ui grid"}, [
                   m("div", {class: "ui col-12"}, [
                       m("div", {class: "ui card colorless header"}, [
                           m("p", {class: "centerimage"},[
                               m("h1", "Dankjewel voor jullie ideeën!"),
                               m("p", "Bedankt voor jullie enthousiasme en samenwerking. Er zijn maar liefst 94 ideeën ingediend en er is in totaal 3.408 keer gestemd! Op donderdag 28 juli is de jury samengekomen om de ideeën te beoordelen op de volgende aspecten: FUN-waarde, passen bij het DNA van Eindhoven (Design, Kennis en Techniek), Innovatief en duurzaam, haalbaarheid en uiteraard het aantal kudos dat door jullie is gegeven. De jury bestond uit vertegenwoordigers van woningbouwvereniging  Trudo, Design Academy, Architectuurcentrum  Eindhoven, EHV365 en de gemeente Eindhoven.")
                           ])
                       ]),
                       m("div", {class: "ui card color"}, [
                           m("p", {class: "centerimage"},[
                               m("h3", "Met gepaste trots presenteren wij hierbij de winnaars van de Ideeënvijver:"),
                               m("p", [
                                   m("p",{class:"winner"},"Het Winnende Idee:"),
                                   m("h2", "Pop-up Promenade"),
                                   m("p", [
                                       m("a",{href:"https://www.ideeenvijver.nl/#/idea/578caccb4a446313007284fd"},"De Pop-up Promenade"),
                                       " van Mathijs Dielissen. gaat uit van het maken van een aantrekkelijke groene boulevard met ‘Pop up boxen’ die ruimte bieden aan wisselende exposities en creaties. De jury vindt het een geweldig innovatief en duurzaam idee wat past bij Eindhoven en haar ambities.  Volgens de jury scoort het idee vooral goed op Design & innovatie: het biedt ruimte aan studenten, designers en creatieven in de stad. Het zorgt voor bottom-up innovatie en zet Eindhovense designers in de etalage. Ook scoort Pop-up Promenade hoog op FUN-waarde: het is veranderlijk, niet statisch maar dynamisch. Voor bezoekers is het leuk en verrassend omdat de boxen telkens een wisselende inhoud tonen. De boxen staan in een ultieme groene setting waardoor het ook nog aangenaam is om te wandelen. De route wordt op deze manier aantrekkelijk en interessant; ook voor een gewoon bezoek en niet alleen voor passanten."
                                   ]),
                               ]),
                               m("p", [
                                   m("p",{class:"winner"},"Beste samenwerkers:"),
                                   m("h2", "Michael en Suzanne"),
                                   m("p", [
                                       "Michael met zijn idee ",
                                       m("a",{href:"https://www.ideeenvijver.nl/#/idea/5776a6af31909f13001bdbc2"},"PSV en Philips Walk of Fame"),
                                       " en Suzanne die hier prachtige aanvullingen op heeft geleverd met haar idee voor ",
                                       m("a",{href:"https://www.ideeenvijver.nl/#/idea/577635698a900e1300cae689"},"een foto route"),
                                       ". Volgens de jury werkt Michael met alle meedenkers intensief samen en omarmt aanvullingen. Suzanne heeft een goede inhoudelijke verrijking toegevoegd."
                                ]),
                               ]),
                               m("p", [
                                   m("p",{class:"winner"},"De Gouden Guppie:"),
                                   m("h2", "Big Objects"),
                                   m("p", [
                                       "Het idee van Eindhovenhotspots(Marc Engelman): ",
                                       m("a", {href: "https://www.ideeenvijver.nl/#/idea/578215ea48dd5e12003ad342"}, "Big Objects"),
                                       " gaat uit van grote nieuwe (kunst) objecten in de ruimte zoals een gigtantisch eendje. Dit idee had niet enorm veel stemmen gehaald, maar verdient volgens de jury wel een prijs omdat het hoog scoort op FUN, Design en haalbaarheid."
                                   ]),
                               ]),
                           ])
                       ]),
                       m("div", {class: "ui card colorless"}, [
                           m("p", {class: "centerimage"},[
                               m("p", [
                                   "Op de website kwamen natuurlijk nog veel meer mooie ideeën binnen. ",
                                   m("a",{href:"https://www.ideeenvijver.nl/#/idea/578410c248dd5e12003ad354"}, "De Luchtbrug Eindhoven"),
                                   " ontving de meeste kudos en verdient daarmee een bijzondere vermelding. Het idee ging uit van een kabelbaan en had prachtige visuals. De jury was dan ook zeer onder de indruk en ziet de potentie voor een FUN element in de stad, maar wijst op het beperkte innovatieve karakter (bestaande technologie), de haalbaarheid (erg kostbaar) en de lage snelheid om echt een effectieve verbinding te kunnen zijn. Dankzij alle stemmen kan De Luchtbrug zich wel de Koningsvis van de Ideeënvijver noemen. "
                               ]),
                               m("p", [
                                   "Er volgt een officiële publieksonthulling waarbij de winnaars hun prijs in ontvangst mogen nemen en de kans krijgen om hun idee te presenteren. Daarnaast komt er nog een publicatie in Groot Eindhoven en een artikel op Eindhoven.nl. Het zou fantastisch zijn als de ideeën ook daadwerkelijk uitgevoerd kunnen worden. Die mogelijkheden worden onderzocht en mocht je hier nog ideeën over hebben of een bijdrage in willen leveren dan kan dat via ",
                                   m("a",{href: "http://www.eindhoven.nl/producten/Ideeenbus.htm"},"deze link.")
                               ]),
                               m("p", "Wij feliciteren de winnaars en bedanken graag iedereen die een bijdrage heeft geleverd. Mogelijk wordt de ideeënvijver vaker ingezet voor vraagstukken, dus graag tot de volgende keer!")
                           ])
                       ]),
                   ])
               ]),
               m.component(Footer)
           ])
       ]);
   }
};
