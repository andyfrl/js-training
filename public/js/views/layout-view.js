/* 
 * LayoutView - root element for all views 
 */
const LayoutView = Mn.View.extend({
    template: '.layout-template',
    tagName: 'div',
    className: 'menu-container',
    collection: new Employees(),

    /* Define regions for layout */
    regions: {
        sideRegion: {
            el: ".side-container",
            replaceElement: true
        },

        mainRegion: {
            el: ".main-container",
            //replaceElement: true
        },

        modalRegion: ".modal-container"
    },

    childViewEvents: {
        'click:employees' :         'showEmployees',
        'click:add-employee' :      'showAddEmployeeForm',
        'submit:employee-details' : 'showEmployees',
        'childview:modal:open' :    'showModalView',
        'modal:close' :             'showEmployees'
    },

    initialize: function() {
        
        /* DEBUG */
        // this.on('all', function(eventName) {
        //      console.log('Layout: triggered event:  ' + eventName);
        // });
    },

    onRender: function() {
        this.showChildView('sideRegion', new SideView());
        this.showChildView('mainRegion', new MainView());
    },

    showEmployees: function() {
        this.collection.synchronize();
        this.getRegion('modalRegion').empty();
        this.getRegion('mainRegion').empty();
        this.showChildView('mainRegion', new EmployeesView({collection: this.collection}));
    },

    showAddEmployeeForm: function() {
        this.getRegion('mainRegion').empty();
        this.showChildView('mainRegion', new DetailsView({collection: this.collection}));
    },

    showModalView: function() {
        console.log('modal');
        this.showChildView('modalRegion', new ModalView({collection: this.collection}));
    }
    
});