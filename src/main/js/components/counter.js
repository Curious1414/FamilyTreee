import React, { Component } from 'react'
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';

class Counter extends Component {

	constructor (props){
		super(props);	
		console.log("inside Counter constructor " + props.values );	
	}

	state = {
		count: this.props.value
	};
	
	styles = {
		fontSize: 24,
		fontWeight: "bold"
	};
	
	//constructor(){
	//	super();
	//	this.handelIncrement = this.handelIncrement.bind(this);
	//}
	
	render() {
		console.log("inside Counter render " + this.props);
		let classes="badge m-2 badge-";
		classes += this.state.count === 0 ? "warning" : "primary";
		return (
			<div>
				<span style = {this.styles} className={classes}> {this.formatCounter()} </span>
				<button onClick={this.handelIncrement}>Increment</button>
			</div>
		);
	}
	
	formatCounter() {
		const {count} = this.state;
		return count === 0 ? "zero" : count;
	}
	
	handelIncrement = () => {
		console.log("inside handelIncrement");
		console.log(" handelIncrement "+this);
		//this.state.count += 1;
		console.log(" handelIncrement before "+this.state.count);
		this.setState({ count: this.state.count + 1 }); 
		console.log(" handelIncrement after "+this.state.count+" , "+this.props);
	}
}

export default Counter