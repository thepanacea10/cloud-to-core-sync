import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Category {
  id: string;
  name: string;
  icon: string;
}

const defaultCategories: Category[] = [
  { id: "all", name: "الكل", icon: "📦" },
  { id: "general", name: "أدوية عامة", icon: "💊" },
  { id: "controlled", name: "مخدرة", icon: "🔒" },
  { id: "medical", name: "مستلزمات طبية", icon: "🩺" },
  { id: "cosmetics", name: "تجميل", icon: "✨" },
  { id: "supplements", name: "مكملات غذائية", icon: "🌿" },
];

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  barcode: string;
  scientificName: string;
  available: number;
  expiry: string;
}

const demoProducts: Product[] = [
  { id: "1", name: "بنادول أقراص", price: 150, category: "general", barcode: "1001", scientificName: "Paracetamol", available: 120, expiry: "2027-03" },
  { id: "2", name: "أموكسيل كبسولات", price: 280, category: "general", barcode: "1002", scientificName: "Amoxicillin", available: 45, expiry: "2026-11" },
  { id: "3", name: "فولتارين جل", price: 350, category: "general", barcode: "1003", scientificName: "Diclofenac", available: 30, expiry: "2027-06" },
  { id: "4", name: "ترامادول", price: 500, category: "controlled", barcode: "2001", scientificName: "Tramadol", available: 10, expiry: "2026-09" },
  { id: "5", name: "قفازات طبية", price: 80, category: "medical", barcode: "3001", scientificName: "-", available: 200, expiry: "2028-01" },
  { id: "6", name: "كريم واقي شمس", price: 420, category: "cosmetics", barcode: "4001", scientificName: "SPF 50+", available: 25, expiry: "2027-08" },
  { id: "7", name: "فيتامين C", price: 180, category: "supplements", barcode: "5001", scientificName: "Ascorbic Acid", available: 60, expiry: "2027-12" },
  { id: "8", name: "أوجمنتين", price: 450, category: "general", barcode: "1004", scientificName: "Amoxicillin/Clavulanate", available: 35, expiry: "2026-10" },
  { id: "9", name: "كودايين", price: 320, category: "controlled", barcode: "2002", scientificName: "Codeine", available: 8, expiry: "2026-08" },
  { id: "10", name: "شاش طبي", price: 60, category: "medical", barcode: "3002", scientificName: "-", available: 150, expiry: "2028-06" },
  { id: "11", name: "غسول وجه", price: 380, category: "cosmetics", barcode: "4002", scientificName: "Salicylic Acid", available: 18, expiry: "2027-05" },
  { id: "12", name: "أوميغا 3", price: 250, category: "supplements", barcode: "5002", scientificName: "Fish Oil", available: 40, expiry: "2027-09" },
];

interface CategoryBarProps {
  selectedCategory: string;
  onSelect: (id: string) => void;
}

export function CategoryBar({ selectedCategory, onSelect }: CategoryBarProps) {
  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 pb-2">
        {defaultCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? "bg-accent text-accent-foreground shadow-sm"
                : "bg-secondary text-secondary-foreground hover:bg-primary/10"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

interface ProductGridProps {
  selectedCategory: string;
  onAddProduct: (product: Product) => void;
}

export function ProductGrid({ selectedCategory, onAddProduct }: ProductGridProps) {
  const filtered = selectedCategory === "all"
    ? demoProducts
    : demoProducts.filter((p) => p.category === selectedCategory);

  return (
    <ScrollArea className="h-[280px]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-1">
        {filtered.map((product) => (
          <Card
            key={product.id}
            className="cursor-pointer hover:shadow-md hover:border-accent transition-all"
            onClick={() => onAddProduct(product)}
          >
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-secondary flex items-center justify-center text-lg">
                💊
              </div>
              <p className="text-xs font-semibold truncate">{product.name}</p>
              <p className="text-xs text-muted-foreground truncate">{product.scientificName}</p>
              <Badge variant="outline" className="mt-1 text-xs font-bold">
                {product.price} ج.س
              </Badge>
              {product.available <= 10 && (
                <p className="text-[10px] text-destructive mt-1">متبقي: {product.available}</p>
              )}
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-8 text-sm">
            لا توجد أصناف في هذا التصنيف
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

export { demoProducts };
export type { Product };
