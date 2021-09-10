import './App.css';
import { Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import CreateExcercise from './pages/CreateExcercise';
import Navbar from './components/Navbar';
import EditExcercise from './pages/EditExcercise';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        <Route path="/create-excercise" exact>
          <CreateExcercise />
        </Route>
        <Route path="/excercises/:id/edit" exact>
          <EditExcercise />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
