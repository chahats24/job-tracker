import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Insights from './pages/Insights';
import InterviewPrep from './pages/InterviewPrep';
function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/applications' element={<Applications/>}/>
      <Route path='/insights' element={<Insights/>}/>
      <Route path='/interview-prep' element={<InterviewPrep/>}/>
    </Routes>
    </BrowserRouter>
  );
}
export default App;