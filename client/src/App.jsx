import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AdminDash from "./pages/AdminDash";
import Home from "./pages/Home";
import ThankYou from "./pages/ThankYou";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />}></Route>
            <Route path="/sign-in" element={<SignIn />}></Route>

            <Route path="/thank-you" element={<ThankYou />}></Route>

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDash />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
