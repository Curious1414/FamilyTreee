import Subject from './components/subject';


const ReactDOM = require('react-dom');
const React = require('react');

export function prObj(title, obji) {
	console.log('prObj Printing contents for: ', title);
	let i=0;
    for (let key in obji){
        console.log(i++, '. ', key, obji[key]);
    }
    console.log('prObj END');
}

export function isEqual(obj1, obj2) {
	console.log('isEqual objects ', obj1, '-', obj2);
	
	const obj1Keys = Object.keys(obj1);
	const obj2Keys = Object.keys(obj2);
	if (obj1Keys.length !== obj2Keys.length)
		return false;
	for (let objkey of obj1Keys){
		if (obj1[objkey] !== obj2[objkey])
		return false;
	}
	console.log('isEqual returns true ');
	return true;
}

export function isEqualObj(obj1) {
	if (obj1 === undefined)
	 	return false;
	let obj2 = {};
	return isEqual(obj1, obj2);
}

export function sendHost(edit, urlEdit, urlUpdate, toSend) {	
	console.log('sendHost params ', edit, urlEdit, urlUpdate, toSend);
	let url = edit==='true' ? urlEdit : urlUpdate;
	fetch( url , {
		method: edit==='true' ? 'PUT' : 'POST', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(toSend),
		})
		.then(response => response.json())
		.then(data => {
			console.log('ASYNC sendHost Success: url, toSend', url, toSend);
			console.log('ASYNC sendHost Success2: response', data);
			return data;
		})
		.catch((error) => {
			console.error('ASYNC Error:', error);
	});    	

	return null;
	
}

export const relationships = {
    CHILD: 'child',
    COUPLE: 'couple',
    PARENT: 'parent'
}

export function getRelation(relationship){
	console.log('getRelation relationship ', relationship);
	switch (relationship){
		case relationships.CHILD: {
			return 'Child';
		}
		case relationships.COUPLE: {
			return 'Couple';
		}
		case relationships.PARENT: {
			return 'Parent';
		}
		default: {
			console.error(`Sorry, we are out of ${relationship}.`);
			return 'None';
		}
	}
}

export function goSubject(subject){
	console.log('goSubject subject ', subject);
	ReactDOM.render(
		<Subject subject={subject}/>,
		document.getElementById('react')
	);
}

export function findIndex(arr, key, table){
	for (let i = 0; i < arr.length ; i++){
		if (arr[i]._links[table].href === key){
			console.log('findIndex found key ', key, i);
			return i;
		}
	}
	console.error('findIndex NOT found key ', key, arr);
	return undefined;
}

export function addRelation(subject, person, relationship, couple, coupleLink){
	
	let idSubject = getId(subject);
	let idPerson = getId(person);
	console.log("inside addRelation params", subject, person, relationship, couple, coupleLink, idSubject, idPerson );
	switch (relationship){
		case relationships.CHILD: {
			console.log("inside addRelation   relationships.CHILD");
			//couple.children === null ? 	couple.children =[idPerson]	: couple.children.push(idPerson);
			let child = {coupleId: getId(coupleLink), personId: idPerson};
			sendHost('false', '', 'http://localhost:8080/offsprings', child);
			return 'Child';
		}
		case relationships.COUPLE: {
			console.log("inside addRelation COUPLE" );
			let couple = {
				parent1: idSubject,
				parent2: idPerson
			};
			//let coupleID = 
			sendHost('false', '', 'http://localhost:8080/couples', couple);
			/*
			console.log("addRelation post couple", coupleID);
			postHost(subject, function addCouple(resultPerson){
				console.log("addRelation post person", resultPerson);
				resultPerson.couples.push(coupleID);
				sendHost('true', subject, '', resultPerson);
			});
			postHost(person, function addCouple(resultPerson){
				console.log("addRelation post person", resultPerson);
				resultPerson.couples.push(coupleID);
				sendHost('true', subject, '', resultPerson);
			});
			return coupleID;
			*/
			return 'Couple';
		}
		case relationships.PARENT: {
			console.log("inside addRelation PARENT" );
			return 'Parent';
		}
		default:
			console.error("inside addRelation default" );
	}
}

export function getId(link){
	console.log("getId link", link);
	let idStrs = link.split('/');
	return idStrs[idStrs.length-1];
}

export function postHost(path, toDo, from){
	console.log(from +" postHost path ", path);
	fetch( path , {
		method: 'GET', 
		headers: {
			'Content-Type': 'application/json',
		}
		})
		.then(response => response.json())
		.then(data => {
			prObj('ASYNC '+ from + " postHost GET by fetch data ", data); 
			
			//console.log('ASYNC '+ from + " postHost data._embedded", data);
			toDo(data) ;
		})
		.catch((error) => {
			console.error('ASYNC '+ from + ' postHost Error:', error);
	});
}

export function postPostHost(edit, urlEdit, urlUpdate, toDo, toSend, from){
	
	let url = edit==='true' ? urlEdit : urlUpdate;
	console.log(from +" postPosttHost path ", url, ', toSend: ', toSend);
	fetch( url , {
		method: edit==='true' ? 'PUT' : 'POST', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(toSend)
		})
		.then(response => response.json())
		.then(data => {
			prObj('ASYNC '+ from + " postPosttHost POST by fetch data ", data); 
			if (toDo === null){
				console.log('ASYNC '+ from + " postHost data._embedded", data);
				return data;
			} else {			
				toDo(data) ;
			}
		})
		.catch((error) => {
			console.error('ASYNC '+ from + ' postPosttHost Error:', error);
	});
}

