import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Filter, Edit } from "lucide-react";

interface Product {
  id: string;
  name: string;
  scientificName: string;
  barcode: string;
  category: string;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  expiry: string;
  supplier: string;
  minStock: number;
}

const demoProducts: Product[] = [];

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.includes(search) ||
      p.barcode.includes(search) ||
      p.scientificName.includes(search);
    const matchCategory = filterCategory === "all" || p.category === filterCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">إدارة المخزون</h1>
          <p className="text-muted-foreground">إدارة الأصناف وتتبع الكميات والصلاحيات</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 ml-1" />
              صنف جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>بطاقة صنف جديد</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>اسم الصنف</Label>
                <Input placeholder="اسم الصنف التجاري" />
              </div>
              <div className="space-y-2">
                <Label>الاسم العلمي</Label>
                <Input placeholder="الاسم العلمي" />
              </div>
              <div className="space-y-2">
                <Label>الباركود</Label>
                <Input placeholder="أدخل أو سيتم توليده تلقائياً" />
              </div>
              <div className="space-y-2">
                <Label>التصنيف</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medicine">أدوية</SelectItem>
                    <SelectItem value="cosmetics">مستحضرات تجميل</SelectItem>
                    <SelectItem value="supplements">مكملات غذائية</SelectItem>
                    <SelectItem value="equipment">أجهزة طبية</SelectItem>
                    <SelectItem value="other">أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>سعر الشراء</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>سعر البيع</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>الحد الأدنى للكمية</Label>
                <Input type="number" placeholder="10" />
              </div>
              <div className="space-y-2">
                <Label>المورد</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المورد" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">بدون مورد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={() => setDialogOpen(false)}>حفظ الصنف</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="بحث بالاسم أو الباركود..."
                className="pr-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع التصنيفات</SelectItem>
                <SelectItem value="medicine">أدوية</SelectItem>
                <SelectItem value="cosmetics">مستحضرات تجميل</SelectItem>
                <SelectItem value="supplements">مكملات غذائية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الاسم</TableHead>
                <TableHead className="text-right">الباركود</TableHead>
                <TableHead className="text-right">التصنيف</TableHead>
                <TableHead className="text-right">الكمية</TableHead>
                <TableHead className="text-right">سعر البيع</TableHead>
                <TableHead className="text-right">الصلاحية</TableHead>
                <TableHead className="text-right">المورد</TableHead>
                <TableHead className="text-right w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-12">
                    لا توجد أصناف - أضف صنفاً جديداً للبدء
                  </TableCell>
                </TableRow>
              )}
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.scientificName}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{product.barcode}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.quantity <= product.minStock ? "destructive" : "outline"}>
                      {product.quantity}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.sellPrice}</TableCell>
                  <TableCell>{product.expiry}</TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
