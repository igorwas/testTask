import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, } from "react-router-dom";
import Header from './Header';
import UserList from './UserList';
import FormAddUser from './FormAddUser';

function App() {
  return (
    <Fragment>
		<Router>
			<Header/>
        	<Route path="/" exact component={ UserList } />
          	<Route path="/add" exact component={ FormAddUser } />
        </Router>
    </Fragment>
  );
}

export default App;
