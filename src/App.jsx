import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Companies from "./pages/Companies";
import CompanyDetails from "./pages/CompanyDetails";
import Saved from "./pages/Saved";
import PostJob from "./pages/PostJob";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { ToastProvider } from "./components/ui/Toast";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CreateProfile from "./pages/profile/CreateProfile";
import ProfileSettings from "./pages/profile/ProfileSettings";
import PublicProfile from "./pages/profile/PublicProfile";

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <div className="min-h-screen bg-paper-100 text-ink-900 dark:bg-slate-900 dark:text-slate-100">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:id" element={<CompanyDetails />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/u/:username" element={<PublicProfile />} />

              {/* Protected: must be signed in */}
              <Route element={<ProtectedRoute />}> 
                <Route path="/create-profile" element={<CreateProfile />} />
                <Route path="/settings/profile" element={<ProfileSettings />} />
              </Route>

              {/* Employer only + profile required */}
              <Route element={<ProtectedRoute roles={["employer", "admin"]} requireProfile />}> 
                <Route path="/post" element={<PostJob />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </Router>
  );
}
