import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddHospital from './Components/Home';
import Login from './Components/Login';
import NoPage from './Components/NoPage'; // Uncomment if you want to use this
import Main from './Components/Main';
import Delete from './Components/Delete';
import Edit from './Components/Edit';

import HospitalDetails from './Components/HospitalDetail';

function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/addhospital" element={<AddHospital />} />
        <Route path="/deletehospital" element={<Delete />} />
        <Route path="/edithospital" element={<Edit />} />
        <Route path="/hospital/:id" element={<HospitalDetails />} />
        <Route path="*" element={<NoPage />} /> {/* Uncomment if you have a NoPage component */}
      </Routes>
    </Router>
    </>
  );
}

export default App;
