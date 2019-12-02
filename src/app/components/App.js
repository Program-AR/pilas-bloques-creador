import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../containers/dashboard/dashboard';
import LevelDashboard from "../containers/levelDashboard/levelDashboard";
import PublishLevelForm from "../containers/publishLevelForm/publishLevelForm";
import PublishedLevelsDashboard from "../containers/publishedLevelsDashboard/publishedLevelsDashboard";
import PublishedLevelDetail from "../containers/publishedLevelsDashboard/PublishedLevelDetail";
import Wizard from '../containers/wizard'
import NavBar from "../containers/navbar/navbar";
import Footer from "./footer/footer";
import "./App.css";

const App = () => (
<Router>
  <NavBar/>
	<Switch>
    <Route exact path='/inicio' component={Dashboard}/>
    <Route exact path='/create' component={Wizard}/>
    <Route exact path='/edit' component={Wizard}/>
    <Route exact path='/myLevels' component={LevelDashboard}/>
    <Route exact path='/publishedLevels' component={PublishedLevelsDashboard}/>
    <Route exact path='/publishedLevels/new' component={PublishLevelForm}/>
    <Route exact path='/publishedLevels/:id' component={PublishedLevelDetail}/>
	</Switch>
  <Footer/>
</Router>
);

export default App
