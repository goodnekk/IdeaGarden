String.prototype.trunc = String.prototype.trunc ||
  function(n){
    return (this.length > n) ? this.substr(0,n-1)+'...' : this;
};


//=require i18n.js

//=require HomePage.js
//=require ChallengePage.js

//=require IdeaOverviewPage.js
//=require IdeaDetailPage.js
//=require DashboardPage.js
//=require ConfirmPage.js

//=require ExplainPage.js
//=require ThanksPage.js
//=require WelcomePage.js
//=require WelcomeRegisterPage.js
//=require ErrorPage.js
//=require RulesPage.js
//=require ResetPage.js
//=require PrizePage.js
//=require PlatformPage.js

m.route.mode = "hash";
m.route(document.getElementById("content"), "/", {
    "/": HomePage,
    "/challenge": ChallengePage,
    "/ideas": IdeaOverviewPage,
    "/idea/:id": IdeaDetailPage,
    "/dashboard": DashboardPage,
    "/confirm/:secret": ConfirmPage,

    "/explain": ExplainPage,
    "/thanks": ThanksPage,
    "/welcome": WelcomePage,
    "/welcomeregister": WelcomeRegisterPage,
    "/rules": RulesPage,
    "/error": ErrorPage,
    "/reset": ResetPage,
    "/prize": PrizePage,
    "/platform": PlatformPage
});
