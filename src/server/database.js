var mongoose = require('mongoose');

module.exports = (function(){

    function getQuestion(){
        return {
            "title": "wat te doen?"
        };
    }

    function getIdea(id){
        return {
            id: id
        };
    }

    return {
        getQuestion: getQuestion,
        getIdea: getIdea
    };
})();
