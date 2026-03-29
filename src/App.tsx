import { useEffect, useState } from "react";
import Lottie from "lottie-react";

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
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // fetch lottie dari link
    fetch(
      "https://lottie.host/8ad54d76-6f2a-41f3-9b93-62364473640a/aKWsMLqeno.lottie"
    )
      .then((res) => res.json())
      .then((data) => setAnimationData(data));

    // durasi loading (bisa kamu ubah)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // 🔥 LOADING SCREEN
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        {animationData && (
          <div className="w-60 h-60">
            <Lottie animationData={animationData} loop={true} />
          </div>
        )}
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;