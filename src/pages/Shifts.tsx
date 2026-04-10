import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChevronRight,
  ChevronLeft,
  CalendarIcon,
  Clock,
  User,
  Banknote,
  CreditCard,
  TrendingUp,
  Eye,
  Play,
  Square,
} from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { ar } from "date-fns/locale";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo data types
interface ShiftInvoice {
  id: string;
  number: number;
  time: string;
  items: string[];
  total: number;
  paymentMethod: string;
}

interface Shift {
  id: string;
  name: string;
  user: string;
  cashAmount: number;
  serviceAmount: number;
  creditAmount: number;
  returnAmount: number;
  invoices: ShiftInvoice[];
}

// Demo data
const demoShiftsData: Record<string, Shift[]> = {
  "2026-04-10": [
    {
      id: "s1",
      name: "الوردية الصباحية",
      user: "أحمد محمد",
      cashAmount: 4500,
      serviceAmount: 2800,
      creditAmount: 600,
      returnAmount: 150,
      invoices: [
        { id: "inv1", number: 1, time: "08:15", items: ["بنادول أقراص", "أموكسيل"], total: 430, paymentMethod: "نقدي" },
        { id: "inv2", number: 2, time: "09:30", items: ["فولتارين جل"], total: 350, paymentMethod: "موبي كاش" },
        { id: "inv3", number: 3, time: "10:45", items: ["فيتامين C", "أوميغا 3"], total: 430, paymentMethod: "نقدي" },
        { id: "inv4", number: 4, time: "11:20", items: ["أوجمنتين"], total: 450, paymentMethod: "آجل" },
        { id: "inv5", number: 5, time: "12:00", items: ["قفازات طبية", "شاش طبي"], total: 140, paymentMethod: "نقدي" },
      ],
    },
    {
      id: "s2",
      name: "الوردية المسائية",
      user: "سارة علي",
      cashAmount: 3200,
      serviceAmount: 1900,
      creditAmount: 400,
      returnAmount: 0,
      invoices: [
        { id: "inv6", number: 6, time: "14:10", items: ["كريم واقي شمس"], total: 420, paymentMethod: "ادفع لي" },
        { id: "inv7", number: 7, time: "15:30", items: ["بنادول أقراص"], total: 150, paymentMethod: "نقدي" },
        { id: "inv8", number: 8, time: "17:00", items: ["غسول وجه", "كريم واقي شمس"], total: 800, paymentMethod: "نقدي" },
      ],
    },
  ],
};

type PaymentFilter = "cash" | "credit" | "service" | "return";

export default function Shifts() {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 3, 10));
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [filters, setFilters] = useState<PaymentFilter[]>([]);

  // Current shift management
  const [isShiftOpen, setIsShiftOpen] = useState(false);
  const [cashOnHand, setCashOnHand] = useState("");

  const dateKey = format(selectedDate, "yyyy-MM-dd");
  const shifts = demoShiftsData[dateKey] || [];

  const toggleFilter = (f: PaymentFilter) => {
    setFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  };

  const filteredInvoices = useMemo(() => {
    if (!selectedShift) return [];
    if (filters.length === 0) return selectedShift.invoices;
    const map: Record<PaymentFilter, string[]> = {
      cash: ["نقدي"],
      service: ["موبي كاش", "ادفع لي", "يسر باي", "تداول"],
      credit: ["آجل"],
      return: ["مسترجع"],
    };
    const allowed = filters.flatMap((f) => map[f]);
    return selectedShift.invoices.filter((inv) => allowed.includes(inv.paymentMethod));
  }, [selectedShift, filters]);

  const dayTotals = useMemo(() => {
    return shifts.reduce(
      (acc, s) => ({
        cash: acc.cash + s.cashAmount,
        service: acc.service + s.serviceAmount,
        credit: acc.credit + s.creditAmount,
        returnAmt: acc.returnAmt + s.returnAmount,
        total: acc.total + s.cashAmount + s.serviceAmount + s.creditAmount - s.returnAmount,
      }),
      { cash: 0, service: 0, credit: 0, returnAmt: 0, total: 0 }
    );
  }, [shifts]);

  const handleOpenShift = () => {
    if (!cashOnHand) {
      toast.error("أدخل العهدة النقدية");
      return;
    }
    setIsShiftOpen(true);
    toast.success("تم فتح الوردية بنجاح");
  };

  const handleCloseShift = () => {
    setIsShiftOpen(false);
    setCashOnHand("");
    toast.success("تم إغلاق الوردية بنجاح");
  };

  return (
    <div className="space-y-4">
      {/* Current Shift Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              الوردية الحالية
            </h2>
            <Badge variant={isShiftOpen ? "default" : "secondary"}>
              {isShiftOpen ? "مفتوحة" : "مغلقة"}
            </Badge>
          </div>
          {!isShiftOpen ? (
            <div className="flex items-end gap-3">
              <div className="flex-1 space-y-1">
                <Label className="text-xs">العهدة النقدية الأولية</Label>
                <Input
                  type="number"
                  value={cashOnHand}
                  onChange={(e) => setCashOnHand(e.target.value)}
                  placeholder="أدخل المبلغ"
                  className="h-9"
                />
              </div>
              <Button onClick={handleOpenShift} className="gap-2 h-9">
                <Play className="h-4 w-4" />
                فتح وردية
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-sm">
                <span>العهدة: <strong>{cashOnHand} ج.س</strong></span>
                <span>المبيعات النقدية: <strong>0 ج.س</strong></span>
                <span>الإلكترونية: <strong>0 ج.س</strong></span>
              </div>
              <Button variant="destructive" size="sm" onClick={handleCloseShift} className="gap-2">
                <Square className="h-3 w-3" />
                إغلاق الوردية
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Header Navigation */}
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => setSelectedDate(new Date())}
              >
                اليوم
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setSelectedDate((d) => addDays(d, 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <span className="font-bold text-sm px-2">
                {format(selectedDate, "EEEE d MMMM yyyy", { locale: ar })}
              </span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setSelectedDate((d) => subDays(d, 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => d && setSelectedDate(d)}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">من:</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    {dateFrom ? format(dateFrom, "yyyy/MM/dd") : "تحديد"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} className={cn("p-3 pointer-events-auto")} />
                </PopoverContent>
              </Popover>
              <span className="text-muted-foreground">إلى:</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    {dateTo ? format(dateTo, "yyyy/MM/dd") : "تحديد"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={dateTo} onSelect={setDateTo} className={cn("p-3 pointer-events-auto")} />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        {/* Main shifts list */}
        <div className="flex-1 space-y-3">
          {shifts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>لا توجد ورديات في هذا اليوم</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {shifts.map((shift) => {
                const shiftTotal = shift.cashAmount + shift.serviceAmount + shift.creditAmount - shift.returnAmount;
                return (
                  <Card
                    key={shift.id}
                    className="cursor-pointer hover:shadow-md hover:border-primary/30 transition-all"
                    onClick={() => setSelectedShift(shift)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-sm">{shift.name}</h3>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {shift.user}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1 text-primary">
                          <Eye className="h-4 w-4" />
                          التفاصيل
                        </Button>
                      </div>
                      <div className="grid grid-cols-5 gap-2 text-center">
                        <div className="bg-secondary rounded-lg p-2">
                          <p className="text-[10px] text-muted-foreground">نقدي</p>
                          <p className="text-sm font-bold text-success">{shift.cashAmount.toLocaleString()}</p>
                        </div>
                        <div className="bg-secondary rounded-lg p-2">
                          <p className="text-[10px] text-muted-foreground">خدمات</p>
                          <p className="text-sm font-bold text-primary">{shift.serviceAmount.toLocaleString()}</p>
                        </div>
                        <div className="bg-secondary rounded-lg p-2">
                          <p className="text-[10px] text-muted-foreground">آجل</p>
                          <p className="text-sm font-bold text-warning">{shift.creditAmount.toLocaleString()}</p>
                        </div>
                        <div className="bg-secondary rounded-lg p-2">
                          <p className="text-[10px] text-muted-foreground">مسترجع</p>
                          <p className="text-sm font-bold text-destructive">{shift.returnAmount.toLocaleString()}</p>
                        </div>
                        <div className="bg-primary/10 rounded-lg p-2">
                          <p className="text-[10px] text-muted-foreground">الإجمالي</p>
                          <p className="text-sm font-bold text-primary">{shiftTotal.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Day totals */}
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-4">
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    إجمالي اليوم
                  </h3>
                  <div className="grid grid-cols-5 gap-2 text-center">
                    <div className="bg-background rounded-lg p-2">
                      <p className="text-[10px] text-muted-foreground">نقدي</p>
                      <p className="text-lg font-bold text-success">{dayTotals.cash.toLocaleString()}</p>
                    </div>
                    <div className="bg-background rounded-lg p-2">
                      <p className="text-[10px] text-muted-foreground">خدمات</p>
                      <p className="text-lg font-bold text-primary">{dayTotals.service.toLocaleString()}</p>
                    </div>
                    <div className="bg-background rounded-lg p-2">
                      <p className="text-[10px] text-muted-foreground">آجل</p>
                      <p className="text-lg font-bold text-warning">{dayTotals.credit.toLocaleString()}</p>
                    </div>
                    <div className="bg-background rounded-lg p-2">
                      <p className="text-[10px] text-muted-foreground">مسترجع</p>
                      <p className="text-lg font-bold text-destructive">{dayTotals.returnAmt.toLocaleString()}</p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-2 border border-primary/20">
                      <p className="text-[10px] text-muted-foreground">الإجمالي</p>
                      <p className="text-lg font-bold text-primary">{dayTotals.total.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Filter sidebar */}
        <div className="w-48 shrink-0 hidden lg:block">
          <Card className="sticky top-4">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-bold text-sm">تصفية حسب الدفع</h3>
              {[
                { key: "cash" as PaymentFilter, label: "نقدي فقط", icon: Banknote, color: "text-success" },
                { key: "service" as PaymentFilter, label: "خدمات فقط", icon: CreditCard, color: "text-primary" },
                { key: "credit" as PaymentFilter, label: "آجل فقط", icon: Clock, color: "text-warning" },
                { key: "return" as PaymentFilter, label: "مسترجع فقط", icon: TrendingUp, color: "text-destructive" },
              ].map((f) => (
                <label key={f.key} className="flex items-center gap-2 cursor-pointer text-sm">
                  <Checkbox
                    checked={filters.includes(f.key)}
                    onCheckedChange={() => toggleFilter(f.key)}
                  />
                  <f.icon className={cn("h-3.5 w-3.5", f.color)} />
                  <span>{f.label}</span>
                </label>
              ))}
              {filters.length > 0 && (
                <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => setFilters([])}>
                  إزالة الفلاتر
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Shift Details Dialog */}
      <Dialog open={!!selectedShift} onOpenChange={(open) => !open && setSelectedShift(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              {selectedShift?.name} - {selectedShift?.user}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-right text-primary-foreground font-bold">رقم الفاتورة</TableHead>
                  <TableHead className="text-right text-primary-foreground font-bold">الوقت</TableHead>
                  <TableHead className="text-right text-primary-foreground font-bold">الأصناف</TableHead>
                  <TableHead className="text-right text-primary-foreground font-bold">الإجمالي</TableHead>
                  <TableHead className="text-right text-primary-foreground font-bold">طريقة الدفع</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-bold">#{inv.number}</TableCell>
                    <TableCell>{inv.time}</TableCell>
                    <TableCell className="text-xs">{inv.items.join("، ")}</TableCell>
                    <TableCell className="font-bold text-primary">{inv.total.toLocaleString()} ج.س</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{inv.paymentMethod}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredInvoices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      لا توجد فواتير مطابقة للفلتر
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
