import './App.css';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/AuthComponents/Login'



// user auth will be passed here I believe

function App() {
  return (
    <div className="App">
      <TaskList />
    </div>
  );
}

export default App;
