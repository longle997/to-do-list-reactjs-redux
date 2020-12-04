import React, { Component } from 'react';
import '../App.css'

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
        Pass sortName and sortStatus that were collected from <a> below to parent component, which is App
        setState to change state and using that state to identify which <a> is selected
    */
    onSort = (sortName, sortStatus) => {
        this.props.onSortControl(sortName, sortStatus);
        this.setState({
            sortName: sortName,
            sortStatus: sortStatus
        });
    }

    onSearch = (event) => {
        this.setState({
            searchName: event.target.value
        });
    }

    onSearchSubmit = () => {
        this.props.onSearch(this.state.searchName);
        // console.log(this.state.searchName);
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

export default Control;
