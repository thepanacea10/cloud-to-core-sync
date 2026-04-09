import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

interface TodayInvoice {
  id: string;
  number: number;
  total: number;
  time: string;
  itemsCount: number;
}

interface TodayInvoicesSidebarProps {
  invoices: TodayInvoice[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export function TodayInvoicesSidebar({ invoices, activeId, onSelect }: TodayInvoicesSidebarProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b bg-primary text-primary-foreground rounded-t-lg">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <FileText className="h-4 w-4" />
          فواتير اليوم
        </h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {invoices.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-6">لا توجد فواتير بعد</p>
          )}
          {invoices.map((inv) => (
            <button
              key={inv.id}
              onClick={() => onSelect(inv.id)}
              className={`w-full text-right p-2 rounded-md text-xs transition-all ${
                activeId === inv.id
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-secondary"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">#{inv.number}</span>
                <span className="text-muted-foreground">{inv.time}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span>{inv.itemsCount} أصناف</span>
                <span className="font-semibold">{inv.total} ج.س</span>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export type { TodayInvoice };
