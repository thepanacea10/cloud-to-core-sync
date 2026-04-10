import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Pause, Play } from "lucide-react";
import { toast } from "sonner";
import { CategoryBar, ProductGrid, demoProducts } from "@/components/sales/CategoryProductGrid";
import { TodayInvoicesSidebar, type TodayInvoice } from "@/components/sales/TodayInvoicesSidebar";
import { InvoiceTable, type InvoiceItem } from "@/components/sales/InvoiceTable";
import { PaymentActions } from "@/components/sales/PaymentActions";
import type { Product } from "@/components/sales/CategoryProductGrid";

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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [todayInvoices, setTodayInvoices] = useState<TodayInvoice[]>([]);
  const [selectedTodayInvoice, setSelectedTodayInvoice] = useState<string | null>(null);
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
        handleSuspend();
      }
      if (e.key === "F10") {
        e.preventDefault();
        completePayment("نقدي");
      }
    },
    [activeInvoiceId, total]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const addProductToInvoice = (product: Product) => {
    const existing = activeInvoice?.items.find((i) => i.barcode === product.barcode);
    if (existing) {
      updateQuantity(existing.id, existing.quantity + 1);
      return;
    }
    const newItem: InvoiceItem = {
      id: String(Date.now()),
      productName: product.name,
      scientificName: product.scientificName,
      barcode: product.barcode,
      price: product.price,
      quantity: 1,
      available: product.available,
      expiry: product.expiry,
    };
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === activeInvoiceId ? { ...inv, items: [...inv.items, newItem] } : inv
      )
    );
    toast.success(`تم إضافة: ${product.name}`);
  };

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = demoProducts.find(
      (p) => p.barcode === searchQuery.trim() || p.name.includes(searchQuery.trim())
    );
    if (found) {
      addProductToInvoice(found);
    } else {
      toast.error("لم يتم العثور على الصنف");
    }
    setSearchQuery("");
  };

  const removeItem = (itemId: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === activeInvoiceId ? { ...inv, items: inv.items.filter((i) => i.id !== itemId) } : inv
      )
    );
  };

  const updateQuantity = (itemId: string, qty: number) => {
    if (qty < 1) return;
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === activeInvoiceId
          ? { ...inv, items: inv.items.map((i) => (i.id === itemId ? { ...i, quantity: qty } : i)) }
          : inv
      )
    );
  };

  const completePayment = (method: string) => {
    if (!activeInvoice?.items.length) {
      toast.error("الفاتورة فارغة");
      return;
    }
    const invoiceNumber = todayInvoices.length + 1;
    const now = new Date();
    setTodayInvoices((prev) => [
      {
        id: activeInvoiceId,
        number: invoiceNumber,
        total,
        time: `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`,
        itemsCount: activeInvoice.items.length,
      },
      ...prev,
    ]);
    toast.success(`تم الدفع بنجاح - ${method}`);
    const newId = String(Date.now());
    setInvoices((prev) => [
      ...prev.filter((inv) => inv.id !== activeInvoiceId),
      { id: newId, items: [], status: "active" },
    ]);
    setActiveInvoiceId(newId);
  };

  const handleSuspend = () => {
    if (!activeInvoice?.items.length) return;
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === activeInvoiceId ? { ...inv, status: "suspended" as const } : inv
      )
    );
    const newId = String(Date.now());
    setInvoices((prev) => [...prev, { id: newId, items: [], status: "active" as const }]);
    setActiveInvoiceId(newId);
    toast.info("تم تعليق الفاتورة");
  };

  const handleCancel = () => {
    if (!activeInvoice?.items.length) return;
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === activeInvoiceId ? { ...inv, items: [] } : inv
      )
    );
    toast.warning("تم إلغاء الفاتورة");
  };

  const suspendedInvoices = invoices.filter(
    (inv) => inv.status === "suspended" && inv.items.length > 0
  );

  return (
    <div className="flex gap-3 h-[calc(100vh-5rem)]">
      {/* RIGHT: Today's invoices sidebar */}
      <div className="w-48 shrink-0 hidden lg:flex flex-col gap-3">
        <Card className="h-full overflow-hidden flex flex-col">
          <TodayInvoicesSidebar
            invoices={todayInvoices}
            activeId={selectedTodayInvoice}
            onSelect={setSelectedTodayInvoice}
          />
        </Card>
      </div>

      {/* MIDDLE: Invoice basket */}
      <div className="w-80 shrink-0 flex flex-col gap-3 min-w-0">
        {/* Suspended invoices */}
        {suspendedInvoices.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {suspendedInvoices.map((inv) => (
              <Button
                key={inv.id}
                variant="outline"
                size="sm"
                onClick={() => {
                  setInvoices((prev) =>
                    prev.map((i) => (i.id === inv.id ? { ...i, status: "active" as const } : i))
                  );
                  setActiveInvoiceId(inv.id);
                }}
                className="gap-2 border-accent text-accent"
              >
                <Play className="h-3 w-3" />
                معلقة ({inv.items.length})
              </Button>
            ))}
          </div>
        )}

        {/* Invoice Table */}
        <Card className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <CardContent className="p-0 flex-1 flex flex-col">
            <InvoiceTable
              items={activeInvoice?.items || []}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
            />
          </CardContent>
        </Card>

        {/* Payment */}
        <Card>
          <CardContent className="p-3">
            <PaymentActions
              total={total}
              onPayCash={() => completePayment("نقدي")}
              onPayService={(m) => completePayment(m)}
              onPayCredit={() => completePayment("آجل")}
              onReturn={() => toast.info("وضع الاسترجاع - قريباً")}
              onCancel={handleCancel}
              onSuspend={handleSuspend}
              disabled={!activeInvoice?.items.length}
            />
          </CardContent>
        </Card>
      </div>

      {/* LEFT: Search + Categories + Product Grid */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        {/* Search bar */}
        <Card>
          <CardContent className="p-3">
            <form onSubmit={handleBarcodeSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  ref={barcodeRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="أدخل الباركود أو اسم الصنف (F2)"
                  className="pr-11 h-12 text-lg"
                />
              </div>
              <Button type="submit" size="lg" className="gap-2 h-12 px-6">
                <Plus className="h-5 w-5" />
                إضافة
              </Button>
              <Badge variant="outline" className="hidden xl:flex items-center text-xs whitespace-nowrap">
                F2: بحث | F4: تعليق | F10: دفع
              </Badge>
            </form>
          </CardContent>
        </Card>

        {/* Categories + Grid */}
        <Card className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <CardContent className="p-3 flex flex-col flex-1 min-h-0 gap-2">
            <CategoryBar selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
            <div className="flex-1 min-h-0">
              <ProductGrid selectedCategory={selectedCategory} onAddProduct={addProductToInvoice} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
