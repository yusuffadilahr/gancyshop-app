"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  DollarSign,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

// Sample data for motorcycle body parts business
const salesData = [
  { month: "Jan", sales: 485000, orders: 156, customers: 89 },
  { month: "Feb", sales: 620000, orders: 198, customers: 112 },
  { month: "Mar", sales: 580000, orders: 185, customers: 98 },
  { month: "Apr", sales: 750000, orders: 245, customers: 145 },
  { month: "May", sales: 690000, orders: 225, customers: 128 },
  { month: "Jun", sales: 820000, orders: 268, customers: 162 },
];

const productCategoryData = [
  { name: "Fairing", value: 35, sales: 287000 },
  { name: "Tank Cover", value: 25, sales: 205000 },
  { name: "Side Panel", value: 20, sales: 164000 },
  { name: "Tail Fairing", value: 15, sales: 123000 },
  { name: "Others", value: 5, sales: 41000 },
];

const topProducts = [
  { name: "Ninja 250 Full Set", sold: 45, revenue: 135000 },
  { name: "R15 Racing Fairing", sold: 38, revenue: 114000 },
  { name: "CBR150 Body Kit", sold: 32, revenue: 96000 },
  { name: "GSX Tank Cover", sold: 28, revenue: 84000 },
  { name: "Vixion Side Panel", sold: 25, revenue: 75000 },
];

const inventoryData = [
  { product: "Fairing", inStock: 125, lowStock: 15, outOfStock: 3 },
  { product: "Tank Cover", inStock: 98, lowStock: 8, outOfStock: 2 },
  { product: "Side Panel", inStock: 156, lowStock: 12, outOfStock: 1 },
  { product: "Tail Fairing", inStock: 89, lowStock: 18, outOfStock: 4 },
];

const COLORS = ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

interface IMetricCard {
  title: string;
  value: string | number;
  change: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
  isPositive?: boolean;
}

const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  isPositive = true,
}: IMetricCard) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <div className="flex items-center mt-2">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {change}
          </span>
          <span className="text-sm text-gray-500 ml-1">vs last month</span>
        </div>
      </div>
      <div className="p-3 bg-blue-50 rounded-full">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
    </div>
  </div>
);
interface IProduct {
  name: string;
  sold: number;
  revenue: number;
}

interface IProductRow {
  product: IProduct;
  rank: number;
}
const ProductRow = ({ product, rank }: IProductRow) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center space-x-3">
      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-sm font-semibold text-blue-600">
        {rank}
      </div>
      <div>
        <p className="font-medium text-gray-900">{product.name}</p>
        <p className="text-sm text-gray-500">{product.sold} units sold</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-semibold text-gray-900">
        Rp {product.revenue.toLocaleString()}
      </p>
    </div>
  </div>
);

interface IInventoryRow {
  item: {
    product: string;
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
}

const InventoryRow = ({ item }: IInventoryRow) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
    <div>
      <p className="font-medium text-gray-900">{item.product}</p>
      <div className="flex items-center space-x-4 mt-1">
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-sm text-gray-600">{item.inStock} in stock</span>
        </div>
        <div className="flex items-center">
          <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="text-sm text-gray-600">
            {item.lowStock} low stock
          </span>
        </div>
        <div className="flex items-center">
          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          <span className="text-sm text-gray-600">
            {item.outOfStock} out of stock
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default function MotorcycleBodyDashboard() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Motorcycle Body Parts Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Monitor your business performance and inventory status
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date().toLocaleDateString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Revenue"
            value="Rp 820,000"
            change="+18.9%"
            icon={DollarSign}
            isPositive={true}
          />
          <MetricCard
            title="Total Orders"
            value="268"
            change="+19.1%"
            icon={ShoppingCart}
            isPositive={true}
          />
          <MetricCard
            title="Active Customers"
            value="162"
            change="+26.6%"
            icon={Users}
            isPositive={true}
          />
          <MetricCard
            title="Products in Stock"
            value="468"
            change="-5.2%"
            icon={Package}
            isPositive={false}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Sales Performance
                </h3>
                <p className="text-sm text-gray-600">
                  Monthly revenue and order trends
                </p>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value, name) => [
                      name === "sales" ? `Rp ${value.toLocaleString()}` : value,
                      name === "sales" ? "Sales" : "Orders",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    fill="#dbeafe"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Product Categories */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Product Categories
              </h3>
              <p className="text-sm text-gray-600">
                Sales distribution by category
              </p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {productCategoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value}%`,
                      `Rp ${props.payload.sales.toLocaleString()}`,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {productCategoryData.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index] }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Top Selling Products
              </h3>
              <p className="text-sm text-gray-600">
                Best performing products this month
              </p>
            </div>
            <div className="space-y-1">
              {topProducts.map((product, index) => (
                <ProductRow
                  key={product.name}
                  product={product}
                  rank={index + 1}
                />
              ))}
            </div>
          </div>

          {/* Customer Growth */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Customer Growth
              </h3>
              <p className="text-sm text-gray-600">
                Monthly active customers trend
              </p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value) => [value, "Customers"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="customers"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Inventory Status
            </h3>
            <p className="text-sm text-gray-600">
              Current stock levels across product categories
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {inventoryData.map((item) => (
              <InventoryRow key={item.product} item={item} />
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Key Business Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">
                Strong Growth
              </h4>
              <p className="text-sm text-green-700">
                Revenue increased 18.9% this month with strong demand for
                fairing products
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                Customer Acquisition
              </h4>
              <p className="text-sm text-blue-700">
                New customer acquisition up 26.6%, indicating effective
                marketing strategies
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">
                Inventory Alert
              </h4>
              <p className="text-sm text-yellow-700">
                Some products running low on stock, consider restocking popular
                items
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
