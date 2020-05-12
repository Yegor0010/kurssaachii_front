import { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { StandardProps } from '@material-ui/core';

type PathParamsType = {

}

type BackClassKey =
    | 'link'
    | 'text'
    ;

interface ScrollToTopProps extends StandardProps<RouteComponentProps<PathParamsType>, BackClassKey> {}

class ScrollToTop extends Component<ScrollToTopProps> {
    componentDidUpdate(prevProps: ScrollToTopProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);