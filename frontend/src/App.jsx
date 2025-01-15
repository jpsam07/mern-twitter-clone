import { Route, Routes, useLocation } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";

import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {

  const { data:authUser, isLoading, isError, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }      
    }
  });

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <LoadingSpinner size='lg' />
      </div>
    )
  }

  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className='flex max-w-6xl mx-auto'>
      {/* Sidebar */}
      {pathName !== "/login" && pathName !== "/signup" && <Sidebar />}

      {/* Main Content Area */}
      <div className='flex-1 flex'> {/* Make main content area flexible */}
        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" /> } />
          <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
          <Route path='/profile/:username' element={authUser ?<ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
        <Toaster />
      </div>

      {/* Right Panel */}
      {pathName !== "/login" && pathName !== "/signup" && <RightPanel />}
    </div>
  );
};

export default App;