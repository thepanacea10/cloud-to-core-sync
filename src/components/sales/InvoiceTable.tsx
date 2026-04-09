import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface InvoiceItem {
  id: string;
  productName: string;
  scientificName: string;
  barcode: string;
  price: number;
  quantity: number;
  available: number;
  expiry: string;
}

interface InvoiceTableProps {
  items: InvoiceItem[];
  onUpdateQuantity: (itemId: string, qty: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export function InvoiceTable({ items, onUpdateQuantity, onRemoveItem }: InvoiceTableProps) {
  return (
    <ScrollArea className="flex-1">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary">
            <TableHead className="text-right text-primary-foreground font-bold">#</TableHead>
            <TableHead className="text-right text-primary-foreground font-bold">اسم الصنف</TableHead>
            <TableHead className="text-right text-primary-foreground font-bold">الاسم العلمي</TableHead>
            <TableHead className="text-right text-primary-foreground font-bold">الصلاحية</TableHead>
            <TableHead className="text-right text-primary-foreground font-bold">السعر</TableHead>
            <TableHead className="text-right text-primary-foreground font-bold">الكمية</TableHead>
            <TableHead className="text-right text-primary-foreground font-bold">المتاح</TableHead>
            <TableHead className="text-right text-primary-foreground font-bold">الإجمالي</TableHead>
            <TableHead className="text-right text-primary-foreground w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-muted-foreground py-12">
                أدخل الباركود أو اختر صنف من الشبكة لبدء الفاتورة
              </TableCell>
            </TableRow>
          )}
          {items.map((item, idx) => (
            <TableRow key={item.id} className="hover:bg-secondary/50">
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell className="font-semibold">{item.productName}</TableCell>
              <TableCell className="text-muted-foreground text-xs">{item.scientificName}</TableCell>
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
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="w-16 text-center h-8"
                />
              </TableCell>
              <TableCell>
                <span className="text-muted-foreground/50 text-xs">{item.available}</span>
              </TableCell>
              <TableCell className="font-bold text-primary">
                {item.price * item.quantity}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveItem(item.id)}
                  className="h-7 w-7 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
