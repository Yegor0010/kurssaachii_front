import './App.css';
import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import Routes from './routes';
import theme from './styles/theme';

class App extends Component {

    state = {
        models: [],
        scenarioProjects: []
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Routes models={this.state.models} />
            </ThemeProvider>
        );
    }
}


export default App;
