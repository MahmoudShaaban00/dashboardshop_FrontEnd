// تسجيل الدخول
export interface LoginValues {
  email: string;
  password: string;
}

// موظف
export interface EmployeeForm {
  name: string;
  email: string;
  postion: string;
  salary: string;
}

export interface Employee {
  _id: string;
  name: string;
  email: string;
  salary: number;
}

export interface EmployeesContextType {
  employees: Employee[];
  getEmployees: () => void;
  deleteEmployee: (id: string) => void;
  updateEmployee: (id: string, data: Partial<Employee>) => void;
}

// الحضور
export interface Attendance {
  _id?: string;
  employee: string | { _id: string; name: string; email: string; salary: number };
  date: string;
  status: "present" | "absent";  // بدل boolean
  deduction: number;             // بدل string
}

export interface AttendanceContextType {
  attendanceList: Attendance[];
  loading: boolean;
  message: string;
  getAttendance: () => Promise<void>;
  createAttendance: (data: Omit<Attendance, "_id">) => Promise<void>;
  updateAttendance: (id: string, data: Partial<Omit<Attendance, "_id">>) => Promise<void>;
  deleteAttendance: (id: string) => Promise<void>;
}

// Types/types.ts
export interface Product {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  size?: string;
  color?: string;
  barcode?: string;
}

export interface ProductContextType {
  productList: Product[];
  loading: boolean;
  message: string;
  getProducts: () => Promise<void>;
  createProduct: (prod: Omit<Product, "_id">) => Promise<void>;
  updateProduct: (id: string, prod: Partial<Omit<Product, "_id">>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

// بيانات كل عملية بيع
export interface Sale {
  _id?: string;
  productId: string;
  quantity: number;
  total?: number;        // إجمالي سعر البيع
  createdAt?: string;
}

// تقرير المبيعات اليومي
export interface DailySales {
  date: string;
  totalSales: number;
  totalRevenue: number;
  sales: Sale[];
}

// السياق الخاص بالمبيعات
export interface SalesContextType {
  sales: DailySales | null;           // تقرير يومي أو null
  loading: boolean;
  message: string;
  createSale: (sale: Omit<Sale, "_id">) => Promise<void>;
  getDailySales: (date: string) => Promise<void>;
}