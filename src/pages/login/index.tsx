import React, { Component } from 'react';
import { connect } from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {saveUser} from '../../store/models/actions';
import { FormControl, InputLabel, Input, Select, MenuItem, Button } from '@material-ui/core';
import BackendApi from '../../api';
import "./styles.css";

interface IPosition {
    position_id: string;
    position_name: string;
    sallary: number;
}
interface IState {
    name: string;
    userType: string;
    positions?: IPosition[];
    errorName: boolean;
    errorType: boolean;
}

interface IProps extends RouteComponentProps {
    saveUser: typeof saveUser;
}

class Login extends Component<IProps, IState> {
    state: IState = {
        name: '',
        userType: '',
        positions: undefined,
        errorName: false,
        errorType: false
    }

    componentDidMount = async () => {
        const positions = await BackendApi.getStaffPositions();
        console.log("Login -> componentDidMount -> positions", positions)
        this.setState({ positions: positions });
    }

    handleChange = (event: any) => {
        this.setState({errorType: false});
        this.setState({userType: event.target.value });
    }

    changeName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({errorName: false});
        this.setState({name: e.currentTarget.value});
    }

    login = async () => {
        if (!this.state.userType) {
            this.setState({errorType: true});
        } else if (!this.state.name.trim()) {
            this.setState({errorName: true});
        } else {
            const result = await BackendApi.login({position_id: this.state.userType, staff_member_id: this.state.name, error: false});
            if (result.error) {
                console.log("Login -> login -> result.error", result.error)
                // TODO: show error
            } else {
                console.log("Login -> login -> result", result)
                this.props.saveUser(this.state.userType);
                this.props.history.push('/');
            }
        }
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="login-form-wrapper">

                    <h1>KURSSAACHII</h1>
                    <FormControl>
                        <InputLabel htmlFor="my-select">Тип користувача</InputLabel>
                        <Select
                            error={this.state.errorType}
                            id="my-select"
                            value={this.state.userType}
                            onChange={this.handleChange}
                            inputProps={{ 'aria-label': 'Without label' }}
                            >
                        {
                            this.state.positions && this.state.positions.map((p, key) => (
                                <MenuItem key={key} value={p.position_id.toString()}>{p.position_name}</MenuItem>
                            ))
                        }
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="my-input">Ім'я користувача</InputLabel>
                        <Input
                            error={this.state.errorName}
                            id="my-input"
                            aria-describedby="my-helper-text"
                            onChange={this.changeName}
                        />
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

const actions = {
    saveUser
};

export default connect(null, actions)(Login);