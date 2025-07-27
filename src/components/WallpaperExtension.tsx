import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, Clock, Calendar } from 'lucide-react';

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
        {/* Top Bar */}
        <div className="p-6 flex justify-end">
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

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <Card className="backdrop-blur-glass bg-gradient-glass border border-glass-border/20 shadow-glass p-8 text-center animate-slide-up">
            <div className="space-y-6">
              {/* Time */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-overlay-light/80">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm font-medium">Current Time</span>
                </div>
                <div className="text-4xl md:text-6xl font-bold text-overlay-light">
                  {formatTime(currentTime)}
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-overlay-light/80">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">Today</span>
                </div>
                <div className="text-lg md:text-xl text-overlay-light/90">
                  {formatDate(currentTime)}
                </div>
              </div>

              {/* Greeting */}
              <div className="pt-4 border-t border-glass-border/20">
                <div className="text-xl md:text-2xl font-semibold text-overlay-light">
                  {getGreeting()}!
                </div>
                <div className="text-sm text-overlay-light/70 mt-2">
                  Fresh Canvas Extension • Wallpaper {currentWallpaper + 1} of {wallpapers.length}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Info */}
        <div className="p-6 text-center">
          <div className="backdrop-blur-glass bg-gradient-glass border border-glass-border/20 rounded-lg px-4 py-2 inline-block shadow-glass">
            <span className="text-sm text-overlay-light/80">
              Click the refresh button to change wallpaper
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}