import './App.css';
import TaskList from './components/TaskList';


console.log("API URL: " + process.env.REACT_APP_API_URL)

function App() {
  return (
    <div className="App">
      <TaskList />
    </div>
  );
}

export default App;
