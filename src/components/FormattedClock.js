import React, { PureComponent } from 'react';

class FormattedClock extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    formatDate(date) {

        const year = date.getFullYear(),
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
                minuteFormatted + ":" + secondFormatted + " " + amPm;
    }

    render() {
        return (
            <span className="help">
                <span id="datetime">{this.formatDate(this.state.date)}</span>Need Help?
            </span>
        )
    }
}

export default FormattedClock;
