import React, { Component } from 'react'
import {Bootstrap, Grid, Form, Row, Col} from 'react-bootstrap';
import { prObj, goSubject } from '../tools';


const ReactDOM = require('react-dom');


// details={couples2} edit='false' subject={this.props.subject}  fullName={fullName}
class CoupleAudit extends Component {

	constructor(props) {
	    super(props);
	    prObj("inside CoupleAudit constructor props " , props);
	    this.state = {
	      firstname: '',
		  lastname: null,
		  details: props.details
		};
		prObj("inside CoupleAudit constructor details " , this.state.details);
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
		prObj("inside CoupleAudit mySubmitHandler this " , this);
		
		// fetch( this.props.link , {
		fetch( this.props.edit==='true' ? this.props.itemLink : 'http://localhost:8080/couples' , {
			method: this.props.edit==='true' ? 'PUT' : 'POST', 
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this.state.details),
			})
			.then(response => response.json())
			.then(data => {
				console.log('ASYNC CoupleAudit mySubmitHandler Success:', this.state.details);
				console.log('ASYNC CoupleAudit mySubmitHandler Success2:', data);
			})
			.catch((error) => {
				console.error('Error:', error);
		});    	
  
		goSubject(this.props.subject);
		
	  }
	
	myChangeHandler = (event) => {
	    let nam = event.target.name;
		let val = event.target.value;
		this.state.details[nam] = val;
	    //this.setState({details[nam]: val});
	    console.log("inside CoupleAudit myChangeHandler, name  " + nam + ", val " + val);
	  }
	
	  setPartner = (itemLink) => {
		console.log("inside CoupleAudit setPartner ", itemLink );
			
	}
	
	render() {
		let toSearch = this.props.edit==='true' ?
		<button onClick={ () => this.props.onDelete(this.props.itemLink)}>Search Person</button> :
		<br/>;
		console.log("inside CoupleAudit render " + this.props);
		return (
			<div>
				<h1>{this.props.edit==='true' ? 'EDIT' : 'NEW'} RELATIONSHIP WITH  {this.props.subject.firstName} {this.props.subject.familyName}</h1>
				<Form onSubmit={this.mySubmitHandler}>
				  <Row>
				    <Col>
				    	<label> First Name:  </label>
				    </Col>
				    <Col>
					  <input type="text" name="firstName" onChange={this.myChangeHandler} 
					  	value={this.props.fullName.partnerFirstName}/>
				    </Col>
				  </Row>
				  <Row>
				    <Col>
				    	<label> Last Name:  </label>
				    </Col>
				    <Col>
					  <input type="text" name="familyName" onChange={this.myChangeHandler} 
					  	value={this.props.fullName.partnerFamilyName}/>
				    </Col>
				  </Row>
				  <Row>
				    <Col>
				    	<label> Marriage Date:  </label>
				    </Col>
				    <Col>
				      <input type="date" name="marriage" onChange={this.myChangeHandler} value={this.props.details.marriage}/>
				    </Col>
					<Col>
				    	<label> Divorce Date:  </label>
				    </Col>
				    <Col>
				      <input type="date" name="divorce" onChange={this.myChangeHandler} value={this.props.details.divorce}/>
				    </Col>
				  </Row>
				  <br/>
			      <br/>
			      <input type='submit' />
				  {toSearch} 
				  <button onClick={ () => goSubject(this.props.subject)}>Cancel</button> 
				</Form>
				
			</div>
		    );
	}
	
	
}




export default CoupleAudit