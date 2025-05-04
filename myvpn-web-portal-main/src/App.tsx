import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BackgroundWrapper from "./components/BackgroundWrapper";
import Layout from "./Layout";
import Index from "./pages/Index";
import ServersPage from "./pages/ServersPage";
import SettingsPage from "./pages/SettingsPage";
import AccountPage from "./pages/AccountPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import Register from "./pages/Register";
import Activation from "./pages/Activation";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  const animatedPaths = ["/", "/login", "/register", "/activate"];
  const isAnimatedPath = animatedPaths.includes(location.pathname);

  return (
    <>
      {isAnimatedPath ? (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <BackgroundWrapper>
                  <Index />
                </BackgroundWrapper>
              }
            />
            <Route
              path="/login"
              element={
                <BackgroundWrapper>
                  <Login />
                </BackgroundWrapper>
              }
            />
            <Route
              path="/register"
              element={
                <BackgroundWrapper>
                  <Register />
                </BackgroundWrapper>
              }
            />
            <Route
              path="/activate"
              element={
                <BackgroundWrapper>
                  <Activation />
                </BackgroundWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      ) : (
        <Routes location={location}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/servers" element={<ServersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
