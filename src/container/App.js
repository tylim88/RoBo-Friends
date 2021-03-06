//this type of file knowns as smart componenet container

import React, { Component } from 'react';
import './App.css';
import { setSearchField, requestRobots } from '../actions';
import { connect } from 'react-redux';
import MainPage from '../component/MainPage';
import { apicall } from '../api/api';

const mapStateToProps = state => {
	//the argument can have any name
	//tell you what state to listen to
	//can name this whatever you want but this is standard name
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	};
};

const url = 'https://jsonplaceholder.typicode.com/users';

const mapDispatchToProps = dispatch => {
	//tell you what prop that you listen to that need to get dispateched
	return {
		onSearchChange: event => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots(apicall, url))
	}; //dispatch action to reducer
};

//State feed data to props
class App extends Component {
	//component with state ara called 'smart component'
	// constructor() {
	// 	//this is a mounting function, it automatically launch when page load
	// 	super(); //need super or else cannot use 'this'
	// 	this.state = {
	// 		robots: []
	// 		//searchField: '' //we dont need this anymore as it is defined in redux state above
	// 	}; //use state instaed of variable
	// } //this run first

	// componentDidMount() {
	// 	//this is a mounting function, it automatically launch when page load
	// 	//overriding the function，this method is inherit from Compnent so it should not be an arrow function
	// 	// fetch('https://jsonplaceholder.typicode.com/users') //make http request to fetch repsonse
	// 	// 	.then(response => response.json()) //convert to json format
	// 	// 	.then(users => this.setState({ robots: users }));
	// 	this.props.onRequestRobots();
	// } //this run 3rd, after render

	// onSearchChange = event => {
	// 	//important:searchbox input object call this function, so 'this' is input; but if this fucntion is arrow function, 'this' belong to App object
	// 	this.setState({ searchField: event.target.value }); //method to import { setSearchField } from './../actions';
	// };//this method is deleted because the method is replaced by redux method

	render() {
		//overiding the function
		//const { robots, searchfield } = this.state;
		//const { robots } = this.state;
		// const { searchField, onSearchChange, robots, isPending } = this.props; //here is the magic, how they relate?
		// //console.log(robots);
		// const filteredRobots = robots.filter(robot => {
		// 	return robot.name.toLowerCase().includes(searchField.toLowerCase());
		// });
		// //return !robots.length ? ( //displaying loading if fetch request responding slow
		// //remember to return only one statement/element/container
		// return (
		// 	<div className="tc">
		// 		<Header />
		// 		<SearchBox searchChange={onSearchChange} />
		// 		{/*need 'this' because it is a method*/}
		// 		<Scroll>
		// 			{isPending ? (
		// 				<h1 className="tc">Loading</h1>
		// 			) : (
		// 				<ErrorBoundry>
		// 					{/*ErrorBoundary is childeren properties of custom component  Scroll*/}
		// 					<CardList robots={filteredRobots} />
		// 					{/*cardlist is children properties of custom componenet error boundary*/}
		// 				</ErrorBoundry>
		// 			)}
		// 		</Scroll>
		// 	</div>
		// );
		return <MainPage {...this.props} />;
	} //render() run 2nd, and 4th(because state change happen in componentDidMount)
}

export default connect(
	//probaly this is where they relate, this two arguments are added to App
	mapStateToProps,
	mapDispatchToProps
)(App); //connect is higher order component, basically currying
//1. App subscribe to the state change in redux store
//2. state that App interested in redux store is mapStateToprops
//3. state is dispatched via mapDispatchToProps
