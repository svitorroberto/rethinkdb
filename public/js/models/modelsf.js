window.Cargo = Backbone.Model.extend({

    urlRoot: "/cargos",

    idAttribute: "id",

    initialize: function () {
        this.validators = {};


        this.validators.cargo_descricao = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a descricao"};
        };

        this.validators.cargo_nivel = function (value) {
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
        cargo_descricao: "exemplo",
        cargo_nivel: "nivel exemplo",
    }
});

window.CargoCollection = Backbone.Collection.extend({

    model: Cargo,

    url: "/cargos"

});