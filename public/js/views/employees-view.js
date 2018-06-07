/*
 * Employee views, collection views and items 
 */
const EmployeesView = Mn.View.extend({
    tagName:  'div',
    id:       'employee-list',
    template: '.employee-list-template',

    events: {
        'click .del-employee' : 'deleteEmployee',
        'click #ln' : 'sort_by_last_name',
        'click #fn' : 'sort_by_first_name',
        'click #rl' : 'sort_by_role'
    },

    triggers: {
        'click .add-employee' : 'click:add-employee'
    },

    regions: {

        table: {
            el: '#emp-table',
            replaceElement: true
        },

        footer:  {
            el: '#employee-selection-footer',
            replaceElement: true
        }
    },

    onRender: function() {
        this.getRegion('table').show(new TableView({collection: this.collection}));
        this.getRegion('footer').show(new FooterView({collection: this.collection}));
    },

    deleteEmployee: function() {
        var selectedEmployees = this.collection.where({isSelected: true});
        _.map(selectedEmployees, function(employeeModel) {
            employeeModel.destroy({url: '/employees/delete/' + employeeModel.attributes._id}, 
                    {wait: true});
        });
    },

    sort_by_last_name: function() {
        this.collection.comparator = 'last_name';
        this.collection.sort();
    },

    sort_by_first_name: function() {
        this.collection.comparator = 'first_name';
        this.collection.sort();
    },

    sort_by_role: function() {
        this.collection.comparator = 'role';
        this.collection.sort();
    }

});

/* 
 * Table View presenting Collection View(TableBody)
 */
const TableView = Mn.View.extend({
    tagName: 'table',
    id: 'emp-table',
    template: '.employee-list-table-template',

    regions: {
        table_body: {
            el: 'tbody',
            replaceElement: true
        }
    },

    events: {
        'click .select-all' : 'selectAll'
    },

    onRender: function() {
        console.log(this.collection);
        this.showChildView('table_body', new TableBody({collection: this.collection}));
    },

    selectAll: function() {

        var icon = $(this.el).find('th').find('span');

        if (icon.hasClass("ico-f-radio")) {

            icon.addClass("ico-f-ok").removeClass('ico-f-radio');
            this.collection.invoke('set', {isSelected : true});

        } else if (icon.hasClass("ico-f-ok")) {

            icon.addClass("ico-f-radio").removeClass("ico-f-ok");
            this.collection.invoke('set', {isSelected : false});
        }
    }

});

/* 
 * Single Employee 
 */
const RowView = Mn.View.extend({
  tagName: 'tr',
  template: '.employee-entry-template',

  events: {
    'click .select-item' : 'toggleSelect'
  },

  initialize: function() {
    this.listenTo(this.model, 'change:isSelected', this.resetIcon);

  },

  toggleSelect: function() {
    
    if ((this.model.get("isSelected")) === false) {
        this.model.set({isSelected : true});
    } else {
        this.model.set({isSelected : false});
    }

  },

  resetIcon: function() {

    var icon = $(this.el).find('.select-item').children();

    /* Have to do initialization of all icons on first click anywhere */
    // if (!icon.hasClass('ico-f-ok') && !icon.hasClass('ico-f-radion')) {
    //     $(this.el).parent().children().find('span').addClass("ico-f-radio");
    // }

    if (this.model.get("isSelected")) {
        icon.addClass("ico-f-ok").removeClass("ico-f-radio");

    }  else if (!this.model.get("isSelected")) {
        icon.addClass("ico-f-radio").removeClass("ico-f-ok");
    }
  }

});

/* 
 * Collection View of Employees
 */
const TableBody = Mn.CollectionView.extend({
  tagName: 'tbody',
  childView: RowView

});