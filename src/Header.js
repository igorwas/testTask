import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

function App() {
  return (
	<Fragment>
		<Button>
			<Link to="/">Users</Link>
		</Button>
		<Button>
			<Link to="/add">Add user </Link>
		</Button>
	</Fragment>
  );
}

export default App;
