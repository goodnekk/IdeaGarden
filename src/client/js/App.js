//=require IdeaOverviewPage.js
//=require IdeaDetailPage.js

m.route(document.getElementById("content"), "/", {
    "/": IdeaOverviewPage,
    "/ideas": IdeaOverviewPage,
    "/idea/:id": IdeaDetailPage
});
