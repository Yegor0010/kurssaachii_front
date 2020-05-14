import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IStore } from '../../store/models/types';
import House from './components/house';
import Frontdesk from './components/frontdesk';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {
    userType: string;
}

class Dashboard extends Component<IProps> {
    render() {
        console.log("Dashboard -> render -> this.props.userType", this.props.userType)
        switch (this.props.userType) {
            case '1':
                return (<Frontdesk history={this.props.history}/>);
            case '2':
                return (<House history={this.props.history} />);
            default:
                return (<h1>
                    invalid user type: {this.props.userType}
                </h1>);
        }
    }
}
const mapStateToProps = (state: IStore) => ({
    userType: state.user.userType,
});

export default connect(mapStateToProps)(Dashboard);
