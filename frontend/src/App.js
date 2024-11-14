import './App.css';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/AuthComponents/Login';
import Register from './components/AuthComponents/Register'
import store from './store'
import { Provider } from 'react-redux'
import Profile from './components/User/profile';


// user auth will be passed here I believe

function App() {
  return (

    <Provider store={store}>
      <div className="App">
        {/* <Profile />
        <Login />
        <Register /> */}
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;
