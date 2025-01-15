import { Route, Routes, useLocation } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";

import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import { Toaster } from "react-hot-toast";

function App() {

  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className='flex max-w-6xl mx-auto'>
      {/* Sidebar */}
      {pathName !== "/login" && pathName !== "/signup" && <Sidebar />}

      {/* Main Content Area */}
      <div className='flex-1 flex'> {/* Make main content area flexible */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/notifications' element={<NotificationPage />} />
          <Route path='/profile/:username' element={<ProfilePage />} />
        </Routes>
        <Toaster />
      </div>

      {/* Right Panel */}
      {pathName !== "/login" && pathName !== "/signup" && <RightPanel />}
    </div>
  );
};

export default App;