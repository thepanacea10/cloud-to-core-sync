import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, Square } from "lucide-react";
import { toast } from "sonner";

export default function Shifts() {
  const [isOpen, setIsOpen] = useState(false);
  const [cashOnHand, setCashOnHand] = useState("");

  const handleOpen = () => {
    if (!cashOnHand) {
      toast.error("أدخل العهدة النقدية");
      return;
    }
    setIsOpen(true);
    toast.success("تم فتح الوردية");
  };

  const handleClose = () => {
    setIsOpen(false);
    toast.success("تم إغلاق الوردية");
    setCashOnHand("");
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">إدارة الورديات</h1>
        <p className="text-muted-foreground">فتح وإغلاق الورديات وتسليم العهدة</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              الوردية الحالية
            </CardTitle>
            <Badge variant={isOpen ? "default" : "secondary"}>
              {isOpen ? "مفتوحة" : "مغلقة"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {!isOpen ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>العهدة النقدية الأولية</Label>
                <Input type="number" value={cashOnHand} onChange={(e) => setCashOnHand(e.target.value)} placeholder="أدخل المبلغ النقدي في الصندوق" />
              </div>
              <Button onClick={handleOpen} className="gap-2">
                <Play className="h-4 w-4" />
                فتح وردية جديدة
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">العهدة الأولية</p>
                  <p className="text-xl font-bold">{cashOnHand} ج.س</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">المبيعات النقدية</p>
                  <p className="text-xl font-bold">0 ج.س</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">المبيعات الإلكترونية</p>
                  <p className="text-xl font-bold">0 ج.س</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">المصاريف</p>
                  <p className="text-xl font-bold">0 ج.س</p>
                </div>
              </div>
              <Button variant="destructive" onClick={handleClose} className="gap-2">
                <Square className="h-4 w-4" />
                إغلاق الوردية
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
