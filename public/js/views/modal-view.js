/* 
 * Modal View (should be rendered into modal region)
 */
const ModalView = Mn.View.extend({
    tagName: 'div',
    className: 'modal',
    template: '.modal-template',
    newrole: 'default',

    triggers: {
        'click #btn-change-role-cancel' : 'modal:close'
    },

    events: {
        'click #btn-controls-owner' : 'ownerSelected',
        'click #btn-controls-employee' : 'employeeSelected',
        'click #btn-change-role-apply' : 'applyRole'
    },

    ownerSelected: function() {
        var btn = $('#btn-controls-owner');

        if (btn.hasClass('ico-f-radio')) {
            btn.removeClass('ico-f-radio');
            btn.addClass('ico-f-radio-checked');
            $('#btn-controls-employee').addClass('ico-f-radio');
            $('#btn-controls-employee').removeClass('ico-f-radio-checked');
            this.newrole = 'Owner';
        }
    },

    employeeSelected: function() {
        var btn = $('#btn-controls-employee');

        if (btn.hasClass('ico-f-radio')) {
            btn.removeClass('ico-f-radio');
            btn.addClass('ico-f-radio-checked');
            $('#btn-controls-owner').addClass('ico-f-radio');
            $('#btn-controls-owner').removeClass('ico-f-radio-checked');
            this.newrole = 'Employee';
        }
    },

    applyRole: function() {
        var self = this;
        var selectedEmployees = this.collection.where({isSelected: true});

        _.each(selectedEmployees, function(employeeModel) {
            
            employeeModel.save({role : self.newrole}, {
            
                success: function() {
                    console.log('SUCCESSFULLY SAVED emloyee to server');
                },

                error: function(e) {
                    console.log('FAILED TO SAVE emloyee to the server');
                    console.log(e);
                },

                url: '/employees/update/'+ employeeModel.attributes._id,
                wait: true,
                dataType: 'text',
                change: false

            })

        });

        self.trigger('modal:close');
    }

});