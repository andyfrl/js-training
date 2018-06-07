/* 
 * Side Menu
 */
const SideView = Mn.View.extend({
    tagName: 'div',
    className: 'side-container',
    template: '.side-template',

    triggers : {
        'click li.employees': 'click:employees'
    },

    onRender: function() {
        this.$el.find('.help').children().html(this.format_date_time(new Date()));
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