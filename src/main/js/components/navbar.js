'use strict';

import React, { Component } from 'react'

// Stateless functional component
const NavBar = () => {
	return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
			  <a className="navbar-brand" href="#">Navbar</a>
			 </nav>
	);
}

// tag::app[]
//class NavBar extends React.Component {
//
//	render() {
//		return (
//				<nav className="navbar navbar-expand-lg navbar-light bg-light">
//				  <a className="navbar-brand" href="#">Navbar</a>
//				 </nav>
//		);
//	}
//}
// end::app[]

export default NavBar


