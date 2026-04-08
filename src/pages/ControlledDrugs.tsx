import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Plus, Pill } from "lucide-react";

export default function ControlledDrugs() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">سجل الأدوية المخدرة</h1>
          <p className="text-muted-foreground">تسجيل ومتابعة حركة الأدوية المخدرة والمراقبة</p>
        </div>
        <Button><Plus className="h-4 w-4 ml-1" />تسجيل عملية</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">اسم الدواء</TableHead>
                <TableHead className="text-right">النوع (وارد/صادر)</TableHead>
                <TableHead className="text-right">الكمية</TableHead>
                <TableHead className="text-right">اسم المريض</TableHead>
                <TableHead className="text-right">رقم الوصفة</TableHead>
                <TableHead className="text-right">الطبيب</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                  <Pill className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  لا توجد سجلات أدوية مخدرة
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
