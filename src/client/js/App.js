//=require IdeaOverviewPage.js
//=require IdeaDetailPage.js
//=require LoginPage.js
//=require DashboardPage.js
//=require ConfirmPage.js

m.route.mode = "hash";

m.route(document.getElementById("content"), "/", {
    "/": IdeaOverviewPage,
    "/ideas": IdeaOverviewPage,
    "/idea/:id": IdeaDetailPage,
    "/dashboard": DashboardPage,
    "/confirm/:secret": ConfirmPage
});
