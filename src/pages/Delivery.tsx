import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Plus, Truck } from "lucide-react";

export default function Delivery() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">خدمة التوصيل</h1>
          <p className="text-muted-foreground">إدارة طلبات التوصيل وحسابات المناديب</p>
        </div>
        <Button><Plus className="h-4 w-4 ml-1" />طلب توصيل جديد</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">رقم الطلب</TableHead>
                <TableHead className="text-right">الزبون</TableHead>
                <TableHead className="text-right">المندوب</TableHead>
                <TableHead className="text-right">القيمة</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                  <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  لا توجد طلبات توصيل
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
