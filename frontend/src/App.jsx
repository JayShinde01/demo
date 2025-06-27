import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './RegisterForm';
// import Login from './Login'; // You can create this later

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
