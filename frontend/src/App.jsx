import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './Login';
import Form from './Form';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
