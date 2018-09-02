import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Schedule from '../../containers/Schedule';
import {getHomepageRoot} from '../../routeUtil';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Switch>
                    <Route exact path={getHomepageRoot() + "/"} component={Schedule} />
                 </Switch>
        );
    }
}

export default Main;