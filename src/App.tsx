import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingChat from "./components/FloatingChat";
import CustomCursor from "./components/CustomCursor";
import { LoadingScreen } from "./components/LoadingScreen";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Tickets from "./pages/Tickets";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Credits from "./pages/Credits";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CustomCursor />
        {isLoading && <LoadingScreen onLoadComplete={() => setIsLoading(false)} />}
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/credits" element={<Credits />} />
                <Route path="/admin" element={<Admin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <FloatingChat />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
