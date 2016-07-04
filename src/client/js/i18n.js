var i18nextOptions = {
  debug: false,
  fallbackLng: 'nl',
  whitelist:['nl', 'en-US'],
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json'
  },
  getAsync:true
};

m.startComputation();
i18next.use(i18nextXHRBackend).use(i18nextBrowserLanguageDetector).init(i18nextOptions, function(err,t){
  m.endComputation();
});
