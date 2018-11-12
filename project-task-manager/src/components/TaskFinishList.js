import React, { Component } from 'react';

import TaskFinishItem from './TaskFinishItem';
import TaskFinishItemAdmin from './TaskFinishItemAdmin';
import { tasksCompletedRef } from './../firebase';
import {connect} from 'react-redux';

import { actChangeNotify } from './../actions/index';
import * as notify from './../constants/Notify';

class TaskFinishList extends Component {
    
    constructor(props) {
		super(props);

		this.state = {
            items: []
		};
    }

    componentWillMount(){
        tasksCompletedRef.on('value', items => {
            let data = [];
            items.forEach(item => {
                const {email, name} = item.val();
                data.push({email, name, key: item.key} );
            })
            this.setState({items: data});
        })
    }
    handleClear = () => {
        tasksCompletedRef.set([]);
        this.props.changeNotify(notify.NOTI_TYPE_WARNING, notify.NOTI_CLEARALL_TASK_TITLE, notify.NOTI_CLEARALL_TASK_MESSAGE );
    }
    
    render() {
        let {items} = this.state;
        let isAdmin = true;
        return (
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3 className="panel-title">Task Finish</h3>
                </div>
                <div className="panel-body">
                     {this.showElementBody(items, isAdmin)}
                </div>
                <div className="panel-footer text-right">
                    <button onClick={this.handleClear} type="button" className="btn btn-danger">Clear All</button>
                </div>
            </div>
        );
    }

    showElementBody(items, isAdmin){
		let xhtml = null;
		if(items.length > 0 ){
            xhtml = items.map((item, index)=> {
                if (isAdmin === true) {
                    return (
                        <TaskFinishItemAdmin changeNotify={this.props.changeNotify} key={index } item={item} index={index}/>
                    )
                } else {
                    return (
                        <TaskFinishItem key={index } item={item} index={index}/>
                    );
                }
            });
            return <ul className="list-group">{xhtml}</ul>;
        }else{
            return <h4>Loading</h4>;
        }
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeNotify: (style, title, content) => {
            dispatch(actChangeNotify(style, title, content));
        }
    }
}
export default connect(null, mapDispatchToProps)(TaskFinishList);

