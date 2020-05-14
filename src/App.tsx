import './App.css';
import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './routes';
import theme from './styles/theme';
import configureStore from "./store";
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { IStore } from './store/models/types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let store: Store<IStore>;
const setStore = (newStore: Store<IStore>) => (store = newStore);
type State = {
    persistor: any;
    store: Store<IStore>;
  };
  type Props = {};
class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const { store, persistor } = configureStore();
        setStore(store);
        this.state = {
            persistor,
            store
        };
    }
    render() {
        return (
            <PersistGate loading={null} persistor={this.state.persistor}>
                <Provider store={this.state.store}>
                    <ThemeProvider theme={theme}>
                        <Routes />
                    </ThemeProvider>
                </Provider>
            </PersistGate>
        );
    }
}


export default App;
