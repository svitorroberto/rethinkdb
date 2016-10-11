window.Departamento = Backbone.Model.extend({

    urlRoot: "/departamentos",

    idAttribute: "id",

    initialize: function () {
        this.validators = {};


        this.validators.depto_descricao = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a descricao"};
        };

        this.validators.depto_ramal = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a nivel"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        id: null,
        depto_descricao: "exemplo",
        depto_ramal: "ramal exemplo",
    }
});

window.DepartamentoCollection = Backbone.Collection.extend({

    model: Departamento,

    url: "/departamentos"

});