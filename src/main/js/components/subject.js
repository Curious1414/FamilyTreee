import React, { Component } from 'react'


import {prObj, getId} from '../tools';
import PersonList from './personlist';
import Couples from './couples';
import Parents from './parents';
import { isEqualObj } from './../tools';

const client = require('../client');

// props subject={this.state.person}
class Subject extends Component {

	constructor(props) {
	    super(props);
	    prObj("inside Subject constructor props " , props);
	    this.state = {	      
		  person: props.subject,
		  persons: [],
		  couples: []
		};
		prObj("inside Subject constructor person " , this.state.perosn);
	  }

	  componentDidMount() {
		console.log("inside Subject componentDidMount this.props.subject", this.props.subject);
		if (isEqualObj(this.props.subject)){
			console.log("EXIT Subject componentDidMount this.props.subject obj");
			return;
		}
		let path = '/couples/search/findByParent?parent='+ getId(this.props.subject._links.person.href); 

		console.log("inside Subject componentDidMount path ", path);
		
		client({method: 'GET', path: path}).done(response => {
			let couples = response.entity._embedded.couples;
			console.log("ASYNC Subject componentDidMount response " + couples.length);
			//path = '/offsprings/search/findByCoupleId?coupleId='+ getId(couples._links.self.href); 
			//console.log("ASYNC Subject componentDidMount path2 " + path);
			//client({method: 'GET', path: path}).done(response => {
			//	prObj("ASYNC Subject componentDidMount response " , response);
				let children = [];
			//	let result = response.entity._embedded.offsprings;
			//	for (let i=0 ; i < result.length ; i++){
			//		children[i] = result.personId;
			//	}
			//	console.log("ASYNC Subject componentDidMount children " + children);				
				couples["children"]= children;
				this.setState({couples: couples});
			//});
		});
		
		console.log("Subject componentDidMount after setState ");
		
		
	}
	
		
	styles = {
		fontSize: 24,
		fontWeight: "bold"
	};
	
	//constructor(){
	//	super();
	//	this.handelIncrement = this.handelIncrement.bind(this);
	//}

	mySubmitHandler = (event) => {		
	    event.preventDefault();
		prObj("inside mySubmitHandler this " , this);
		
		// fetch( this.props.link , {
		fetch( this.props.edit==='true' ? this.props.itemLink : 'http://localhost:8080/persons' , {
			method: this.props.edit==='true' ? 'PUT' : 'POST', 
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this.state.details),
			})
			.then(response => response.json())
			.then(data => {
				console.log('member mySubmitHandler Success:', this.state.details);
				console.log('member mySubmitHandler Success2:', data);
			})
			.catch((error) => {
				console.error('Error:', error);
		});    	
  
		this.props.link(this.props.upthis);
		/*
		return (
			<Route
			 
			  render={() =>
				 (
				  <Redirect
					to={{
					  pathname: "/",
					  state: { from: "/member" }
					}}
				  />
				)
			  }
			/>
		  );
		  */
	  }
	
	myChangeHandler = (event) => {
	    let nam = event.target.name;
		let val = event.target.value;
		this.state.details[nam] = val;
	    //this.setState({details[nam]: val});
	    console.log("inside myChangeHandler, name  " + nam + ", val " + val);
	  }
	
	
	render() {
		prObj("inside Subject render " , this.props);
		console.log("inside Subject render subject  " , this.props.subject);
		let subject = isEqualObj(this.props.subject) ? [] : [this.props.subject];
		let couples = isEqualObj(this.props.subject) ? [] : this.state.couples;
		return (
			<React.Fragment>
				<Parents subject={this.props.subject}  />
				<p>Subject {this.props.subject?.firstName} {this.props.subject?.familyName}</p>
				<PersonList persons = {subject} add ={false} type='SUBJECT' />
				<p>Married To</p>
				<Couples couples = {couples} subject={this.props.subject}/>
			</React.Fragment>
		    );
	}
	
	
}


export default Subject