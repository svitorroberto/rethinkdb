var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "wines"	            : "list",
        "wines/page/:page"	: "list",
        "wines/add"         : "addWine",
        "wines/:id"         : "wineDetails",
        "about"             : "about",
        "cagos"             : "listc",
        "cagos/page/:page"  : "listc",
        "cagos/add"         : "addCargo"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var wineList = new WineCollection();
        wineList.fetch({
            data: {'page': p, 'items': 8},
            success: function(){
                $("#content").html(new WineListView({model: wineList, page: p}).el);
            }
        });
        this.headerView.selectMenuItem('home-menu');
    },
//list cargo#######################################
    listc: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var cargoList = new CargoCollection();
        cargoList.fetch({
            data: {'page': p, 'items': 8},
            success: function(){
                $("#content").html(new CargoListView({model: cargoList, page: p}).el);
            }
        });
        this.headerView.selectMenuItem('home-menu');
    },
    
    wineDetails: function (id) {
        var wine = new Wine({id: id});
        wine.fetch({success: function(){
            $("#content").html(new WineView({model: wine}).el);
        }});
        this.headerView.selectMenuItem();
    },
//ver cargo #######################################
     cargoDetails: function (id) {
        var cargo = new Cargo({id: id});
        cargo.fetch({success: function(){
            $("#content").html(new CargoView({model: cargo}).el);
        }});
        this.headerView.selectMenuItem();
    },
    
	addWine: function() {
        var wine = new Wine();
        $('#content').html(new WineView({model: wine}).el);
        this.headerView.selectMenuItem('add-menu');
	},
//add cargo #######################################
    addCargo: function() {
        var cargo = new Cargo();
        $('#content').html(new CargoView({model: cargo}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'CargoView', 'CargoListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});