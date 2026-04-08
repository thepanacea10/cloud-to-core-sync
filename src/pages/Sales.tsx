import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Trash2, Pause, Play, X } from "lucide-react";
import { toast } from "sonner";

interface InvoiceItem {
  id: string;
  productName: string;
  scientificName: string;
  barcode: string;
  price: number;
  quantity: number;
  available: number;
  expiry: string;
}

interface Invoice {
  id: string;
  items: InvoiceItem[];
  status: "active" | "suspended";
}

export default function Sales() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: "1", items: [], status: "active" },
  ]);
  const [activeInvoiceId, setActiveInvoiceId] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const barcodeRef = useRef<HTMLInputElement>(null);

  const activeInvoice = invoices.find((inv) => inv.id === activeInvoiceId);
  const total = activeInvoice?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  useEffect(() => {
    barcodeRef.current?.focus();
  }, [activeInvoiceId]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "F2") {
        e.preventDefault();
        barcodeRef.current?.focus();
        barcodeRef.current?.select();
      }
      if (e.key === "F4") {
        e.preventDefault();
        // Suspend current and create new
        setInvoices((prev) => {
          const updated = prev.map((inv) =>
            inv.id === activeInvoiceId ? { ...inv, status: "suspended" as const } : inv
          );
          const newId = String(Date.now());
          return [...updated, { id: newId, items: [], status: "active" as const }];
        });
        setActiveInvoiceId(String(Date.now()));
      }
    },
    [activeInvoiceId]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Demo: add a placeholder item
    const newItem: InvoiceItem = {
      id: String(Date.now()),
      productName: `صنف - ${searchQuery}`,
      scientificName: "الاسم العلمي",
      barcode: searchQuery,
      price: 100,
      quantity: 1,
      available: 50,
      expiry: "2026-12",
    };
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === activeInvoiceId
          ? { ...inv, items: [...inv.items, newItem] }
          : inv
      )
    );
    setSearchQuery("");
    toast.success("تم إضافة الصنف");
  };

  const removeItem = (itemId: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === activeInvoiceId
          ? { ...inv, items: inv.items.filter((i) => i.id !== itemId) }
          : inv
      )
    );
  };

  const updateQuantity = (itemId: string, qty: number) => {
    if (qty < 1) return;
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === activeInvoiceId
          ? {
              ...inv,
              items: inv.items.map((i) =>
                i.id === itemId ? { ...i, quantity: qty } : i
              ),
            }
          : inv
      )
    );
  };

  const handlePayment = () => {
    if (!activeInvoice?.items.length) {
      toast.error("الفاتورة فارغة");
      return;
    }
    toast.success(`تم الدفع بنجاح - ${paymentMethod === "cash" ? "نقدي" : paymentMethod}`);
    setInvoices((prev) => prev.filter((inv) => inv.id !== activeInvoiceId));
    const newId = String(Date.now());
    setInvoices((prev) => [...prev, { id: newId, items: [], status: "active" }]);
    setActiveInvoiceId(newId);
  };

  const suspendedInvoices = invoices.filter(
    (inv) => inv.status === "suspended" && inv.items.length > 0
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">شاشة المبيعات</h1>
        <div className="flex gap-2">
          {suspendedInvoices.length > 0 && (
            <Badge variant="secondary" className="gap-1">
              <Pause className="h-3 w-3" />
              {suspendedInvoices.length} فاتورة معلقة
            </Badge>
          )}
          <Badge variant="outline">F2: بحث | F4: تعليق</Badge>
        </div>
      </div>

      {/* Suspended invoices bar */}
      {suspendedInvoices.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {suspendedInvoices.map((inv) => (
            <Button
              key={inv.id}
              variant="outline"
              size="sm"
              onClick={() => {
                setInvoices((prev) =>
                  prev.map((i) =>
                    i.id === inv.id ? { ...i, status: "active" } : i
                  )
                );
                setActiveInvoiceId(inv.id);
              }}
              className="gap-2"
            >
              <Play className="h-3 w-3" />
              فاتورة ({inv.items.length} أصناف)
            </Button>
          ))}
        </div>
      )}

      {/* Barcode input */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleBarcodeSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={barcodeRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="أدخل الباركود أو اسم الصنف (F2)"
                className="pr-10"
              />
            </div>
            <Button type="submit">
              <Plus className="h-4 w-4 ml-1" />
              إضافة
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Invoice table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">#</TableHead>
                  <TableHead className="text-right">اسم الصنف</TableHead>
                  <TableHead className="text-right">الاسم العلمي</TableHead>
                  <TableHead className="text-right">الصلاحية</TableHead>
                  <TableHead className="text-right">السعر</TableHead>
                  <TableHead className="text-right">الكمية</TableHead>
                  <TableHead className="text-right">الإجمالي</TableHead>
                  <TableHead className="text-right w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeInvoice?.items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-12">
                      أدخل الباركود أو ابحث عن صنف لبدء الفاتورة
                    </TableCell>
                  </TableRow>
                )}
                {activeInvoice?.items.map((item, idx) => (
                  <TableRow key={item.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell className="text-muted-foreground">{item.scientificName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {item.expiry}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min={1}
                        max={item.available}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                      />
                    </TableCell>
                    <TableCell className="font-semibold">
                      {item.price * item.quantity}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payment section */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">نقدي</SelectItem>
                  <SelectItem value="mobicash">موبي كاش</SelectItem>
                  <SelectItem value="edfaaly">ادفع لي</SelectItem>
                  <SelectItem value="yusr">يسر</SelectItem>
                  <SelectItem value="credit">بيع آجل</SelectItem>
                  <SelectItem value="damage">إتلاف</SelectItem>
                  <SelectItem value="lost">مفقود</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-left">
                <p className="text-sm text-muted-foreground">الإجمالي</p>
                <p className="text-3xl font-bold text-primary">{total} ج.س</p>
              </div>
              <Button size="lg" onClick={handlePayment} className="px-8">
                دفع
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
