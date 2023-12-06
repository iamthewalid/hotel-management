import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Homescreen from './screens/home-screen';
import Navbar from './components/navbar';
import Booking from './screens/booking';
import Register from './screens/register';
import Login from './screens/login';
import ProfilePage from './screens/profile';
import AdminPanel from './screens/admin-panel';
import Landing from './screens/landing';

import 'react-toastify/dist/ReactToastify.css';
import './global.css';

import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(CustomParseFormat);

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Homescreen />} />
          <Route path="/booking/:roomId" element={<Booking />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
