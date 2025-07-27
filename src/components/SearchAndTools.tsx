import { useState } from 'react';
import { Search, Sparkles, Bot, Brain, Zap, Globe, Code, Palette, FileText, Video, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AITool {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
}

const aiTools: AITool[] = [
  { name: 'ChatGPT', url: 'https://chat.openai.com/', icon: Bot, color: 'text-emerald-300', gradient: 'from-emerald-300 to-emerald-400' },
  { name: 'Claude', url: 'https://claude.ai/', icon: Brain, color: 'text-orange-300', gradient: 'from-orange-300 to-orange-400' },
  { name: 'Gemini', url: 'https://gemini.google.com/', icon: Sparkles, color: 'text-blue-300', gradient: 'from-blue-300 to-blue-400' },
  { name: 'Perplexity', url: 'https://perplexity.ai/', icon: Zap, color: 'text-purple-300', gradient: 'from-purple-300 to-purple-400' },
  { name: 'GitHub Copilot', url: 'https://github.com/features/copilot', icon: Code, color: 'text-gray-300', gradient: 'from-gray-300 to-gray-400' },
  { name: 'Midjourney', url: 'https://midjourney.com/', icon: Palette, color: 'text-pink-300', gradient: 'from-pink-300 to-pink-400' },
  { name: 'Notion AI', url: 'https://notion.so/', icon: FileText, color: 'text-indigo-300', gradient: 'from-indigo-300 to-indigo-400' },
  { name: 'RunwayML', url: 'https://runwayml.com/', icon: Video, color: 'text-red-300', gradient: 'from-red-300 to-red-400' },
];

interface SearchAndToolsProps {
  isTopBar?: boolean;
}

export default function SearchAndTools({ isTopBar = false }: SearchAndToolsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  const openAITool = (url: string) => {
    window.open(url, '_blank');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
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
    <div className="relative">
      {/* Custom scrollbar styling using regular CSS classes */}
      <style>{`
        .glass-scroll-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
        
        .glass-scroll-container::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .glass-scroll-container::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 4px;
        }
        
        .glass-scroll-container::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }
        
        .glass-scroll-container::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      `}</style>

      <div className="animate-slide-in">
        <div className="p-6 lg:p-8 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <Bot className="h-8 w-8 lg:h-12 lg:w-12 text-purple-600 filter brightness-110" />
            </div>  
            <div>
              <h4 className="text-lg lg:text-xl font-semibold text-overlay-light">AI Assistants</h4>
              <p className="text-sm lg:text-base text-overlay-light/70">Choose your preferred AI tool</p>
            </div>
          </div>

          {/* Scrollable container with custom scrollbar */}
          <div className="flex-col justify-content-evenly flex max-h-[70vh]  glass-scroll-container pr-2">
            {aiTools.map((tool, index) => ( 
              <Button
                key={tool.name}
                variant="ghost"
                onClick={() => openAITool(tool.url)}
                className="flex flex-row items-center gap-3 p-4 lg:p-6 h-auto bg-overlay-light/5 hover:bg-overlay-light/15 border border-glass-border/10 rounded-xl transition-all duration-500 hover:scale-105 group relative overflow-hidden animate-tool-item my-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <tool.icon className={`h-8 w-8 lg:h-10 lg:w-10 ${tool.color} group-hover:scale-110 group-hover:drop-shadow-lg transition-all duration-300 filter brightness-110`} />
                </div>
                <span className="text-sm lg:text-base text-overlay-light/80 group-hover:text-overlay-light transition-colors duration-300 font-medium text-center">
                  {tool.name}
                </span>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current opacity-0 group-hover:opacity-60 rounded-full transition-all duration-300 group-hover:scale-150"></div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}