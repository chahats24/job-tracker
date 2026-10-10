import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Insights from './pages/Insights';
import InterviewPrep from './pages/InterviewPrep';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path='/applications' element={<ProtectedRoute><Applications/></ProtectedRoute>}/>
      <Route path='/insights' element={<ProtectedRoute><Insights/></ProtectedRoute>}/>
      <Route path='/interview-prep' element={<ProtectedRoute><InterviewPrep/></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
  );
}
export default App;