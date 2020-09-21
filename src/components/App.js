import React from 'react';
import '../css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import About from './About';
import Concerts from './Concerts';
import Discography from './Discography';
import Media from './Media';
import Press from './Press';
import Gallery from './Gallery';
import Foundation from './Foundation';
import Commemorating from './Commemorating';
import Legal from './Legal';
import NotFound from './NotFound';
import { GlobalStyles } from './GlobalStyles';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/concerts" component={Concerts} />
        <Route exact path="/discography" component={Discography} />
        <Route exact path="/media" component={Media} />
        <Route exact path="/press" component={Press} />
        <Route exact path="/gallery" component={Gallery} />
        <Route exact path="/foundation" component={Foundation} />
        <Route exact path="/commemorating" component={Commemorating} />
        <Route exact path="/legal-notice" component={Legal} />
        <Route exact path="/privacy-policy" component={Legal} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
