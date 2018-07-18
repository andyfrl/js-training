import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            hintBoxEntries: []
        }

        this.handleChange = this.handleChange.bind(this);
    }

    filterItems(itemsArray, filterValue) {
        let count = 0;

        return itemsArray.filter(el => {

            if ((filterValue.length > 1) &&
                (el.first_name.startsWith(filterValue) ||
                el.last_name.startsWith(filterValue)) &&
                (count < 4)
                ) {
                    count++;
                    return true;
                }
                return false;
        }).map(el => {
            let boldPart = "";
            let normalPart = "";

            if (el.first_name.startsWith(filterValue)) {
                boldPart = el.first_name.substr(0, filterValue.length);
                normalPart = el.first_name.substr(filterValue.length);
                return <li key={el._id}><b>{boldPart}</b>{normalPart} {el.last_name}</li>;
            } else {
                boldPart = el.last_name.substr(0, filterValue.length);
                normalPart = el.last_name.substr(filterValue.length);
                return <li key={el._id}>{el.first_name} <b>{boldPart}</b>{normalPart} </li>;
            }

        });
    }

    handleChange(e) {
        this.setState(
            {
                message: e.target.value,
                hintBoxEntries: this.filterItems(this.props.items, e.target.value),
                hintBoxVisible: (e.target.value.length > 1) ? true : false
            } //end of state entries
        );

    }

    render() {
        console.log(this.state.hintBoxEntries);
        return (
            <div id='menu-heading-search-box'>
                <div id='menu-heading-search-box-content'>
                    <span className="font-icon ico-f ico-f-magnifier"></span>
                    <input type="text" id="search-box-input"
                           value={this.state.message} onChange={this.handleChange}>
                    </input>
                    <div className="close-icon font-icon ico-f ico-f-cross"
                          onClick={this.props.closeHandle}>
                    </div>
                </div>
                {this.state.hintBoxVisible && <ul className="hint-box">EMPLOYEES
                    {this.state.hintBoxEntries}
                </ul>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    items: state.emps.items
});

const SearchBoxContainer = connect(mapStateToProps, null)(SearchBox);

export {SearchBox};
export {SearchBoxContainer};
