import React,{ useState, useEffect } from 'react';
import { makeStyles, Paper, Button, Table, TableHead, TableRow, TableCell, TableBody  } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    paper: {
      marginTop: theme.spacing(3),
      width: '100%',
      overflowX: 'auto',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
  }));
  
function UserList(){
    const [users, setUsers] = useState([]);
    const classes = useStyles();

    async function fetchUsers(){
        const res = await fetch("https://node-user-service.herokuapp.com/users");
        res
          .json()
          .then(res => {console.log(res); setUsers(res.reverse())})
          .catch(err => console.log(err));
    }
    
    useEffect(() => {
        fetchUsers();
    },[]);

    // parameter id or keyword "all" for deleting all users
    async function deleteUser(id) {
        const url = id == "all" ? 
            "https://node-user-service.herokuapp.com/users" : 
            `https://node-user-service.herokuapp.com/users/${id}`
        const res = await fetch(
            url,
            { 
                method: 'DELETE'
            });
        res
            .json()
            .then(res => {
                if(res.deletedCount==1){
                    const newUsers = users.filter( user => user._id != id )
                    setUsers(newUsers);
                } else if(res.deletedCount>1){
                    setUsers([]);
                } else {
                    alert("Something goes wrong")
                }
            })
          .catch(err => console.log(err));
    }
    
    return (
        <div className={classes.root}>
            <h1>Users</h1>
            <Paper className={classes.paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Position</TableCell>
                            <TableCell align="right">Birthdate</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Works remotely</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        users.map( (user) => {
                            return ( 
                                <TableRow key={user._id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell align="right">
                                        {user.position}
                                    </TableCell>
                                    <TableCell align="right">
                                        {user.birthdate}
                                    </TableCell>
                                    <TableCell align="right">
                                        {user.description}
                                    </TableCell>
                                    <TableCell align="right">
                                        {user.worksRemotely==1 ? "Yes" : "No"}
                                    </TableCell>
                                    <TableCell align="right"> 
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            onClick={()=>deleteUser(user._id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                    {
                        users.length >= 1 ? 
                            <TableRow>
                                <TableCell colSpan={6} align="right">
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        onClick={()=>deleteUser("all")}>
                                        Delete all
                                    </Button>
                                </TableCell>
                            </TableRow>
                            : 
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    There aren't users
                                </TableCell>
                            </TableRow>
                    }
                    </TableBody>
                </Table>
                
            </Paper>
        </div>
    );
    
}

export default UserList;
