import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Get first day of the month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Generate calendar days
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (day: number) => {
    return today.getDate() === day && 
           today.getMonth() === currentMonth && 
           today.getFullYear() === currentYear;
  };

  const isSelected = (day: number) => {
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === currentMonth && 
           selectedDate.getFullYear() === currentYear;
  };

  return (
    <div className="backdrop-blur-glass bg-gradient-glass border border-glass-border/20 rounded-2xl p-4 lg:p-6 shadow-glass animate-slide-up w-full max-w-sm lg:max-w-md">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-3 lg:mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 lg:h-5 lg:w-5 text-overlay-light" />
          <h3 className="text-sm lg:text-base font-semibold text-overlay-light">Calendar</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="text-overlay-light/80 hover:text-overlay-light hover:bg-overlay-light/10 p-1 h-6 w-6 lg:h-8 lg:w-8"
          >
            <ChevronLeft className="h-3 w-3 lg:h-4 lg:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('next')}
            className="text-overlay-light/80 hover:text-overlay-light hover:bg-overlay-light/10 p-1 h-6 w-6 lg:h-8 lg:w-8"
          >
            <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
          </Button>
        </div>
      </div>

      {/* Month and Year */}
      <div className="text-center mb-3 lg:mb-4">
        <h2 className="text-sm lg:text-base xl:text-lg font-bold text-overlay-light">
          {monthNames[currentMonth]} {currentYear}
        </h2>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-0.5 mb-1 lg:mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center py-1">
            <span className="text-xs lg:text-sm font-medium text-overlay-light/70">
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {calendarDays.map((day, index) => (
          <div key={index} className="aspect-square">
            {day ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDate(new Date(currentYear, currentMonth, day))}
                className={`
                  w-full h-full text-xs lg:text-sm font-medium transition-all duration-200
                  ${isToday(day) 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold' 
                    : isSelected(day)
                    ? 'bg-overlay-light/20 text-overlay-light'
                    : 'text-overlay-light/80 hover:bg-overlay-light/10 hover:text-overlay-light'
                  }
                `}
              >
                {day}
              </Button>
            ) : (
              <div className="w-full h-full" />
            )}
          </div>
        ))}
      </div>

      {/* Today's Date Display */}
      <div className="mt-3 lg:mt-4 pt-2 lg:pt-3 border-t border-glass-border/20 text-center">
        <div className="text-xs lg:text-sm text-overlay-light/70">Today</div>
        <div className="text-xs lg:text-sm font-semibold text-overlay-light">
          {today.toLocaleDateString([], { 
            weekday: 'short',
            month: 'short', 
            day: 'numeric'
          })}
        </div>
      </div>
    </div>
  );
}