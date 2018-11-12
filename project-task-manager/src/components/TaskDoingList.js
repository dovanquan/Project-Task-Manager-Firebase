import React, { Component } from 'react';
import {connect} from 'react-redux';

import TaskDoingItem from './TaskDoingItem';
import FormAddTask from './FormAddTask';
import { tasksRef } from './../firebase';
import { actChangeNotify } from './../actions/index';

class TaskDoingList extends Component {
    constructor(props) {
		super(props);

		this.state = {
            items: []
		};
    }

    componentWillMount(){
        tasksRef.on('value', items => {
            let data = [];
            items.forEach(item => {
                const {email, name} = item.val();
                data.push({email, name, key: item.key} );
            })
            this.setState({items: data});
        })
    }

    
    render() {
        let {items} = this.state;
        // let {user} = this.props;
        return (
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title">Task Doing</h3>
                </div>
                <div className="panel-body">
                    {this.showElementBody(items)}
                </div>
                <div className="panel-footer text-right">
                    {/* <FormAddTask user={user} changeNotify={this.props.changeNotify}/> */}
                    <FormAddTask changeNotify={this.props.changeNotify}/>
                </div>
            </div>
        );
    }

    showElementBody(items){
        let xhtml = null;
        if(items.length > 0 ){
            xhtml = items.map((item, index)=> {
                return (
                    <TaskDoingItem 
                        key={index } 
                        item={item} 
                        index={index} 
                        changeNotify={this.props.changeNotify}/>
                );
            });
        }
        return <ul className="list-group">{xhtml}</ul>;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeNotify: (style, title, content) => {
            dispatch(actChangeNotify(style, title, content));
        }
    }
}
export default connect(null, mapDispatchToProps)(TaskDoingList);