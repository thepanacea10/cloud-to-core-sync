import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Truck,
  Users,
  Building2,
  CreditCard,
  Clock,
  BarChart3,
  Settings,
  Pill,
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "لوحة التحكم", url: "/dashboard", icon: LayoutDashboard },
  { title: "المبيعات", url: "/sales", icon: ShoppingCart },
  { title: "المخزون", url: "/inventory", icon: Package },
  { title: "المشتريات", url: "/purchases", icon: Truck },
];

const accountItems = [
  { title: "الزبائن", url: "/customers", icon: Users },
  { title: "الموردين", url: "/suppliers", icon: Building2 },
  { title: "المصاريف", url: "/expenses", icon: CreditCard },
];

const managementItems = [
  { title: "الورديات", url: "/shifts", icon: Clock },
  { title: "التقارير", url: "/reports", icon: BarChart3 },
  { title: "التوصيل", url: "/delivery", icon: Truck },
  { title: "الأدوية المخدرة", url: "/controlled-drugs", icon: Pill },
  { title: "الإعدادات", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const renderItems = (items: typeof mainItems) =>
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <NavLink
            to={item.url}
            end
            className="hover:bg-sidebar-accent/50 gap-3"
            activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

  return (
    <Sidebar collapsible="icon" side="right">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Pill className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-sm text-sidebar-foreground">منظومة الصيدلية</h2>
              <p className="text-xs text-sidebar-foreground/60">إدارة متكاملة</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs">
            {!collapsed && "الرئيسية"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(mainItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs">
            {!collapsed && "الحسابات"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(accountItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs">
            {!collapsed && "الإدارة"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(managementItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-destructive hover:bg-destructive/10 gap-3">
              <LogOut className="h-5 w-5" />
              {!collapsed && <span>تسجيل الخروج</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
