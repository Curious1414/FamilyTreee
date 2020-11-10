'use strict';

import CoupleAudit from './coupleaudit';


import { prObj, isEqualObj, relationships, getId, postHost, findIndex, isEqual, goSubject } from '../tools';
import PersonList from './personlist';
import Member from './member';
import Person from '../app.js';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('../client');
//require("babel-core/register");
require('babel-polyfill');


// end::vars[]


// props subject={this.props.person}
// tag::couple-list[]
class Parents extends React.Component{

	constructor(props) {
		super(props);
		this.state = { 
			Parents: [],
			subject: {},
			children: [],
			subjectId: {}
		};		
		
		this.editRow = this.editRow.bind(this);
		this.delRow = this.delRow.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.afterGetParents = this.afterGetParents.bind(this);
		console.log("inside Parents constructor "  , props);
	}

	componentDidMount() {
		console.log("inside Parents componentDidMount props", this.props);
		if (isEqualObj(this.props.subject)){
			return;
		}
		let path = '/persons/search/findParentsByPerson?id='+ getId(this.props.subject._links.person.href)
		postHost(path, this.afterGetParents, 'Parents componentDidMount');
		
		
	}

	componentDidUpdate() {
		
		console.log("inside Parents componentDidUpdate props n state", this.props, this.state);
		/*
		if (isEqualObj(this.props.subject) || 
				(!isEqualObj(this.state.subject)  && isEqual(this.props.subject, this.state.subject)) ){
			console.log("inside Parents componentDidUpdate forced exit");
			return;
		}
		console.log("inside Parents componentDidUpdate props.subject", this.props.subject);
		this.state.subject = this.props.subject;
		let id = getId(this.props.subject._links.person.href)
		this.state.subjectId = id;
		if (!id){
			console.error('inside Parents componentDidUpdate ERROR in subject id', this.props.subject);
			return;
		}
		let path = '/couples/search/findByParent?parent='+ id; 

		console.log("inside Parents componentDidUpdate path ", path);
		postHost(path, this.afterGetParents, 'Parents componentDidUpdate');			
		
		
		
		*/
	}

	afterGetParents(data){
		prObj("ASYNC inside Parents afterGetParents response " , data);
		this.setState({Parents: data._embedded.persons});
	}
	
	editRow(itemLink, fullName) {
		console.log("inside Parents editRow " , itemLink);
		let Parents2 = null;
		client({method: 'GET', path: itemLink}).done(response => {
			console.log("ASYNC inside Parents editRow typeof response " , typeof response);
			prObj('ASYNC Parents editRow response ', response);
			Parents2 = response.entity;
			//Parents2.fullName = fullName;
			prObj('ASYNC Parents editRow client Parents2 ', Parents2);
			ReactDOM.render(
				<CoupleAudit details={Parents2} edit='true' subject={this.props.subject}
						itemLink={itemLink} fullName={fullName}/>,
					document.getElementById('react')
			);					
			
			
		});
		
	}	

	delRow = itemLink => {
		console.log("inside Parents delRow ", itemLink);
		fetch( itemLink , {
			method: 'DELETE'
			})			
			.then(data => {
				prObj("ASYNC Parents delRow data ", data); 
				console.log('ASYNC Parents success:', data);
				//refresh(this.props.upthis);
			})
			.catch((error) => {
				console.error('ASYNC Parents delRowError:', error);
		});
		prObj('inside Parents delRow Parents Before Delate ', this.state.Parents);
		this.state.Parents.splice(findIndex(this.state.Parents, itemLink, 'couple'), 1);
		prObj('inside Parents delRow Parents ', this.state.Parents);
		this.setState({Parents: this.state.Parents});
		//client({method: 'DELETE', path: itemLink});
		console.log("inside Parents delRow after DELETE");
		console.log("inside delRow after DELETE");
		
	}

	onSelect = (link) => {
		console.log("inside Parents onSelect link", link );
		
		goSubject(link);
		
	}

	addCouple = () => {
		console.log("inside addCouple " );
		let member = new Couples();
		ReactDOM.render(
			<Member details={member} edit='false' subject={this.props.subject}  
				upthhis={this.props.upthis} relation={relationships.COUPLE}/>,
			document.getElementById('react')
		);
	}
	
	render() {
		prObj('inside Parents render props ', this.props );
		prObj('inside Parents render state ', this.state );
		//this.state.Parents = this.props.Parents
		console.log('Parents render Parents length ', this.state.Parents.length);
		
		const Parents = this.state.Parents.length === 0 || isEqualObj(this.state.Parents[0]) ? 
				<h3>No Parents</h3> :
				
				<PersonList persons = {this.state.Parents} add ={this.state.Parents.length === 2 ? false : true} type='PARENTS' />
						
		;
		
		
		
		return (
			
			<React.Fragment>
				<h3>Parents</h3> 
				{Parents}	
				
			</React.Fragment>
					
		)
	}
	
	
}   
// end::couple-list[]


// props key={couple._links.self.href} couple={couple} 
//onDelete={this.delRow} onEdit={this.editRow} itemLink={couple._links.self.href} 
// upthis={this.props.upthis} subjectId={this.props.subjectId} subject={this.props.subject}
// tag::couple[]
class Couple extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			couple: props.couple,
			fullName: {partnerFirstName: '.',
						partnerFamilyName: '.',
						partnerMaidenName: '.'
					},
			children: []
		};
		this.afterGetChildren = this.afterGetChildren.bind(this);	
		this.afterGetPartner = this.afterGetPartner.bind(this);	
		this.state.couple["children"] = [];
		console.log("inside Couple constructor props"  , this.props);
	}

	componentDidMount() {
		console.log("inside Couple componentDidMount props", this.props);
		// get the children
		//let path = '/api/persons/ids/';

		let path = '/offsprings/search/findByCoupleId?coupleId='+ getId(this.props.itemLink); 
			console.log("ASYNC COUPLE componentDidMount path " + path);
			client({method: 'GET', path: path}).done(response => {
				prObj("ASYNC COUPLE componentDidMount response " , response);
				let children = [];
				let result = response.entity._embedded.offsprings;
				for (let i=0 ; i < result.length ; i++){
					children[i] = result[i].personId;
				}
				console.log("ASYNC COUPLE componentDidMount children " + children);				
				
				let path = '/persons/search/findByIds?ids=';
				if (children.length !== 0){
					path += children[0];
					for (let i=1; i < children.length ; i++){
						//path += 'ids%5B' + i + '%5D=' + this.props.couple.children[i] + '&';
						path += ',' + children[i] ;
					}
					postHost(path, this.afterGetChildren, 'COUPLE');
					/*
					client({method: 'GET', path: {path}}).done(response => {
						console.log("ASYNC inside Couple componentDidMount response " + 
							response.entity._embedded.Parents.length);
						this.setState({children: response.entity._embedded.persons});
					});	
					*/
				}	
			});

		
		
		let parentId = (this.props.couple.parent1 == this.props.subjectId) ? 
			this.props.couple.parent2 : this.props.couple.parent1;
		path =  '/persons/search/findById?id=' + parentId;
		postHost(path, this.afterGetPartner, 'Couple componentDidMount');
	}

	afterGetChildren(data){
		prObj("ASYNC COUPLE afterGetChildren response " , data);
		console.log("ASYNC COUPLE afterGetChildren data length"  , data._embedded.persons);
		this.setState({children: data._embedded.persons});
	}			
		
	

	afterGetPartner(data){
		prObj("ASYNC inside Parents afterGetPartner response data" , data);
		let fullName = {partnerFirstName: data.firstName, 
			partnerFamilyName: data.familyName,
			partnerMaidenName: data.maidenName};
		this.setState({
			fullName: fullName
		});
		prObj("ASYNC inside Parents afterGetPartner after state " , this.state);
	}

	render() {
		
		let id = getId(this.props.itemLink);

		console.log("inside Couple render id ", id, this.state.fullName, this.props.couple.marriage,
			this.props.couple.divorce);
		prObj('inside Couple render props ', this.props );
		prObj('inside Couple render state ', this.state );
		return (
			<React.Fragment>
				<table>
					<tbody>
						<tr>
							<th>Action</th>
							<th>ID</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Maiden Name</th>
							<th>Marriage Date</th>
							<th>Divorce Date</th>
						</tr>
						
						<tr>
							<td> 
								<button onClick={ () => this.props.onSelect(this.props.itemLink)}>S</button>
								<button onClick={ () => this.props.onDelete(this.props.itemLink)}>D</button> 
								<button onClick={ () => this.props.onEdit(this.props.itemLink, this.state.fullName)}>E</button></td>
							<td>{id}</td>							
							<td style={{backgroundColor: "blue"}}>{this.state.fullName.partnerFirstName}</td>
							<td>{this.state.fullName.partnerFamilyName}</td>
							<td>{this.state.fullName.partnerMaidenName}</td>
							<td>{this.props.couple.marriage}</td>
							<td>{this.props.couple.divorce}</td>
						</tr>
					</tbody>
				</table>
				
			
			
			{console.log("inside Couple render props ", this.props)}
			<h3>Children</h3>
			
			<PersonList persons={this.state.children} add='true' upthis = {this} subject={this.props.subject}
					couple={this.props.couple} coupleLink={this.props.itemLink} type='CHILDREN'/>
			</React.Fragment>
		)
	}
	
	
}
// end::Parents[]

export default Parents

