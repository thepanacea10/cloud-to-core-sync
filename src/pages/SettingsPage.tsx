import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Users, Receipt, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">الإعدادات</h1>
        <p className="text-muted-foreground">إعدادات النظام والمستخدمين</p>
      </div>

      <Tabs defaultValue="general" dir="rtl">
        <TabsList className="w-full justify-start flex-wrap h-auto gap-1">
          <TabsTrigger value="general" className="gap-1"><Settings className="h-4 w-4" />عام</TabsTrigger>
          <TabsTrigger value="users" className="gap-1"><Users className="h-4 w-4" />المستخدمين</TabsTrigger>
          <TabsTrigger value="invoices" className="gap-1"><Receipt className="h-4 w-4" />الفواتير</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1"><Bell className="h-4 w-4" />التنبيهات</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <Card>
            <CardHeader><CardTitle>الإعدادات العامة</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>اسم الصيدلية</Label>
                <Input placeholder="اسم الصيدلية" />
              </div>
              <div className="space-y-2">
                <Label>العنوان</Label>
                <Input placeholder="عنوان الصيدلية" />
              </div>
              <div className="space-y-2">
                <Label>رقم الهاتف</Label>
                <Input placeholder="رقم الهاتف" />
              </div>
              <Button>حفظ الإعدادات</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader><CardTitle>إدارة المستخدمين والصلاحيات</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground">إدارة حسابات الموظفين وصلاحياتهم</p>
              <Button className="mt-4">إضافة مستخدم جديد</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="mt-4">
          <Card>
            <CardHeader><CardTitle>إعدادات الفواتير</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>طباعة الفاتورة تلقائياً</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label>إظهار الشعار في الفاتورة</Label>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader><CardTitle>إعدادات التنبيهات</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>تنبيه نفاذ المخزون</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>تنبيه قرب انتهاء الصلاحية</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>تنبيه تأخر دفع الزبون</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
