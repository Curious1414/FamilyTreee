'use strict';

import Member from './member';
import {Bootstrap, Grid, Form, Row, Col} from 'react-bootstrap';

import { prObj, isEqualObj, getId, findIndex, goSubject, relationships, postHost } from '../tools';
import Subject from './subject';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('../client');
//require("babel-core/register");
require('babel-polyfill');

let personId;
// end::vars[]


// PersonList persons = {subject} add='false' onSelect={this.onSelect} 
// subject={this.props.subject} type='CHILDREN'
// tag::person-list[]
class PersonList extends React.Component{

	constructor(props) {
		super(props);		
		this.state = {
					persons: this.props.persons
				};
		this.editRow = this.editRow.bind(this);
		this.delRow = this.delRow.bind(this);
		
		console.log("inside PersonList constructor props"  , this.props);
		
	}

	componentDidUpdate() {
		console.log("inside PersonList componentDidUpdate");		
		//this.setState({persons: this.props.persons});		
	}
	
	editRow(itemLink) {
		console.log("inside editRow " , itemLink);
		let persons2 = null;
		client({method: 'GET', path: itemLink}).done(response => {
			console.log("inside editRow typeof response " , typeof response);
			prObj('editRow response ', response);
			persons2 = response.entity;
			prObj('editRow client persons2 ', persons2);			
			ReactDOM.render(
				<Member details={persons2} edit='true' itemLink={itemLink} 
					upthis={this.props.upthis} subject={this.props.subject}/>,
				document.getElementById('react')
			);
			
		});
		
	}	

	delRow(itemLink){
		console.log("inside delRow ", itemLink);
		fetch( itemLink , {
			method: 'DELETE'
			})			
			.then(data => {
				prObj("ASYNC PersonList delRow data ", data); 
				console.log('ASYNC PersonList delRow success:', data);
				//refresh(this.props.upthis);
			})
			.catch((error) => {
				console.error('ASYNC PersonList delRow Error:', error);
		});
		prObj('inside PersonList delRow persons Before Delate ', this.state.persons);
		this.state.persons.splice(findIndex(this.state.persons, itemLink, 'person'), 1);
		prObj('inside PersonList delRow persons ', this.state.persons);
		this.setState({persons: this.state.persons});
		//client({method: 'DELETE', path: itemLink});
		console.log("inside PersonList delRow after DELETE");
		
	}

	addPerson = () => {
		console.log("inside addPerson " );
		let persons2 = new Person();
		ReactDOM.render(
			<Member details={persons2} edit='false' relation={relationships.CHILD} 
					subject={this.props.subject} couple={this.props.couple} coupleLink={this.props.coupleLink}/>,
				document.getElementById('react')
		);		
	}

	onSelect = (link) => {
		console.log("inside PersonList onSelect link", link );
		console.log("inside PersonList onSelect this.props.onSelect", this.props.onSelect );
		//
		//goSubject(this.props.subject);
		if (this.props.onSelect === undefined){
			postHost(link, goSubject, 'PersonList onSelect');
		} else {
			this.props.onSelect(link);
			goSubject(this.props.subject);
		}
		
		//goSubject(link);
	}
	
	render() {
		this.state.persons = this.props.persons;
		prObj('inside PersonList render props ', this.props );
		prObj('inside PersonList render state ', this.state );
		console.log('PersonList render person length ', this.props.persons.length);
		
		const persons = this.state.persons.length === 0 || isEqualObj(this.state.persons[0]) ? 
		<tr>
			<th></th>
			<th></th>
			<th>Nothing</th>
			<th></th>
			<th></th>
		</tr> :
			this.props.persons.map(person =>
				<Person key={person._links.self.href} person={person} 
					onDelete={this.delRow} onEdit={this.editRow} 
					itemLink={person._links.self.href} upthis={this.props.upthis}
					onSelect={this.onSelect}/>
			);
			
		console.log('PersonList render persons  ',  persons);
		console.log('PersonList render add  ',  this.props.add);

		let add = this.props.add ? <button onClick={this.addPerson}>Add</button> : <br></br>;
		return (
			
			<React.Fragment>
					
				<span className="badge badge-pill badge-secondary" > {persons.length} </span>
				<table>
					<tbody>
						<tr>
							<th>Action</th>
							<th>ID</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Birth Date</th>
						</tr>
						
							{persons}
						
					</tbody>
				</table>
				{add}
				
			</React.Fragment>
					
		)
	}
	
	
}   
// end::person-list[]

// Person key={person._links.self.href} person={person} 
//		onDelete={this.delRow} onEdit={this.editRow} itemLink={person._links.self.href} 
//		upthis={this.props.upthis} onSelect={this.onSelect}
// tag::person[]
class Person extends React.Component{

	constructor(props) {
		super(props);			
		
		console.log("inside Person constructor "  , this.props);
	}

	render() {
		console.log("inside Person render "+ this.props.values);
		
		let id = getId(this.props.itemLink);
		return (
			<tr>
				<td> 
					<button onClick={ () => this.props.onSelect(this.props.itemLink)}>S</button> 
					<button onClick={ () => this.props.onDelete(this.props.itemLink)}>D</button> 
					<button onClick={ () => this.props.onEdit(this.props.itemLink)}>E</button></td>
				<td>{id}</td>
				<td style={{backgroundColor: "blue"}}>{this.props.person.firstName}</td>
				<td>{this.props.person.familyName}</td>
				<td>{this.props.person.birth}</td>
			</tr>
		)
	}
	
	
}
// end::person[]

export default PersonList

