import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Receipt,
  ChefHat,
  Users,
  Truck,
  Boxes,
  FileText,
} from "lucide-react";
import { logout } from "@/services/auth";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

type UserMe = {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
};

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, adminOnly: false },
  { to: "/produtos", label: "Produtos", icon: Package, adminOnly: true },
  { to: "/vendas", label: "Vendas", icon: ShoppingCart, adminOnly: false },
  { to: "/despesas", label: "Despesas", icon: Receipt, adminOnly: true },
  
  {
  to: "/clientes",
  label: "Clientes",
  icon: Users,
  adminOnly: false,
},
{
  to: "/fornecedores",
  label: "Fornecedores",
  icon: Truck,
  adminOnly: true,
},
{
  to: "/inventory",
  label: "Estoque",
  adminOnly: true,
  icon: Boxes,
},
{
  to:"/reports/sales",
  label: "Rel. Vendas",
  adminOnly: true,
  icon: FileText,
},
{
  to: "/receitas",
  label: "Receitas",
  icon: ChefHat,
  adminOnly: true,
},

] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const [user, setUser] = useState<UserMe | null>(null);

 useEffect(() => {
  async function loadUser() {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const response = await api.get<UserMe>("me/");
      console.log("USUARIO LOGADO:", response.data);
      setUser(response.data);
    } catch {
      setUser(null);
    }
  }

  loadUser();
}, [pathname]);

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  const visibleLinks = links.filter((link) => {
    if (!link.adminOnly) return true;
    return user?.is_staff || user?.is_superuser;
  });

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <ChefHat className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-semibold leading-none">Restaurante</p>
          <p className="text-xs text-muted-foreground mt-1">
            {user?.is_staff || user?.is_superuser ? "Administrador" : "Funcionário"}
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {visibleLinks.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);

          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="px-6 py-3 border-t border-sidebar-border text-xs text-muted-foreground">
          Logado como:{" "}
          <span className="font-medium text-sidebar-foreground">
            {user.username}
          </span>
        </div>
      )}

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
        >
          Sair
        </button>
      </div>

      <div className="px-6 py-4 text-xs text-muted-foreground border-t border-sidebar-border">
        v0.1 · MVP
      </div>
    </aside>
  );
}