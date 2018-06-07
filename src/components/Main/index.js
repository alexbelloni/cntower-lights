import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Schedule from '../../containers/Schedule';
import About from '../../containers/About';
import {getHomepageRoot} from '../../routeUtil';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Switch>
                    <Route exact path={getHomepageRoot() + "/"} component={Schedule} />
                    <Route path={getHomepageRoot() + "/about"} component={About} />
                </Switch>
        );
    }
}

export default Main;