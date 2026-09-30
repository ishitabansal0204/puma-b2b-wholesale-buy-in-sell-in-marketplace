import React, { useState } from 'react';
import { useWholesale } from '../../context/WholesaleContext';
import { TaskItem } from '../../types';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  Check, 
  Calendar, 
  User, 
  Building2,
  Filter
} from 'lucide-react';

export const TaskCenter: React.FC = () => {
  const { tasks, updateTaskStatus, addTask, activeSeasonId } = useWholesale();
  const [statusFilter, setStatusFilter] = useState<'All' | 'To Do' | 'In Progress' | 'Completed'>('All');
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  const filteredTasks = tasks.filter(t => statusFilter === 'All' || t.status === statusFilter);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addTask({
      title: newTitle,
      description: newDesc,
      priority: newPriority,
      status: 'To Do',
      dueDate: 'In 3 days',
      assignedTo: 'Rahul Sharma',
    });

    setNewTitle('');
    setNewDesc('');
    setIsNewTaskOpen(false);
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-red-500 font-bold uppercase tracking-wider">
            Operational Workflows // {activeSeasonId}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-mono mt-0.5">
            Commercial Tasks & Account Follow-Ups
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage distributor order approvals, size curve reviews, credit validations, and stock rebalancing
          </p>
        </div>

        <button
          onClick={() => setIsNewTaskOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors shadow-lg shadow-red-600/20"
        >
          <Plus className="w-4 h-4" />
          Create New Task
        </button>
      </div>

      {/* Task Filters */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
        {(['All', 'To Do', 'In Progress', 'Completed'] as const).map(st => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              statusFilter === st
                ? 'bg-neutral-200 text-black font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            {st} ({st === 'All' ? tasks.length : tasks.filter(t => t.status === st).length})
          </button>
        ))}
      </div>

      {/* Task Creation Modal */}
      {isNewTaskOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <form 
            onSubmit={handleCreateTask}
            className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-bold text-white">Create Commercial Action Item</h3>
              <button 
                type="button" 
                onClick={() => setIsNewTaskOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Task Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. Follow up on Eastern Zone SS27 running gap"
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Description / Next Steps</label>
              <textarea
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                placeholder="Details of the commercial action required..."
                rows={3}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">Priority</label>
              <select
                value={newPriority}
                onChange={e => setNewPriority(e.target.value as typeof newPriority)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none font-mono"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsNewTaskOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Task List Container */}
      <div className="space-y-3">
        {filteredTasks.map(task => {
          return (
            <div
              key={task.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-sm hover:border-neutral-700 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      task.priority === 'High'
                        ? 'bg-rose-950 text-rose-400 border border-rose-800'
                        : task.priority === 'Medium'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                    }`}
                  >
                    {task.priority} Priority
                  </span>
                  {task.distributorName && (
                    <span className="text-xs font-semibold text-cyan-400 font-mono flex items-center gap-1">
                      <Building2 className="w-3 h-3" /> {task.distributorName}
                    </span>
                  )}
                </div>

                <h3 className={`text-sm font-bold text-white tracking-tight ${task.status === 'Completed' ? 'line-through opacity-60' : ''}`}>
                  {task.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl">
                  {task.description}
                </p>

                <div className="flex items-center gap-4 text-[11px] text-neutral-500 font-mono pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Due: {task.dueDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> Assigned: {task.assignedTo}
                  </span>
                </div>
              </div>

              {/* Status Selector Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={task.status}
                  onChange={e => updateTaskStatus(task.id, e.target.value as typeof task.status)}
                  className="px-3 py-1.5 bg-neutral-950 border border-neutral-700 rounded-xl text-xs font-mono font-semibold text-neutral-200 focus:outline-none focus:border-red-500"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed ✓</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
