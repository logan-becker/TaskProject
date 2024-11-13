import './App.css';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/AuthComponents/Login';
import Register from './components/AuthComponents/Register'




// user auth will be passed here I believe

function App() {
  return (
    <div className="App">
      <Login />
      <Register />
      <TaskList />
    </div>
  );
}

export default App;
