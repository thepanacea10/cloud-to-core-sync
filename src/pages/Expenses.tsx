import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const categories = [
  "إيجار", "رواتب", "كهرباء", "مياه", "صيانة", "نقل", "إعلانات", "أخرى"
];

export default function Expenses() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleAdd = () => {
    if (!category || !amount) {
      toast.error("أكمل البيانات المطلوبة");
      return;
    }
    toast.success("تم تسجيل المصروف");
    setCategory("");
    setAmount("");
    setNote("");
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">المصاريف</h1>
        <p className="text-muted-foreground">تسجيل وتتبع المصاريف التشغيلية</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">تسجيل مصروف جديد</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>التصنيف</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="اختر التصنيف" /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>المبلغ</Label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label>ملاحظات</Label>
              <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="ملاحظات إضافية" />
            </div>
          </div>
          <Button onClick={handleAdd} className="mt-4">
            <Plus className="h-4 w-4 ml-1" />
            تسجيل المصروف
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">سجل المصاريف</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">التصنيف</TableHead>
                <TableHead className="text-right">المبلغ</TableHead>
                <TableHead className="text-right">ملاحظات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-12">
                  لا توجد مصاريف مسجلة
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
