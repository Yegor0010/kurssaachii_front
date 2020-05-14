import './App.css';
import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import Routes from './routes';
import theme from './styles/theme';

class App extends Component {

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Routes />
            </ThemeProvider>
        );
    }
}


export default App;
