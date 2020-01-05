import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Schedule from '../../containers/Schedule';

class Main extends Component {
    render() {
        return (
                <Switch>
                    <Route path="/" component={Schedule} />
                 </Switch>
        );
    }
}

export default Main;