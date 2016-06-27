//=require QuestionPage.js
//=require ExplainPage.js
//=require IdeaOverviewPage.js
//=require IdeaDetailPage.js
//=require DashboardPage.js
//=require ConfirmPage.js

//=require ThanksPage.js
//=require ErrorPage.js

m.route.mode = "hash";

m.route(document.getElementById("content"), "/", {
    "/": QuestionPage,
    "/explain": ExplainPage,
    "/ideas": IdeaOverviewPage,
    "/idea/:id": IdeaDetailPage,
    "/dashboard": DashboardPage,
    "/confirm/:secret": ConfirmPage,
    "/thanks": ThanksPage,
    "/error": ErrorPage,
});
