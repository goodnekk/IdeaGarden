//=require QuestionPage.js

//=require IdeaOverviewPage.js
//=require IdeaDetailPage.js
//=require DashboardPage.js
//=require ConfirmPage.js

//=require ExplainPage.js
//=require ThanksPage.js
//=require WelcomePage.js
//=require ErrorPage.js
//=require RulesPage.js

m.route.mode = "hash";

m.route(document.getElementById("content"), "/", {
    "/": QuestionPage,
    "/ideas": IdeaOverviewPage,
    "/idea/:id": IdeaDetailPage,
    "/dashboard": DashboardPage,
    "/confirm/:secret": ConfirmPage,

    "/explain": ExplainPage,
    "/thanks": ThanksPage,
    "/welcome": WelcomePage,
    "/rules": RulesPage,
    "/error": ErrorPage,
});
