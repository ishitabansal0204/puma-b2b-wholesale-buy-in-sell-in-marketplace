import React, { useState } from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { SEASONS_DATA } from '../../data/mockData';
import { SeasonId } from '../../types';
import { 
  Search, 
  Bell, 
  ShoppingBag, 
  ChevronDown, 
  Calendar, 
  UserCheck, 
  BookOpen
} from 'lucide-react';

interface TopNavigationProps {
  onOpenRoleSwitcher: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ onOpenRoleSwitcher }) => {
  const { 
    userRole, 
    activeSeasonId, 
    setActiveSeasonId, 
    activeTab, 
    setActiveTab, 
    myBuyItems, 
    totalBuyValue, 
    setIsSearchOpen,
    setIsCatalogViewerOpen,
    notifications,
    markAllNotificationsAsRead,
    showToast
  } = useWholesale();

  const [seasonDropdownOpen, setSeasonDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const activeSeason = SEASONS_DATA.find(s => s.id === activeSeasonId) || SEASONS_DATA[0];
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const getNavLinks = () => {
    if (userRole === 'distributor') {
      return [
        { id: 'home', label: 'Dashboard' },
        { id: 'showroom', label: 'Collection' },
        { id: 'products', label: 'Products' },
        { id: 'my-buy', label: 'My Buy' },
        { id: 'availability', label: 'Availability' },
        { id: 'orders', label: 'Orders' },
      ];
    } else if (userRole === 'sales_rep') {
      return [
        { id: 'home', label: 'Dashboard' },
        { id: 'distributors', label: 'Distributors' },
        { id: 'products', label: 'Collection' },
        { id: 'availability', label: 'Availability' },
        { id: 'tasks', label: 'Tasks' },
        { id: 'orders', label: 'Orders' },
      ];
    } else if (userRole === 'manager') {
      return [
        { id: 'home', label: 'Executive' },
        { id: 'distributors', label: 'Distributor Sell-In' },
        { id: 'performance', label: 'Performance Matrix' },
        { id: 'availability', label: 'Stock Allocation' },
        { id: 'orders', label: 'Pipeline' },
      ];
    } else {
      // merchandiser
      return [
        { id: 'home', label: 'Merchandising' },
        { id: 'products', label: 'Catalog Governance' },
        { id: 'availability', label: 'Allocation & Limits' },
        { id: 'orders', label: 'Order Batches' },
      ];
    }
  };

  const navLinks = getNavLinks();

  const getRoleDisplayName = () => {
    switch (userRole) {
      case 'distributor': return 'Distributor (ABC Sports)';
      case 'sales_rep': return 'PUMA Sales (Rahul S.)';
      case 'manager': return 'PUMA Director (West Zone)';
      case 'merchandiser': return 'PUMA Merchandising';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 text-white">
      {/* Secondary Top Ticker for Season Timeline Window */}
      <div className="bg-neutral-900/90 border-b border-neutral-800/80 px-6 py-1.5 text-xs flex items-center justify-between text-neutral-400">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-red-500 font-bold uppercase tracking-wider text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            PUMA WHOLESALE SYSTEM
          </span>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span className="hidden sm:inline font-mono text-neutral-300">
            {activeSeason.name} ({activeSeason.code})
          </span>
          <span className="hidden md:inline text-neutral-500">·</span>
          <span className="hidden md:inline text-neutral-400">
            Order Window: {activeSeason.sellInOpens} – {activeSeason.sellInCloses} ({activeSeason.daysRemaining} days left)
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-neutral-400">
            Delivery: <strong className="text-neutral-200 font-mono font-medium">{activeSeason.deliveryWindow}</strong>
          </span>
          <button 
            onClick={() => setIsCatalogViewerOpen(true)}
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="underline decoration-cyan-400/40">Digital Lookbook</span>
          </button>
        </div>
      </div>

      {/* Main Navbar 3-Zone Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 text-left group"
          >
            <span className="text-xl font-extrabold tracking-tighter text-white font-mono flex items-center gap-1.5">
              <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-xs font-black tracking-widest">
                PUMA
              </span>
              <span>NITRO MATRIX</span>
            </span>
          </button>
        </div>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
          {navLinks.map(link => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`py-1 transition-colors whitespace-nowrap relative ${
                  isActive 
                    ? 'text-white font-semibold' 
                    : 'hover:text-neutral-200'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-red-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions & system utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            title="Search products, styles, distributors (Cmd+K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Season Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSeasonDropdownOpen(!seasonDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono font-medium hover:border-neutral-700 text-neutral-300 hover:text-white transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              <span>{activeSeasonId}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
            </button>

            {seasonDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl py-2 z-50">
                <div className="px-3 py-1.5 text-[11px] font-mono text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                  Select Season
                </div>
                {SEASONS_DATA.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActiveSeasonId(s.id as SeasonId);
                      setSeasonDropdownOpen(false);
                      showToast('Season Switched', `Active planning context updated to ${s.code}.`, 'info');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-neutral-800 transition-colors ${
                      activeSeasonId === s.id ? 'text-red-400 font-semibold bg-neutral-800/50' : 'text-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="font-mono">{s.code} · {s.name}</div>
                      <div className="text-[10px] text-neutral-400">{s.deliveryWindow}</div>
                    </div>
                    {s.status === 'Active' && (
                      <span className="text-[10px] bg-red-950/80 text-red-400 border border-red-800/50 px-1.5 py-0.5 rounded font-mono">
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-neutral-950" />
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl py-2 z-50 animate-in fade-in duration-100">
                <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Alerts & Updates ({unreadNotifs})
                  </span>
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    Mark read
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-neutral-800/50">
                  {notifications.slice(0, 5).map(n => (
                    <div 
                      key={n.id} 
                      className={`px-3 py-2.5 text-xs hover:bg-neutral-800/50 transition-colors ${
                        !n.read ? 'bg-neutral-800/30' : ''
                      }`}
                    >
                      <div className="font-semibold text-white flex items-center justify-between">
                        <span>{n.title}</span>
                        <span className="text-[10px] font-mono text-neutral-400">{n.timestamp}</span>
                      </div>
                      <p className="text-neutral-400 mt-1 leading-relaxed text-[11px]">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Buy Tray / Cart (Distributor mode) */}
          <button
            onClick={() => setActiveTab('my-buy')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <div className="text-left hidden sm:block">
              <span className="text-xs font-mono font-bold tabular-nums">
                ₹{(totalBuyValue / 100000).toFixed(1)}L
              </span>
              <span className="text-[10px] text-neutral-400 ml-1">({myBuyItems.length} styles)</span>
            </div>
          </button>

          {/* Demo Persona Switcher Pill */}
          <button
            onClick={onOpenRoleSwitcher}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold tracking-tight transition-colors shadow-sm"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{getRoleDisplayName()}</span>
            <span className="lg:hidden">Role</span>
          </button>
        </div>
      </div>
    </header>
  );
};
