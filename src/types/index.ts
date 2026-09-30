export type UserRole = 'distributor' | 'sales_rep' | 'manager' | 'merchandiser';

export type SeasonId = 'SS27' | 'FW27' | 'SS28';

export interface Season {
  id: SeasonId;
  name: string;
  code: string;
  year: number;
  sellInOpens: string;
  sellInCloses: string;
  deliveryWindow: string;
  status: 'Active' | 'Upcoming' | 'Closed';
  daysRemaining: number;
  totalTarget: number; // in Rupees
  currentSellIn: number;
}

export type ProductCategory = 
  | 'Running'
  | 'Training'
  | 'Football'
  | 'Basketball'
  | 'Motorsport'
  | 'Lifestyle'
  | 'Footwear'
  | 'Apparel'
  | 'Accessories';

export type ProductGender = 'Men' | 'Women' | 'Unisex' | 'Kids';

export type AvailabilityStatus = 'Available' | 'Limited' | 'Low' | 'Unavailable' | 'Future';

export interface SizeAvailability {
  size: string;
  status: 'Available' | 'Limited' | 'Low' | 'Unavailable';
  allocatedRemaining: number;
  recommendedRatio: number; // percentage e.g. 0.25 = 25%
}

export interface Product {
  id: string;
  styleNumber: string;
  name: string;
  franchise: string;
  category: ProductCategory;
  subcategory: string;
  gender: ProductGender;
  colorway: string;
  colorHex: string;
  heroImage: string;
  additionalImages?: string[];
  wholesalePrice: number; // in Rupees
  msrp: number; // in Rupees
  marginPercent: number;
  moq: number; // Minimum Order Quantity
  totalAvailable: number;
  reservedUnits: number;
  deliveryWindow: string; // e.g. "Jan 2027", "Feb 2027"
  status: AvailabilityStatus;
  isNewForSeason: boolean;
  isStrategicPriority: boolean;
  isBestSeller: boolean;
  isRecommended: boolean;
  technology: string[];
  story: string;
  material: string;
  sizeCurve: SizeAvailability[];
}

export interface SizeQuantitySelection {
  [size: string]: number;
}

export interface BuyItem {
  id: string;
  productId: string;
  product: Product;
  sizeQuantities: SizeQuantitySelection;
  totalUnits: number;
  totalValue: number;
  addedAt: string;
  notes?: string;
  deliveryWindow: string;
}

export interface Distributor {
  id: string;
  code: string;
  name: string;
  region: 'North' | 'South' | 'West' | 'East' | 'Central';
  city: string;
  tier: 'Tier 1 Key Account' | 'Tier 2 Regional Specialist' | 'Tier 3 Independent';
  accountManagerId: string;
  accountManagerName: string;
  annualTarget: number;
  seasonalTarget: number;
  currentBuyValue: number;
  targetAchievementPercent: number;
  buyStatus: 'Not Started' | 'Draft' | 'Submitted' | 'Under Review' | 'Confirmed';
  lastActive: string;
  selectedStylesCount: number;
  totalUnits: number;
  historicalSeasons: {
    season: string;
    target: number;
    actual: number;
  }[];
}

export type OrderStatus = 
  | 'Draft'
  | 'Submitted'
  | 'Under Review'
  | 'Confirmed'
  | 'Allocated'
  | 'In Production'
  | 'Ready for Delivery'
  | 'Delivered';

export interface SeasonalOrder {
  id: string;
  orderNumber: string;
  seasonId: SeasonId;
  distributorId: string;
  distributorName: string;
  distributorCity: string;
  submittedAt: string;
  lastUpdated: string;
  status: OrderStatus;
  totalValue: number;
  totalUnits: number;
  totalStyles: number;
  deliveryWindows: string[];
  items: BuyItem[];
  commercialTerms: string;
  shippingTerms: string;
  reviewedBy?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'availability' | 'deadline' | 'target' | 'system';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  distributorId?: string;
  distributorName?: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'To Do' | 'In Progress' | 'Completed';
  dueDate: string;
  assignedTo: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
