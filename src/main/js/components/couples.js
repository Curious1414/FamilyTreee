'use strict';

import CoupleAudit from './coupleaudit';

import {
	  BrowserRouter as Router,
	  Switch,
	  Route,
	  Redirect,
	  useHistory
	} from "react-router-dom";
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


// props couples = {couples} subject={this.props.person}
// tag::couple-list[]
class Couples extends React.Component{

	constructor(props) {
		super(props);
		this.state = { 
			couples: [],
			subject: {},
			children: [],
			subjectId: {}
		};		
		
		this.editRow = this.editRow.bind(this);
		this.delRow = this.delRow.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.afterGetCouples = this.afterGetCouples.bind(this);
		console.log("inside Couples constructor "  , props);
	}

	componentDidMount() {
		console.log("inside Couples componentDidMount props", this.props);
		if (isEqualObj(this.props.subject))
			return;
		

		
		
	}

	componentDidUpdate() {
		console.log("inside Couples componentDidUpdate props n state", this.props, this.state);
		if (isEqualObj(this.props.subject) || 
				(!isEqualObj(this.state.subject)  && isEqual(this.props.subject, this.state.subject)) ){
			console.log("inside Couples componentDidUpdate forced exit");
			return;
		}
		console.log("inside Couples componentDidUpdate props.subject", this.props.subject);
		this.state.subject = this.props.subject;
		let id = getId(this.props.subject._links.person.href)
		this.state.subjectId = id;
		if (!id){
			console.error('inside Couples componentDidUpdate ERROR in subject id', this.props.subject);
			return;
		}
		let path = '/couples/search/findByParent?parent='+ id; 

		console.log("inside Couples componentDidUpdate path ", path);
		postHost(path, this.afterGetCouples, 'Couples componentDidUpdate');			
		
		/*
		client({method: 'GET', path: {path}}).done(response => {
			console.log("ASYNC inside Couples componentDidUpdate response " + 
				response.entity._embedded.couples.length);
			this.setState({couples: response.entity._embedded.couples});
		});
		*/
	}

	afterGetCouples(data){
		prObj("ASYNC inside Couples afterGetCouples response " , data);
		this.setState({couples: data._embedded.couples});
	}
	
	editRow(itemLink, fullName) {
		console.log("inside Couples editRow " , itemLink);
		let couples2 = null;
		client({method: 'GET', path: itemLink}).done(response => {
			console.log("ASYNC inside couples editRow typeof response " , typeof response);
			prObj('ASYNC couples editRow response ', response);
			couples2 = response.entity;
			//couples2.fullName = fullName;
			prObj('ASYNC couples editRow client couples2 ', couples2);
			ReactDOM.render(
				<CoupleAudit details={couples2} edit='true' subject={this.props.subject}
						itemLink={itemLink} fullName={fullName}/>,
					document.getElementById('react')
			);					
			
			
		});
		
	}	

	delRow = itemLink => {
		console.log("inside Couples delRow ", itemLink);
		fetch( itemLink , {
			method: 'DELETE'
			})			
			.then(data => {
				prObj("ASYNC Couples delRow data ", data); 
				console.log('ASYNC Couples success:', data);
				//refresh(this.props.upthis);
			})
			.catch((error) => {
				console.error('ASYNC Couples delRowError:', error);
		});
		prObj('inside Couples delRow couples Before Delate ', this.state.couples);
		this.state.couples.splice(findIndex(this.state.couples, itemLink, 'couple'), 1);
		prObj('inside Couples delRow couples ', this.state.couples);
		this.setState({couples: this.state.couples});
		//client({method: 'DELETE', path: itemLink});
		console.log("inside Couples delRow after DELETE");
		console.log("inside delRow after DELETE");
		
	}

	onSelect = (link) => {
		console.log("inside Couples onSelect link", link );
		
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
		prObj('inside Couples render props ', this.props );
		prObj('inside Couples render state ', this.state );
		//this.state.couples = this.props.couples
		console.log('Couples render couples length ', this.state.couples.length);
		
		const couples = this.state.couples.length === 0 || isEqualObj(this.state.couples[0]) ? 
				<h3>No Relationships</h3> :
				this.state.couples.map(couple =>
					<Couple key={couple._links.self.href} couple={couple} 
						onDelete={this.delRow} 
						onEdit={this.editRow} 
						onSelect={this.onSelect} 
						itemLink={couple._links.self.href} 
						subjectId={this.state.subjectId}
						subject={this.props.subject}					
						upthis={this.props.upthis}/>
		);
		
		
		
		return (
			
			<React.Fragment>
				{couples}	
				<br/>
				<button onClick={this.addCouple}>Add Relationship</button>
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
							response.entity._embedded.couples.length);
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
		prObj("ASYNC inside Couples afterGetPartner response data" , data);
		let fullName = {partnerFirstName: data.firstName, 
			partnerFamilyName: data.familyName,
			partnerMaidenName: data.maidenName};
		this.setState({
			fullName: fullName
		});
		prObj("ASYNC inside Couples afterGetPartner after state " , this.state);
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
// end::couple[]

export default Couples

