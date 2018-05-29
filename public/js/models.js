$(function(){

    Backbone.Model.prototype.idAttribute = '_id';

    // Backbone Model
    var Employee = Backbone.Model.extend({
        defaults: {
            last_name:'',
            first_name:'',
            role:'',
            isSelected: false
        },

        /* DEBUG */
        initialize: function() {
            this.on('all', function(eventName) {
                console.log('EMPLOYEE MODEL: triggered event:  ' + eventName);
            });
        }
    });

    //Backbone Collection
    var Employees = Backbone.Collection.extend({
        url: 'http://localhost:3000/employees',


        /* DEBUG */
        initialize: function() {
            this.comparator = 'role';

            this.on('all', function(eventName) {
                console.log('EMPLOYEE COLLECTION: triggered event:  ' + eventName);
            });
        }
    });

    /* 
     * Backbone View for a Single Employee
     */
    var EmployeeView = Backbone.View.extend({
        model: new Employee(),
        tagName: 'tr',

        events : {
            'click .select-item' : 'select'
        },

        initialize: function() {
            this.template = _.template($('.employee-entry-template').html());

            /* DEBUG */
            this.on('all', function(eventName) {
                console.log('EMPLOYEE VIEW: triggered event:  ' + eventName);
            });
            
            /* Select all event is triggered for every item in collection */
            this.listenTo(this.model, 'change:isSelected', this.select_event);

            /* Get rid of unused views */
            this.listenTo(this.model, 'destroy', this.remove);
        },

        select: function() {
            var icon = $(this.$el).find('span');

            if (icon.hasClass("ico-f-radio")) {
                icon.addClass("ico-f-ok").removeClass("ico-f-radio");
                this.model.set({isSelected : true});

            } else if (icon.hasClass("ico-f-ok")) {
                icon.addClass("ico-f-radio").removeClass("ico-f-ok");
                this.model.set({isSelected : false});

            } else if (!icon.hasClass("ico-f-radio") && !icon.hasClass("ico-f-ok")) {
                
                icon.addClass("ico-f-ok");
                this.model.set({isSelected : true});
                $('.select-item').children('span').each(function() {
                    if (!$(this).hasClass('ico-f-radio') && !$(this).hasClass('ico-f-ok')) {
                        $(this).addClass('ico-f-radio');
                    }
                });
                
            }
        }, // end of select: function()

        select_event: function() {
           var icon = $(this.$el).find('span');

           this.model.get("isSelected") ? 
                icon.addClass("ico-f-ok").removeClass("ico-f-radio") :
                    icon.addClass("ico-f-radio").removeClass("ico-f-ok");
        }, // end of select_event: function()

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    // Backbone View for Employees
    var EmployeesView = Backbone.View.extend({
        /* Contents fetched from server upon:
         * - create (initialize)
         * - add (element added to collection)
         * - delete (element removed from collection)
         * - change (currently only role change)
         */

        collection: new Employees(),
        el: $('#employee-list'),

         events: {
             'click .del-employee': 'delete',
             'click .add-employee': 'add_new_item',
             'click .select-all' : 'select_all',
             'click #ln' : 'sort_by_last_name',
             'click #fn' : 'sort_by_first_name',
             'click #rl' : 'sort_by_role',
             'click .ico-f-move' : 'show_modal'
         },

        initialize: function() {
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'change:role', this.render);
            this.render();
        },

        add_new_item: function() {
            /* TODO: 
             * refactor to avoid creation of additional views
             */
            new DetailsView({collection: this.collection});
            this.$el.hide();
        },

        sort_by_last_name: function() {
            this.collection.comparator = 'last_name';
            this.collection.sort();
            this.render();
        },

        sort_by_first_name: function() {
            this.collection.comparator = 'first_name';
            this.collection.sort();
            this.render();
        },

        sort_by_role: function() {
            this.collection.comparator = 'role';
            this.collection.sort();
            this.render();
        },

        delete: function() {

            var selectedEmployees = this.collection.where({isSelected: true});

            _.map(selectedEmployees, function(employeeModel) {
                employeeModel.destroy({url: '/employees/delete/' + employeeModel.attributes._id}, 
                        {wait: true});
            });

            this.render();

        },

        /* Select all is a part of the Collection View */
        select_all: function() {
            var icon = $(this.$el).find('th').find('span');

            if (icon.hasClass("ico-f-radio")) {

                icon.addClass("ico-f-ok").removeClass('ico-f-radio');
                this.collection.invoke('set', {isSelected : true});

            } else if (icon.hasClass("ico-f-ok")) {

                icon.addClass("ico-f-radio").removeClass("ico-f-ok");
                this.collection.invoke('set', {isSelected : false});
            }
        },   // end of select_all: function()

        show_modal: function() {
            /* TODO: 
             * refactor to avoid creation of additional views
             */
            new ModalView({collection: this.collection});
        },

        render: function() {
            var self = this;
            
            this.$el.show();
            /* Remove Employee Views created before */
            _.each(self.collection.toArray(), function(employee) {
                employee.trigger('destroy');
            });

            this.collection.fetch({

                success: function(response) {
                    _.each(response.toJSON(), function(item) {
                        //console.log('SUCCESSFULLY GOT emloyee ' + item._id);
                    });
                },

                error: function() {
                    console.log('FAILED TO GET employees');
                },
                reset: true

            }).done(function() {
                /* Clear the table and add navigation bar on the top of it */
                self.$el.find('table').html($('#nav-bar'));

                _.each(self.collection.toArray(), function(employee) {
                    /* render().$el is basically <tr> of EmployeeView object */
                    self.$el.find('table').append((new EmployeeView({model: employee})).render().$el); 
                    
                });
                
                return this;
            });

        }
        
    });

    
    // Backbone View for Employee Details Form
    var DetailsView = Backbone.View.extend({

        el: $('#form-employee-details'),
        tagName: 'form id=form-employee-details',

        events: {
            'submit' : 'process_form',
        },

        initialize: function() {
            this.render();
        },

        process_form: function(event) {

            event.preventDefault();

            var employee = new Employee({
                last_name:$('#last-name').val(),
                first_name:$('#first-name').val(),
                role:$('#role').val()
            });

            employee.save(null, {
                
                success: function(response) {
                    console.log('SUCCESSFULLY SAVED emloyee ' + response + 'to server');
                },

                error: function() {
                    console.log('FAILED TO SAVE emloyee to the server');
                },
                url: '/add_employee'
            });

            this.collection.add(employee);
            this.$el.hide();
            this.remove();

            $('#confirmation-box').slideDown(300);
                    setTimeout(function() {
                        $('#confirmation-box').slideUp(300)
                   }, 5000);
        },

        render: function() {
            this.$el.show();
            $('.main-1-controls-employees > h4').replaceWith('<h4>Employee Details</h4>');
        }
    });

    /* View for Side Menu Panel */
    var SideMenuView = Backbone.View.extend({

        el: $('.side-container'),

        events : {
            'click li.employees' : 'show_employees'
        },

        initialize: function() {
            console.log('side menu');
            var employeesView = new EmployeesView();
            $('#datetime').html(this.format_date_time(new Date()));

        },

        show_employees: function() {
            console.log('show_employees');
            
            $('.main-2').hide();
            $('#form-employee-details').hide();
            $('.main-1-controls-employees > h4').replaceWith('<h4>Employees</h4>');
            $('#employee-list').show();
        },

        format_date_time: function(date) {
            
            var year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds(),
            yearFormatted = year.toString().substr(-2),
            monthFormatted = month < 10 ? "0" + month : month,
            dayFormatted = day < 10 ? "0" + day : day,
            minuteFormatted = minute < 10 ? "0" + minute : minute,
            secondFormatted = second < 10 ? "0" + second : second,
            amPm = hour < 12 ? "AM" : "PM";

            return monthFormatted + "/" + dayFormatted + "/" + yearFormatted + ", " + hour + ":" +
                    minuteFormatted + ":" + second + " " + amPm;
        }

        

    });

    /* View for Modal Menu */
    var ModalView = Backbone.View.extend({
        el: $('#change-employee-role-modal'),
        newrole: '',

        events : {
            'click #btn-controls-owner' : 'owner_selected',
            'click #btn-controls-employee' : 'employee_selected',
            'click #btn-change-role-apply' : 'apply_role',
            'click .close-icon' : 'show_confirmation'
        },

        initialize: function() {
            //this.listenTo(this.collection, 'change:role', this.update)
            openModal();

        },

        owner_selected: function() {
            var btn = $('#btn-controls-owner');

            if (btn.hasClass('ico-f-radio')) {
                btn.removeClass('ico-f-radio');
                btn.addClass('ico-f-radio-checked');
                $('#btn-controls-employee').addClass('ico-f-radio');
                $('#btn-controls-employee').removeClass('ico-f-radio-checked');
                this.newrole = 'Owner';
            }
        },

        employee_selected: function() {
            var btn = $('#btn-controls-employee');

            if (btn.hasClass('ico-f-radio')) {
                btn.removeClass('ico-f-radio');
                btn.addClass('ico-f-radio-checked');
                $('#btn-controls-owner').addClass('ico-f-radio');
                $('#btn-controls-owner').removeClass('ico-f-radio-checked');
                this.newrole = 'Employee';
            }
        },

        apply_role: function() {
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

                });//.done(function() {
                //      Fire change event after information is sent to the server 
                //     employeeModel.set({role : self.newrole});
                // });


            });
            //this.collection.trigger('change:role');
            this.$el.hide();
        },

    });

    /* Side menu is global, since it is always presen on the page */
    var sideMenu = new SideMenuView();

});