import React from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { UserRole } from '../../types';
import { User, Briefcase, BarChart3, Database, X, Check } from 'lucide-react';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { userRole, setUserRole, showToast } = useWholesale();

  if (!isOpen) return null;

  const roles: {
    id: UserRole;
    title: string;
    badge: string;
    icon: React.ReactNode;
    subtitle: string;
    description: string;
  }[] = [
    {
      id: 'distributor',
      title: 'Distributor / Retail Buyer',
      badge: 'B2B Client Experience',
      icon: <User className="w-5 h-5 text-cyan-400" />,
      subtitle: 'ABC Sports Distribution Ltd (Mumbai)',
      description: 'Explore SS27 showroom, configure size curves, monitor ₹25L target vs buy, and submit seasonal order.',
    },
    {
      id: 'sales_rep',
      title: 'PUMA Sales Representative',
      badge: 'Account Management',
      icon: <Briefcase className="w-5 h-5 text-amber-400" />,
      subtitle: 'Rahul Sharma (Key Accounts West)',
      description: 'Review assigned distributors, spot target gaps, send follow-ups, and review assortment drafts.',
    },
    {
      id: 'manager',
      title: 'PUMA Sales Manager',
      badge: 'Commercial Operations',
      icon: <BarChart3 className="w-5 h-5 text-emerald-400" />,
      subtitle: 'Regional Commercial Director',
      description: 'Track ₹48.5 Cr sell-in achievement, category penetration, regional trends, and demand/availability matrix.',
    },
    {
      id: 'merchandiser',
      title: 'PUMA Admin & Merchandising',
      badge: 'Assortment Governance',
      icon: <Database className="w-5 h-5 text-purple-400" />,
      subtitle: 'Global Category Planning',
      description: 'Manage seasonal windows, launch dates, allocation controls, and simulate live stock constraints.',
    },
  ];

  const handleSelectRole = (role: UserRole, title: string) => {
    setUserRole(role);
    showToast('Role Switched', `Active view updated to ${title}.`, 'info');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Select Demo Persona</h3>
            <p className="text-xs text-neutral-400 mt-0.5">Switch perspective to experience every stakeholder workflow</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {roles.map(r => {
            const isSelected = userRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => handleSelectRole(r.id, r.title)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 ${
                  isSelected 
                    ? 'border-red-600 bg-neutral-800/80 shadow-lg ring-1 ring-red-500/20' 
                    : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-800/40'
                }`}
              >
                <div className="p-2.5 rounded-lg bg-neutral-800 shrink-0 mt-0.5 border border-neutral-700/50">
                  {r.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white text-sm">{r.title}</span>
                    <span className="text-[11px] text-neutral-400 font-mono">{r.badge}</span>
                  </div>
                  <div className="text-xs text-red-400 font-medium mt-0.5">{r.subtitle}</div>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{r.description}</p>
                </div>
                {isSelected && (
                  <div className="shrink-0 self-center text-red-500">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
