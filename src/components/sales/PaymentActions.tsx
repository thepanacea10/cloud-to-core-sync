import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Banknote, CreditCard, Clock, Undo2, X, Pause, ChevronDown } from "lucide-react";

interface PaymentActionsProps {
  total: number;
  onPayCash: () => void;
  onPayService: (method: string) => void;
  onPayCredit: () => void;
  onReturn: () => void;
  onCancel: () => void;
  onSuspend: () => void;
  disabled: boolean;
}

export function PaymentActions({
  total,
  onPayCash,
  onPayService,
  onPayCredit,
  onReturn,
  onCancel,
  onSuspend,
  disabled,
}: PaymentActionsProps) {
  return (
    <div className="space-y-3">
      {/* Total */}
      <div className="text-center py-3 bg-secondary rounded-lg">
        <p className="text-xs text-muted-foreground">المجموع النهائي</p>
        <p className="text-3xl font-bold text-primary">{total.toLocaleString()} ج.س</p>
      </div>

      {/* Payment buttons row */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          size="lg"
          onClick={onPayCash}
          disabled={disabled}
          className="bg-success hover:bg-success/90 text-success-foreground gap-2 font-bold"
        >
          <Banknote className="h-5 w-5" />
          نقدي
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="lg"
              disabled={disabled}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-bold"
            >
              <CreditCard className="h-5 w-5" />
              خدمات
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onPayService("موبي كاش")}>
              موبي كاش
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPayService("ادفع لي")}>
              ادفع لي
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPayService("يسر باي")}>
              يسر باي
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPayService("تداول")}>
              تداول
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Secondary actions */}
      <div className="grid grid-cols-4 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPayCredit}
          disabled={disabled}
          className="gap-1 text-xs"
        >
          <Clock className="h-3 w-3" />
          آجل
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onReturn}
          className="gap-1 text-xs"
        >
          <Undo2 className="h-3 w-3" />
          استرجاع
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          disabled={disabled}
          className="gap-1 text-xs text-destructive hover:text-destructive"
        >
          <X className="h-3 w-3" />
          إلغاء
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onSuspend}
          disabled={disabled}
          className="gap-1 text-xs"
        >
          <Pause className="h-3 w-3" />
          تعليق F4
        </Button>
      </div>
    </div>
  );
}
