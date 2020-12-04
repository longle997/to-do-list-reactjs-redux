import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import * as actions from '../Actions/index';

class Control extends Component {

    /*
        In order to save any change, need to use state
        state can use to identifying which action need to perform
    */
    constructor(props){
        super(props);
        this.state = {
            sortName: '',
            sortStatus: 1,
            searchName: ''
        }
    }

    /*
        Pass sortName and sortStatus that were collected from <a> below to reducer, 
        to using that state to identify which <a> is selected
    */
    onSort = (sortName, sortStatus) => {
        this.props.onSortControl(sortName, sortStatus);
        this.setState({
            sortName: sortName,
            sortStatus: sortStatus
        });
    }

    /*
    will be called if user enter any character in search bar on webpage
    get data from event => change state of this component
    */
    onSearch = (event) => {
        this.setState({
            searchName: event.target.value
        });
    }

    /*
    will be called if user click search button on webpage
    pass search name, which is what user enter to search bar
    */
    onSearchSubmit = () => {
        this.props.onSearch(this.state.searchName);
    }

    render(){

        var {sortName, sortStatus} = this.state;

        return (
            <div className="row">
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                    {/*Sreach*/}
                    <div className="input-group flexBox-container">
                        <input type="text" className="mt-30 half-width" onChange={this.onSearch}/>
                        <button type="button" className="btn btn-primary mt-30" onClick={this.onSearchSubmit} >Tìm kiếm <i className="fas fa-search"></i> </button>
                        <div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle ml-30 mt-30" type="button" data-toggle="dropdown">Sắp xếp&nbsp;
                            <span className="caret"></span></button>
                            <ul className="dropdown-menu">
                                {/* whenever click one of these button
                                    intimediately call onSort function and send 2 argument to it (first, second)

                                    Check sortName and sortStatus state to return corresponding class to <a>, in order to append "<--"
                                */}
                                <li><a onClick={ () => this.onSort('name', 1) } className={ (sortName === 'name' && sortStatus === 1) ? 'selected-sort' : '' } >A-Z</a></li>
                                <li><a onClick={ () => this.onSort('name', -1) } className={ (sortName === 'name' && sortStatus === -1) ? 'selected-sort' : '' } >Z-A</a></li>
                                <li><a onClick={ () => this.onSort('status', 1) } className={ (sortName === 'status' && sortStatus === 1) ? 'selected-sort' : '' } >Đã làm</a></li>
                                <li><a onClick={ () => this.onSort('status', -1) } className={ (sortName === 'status' && sortStatus === -1) ? 'selected-sort' : '' } >Cần làm</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/*
    component can receiving data from store and use it
*/
const mapStateToProps = (state) => {
    return {

    }
};

/*
    main purpose of component is interact with user and collecting data from them
    after that component pass those data to reducer
*/
const mapDispatchtoProps = (dispatch, props) => {
    return {
        onSearch : (searchName) => {
            dispatch(actions.SearchTask(searchName))
        },
        onSortControl : (sortName, sortStatus) => {
            dispatch(actions.SortTask(sortName, sortStatus))
        }
    }
};

/*
    go to index.js to see that we povide store to App.js so now we can connect to store throught "connect" command
*/
export default connect(mapStateToProps, mapDispatchtoProps)(Control);
