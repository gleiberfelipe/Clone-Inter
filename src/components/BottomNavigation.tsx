import { Button } from "@/components/ui/button";
import { 
  Home, 
  QrCode, 
  CreditCard, 
  TrendingUp,
  User
} from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const navItems = [
    { id: "home", icon: Home, label: "Início" },
    { id: "pix", icon: QrCode, label: "PIX" },
    { id: "cards", icon: CreditCard, label: "Cartões" },
    { id: "invest", icon: TrendingUp, label: "Investir" },
    { id: "profile", icon: User, label: "Perfil" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="grid grid-cols-5 max-w-md mx-auto">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`flex flex-col gap-1 h-auto p-3 rounded-none ${
              activeTab === item.id 
                ? 'text-primary bg-primary/5' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => onTabChange(item.id)}
          >
            <item.icon className={`h-5 w-5 ${activeTab === item.id ? 'text-primary' : ''}`} />
            <span className="text-xs font-medium">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;