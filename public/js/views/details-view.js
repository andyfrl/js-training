/*
 * Employee details form
 */
const DetailsView = Mn.View.extend({
    tagName: 'form',
    id: 'form-employee-details',
    template: '.employee-details-form-template',

    events: {
         'submit' : 'processForm'
    },

    processForm: function(event) {
        var self = this;
        event.preventDefault();


        var model = new Employee({
            last_name:$('#last-name').val(),
            first_name:$('#first-name').val(),
            role:$('#role').val()
        });

        model.save(null,{
           url: 'http://localhost:3000/add_employee',
           wait: true
        }).done(function() {
            delete model;
            console.log('added employee');
            self.trigger('submit:employee-details');
        });

    }
    
});