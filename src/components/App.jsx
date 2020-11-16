import {lazy} from 'react';
import Awaiting from './awaiting';
import '../styles/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const Results = lazy(()=>import('./Results'));
const Search = lazy(()=>import('./SearchSection'));

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact  path = "/" component ={Awaiting(Search)} />
      <Route exact  path = "/images" component ={Awaiting(Results)} />
    </Switch>
</Router> 
  );
}

export default App;
