/*
 * Marionette application 
 */
var RevelApp = Mn.Application.extend({

    region: '.container',

    onStart: function() {
        this.getRegion().show(new LayoutView());
    }

});

var app = new RevelApp();

/* Entry point */
app.start();