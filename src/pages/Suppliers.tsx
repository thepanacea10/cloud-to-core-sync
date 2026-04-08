import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus } from "lucide-react";

export default function Suppliers() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">الموردين</h1>
          <p className="text-muted-foreground">إدارة بيانات الموردين والمدفوعات</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 ml-1" />مورد جديد</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>إضافة مورد جديد</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>اسم المورد / الشركة</Label><Input placeholder="الاسم" /></div>
              <div className="space-y-2"><Label>اسم المندوب</Label><Input placeholder="اسم المندوب" /></div>
              <div className="space-y-2"><Label>رقم الهاتف</Label><Input placeholder="رقم الهاتف" /></div>
              <div className="space-y-2"><Label>العنوان</Label><Input placeholder="العنوان" /></div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>إلغاء</Button>
              <Button onClick={() => setDialogOpen(false)}>حفظ</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="بحث بالاسم أو الهاتف..." className="pr-10" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الاسم / الشركة</TableHead>
                <TableHead className="text-right">المندوب</TableHead>
                <TableHead className="text-right">الهاتف</TableHead>
                <TableHead className="text-right">الرصيد المستحق</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                  لا يوجد موردين - أضف مورداً جديداً
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
