import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, Image, Link2, Upload } from 'lucide-react';
import SearchAndTools from '@/components/SearchAndTools';
import RightSidebar from '@/components/RightSidebar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import CalendarComponent from './CalendarComponent';

const defaultWallpapers = [
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
  const [userWallpapers, setUserWallpapers] = useState<string[]>([]);
  const [currentWallpaper, setCurrentWallpaper] = useState(0);
  const [customWallpaper, setCustomWallpaper] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [wallpaperLink, setWallpaperLink] = useState('');
  const [showWallpaperControls, setShowWallpaperControls] = useState(false);
  const [isStatic, setIsStatic] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const allWallpapers = [...defaultWallpapers, ...userWallpapers];

  const getWallpaperToShow = () => {
    if (isStatic && customWallpaper) {
      return customWallpaper;
    }
    // If customWallpaper is set but not static, include it in rotation
    if (!isStatic && customWallpaper && !userWallpapers.includes(customWallpaper)) {
      return customWallpaper;
    }
    return `${allWallpapers[currentWallpaper]}?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=80`;
  };

  // Load persisted wallpaper and static mode on mount
  useEffect(() => {
    const savedWallpaper = localStorage.getItem('customWallpaper');
    const savedIsStatic = localStorage.getItem('isStatic');
    if (savedWallpaper) {
      setCustomWallpaper(savedWallpaper);
    }
    if (savedIsStatic) {
      setIsStatic(savedIsStatic === 'true');
    }
    setCurrentWallpaper(Math.floor(Math.random() * defaultWallpapers.length));
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Persist static mode changes
  useEffect(() => {
    localStorage.setItem('isStatic', isStatic.toString());
  }, [isStatic]);

  // Persist custom wallpaper changes
  useEffect(() => {
    if (customWallpaper) {
      localStorage.setItem('customWallpaper', customWallpaper);
    } else {
      localStorage.removeItem('customWallpaper');
    }
  }, [customWallpaper]);

  useEffect(() => {
    localStorage.setItem('userWallpapers', JSON.stringify(userWallpapers));
  }, [userWallpapers]);

  useEffect(() => {
    const savedUserWallpapers = localStorage.getItem('userWallpapers');
    if (savedUserWallpapers) {
      setUserWallpapers(JSON.parse(savedUserWallpapers));
    }
  }, []);

  const changeWallpaper = () => {
    if (isStatic) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setCustomWallpaper(null);
      setCurrentWallpaper((prev) =>
        prev === allWallpapers.length - 1 ? 0 : prev + 1
      );
      setIsLoading(false);
    }, 300);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = event.target?.result as string;
        setCustomWallpaper(img);
        setUserWallpapers((prev) => [...prev, img]);
        setShowWallpaperControls(false);
        localStorage.setItem('customWallpaper', img); // persist immediately
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wallpaperLink) {
      setCustomWallpaper(wallpaperLink);
      setUserWallpapers((prev) => [...prev, wallpaperLink]);
      setWallpaperLink('');
      setShowWallpaperControls(false);
      localStorage.setItem('customWallpaper', wallpaperLink); // persist immediately
    }
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

  // Close controls when clicking outside
  useEffect(() => {
    if (!showWallpaperControls) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        controlsRef.current &&
        !controlsRef.current.contains(event.target as Node)
      ) {
        setShowWallpaperControls(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showWallpaperControls]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out animate-fade-in"
        style={{
          backgroundImage: `url(${getWallpaperToShow()})`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          transform: 'scale(1.05)'
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />

      {/* Wallpaper Controls */}
      <div className="absolute top-4 right-4 z-20">
        <div className="flex flex-col items-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowWallpaperControls(!showWallpaperControls)}
            className="backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white shadow-md transition-all hover:scale-105"
            aria-label="Wallpaper controls"
          >
            <Image className="h-4 w-4" />
          </Button>

          {showWallpaperControls && (
            <Card
              ref={controlsRef}
              className="backdrop-blur-sm bg-white/10 p-4 rounded-lg shadow-lg border border-white/20 w-72 animate-in fade-in zoom-in-95"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="static-mode" className="text-white/90 text-sm">
                    Static Wallpaper
                  </Label>
                  <Switch 
                    id="static-mode"
                    checked={isStatic} 
                    onCheckedChange={setIsStatic}
                    className="data-[state=checked]:bg-blue-500"
                  />
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={changeWallpaper}
                  disabled={isLoading || isStatic}
                  className="w-full justify-start gap-2 text-white hover:bg-white/20"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Change Wallpaper</span>
                </Button>

                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full justify-start gap-2 text-white hover:bg-white/20"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload Image</span>
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>

                <form onSubmit={handleLinkSubmit} className="flex flex-col gap-3">
                  <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                    <input
                      type="url"
                      placeholder="Paste image URL"
                      value={wallpaperLink}
                      onChange={e => setWallpaperLink(e.target.value)}
                      className="pl-9 pr-3 py-2 w-full rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    variant="secondary"
                    className="w-full bg-white/20 hover:bg-white/30 text-white"
                    disabled={!wallpaperLink}
                  >
                    Set Wallpaper
                  </Button>
                </form>

                {customWallpaper && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCustomWallpaper(null);
                      setShowWallpaperControls(false);
                      localStorage.removeItem('customWallpaper');
                    }}
                    className="w-full justify-start text-white hover:bg-white/20"
                  >
                    Reset to Default
                  </Button>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Right Sidebar for Tools */}
      <RightSidebar>
        <SearchAndTools />
      </RightSidebar>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Search Bar */}
        <div className="p-6 pt-8">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-2xl">
              <SearchAndTools isTopBar={true} />
            </div>
          </div>
        </div>

       

        {/* Combined Time and Calendar - Bottom Left */}
        <div className="fixed bottom-6 right-6 z-20">
          <Card className="backdrop-blur-sm bg-white/10 border border-white/20 p-4 rounded-xl shadow-xl w-64">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-light text-white mb-1">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-white/80 mb-2">
                {formatDate(currentTime)}
              </div>
              <CalendarComponent/>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}