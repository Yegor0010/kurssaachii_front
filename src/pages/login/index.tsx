import React, { Component } from 'react';
import { FormControl, InputLabel, Input, Select, MenuItem, Button } from '@material-ui/core';
import "./styles.css";

export default class Login extends Component {
    state = {
        userType: ''
    }

    handleChange = (event: any) => {
        console.log("Login -> handleChange -> event", event.target.value)
        this.setState({userType: event.target.value });
    }

    login = () => {

    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="login-form-wrapper">

                    <h1>KURSSAACHII</h1>
                    <FormControl>
                        <InputLabel htmlFor="my-select">Тип користувача</InputLabel>
                        <Select
                            id="my-select"
                            value={this.state.userType}
                            onChange={this.handleChange}
                            inputProps={{ 'aria-label': 'Without label' }}
                            >
                            <MenuItem value={'manager'}>Менеджер</MenuItem>
                            <MenuItem value={'sManager'}>сервіс менеджер</MenuItem>
                            <MenuItem value={'holder'}>покоївка</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="my-input">Ім'я користувача</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="my-input">Пароль</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" type="password" />
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={this.login}>
                        увійти
                    </Button>
                </div>
            </div>
        )
    }
}
