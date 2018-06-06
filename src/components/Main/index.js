import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Schedule from '../../containers/Schedule';
import About from '../../containers//About';

const Main = props => (
<Switch>
    <Route exact path="/" component={Schedule} />
    <Route path="/about" component={About} />
</Switch>
);

export default Main;