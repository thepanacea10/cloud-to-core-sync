import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, Eye } from "lucide-react";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">الزبائن</h1>
          <p className="text-muted-foreground">إدارة حسابات الزبائن والديون الآجلة</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 ml-1" />زبون جديد</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>إضافة زبون جديد</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>اسم الزبون</Label><Input placeholder="الاسم الكامل" /></div>
              <div className="space-y-2"><Label>رقم الهاتف</Label><Input placeholder="رقم الهاتف" /></div>
              <div className="space-y-2"><Label>العنوان</Label><Input placeholder="العنوان" /></div>
              <div className="space-y-2"><Label>الحد الائتماني</Label><Input type="number" placeholder="0" /></div>
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
                <TableHead className="text-right">الاسم</TableHead>
                <TableHead className="text-right">الهاتف</TableHead>
                <TableHead className="text-right">الرصيد المدين</TableHead>
                <TableHead className="text-right">الحد الائتماني</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                  لا يوجد زبائن - أضف زبوناً جديداً
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
