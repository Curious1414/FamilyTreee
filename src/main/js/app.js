'use strict';

import { prObj } from './tools';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';
import Counters from './components/counters';
import NavBar from './components/navbar';

import Subject from './components/subject';



// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
//require("babel-core/register");
require('babel-polyfill');

let personId;
// end::vars[]

// tag::app[]
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {persons: []};
		console.log("inside App constructor "+ this.props);
		//setTimeout(function () {console.log('end TO')}, 500, 'foo');
		//console.log("inside App constructor After TO ");
		//getOldest();
		console.log("inside App constructor EXIT ");
		
	}

	

	componentDidMount() {
		console.log("inside App componentDidMount");
		
		
/*
		client({method: 'GET', path: '/persons/search/findAllSorted'}).done(response => {
			prObj(" App componentDidMount response ", response); 
			console.log("inside App componentDidMount response " + response.entity._embedded.persons.length);
			this.state.persons = response.entity._embedded.persons;
		});
		*/
	}


	render() {
		console.log("inside App render");
		
		
		return (			
				<Home persons={this.state.persons}/>			
		)
	}
}
// end::app[]




function getOldest(upthis){
	console.log("inside getOldest");
	//let towait = true;
	const x = fetch( '/persons/search/findAllSorted' , {
		method: 'GET', 
		async: false,
		headers: {
			'Content-Type': 'application/json',
		}
		})
		.then(response => response.json())
		.then(data => {
			prObj("ASYNC getOldest GET by fetch data ", data); 
			//prObj("refresh GET by fetch data._embedded.persons ", data._embedded.persons); 
			//this.setState({persons: data._embedded.persons});
			console.log("ASYNC getOldest fetch persons length ", data._embedded.persons.length);
			let result = data._embedded.persons;
			prObj("ASYNC getOldest result ", result);
			upthis.setState( {person: result.length === 0 ? {} : result[0]});
			console.log("ASYNC getOldest after setState ");
			return data._embedded.persons;
			//towait = false;
			//prObj("refresh GET by fetch this.state.persons ", homethis.state.persons); 
		})
		.catch((error) => {
			console.error('Error: ASYNC', error);
			return null;
		
	}).finally(function(){
		//towait = false;
	});
	console.log("inside getOldest exit");
	/*
	while (towait){
		setTimeout(function(){ console.log("Hello"); },1000);
		console.log("towait ", towait);
	};
	console.log("inside getOldest after");
	*/
	return upthis.state.persons;
}


// tag::app[]
class Home extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {person: {},
					persons: []
				};
		console.log("inside Home constructor "+ this.props);
	}
	
	componentDidMount() {
		console.log("inside Home componentDidMount");
		/*
		client({method: 'GET', path: '/persons'}).done(response => {
			console.log("inside Home componentDidMount response " + response.entity._embedded.persons.length);
			this.setState({persons: response.entity._embedded.persons});
		});
*/
		let result = getOldest(this);
		prObj("Home componentDidMount result ", result);
		console.log("Home componentDidMount before setState result.length ", result.length);
		this.setState( {person: result.length === 0 ? {} : result[0]});
		console.log("Home componentDidMount after setState ");
		
		console.log("inside Home componentDidMount after getOldest ");
		
	}
	
	/*
	componentDidUpdate() {
		console.log("inside Home componentDidUpdate");
		
		client({method: 'GET', path: '/persons'}).done(response => {
			console.log(`inside Home componentDidUpdate response ${response.entity._embedded.persons.length}`);
			this.setState({persons: response.entity._embedded.persons});
		});
		
	}
	*/
	
	render() {
		prObj("inside Home render props ", this.props);
		/*
		let result = {persons: []};
		client({method: 'GET', path: '/persons'}).done(response => {
			console.log("inside Home render response " + response.entity._embedded.persons.length);
			result = response.entity._embedded.persons;
		});
		*/
		return (
			
			<React.Fragment>
				<NavBar />
				
				<Subject subject={this.state.person}/>					
											
			</React.Fragment>
					
		)
	}
}
// end::app[]


function refresh(homethis) {
	//history = useHistory();
	console.log("inside refresh ");
	
	fetch( 'http://localhost:8080/persons' , {
		method: 'GET', 
		headers: {
			'Content-Type': 'application/json',
		}
		})
		.then(response => response.json())
		.then(data => {
			prObj("refresh GET by fetch data ", data); 
			//prObj("refresh GET by fetch data._embedded.persons ", data._embedded.persons); 
			//this.setState({persons: data._embedded.persons});
			console.log("refresh persons length ", data._embedded.persons.length);
			homethis.setState({persons: data._embedded.persons});
			
			//prObj("refresh GET by fetch this.state.persons ", homethis.state.persons); 
		})
		.catch((error) => {
			console.error('Error:', error);
	});

	//history.push("/");
	//history.goBack();
	
	ReactDOM.render(
		<Home />,
		document.getElementById('react'));

	//return < App />;
	//return <Redirect to="/" />;
		/*
	

	client({method: 'GET', path: '/persons'}).done(response => {
		prObj("refresh GET response.raw.response ", JSON.stringify(response.raw.response)); 
		prObj("refresh GET response?.persons ",JSON.stringify(response.raw.response).persons); 
		this.setState({persons: response?.persons});
	});
	*/
}


// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]

