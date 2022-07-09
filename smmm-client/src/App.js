

import { Container } from '@mui/system';
import './App.css';
import {Route,Redirect} from "wouter";

import Dashboard from './pages/Dashboard/dashboard';

function App() {
  return (
    <Container>
        <Dashboard/>
      {/*  <Route component={Dashboard } path="/dashboard"/>
       <Route component={Dashboard } path="/dashboard"/>

       <Redirect from="/" to="/dashboard" /> */}
    </Container>
  );
}

export default App;
