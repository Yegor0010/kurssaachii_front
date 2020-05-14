import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IStore } from '../../store/models/types';

interface IProps {
    userType: string;
}

class Dashboard extends Component<IProps> {
    render() {
        return (
            <div>
                <h1>asd
                 {this.props.userType}
                </h1>
            </div>
        )
    }
}
const mapStateToProps = (state: IStore) => ({
    userType: state.user.userType,
});

export default connect(mapStateToProps)(Dashboard);
