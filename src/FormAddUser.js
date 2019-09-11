import React,{ useState, Fragment } from 'react';
import { Container, FormControl, FormControlLabel, InputLabel, Button, TextField, Select, MenuItem, Checkbox,  } from '@material-ui/core';

function UserList(){
    const [user, setUser] = useState({
        name: "",
        position: "",
        birthdate: Date,
        description: "",
        worksRemotely: false
    });

    async function addUser(e) {
        e.preventDefault();
        console.log(JSON.stringify(user));
        const res = await fetch(
            "https://node-user-service.herokuapp.com/users",
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(user)
            });
        res
            .json()
            .then(res => { alert("User is added!")})
            .catch(err => console.log(err));
    }
    
    const handleChange = name => event => {
        setUser({ ...user, [name]: event.target.value });
        console.log(user)
    };

    const handleChangeCheckbox = name => event => {
        setUser({ ...user, [name]: event.target.checked });
    };

    return (
        <Fragment>
            <h1 align="center">Add user</h1>
            
            <Container maxWidth="sm">
                <form onSubmit={addUser}>
                    <TextField
                        required
                        label="Name"
                        value={user.name}
                        onChange={handleChange("name")}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl 
                        fullWidth>
                        <InputLabel htmlFor="age-helper">Position*</InputLabel>
                        <Select
                            id="position"
                            required
                            label="Position"
                            value={user.position}
                            onChange={handleChange("position")}
                            margin="normal"
                            fullWidth
                        >
                            <MenuItem value={"Manager"}>Manager</MenuItem>
                            <MenuItem value={"Developer"}>Developer</MenuItem>
                            <MenuItem value={"QA"}>QA</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        id="date"
                        required
                        label="Birthdate"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        onChange={handleChange("birthdate")}
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        value={user.description}
                        onChange={handleChange("description")}
                        margin="normal"
                        fullWidth
                    />
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                value={user.worksRemotely}
                                onChange={handleChangeCheckbox("worksRemotely")}
                            />} 
                        label="Work remotely" />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        //onClick={addUser}
                    >
                        Add user
                    </Button>
                </form>
            </Container>       
        </Fragment>
    ); 
}

export default UserList;
