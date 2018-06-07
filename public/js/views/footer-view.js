/*
 * Employee views, collection views and items 
 */
const FooterView = Mn.View.extend({
    tagName:  'span',
    id:       'employee-selection-footer',
    template: '.footer-template',

    triggers: {
        'click .ico-f-move' : 'modal:open'
    },

    initialize: function() {
        this.listenTo(this.collection, 'change:isSelected', this.update)
    },

    update: function() {
        var selectedCount = this.collection.where({isSelected: true}).length;
        selectedCount > 0 ? 
        $(this.el).find('#selected-count').html(selectedCount) : 
            $(this.el).find('#selected-count').html('');
    }

});