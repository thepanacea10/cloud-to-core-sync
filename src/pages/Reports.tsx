import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Download, FileText, Package, ShoppingCart, CreditCard } from "lucide-react";

export default function Reports() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">التقارير</h1>
        <p className="text-muted-foreground">تقارير المبيعات والمخزون والحسابات</p>
      </div>

      <Tabs defaultValue="sales" dir="rtl">
        <TabsList className="w-full justify-start flex-wrap h-auto gap-1">
          <TabsTrigger value="sales" className="gap-1"><ShoppingCart className="h-4 w-4" />المبيعات</TabsTrigger>
          <TabsTrigger value="inventory" className="gap-1"><Package className="h-4 w-4" />المخزون</TabsTrigger>
          <TabsTrigger value="purchases" className="gap-1"><FileText className="h-4 w-4" />المشتريات</TabsTrigger>
          <TabsTrigger value="accounts" className="gap-1"><CreditCard className="h-4 w-4" />الحسابات</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">تقرير يومي</h3>
                <p className="text-sm text-muted-foreground">مبيعات اليوم مفصلة</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">تقرير شهري</h3>
                <p className="text-sm text-muted-foreground">ملخص المبيعات الشهرية</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">تقرير سنوي</h3>
                <p className="text-sm text-muted-foreground">إحصائيات المبيعات السنوية</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">المخزون الحالي</h3>
                <p className="text-sm text-muted-foreground">جرد كامل للمخزون</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 mx-auto mb-2 text-warning" />
                <h3 className="font-semibold">قرب الانتهاء</h3>
                <p className="text-sm text-muted-foreground">أصناف قاربت صلاحيتها</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 mx-auto mb-2 text-destructive" />
                <h3 className="font-semibold">التالف والمفقود</h3>
                <p className="text-sm text-muted-foreground">سجل الأصناف التالفة</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="purchases" className="mt-4">
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>تقارير المشتريات حسب المورد والصنف</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="mt-4">
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>كشوف حسابات الزبائن والموردين والمصاريف</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
