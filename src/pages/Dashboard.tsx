import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCart,
  Package,
  TrendingUp,
  AlertTriangle,
  Users,
  Clock,
} from "lucide-react";

const stats = [
  { title: "مبيعات اليوم", value: "0 ج.س", icon: ShoppingCart, color: "text-primary" },
  { title: "أرباح اليوم", value: "0 ج.س", icon: TrendingUp, color: "text-success" },
  { title: "عدد الأصناف", value: "0", icon: Package, color: "text-info" },
  { title: "أصناف قاربت النفاذ", value: "0", icon: AlertTriangle, color: "text-warning" },
  { title: "عملاء مدينين", value: "0", icon: Users, color: "text-destructive" },
  { title: "الوردية الحالية", value: "غير مفتوحة", icon: Clock, color: "text-muted-foreground" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
        <p className="text-muted-foreground">نظرة عامة على أداء الصيدلية</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">تنبيهات المخزون</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">لا توجد تنبيهات حالياً</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">آخر المبيعات</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">لا توجد مبيعات اليوم</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
