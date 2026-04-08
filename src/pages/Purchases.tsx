import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface PurchaseItem {
  id: string;
  productName: string;
  barcode: string;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  expiry: string;
}

export default function Purchases() {
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [search, setSearch] = useState("");
  const [supplier, setSupplier] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("paid");

  const total = items.reduce((sum, item) => sum + item.buyPrice * item.quantity, 0);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    const newItem: PurchaseItem = {
      id: String(Date.now()),
      productName: `صنف - ${search}`,
      barcode: search,
      quantity: 1,
      buyPrice: 0,
      sellPrice: 0,
      expiry: "",
    };
    setItems((prev) => [...prev, newItem]);
    setSearch("");
  };

  const handleSave = () => {
    if (!items.length) {
      toast.error("أضف أصناف أولاً");
      return;
    }
    toast.success("تم حفظ فاتورة المشتريات");
    setItems([]);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">المشتريات</h1>
        <p className="text-muted-foreground">إدخال فواتير المشتريات من الموردين</p>
      </div>

      {/* Supplier & Invoice info */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>المورد</Label>
              <Select value={supplier} onValueChange={setSupplier}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المورد" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">+ إضافة مورد جديد</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>رقم الفاتورة</Label>
              <Input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} placeholder="رقم الفاتورة" />
            </div>
            <div className="space-y-2">
              <Label>حالة الدفع</Label>
              <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">مدفوعة</SelectItem>
                  <SelectItem value="credit">آجلة</SelectItem>
                  <SelectItem value="partial">دفع جزئي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleAddItem} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input ref={null} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="باركود أو اسم الصنف..." className="pr-10" />
            </div>
            <Button type="submit">
              <Plus className="h-4 w-4 ml-1" />
              إضافة
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Items table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">#</TableHead>
                <TableHead className="text-right">الصنف</TableHead>
                <TableHead className="text-right">الكمية</TableHead>
                <TableHead className="text-right">سعر الشراء</TableHead>
                <TableHead className="text-right">سعر البيع</TableHead>
                <TableHead className="text-right">الصلاحية</TableHead>
                <TableHead className="text-right">الإجمالي</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-12">
                    أدخل باركود الصنف لبدء فاتورة المشتريات
                  </TableCell>
                </TableRow>
              )}
              {items.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell>
                    <Input type="number" min={1} value={item.quantity} onChange={(e) => setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, quantity: parseInt(e.target.value) || 1 } : i))} className="w-16 text-center" />
                  </TableCell>
                  <TableCell>
                    <Input type="number" value={item.buyPrice} onChange={(e) => setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, buyPrice: parseFloat(e.target.value) || 0 } : i))} className="w-20 text-center" />
                  </TableCell>
                  <TableCell>
                    <Input type="number" value={item.sellPrice} onChange={(e) => setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, sellPrice: parseFloat(e.target.value) || 0 } : i))} className="w-20 text-center" />
                  </TableCell>
                  <TableCell>
                    <Input type="month" value={item.expiry} onChange={(e) => setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, expiry: e.target.value } : i))} className="w-32" />
                  </TableCell>
                  <TableCell className="font-semibold">{item.buyPrice * item.quantity}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))} className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Total & Save */}
      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">إجمالي المشتريات</p>
            <p className="text-3xl font-bold text-primary">{total} ج.س</p>
          </div>
          <Button size="lg" onClick={handleSave} className="px-8">
            حفظ الفاتورة
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
