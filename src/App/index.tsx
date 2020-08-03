import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home } from '../pages';

/**
 * Main app
 */
export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">New York City</h1>
        <h2 className="app-subtitle">Bike stations information</h2>
      </header>
      <main className="page-content">
        <Router>
          <Route path="/" exact={true} component={Home} />
        </Router>
      </main>
    </div>
  );
}
