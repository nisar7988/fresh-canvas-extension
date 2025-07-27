import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, Clock } from 'lucide-react';
import SearchAndTools from '@/components/SearchAndTools';
import CalendarComponent from '@/components/CalendarComponent';

const wallpapers = [
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
  'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
  'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151',
  'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
  'https://images.unsplash.com/photo-1500673922987-e212871fec22',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9'
];

export default function WallpaperExtension() {
  const [currentWallpaper, setCurrentWallpaper] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Set random wallpaper on initial load
    setCurrentWallpaper(Math.floor(Math.random() * wallpapers.length));

    return () => clearInterval(timer);
  }, []);

  const changeWallpaper = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentWallpaper((prev) => 
        prev === wallpapers.length - 1 ? 0 : prev + 1
      );
      setIsLoading(false);
    }, 300);
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Wallpaper */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out animate-fade-in"
        style={{
          backgroundImage: `url(${wallpapers[currentWallpaper]}?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=80)`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-overlay" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Search Bar */}
        <div className="p-6">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1 max-w-2xl mx-auto">
              <SearchAndTools isTopBar={true} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={changeWallpaper}
              disabled={isLoading}
              className="backdrop-blur-glass bg-gradient-glass border border-glass-border/20 text-overlay-light hover:bg-gradient-glass shadow-glass"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 px-6 pb-6">
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - AI Tools */}
            <div className="order-2 lg:order-1">
              <SearchAndTools />
            </div>

            {/* Center - Time and Greeting */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <Card className="backdrop-blur-glass bg-gradient-glass border border-glass-border/20 shadow-glass p-8 text-center animate-slide-up w-full">
                <div className="space-y-6">
                  {/* Time */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-overlay-light/80">
                      <Clock className="h-5 w-5" />
                      <span className="text-sm font-medium">Current Time</span>
                    </div>
                    <div className="text-3xl md:text-5xl font-bold text-overlay-light">
                      {formatTime(currentTime)}
                    </div>
                  </div>

                  {/* Greeting */}
                  <div className="pt-4 border-t border-glass-border/20">
                    <div className="text-xl md:text-2xl font-semibold text-overlay-light">
                      {getGreeting()}!
                    </div>
                    <div className="text-sm text-overlay-light/70 mt-2">
                      Fresh Canvas Extension
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Side - Calendar */}
            <div className="order-3">
              <CalendarComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}