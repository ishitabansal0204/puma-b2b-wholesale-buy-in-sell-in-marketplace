import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  UserRole, 
  SeasonId, 
  Product, 
  Distributor, 
  SeasonalOrder, 
  NotificationItem, 
  TaskItem, 
  BuyItem, 
  SizeQuantitySelection,
  OrderStatus,
  ToastMessage 
} from '../types';
import { 
  SEASONS_DATA, 
  PRODUCTS_DATA, 
  DISTRIBUTORS_DATA, 
  INITIAL_MY_BUY_ITEMS, 
  PAST_ORDERS_DATA, 
  NOTIFICATIONS_DATA, 
  TASKS_DATA 
} from '../data/mockData';

interface WholesaleContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeSeasonId: SeasonId;
  setActiveSeasonId: (seasonId: SeasonId) => void;
  currentDistributor: Distributor;
  setCurrentDistributor: (distributor: Distributor) => void;
  distributors: Distributor[];
  products: Product[];
  myBuyItems: BuyItem[];
  addToBuy: (product: Product, sizeQuantities: SizeQuantitySelection, notes?: string) => void;
  updateBuyItemQuantity: (itemId: string, size: string, quantity: number) => void;
  removeBuyItem: (itemId: string) => void;
  clearBuy: () => void;
  submittedOrders: SeasonalOrder[];
  submitCurrentBuy: (commercialTerms: string, shippingTerms: string) => SeasonalOrder;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  tasks: TaskItem[];
  updateTaskStatus: (id: string, newStatus: 'To Do' | 'In Progress' | 'Completed') => void;
  addTask: (task: Omit<TaskItem, 'id'>) => void;
  inventorySimulationActive: boolean;
  setInventorySimulationActive: (active: boolean) => void;
  replaceProductInBuy: (oldProductId: string, newProductId: string) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
  selectedProductForSizeCurve: Product | null;
  setSelectedProductForSizeCurve: (product: Product | null) => void;
  isCatalogViewerOpen: boolean;
  setIsCatalogViewerOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isReviewOrderOpen: boolean;
  setIsReviewOrderOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalBuyValue: number;
  totalBuyUnits: number;
  totalBuyStyles: number;
  seasonalTarget: number;
  targetAchievementPercent: number;
  targetGap: number;
  sendDistributorReminder: (distributorId: string) => void;
}

const WholesaleContext = createContext<WholesaleContextType | undefined>(undefined);

export const WholesaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('distributor');
  const [activeSeasonId, setActiveSeasonId] = useState<SeasonId>('SS27');
  const [distributors, setDistributors] = useState<Distributor[]>(DISTRIBUTORS_DATA);
  const [currentDistributor, setCurrentDistributor] = useState<Distributor>(DISTRIBUTORS_DATA[0]);
  const [products] = useState<Product[]>(PRODUCTS_DATA);
  const [myBuyItems, setMyBuyItems] = useState<BuyItem[]>(INITIAL_MY_BUY_ITEMS);
  const [submittedOrders, setSubmittedOrders] = useState<SeasonalOrder[]>(PAST_ORDERS_DATA);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS_DATA);
  const [tasks, setTasks] = useState<TaskItem[]>(TASKS_DATA);
  const [inventorySimulationActive, setInventorySimulationActive] = useState<boolean>(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [selectedProductForSizeCurve, setSelectedProductForSizeCurve] = useState<Product | null>(null);
  const [isCatalogViewerOpen, setIsCatalogViewerOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isReviewOrderOpen, setIsReviewOrderOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeTab, setActiveTab] = useState<string>('home');

  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const totalBuyValue = useMemo(() => {
    return myBuyItems.reduce((acc, item) => acc + item.totalValue, 0);
  }, [myBuyItems]);

  const totalBuyUnits = useMemo(() => {
    return myBuyItems.reduce((acc, item) => acc + item.totalUnits, 0);
  }, [myBuyItems]);

  const totalBuyStyles = useMemo(() => {
    return myBuyItems.length;
  }, [myBuyItems]);

  const seasonalTarget = currentDistributor.seasonalTarget;
  const targetAchievementPercent = seasonalTarget > 0 ? Math.min(100, Math.round((totalBuyValue / seasonalTarget) * 1000) / 10) : 0;
  const targetGap = Math.max(0, seasonalTarget - totalBuyValue);

  const addToBuy = (product: Product, sizeQuantities: SizeQuantitySelection, notes?: string) => {
    const totalUnits = Object.values(sizeQuantities).reduce((a, b) => a + b, 0);
    if (totalUnits === 0) {
      showToast('No units selected', 'Please specify at least 1 unit in the size curve.', 'warning');
      return;
    }

    setMyBuyItems(prev => {
      const existingIndex = prev.findIndex(item => item.productId === product.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        const existing = updated[existingIndex];
        const mergedQuantities: SizeQuantitySelection = { ...existing.sizeQuantities };
        
        Object.entries(sizeQuantities).forEach(([sz, qty]) => {
          mergedQuantities[sz] = (mergedQuantities[sz] || 0) + qty;
        });
        
        const newTotalUnits = Object.values(mergedQuantities).reduce((a, b) => a + b, 0);
        updated[existingIndex] = {
          ...existing,
          sizeQuantities: mergedQuantities,
          totalUnits: newTotalUnits,
          totalValue: newTotalUnits * product.wholesalePrice,
          notes: notes || existing.notes,
        };
        return updated;
      } else {
        const newItem: BuyItem = {
          id: 'item-' + Date.now(),
          productId: product.id,
          product,
          sizeQuantities,
          totalUnits,
          totalValue: totalUnits * product.wholesalePrice,
          addedAt: 'Today',
          notes: notes || '',
          deliveryWindow: product.deliveryWindow,
        };
        return [...prev, newItem];
      }
    });

    showToast(
      'Added to Buy',
      `${totalUnits} units of ${product.name} added to your ${activeSeasonId} assortment.`,
      'success'
    );
  };

  const updateBuyItemQuantity = (itemId: string, size: string, quantity: number) => {
    setMyBuyItems(prev => {
      return prev.map(item => {
        if (item.id !== itemId) return item;
        const newQuantities = { ...item.sizeQuantities, [size]: Math.max(0, quantity) };
        const newUnits = Object.values(newQuantities).reduce((a, b) => a + b, 0);
        return {
          ...item,
          sizeQuantities: newQuantities,
          totalUnits: newUnits,
          totalValue: newUnits * item.product.wholesalePrice,
        };
      }).filter(item => item.totalUnits > 0);
    });
  };

  const removeBuyItem = (itemId: string) => {
    const item = myBuyItems.find(i => i.id === itemId);
    setMyBuyItems(prev => prev.filter(i => i.id !== itemId));
    if (item) {
      showToast('Removed from Buy', `${item.product.name} removed from your assortment.`, 'info');
    }
  };

  const clearBuy = () => {
    setMyBuyItems([]);
    showToast('Buy cleared', 'All items removed from your seasonal assortment draft.', 'info');
  };

  const replaceProductInBuy = (oldProductId: string, newProductId: string) => {
    const newProduct = products.find(p => p.id === newProductId);
    if (!newProduct) return;

    setMyBuyItems(prev => {
      return prev.map(item => {
        if (item.productId !== oldProductId) return item;
        return {
          ...item,
          productId: newProduct.id,
          product: newProduct,
          totalValue: item.totalUnits * newProduct.wholesalePrice,
          deliveryWindow: newProduct.deliveryWindow,
          notes: `Replaced from unavailable item on ${new Date().toLocaleDateString()}`,
        };
      });
    });

    showToast(
      'Style Replaced',
      `Swapped style with recommended alternative: ${newProduct.name}. Assortment preserved.`,
      'success'
    );
  };

  const submitCurrentBuy = (commercialTerms: string, shippingTerms: string): SeasonalOrder => {
    const newOrderNumber = `SS27-DB-${Math.floor(10000 + Math.random() * 90000)}`;
    const deliveryWindowsSet = new Set(myBuyItems.map(item => item.deliveryWindow));
    
    const newOrder: SeasonalOrder = {
      id: 'ord-' + Date.now(),
      orderNumber: newOrderNumber,
      seasonId: activeSeasonId,
      distributorId: currentDistributor.id,
      distributorName: currentDistributor.name,
      distributorCity: currentDistributor.city,
      submittedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      lastUpdated: 'Just now',
      status: 'Submitted',
      totalValue: totalBuyValue,
      totalUnits: totalBuyUnits,
      totalStyles: totalBuyStyles,
      deliveryWindows: Array.from(deliveryWindowsSet),
      items: [...myBuyItems],
      commercialTerms,
      shippingTerms,
      reviewedBy: 'Under Commercial Ops Review',
    };

    setSubmittedOrders(prev => [newOrder, ...prev]);

    // Update distributor status
    setDistributors(prev => prev.map(d => {
      if (d.id === currentDistributor.id) {
        return {
          ...d,
          currentBuyValue: totalBuyValue,
          buyStatus: 'Submitted',
          selectedStylesCount: totalBuyStyles,
          totalUnits: totalBuyUnits,
          targetAchievementPercent: Math.min(100, Math.round((totalBuyValue / d.seasonalTarget) * 1000) / 10),
          lastActive: 'Just now',
        };
      }
      return d;
    }));

    // Add notification
    const newNotification: NotificationItem = {
      id: 'notif-' + Date.now(),
      title: `Order ${newOrderNumber} Submitted`,
      message: `${currentDistributor.name} submitted ${activeSeasonId} buy order totaling ₹${(totalBuyValue / 100000).toFixed(1)}L.`,
      type: 'order',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);

    showToast(
      'Order Submitted Successfully',
      `Order ${newOrderNumber} has been received by PUMA Commercial Operations.`,
      'success'
    );

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setSubmittedOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status: newStatus,
          lastUpdated: 'Just now',
        };
      }
      return ord;
    }));

    showToast('Order Status Updated', `Order ${orderId} transitioned to ${newStatus}.`, 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('Notifications Cleared', 'All alerts marked as read.', 'info');
  };

  const updateTaskStatus = (id: string, newStatus: 'To Do' | 'In Progress' | 'Completed') => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    showToast('Task Updated', `Task status changed to ${newStatus}.`, 'info');
  };

  const addTask = (task: Omit<TaskItem, 'id'>) => {
    const newTask: TaskItem = {
      ...task,
      id: 'task-' + Date.now(),
    };
    setTasks(prev => [newTask, ...prev]);
    showToast('Task Created', `Added: ${task.title}`, 'success');
  };

  const sendDistributorReminder = (distributorId: string) => {
    const dist = distributors.find(d => d.id === distributorId);
    if (!dist) return;

    showToast(
      'Follow-Up Reminder Dispatched',
      `Simulated WhatsApp & Email alert sent to ${dist.name} (${dist.accountManagerName}).`,
      'success'
    );
  };

  return (
    <WholesaleContext.Provider
      value={{
        userRole,
        setUserRole,
        activeSeasonId,
        setActiveSeasonId,
        currentDistributor,
        setCurrentDistributor,
        distributors,
        products,
        myBuyItems,
        addToBuy,
        updateBuyItemQuantity,
        removeBuyItem,
        clearBuy,
        submittedOrders,
        submitCurrentBuy,
        updateOrderStatus,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        tasks,
        updateTaskStatus,
        addTask,
        inventorySimulationActive,
        setInventorySimulationActive,
        replaceProductInBuy,
        selectedProductForDetail,
        setSelectedProductForDetail,
        selectedProductForSizeCurve,
        setSelectedProductForSizeCurve,
        isCatalogViewerOpen,
        setIsCatalogViewerOpen,
        isSearchOpen,
        setIsSearchOpen,
        isReviewOrderOpen,
        setIsReviewOrderOpen,
        toasts,
        showToast,
        dismissToast,
        activeTab,
        setActiveTab,
        totalBuyValue,
        totalBuyUnits,
        totalBuyStyles,
        seasonalTarget,
        targetAchievementPercent,
        targetGap,
        sendDistributorReminder,
      }}
    >
      {children}
    </WholesaleContext.Provider>
  );
};

export const useWholesale = () => {
  const context = useContext(WholesaleContext);
  if (!context) {
    throw new Error('useWholesale must be used within a WholesaleProvider');
  }
  return context;
};
