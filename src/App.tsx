import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // 🔥 LOADING SCREEN
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Player
          autoplay
          loop
          src="https://lottie.host/687e1cb6-7f1d-4000-a973-03e103ec2fbf/vLfQuW9zfi.lottie"
          style={{ height: "1000px", width: "1000px" }}
        />
      </div>
    );
  }

  // 🔥 MAIN APP
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;