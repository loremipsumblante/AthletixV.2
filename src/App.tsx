import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Athletes from "./pages/Athletes";
import Search from "./pages/Search";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import News from "./pages/News";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import AthleteProfile from "./pages/AthleteProfile";
import UserProfile from "./pages/UserProfile";
import OrganizerProfile from "./pages/OrganizerProfile";
import Settings from "./pages/Settings";
import { AuthProvider } from "@/hooks/AuthProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider> 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/athletes/:id" element={<AthleteProfile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/news" element={<News />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/athletes/:id" element={<AthleteProfile />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="/organizers/:id" element={<OrganizerProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
