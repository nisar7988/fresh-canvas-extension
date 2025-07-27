import { useState } from 'react';
import { Search, Sparkles, Bot, Brain, Zap, Globe, Code, Palette, FileText, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AITool {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const aiTools: AITool[] = [
  { name: 'ChatGPT', url: 'https://chat.openai.com/', icon: Bot, color: 'text-green-400' },
  { name: 'Claude', url: 'https://claude.ai/', icon: Brain, color: 'text-orange-400' },
  { name: 'Gemini', url: 'https://gemini.google.com/', icon: Sparkles, color: 'text-blue-400' },
  { name: 'Perplexity', url: 'https://perplexity.ai/', icon: Zap, color: 'text-purple-400' },
  { name: 'GitHub Copilot', url: 'https://github.com/features/copilot', icon: Code, color: 'text-gray-400' },
  { name: 'Midjourney', url: 'https://midjourney.com/', icon: Palette, color: 'text-pink-400' },
  { name: 'Notion AI', url: 'https://notion.so/', icon: FileText, color: 'text-indigo-400' },
  { name: 'RunwayML', url: 'https://runwayml.com/', icon: Video, color: 'text-red-400' },
];

interface SearchAndToolsProps {
  isTopBar?: boolean;
}

export default function SearchAndTools({ isTopBar = false }: SearchAndToolsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAITools, setShowAITools] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  const openAITool = (url: string) => {
    window.open(url, '_blank');
  };

  if (isTopBar) {
    return (
      <div className="backdrop-blur-glass bg-gradient-glass border border-glass-border/20 rounded-2xl p-4 shadow-glass animate-slide-up">
        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-overlay-light/60" />
            <Input
              type="text"
              placeholder="Search Google..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-overlay-light/10 border-glass-border/20 text-overlay-light placeholder:text-overlay-light/60 focus:bg-overlay-light/20 transition-all duration-300 rounded-lg"
            />
          </div>
          <Button
            type="submit"
            variant="ghost"
            className="bg-overlay-light/10 hover:bg-overlay-light/20 text-overlay-light border border-glass-border/20 rounded-lg px-4 transition-all duration-300"
          >
            Search
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Google Search Bar */}
      <div className="backdrop-blur-glass bg-gradient-glass border border-glass-border/20 rounded-2xl p-6 shadow-glass animate-slide-up">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-overlay-light/60" />
            <Input
              type="text"
              placeholder="Search Google..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg bg-overlay-light/10 border-glass-border/20 text-overlay-light placeholder:text-overlay-light/60 focus:bg-overlay-light/20 transition-all duration-300 rounded-xl"
            />
          </div>
          <div className="flex gap-3 mt-4 justify-center">
            <Button
              type="submit"
              variant="ghost"
              className="bg-overlay-light/10 hover:bg-overlay-light/20 text-overlay-light border border-glass-border/20 rounded-lg px-6 transition-all duration-300"
            >
              Google Search
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => window.open('https://www.google.com/doodles', '_blank')}
              className="bg-overlay-light/10 hover:bg-overlay-light/20 text-overlay-light border border-glass-border/20 rounded-lg px-6 transition-all duration-300"
            >
              I'm Feeling Lucky
            </Button>
          </div>
        </form>
      </div>

      {/* AI Tools Section */}
      <div className="backdrop-blur-glass bg-gradient-glass border border-glass-border/20 rounded-2xl p-6 shadow-glass animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-overlay-light" />
            <h3 className="text-lg font-semibold text-overlay-light">AI Tools</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAITools(!showAITools)}
            className="text-overlay-light/80 hover:text-overlay-light transition-colors"
          >
            {showAITools ? 'Hide' : 'Show'}
          </Button>
        </div>

        {showAITools && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in">
            {aiTools.map((tool, index) => (
              <Button
                key={tool.name}
                variant="ghost"
                onClick={() => openAITool(tool.url)}
                className="flex flex-col items-center gap-2 p-4 h-auto bg-overlay-light/5 hover:bg-overlay-light/15 border border-glass-border/10 rounded-xl transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <tool.icon className={`h-6 w-6 ${tool.color} group-hover:scale-110 transition-transform duration-300`} />
                <span className="text-xs text-overlay-light/80 group-hover:text-overlay-light transition-colors">
                  {tool.name}
                </span>
              </Button>
            ))}
          </div>
        )}

        {!showAITools && (
          <div className="flex items-center justify-center py-4">
            <span className="text-overlay-light/60 text-sm">
              Click "Show" to access your favorite AI tools
            </span>
          </div>
        )}
      </div>
    </div>
  );
}