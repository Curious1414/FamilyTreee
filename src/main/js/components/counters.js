import React, { Component } from 'react'
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import Counter from './counter';

class Counters extends Component {

	constructor (props){
		super(props);	
		this.state = {
			counters: [ 
				{	id: 1, value: 6 },
				{	id: 2, value: 0 },
				{	id: 3, value: 0 },
				{	id: 4, value: 0 }
			]
			};
		console.log("inside Counters constructor " + this.props+ ", " );	
	}
	
	
	
	
	
	render() {
		console.log("inside Counters render " + this.props+ ", " );
		return (
			<div>
				{this.state.counters.map(counter => (
					<Counter key={counter.id} value={counter.value} selected={true} />
					))
				}
			</div>
		);
	}
	
	
}

export default Counters