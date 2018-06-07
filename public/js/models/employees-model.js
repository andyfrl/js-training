/*
 * Employee models
 *
 */
Backbone.Model.prototype.idAttribute = '_id';

// Backbone Model
const Employee = Backbone.Model.extend({
    defaults: {
        last_name:'',
        first_name:'',
        role:'',
        isSelected: false
    },

    /* DEBUG */
    // initialize: function() {
    //     this.on('all', function(eventName) {
    //         console.log('EMPLOYEE MODEL: triggered event:  ' + eventName);
    //     });
    // }
});

//Backbone Collection
const Employees = Backbone.Collection.extend({
    model: Employee,
    url: 'http://localhost:3000/employees',

    
    initialize: function() {
        this.comparator = 'role';

        /* DEBUG */
        // this.on('all', function(eventName) {
        //     console.log('EMPLOYEE COLLECTION: triggered event:  ' + eventName);
        // });

        this.synchronize();       
    },

    synchronize: function() {

        this.fetch({

            success: function(response) {
                _.each(response.toJSON(), function(item) {
                    //console.log('SUCCESSFULLY GOT emloyee ' + item.first_name);

                });
            },

            error: function() {
                console.log('FAILED TO GET employees');
            }

        });
    }
});