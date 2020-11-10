import React, { Component } from 'react'
import {Bootstrap, Grid, Form, Row, Col} from 'react-bootstrap';
import Subject from './subject';
import PersonList from './personlist';
import { prObj, sendHost, getRelation, goSubject, addRelation, postPostHost } from '../tools';

const ReactDOM = require('react-dom');
const client = require('../client');

// details={persons2} edit='true' link={refresh} itemLink={itemLink} upthis={this.props.upthis} 
//	relation=relationship.COUPLE subject={this.props.subject}
// couple={this.props.couple} coupleLink={this.props.coupleLink}
class Member extends Component {

	constructor(props) {
	    super(props);
	    prObj("inside Member constructor props " , props);
	    this.state = {
	      firstname: '',
		  lastname: null,
		  details: props.details,
		  search: null,
		  persons: [],
		};
		this.afterPostPerson = this.afterPostPerson.bind(this);
		prObj("inside Member constructor details " , this.state.details);
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
		//prObj("inside member mySubmitHandler event " , event);
		
		// Update or Create
		//sendHost(this.props.edit, this.props.itemLink, 'http://localhost:8080/persons', this.state.details);
		console.log('http://localhost:8080/persons', 
			this.afterPostPerson, 
			this.state.details,
			 'MEMBER mySubmitHandler');
		postPostHost(this.props.edit, this.props.itemLink, 'http://localhost:8080/persons', 
					this.afterPostPerson, 
					this.state.details,
					'MEMBER mySubmitHandler');
		//this.mySearch();
		
		/*
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
  */
		ReactDOM.render(
			<Subject person={this.props.subject}/>,
				document.getElementById('react')
		);
		
	}

	afterPostPerson(data){
		prObj("ASYNC MEMBER afterPostPerson response " , data);
		console.log("ASYNC MEMBER afterPostPerson data "  , data);
		addRelation(  this.props.subject._links.person.href, data._links.person.href, this.props.relation,	this.props.couple, this.props.coupleLink);
		goSubject(this.props.subject);
	}	
	

	myChangeHandler = (event) => {
	    let nam = event.target.name;
		let val = event.target.value;
		this.state.details[nam] = val;
	    //this.setState({details[nam]: val});
		console.log("inside MEMBER myChangeHandler, name  " + nam + ", val " + val);
		prObj("inside MEMBER myChangeHandler, this.state.details  " , this.state.details);
	  }

	mySearch = (event) => {
		event.preventDefault();
		//prObj("inside member mySearch", event);
		let path = '/persons/search/findByFullName?firstName=' +this.state.details.firstName +
			'&maidenName=' + this.state.details.maidenName  +
			'&familyName=' + this.state.details.familyName;
		console.log("inside MEMBER mySearch, path  " + path );

		fetch( path , {
			method: 'GET', 
			headers: {
				'Content-Type': 'application/json',
			}
			})
			.then(response => response.json())
			.then(data => {
				prObj("ASYNC MEMBER mySearch GET by fetch data ", data); 
				//prObj("refresh GET by fetch data._embedded.persons ", data._embedded.persons); 
				//this.setState({persons: data._embedded.persons});
				console.log("ASYNC MEMBER mySearch persons length ", data._embedded.persons.length);
				this.setState({persons: data._embedded.persons});
				
				//prObj("refresh GET by fetch this.state.persons ", homethis.state.persons); 
			})
			.catch((error) => {
				console.error('ASYNC MEMBER mySearch Error:', error);
		});
		console.log("inside MEMBER mySearch, EXIT  " );
		/*
		client({method: 'GET', path: {path}}).done(response => {
			prObj(" Member mySearch response ", response); 
			console.log("inside  Member mySearch response " + response.entity._embedded.persons.length);
			this.setState({persons: response.entity._embedded.persons});
			
		});
		*/
	}

	onSelect = (person) => {
		console.log("inside memeber onSelect person", person );
		
		addRelation( this.props.subject._links.person.href, person, this.props.relation,
			this.props.couple, this.props.coupleLink);
	}

	
	
	
	render() {
		prObj("inside Member render props" , this.props);
		let relation = getRelation(this.props.relation);
		console.log("inside memeber render relation", relation );
		let header = this.props.edit==='true' ? 
				'EDIT ' + this.props.details.firstName + ' ' + this.props.details.familyName
					: 
				'NEW ' + relation + ' for ' + this.props.subject.firstName + ' ' +this.props.subject.familyName;
		return (
			<div>
				<h2>{header}
				</h2>
				<Form onSubmit={this.mySubmitHandler}>
				  <Row>
				    <Col>
				    	<label> First Name:  </label>
				    </Col>
				    <Col>
				      <input type="text" name="firstName" onChange={this.myChangeHandler} value={this.props.details.firstName}/>
				    </Col>
				  </Row>
				  <Row>
				    <Col>
				    	<label> Last Name:  </label>
				    </Col>
				    <Col>
				      <input type="text" name="familyName" onChange={this.myChangeHandler} value={this.props.details.familyName}/>
				    </Col>
				  </Row>
				  <Row>
				    <Col>
				    	<label> Maiden Name:  </label>
				    </Col>
				    <Col>
				      <input type="text" name="maidenName" onChange={this.myChangeHandler} value={this.props.details.maidenName || ""}/>
				    </Col>
				  </Row>
				  <Row>
				    <Col>
				    	<label> Birthday:  </label>
				    </Col>
				    <Col>
				      <input type="date" name="birth" onChange={this.myChangeHandler} value={this.props.details.birth}/>
				    </Col>
				  </Row>
				  
			      <br/>			  
				  <input type='submit' value='Save' />
				  <button onClick={this.mySearch}>Search</button> 
				  <button onClick={ () => goSubject(this.props.subject)}>Cancel</button> 
				</Form>
				<br/>	
				<br/>
				<p>Search Results</p>
				<br/>	
				<PersonList persons = {this.state.persons} add='false' select='true' 
					onSelect={this.onSelect} subject={this.props.subject} type='SEARCH'/>
				
			</div>
		    );
	}
	
	
}



export default Member