import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "./BottomNavigation";
import interLogo from "@/assets/inter-logo.png";
import { 
  Eye, 
  EyeOff, 
  QrCode, 
  Send, 
  Receipt, 
  CreditCard, 
  TrendingUp,
  Bell,
  Settings,
  Smartphone,
  Banknote,
  PiggyBank,
  Building,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  User
} from "lucide-react";

interface InterAppProps {
  onNavigateToPix?: () => void;
  onNavigateToStatement?: () => void;
  onNavigateToCards?: () => void;
}

const InterApp = ({ onNavigateToPix, onNavigateToStatement, onNavigateToCards }: InterAppProps) => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  // Mock data - em produção seria da API
  const balance = 15847.32;
  const savings = 8920.45;
  const creditLimit = 5000.00;
  const creditUsed = 1250.00;

  const recentTransactions = [
    { id: 1, type: "sent", description: "PIX para João Silva", amount: -150.00, date: "Hoje, 14:30" },
    { id: 2, type: "received", description: "PIX recebido de Maria", amount: 280.50, date: "Hoje, 10:15" },
    { id: 3, type: "payment", description: "Conta de luz - Enel", amount: -186.45, date: "Ontem, 16:45" },
    { id: 4, type: "received", description: "Salário - Empresa XYZ", amount: 4200.00, date: "05/01", highlight: true },
  ];

  const quickActions = [
    { icon: QrCode, label: "PIX", action: "pix", onClick: onNavigateToPix },
    { icon: Send, label: "Transferir", action: "transfer" },
    { icon: Receipt, label: "Pagar", action: "payment" },
    { icon: Smartphone, label: "Recarga", action: "topup" },
  ];

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Header oficial do Inter */}
      <div className="bg-gradient-primary px-6 pt-12 pb-8 text-white relative">
        {/* Status bar spacing */}
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src={interLogo} alt="Inter" className="h-8 w-auto" />
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white/20">
              <AvatarFallback className="bg-white/10 text-white font-semibold backdrop-blur-sm">
                MF
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Greeting */}
        <div className="mb-6">
          <p className="text-sm opacity-75 font-normal">Olá,</p>
          <p className="text-2xl font-bold">Maria Fernanda</p>
        </div>

        {/* Saldo Card - Estilo Inter */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white shadow-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 opacity-75" />
                <span className="text-sm opacity-75 font-medium">Conta corrente</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div className="mb-2">
              <div className="text-3xl font-bold tracking-tight">
                {showBalance ? `R$ ${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "R$ •••••"}
              </div>
              <p className="text-sm opacity-75">Saldo disponível</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions - Estilo Inter */}
      <div className="px-6 -mt-6 mb-8 relative z-10">
        <Card className="shadow-elevation bg-card">
          <div className="p-6">
            <div className="grid grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="flex flex-col gap-3 h-auto p-4 hover:bg-accent/50 rounded-xl transition-all duration-200"
                  onClick={action.onClick}
                >
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <action.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Cards Section */}
      <div className="px-6 space-y-6">
        {/* Cards Overview - Estilo Inter */}
        <div className="grid grid-cols-1 gap-4">
          <Card className="shadow-card hover:shadow-elevation transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-success/10 rounded-xl">
                    <PiggyBank className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Poupança Inter</p>
                    <p className="text-xl font-bold">
                      {showBalance ? `R$ ${savings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "R$ •••••"}
                    </p>
                    <p className="text-xs text-success font-medium">+0,5% ao mês</p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </Card>

          <Card className="shadow-card hover:shadow-elevation transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Cartão de Crédito</p>
                    <p className="text-xl font-bold">
                      {showBalance ? `R$ ${(creditLimit - creditUsed).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "R$ •••••"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Limite de R$ {creditLimit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onNavigateToCards}
                  className="text-primary hover:bg-primary/10"
                >
                  Ver cartão
                </Button>
              </div>
            </div>
          </Card>

          <Card className="shadow-card hover:shadow-elevation transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-warning/10 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Investimentos</p>
                    <p className="text-xl font-bold">
                      {showBalance ? "R$ 12.450,32" : "R$ •••••"}
                    </p>
                    <p className="text-xs text-success font-medium">+2,5% este mês</p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Transactions - Estilo Inter */}
        <Card className="shadow-card">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Atividade</h3>
              <Button variant="ghost" size="sm" onClick={onNavigateToStatement} className="text-primary hover:bg-primary/10">
                Ver extrato
              </Button>
            </div>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 hover:bg-accent/30 rounded-lg px-3 -mx-3 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${
                      transaction.type === 'received' 
                        ? 'bg-success/10' 
                        : transaction.type === 'sent' 
                        ? 'bg-destructive/10' 
                        : 'bg-muted/50'
                    }`}>
                      {transaction.type === 'received' ? (
                        <ArrowDownLeft className={`h-4 w-4 text-success`} />
                      ) : transaction.type === 'sent' ? (
                        <ArrowUpRight className={`h-4 w-4 text-destructive`} />
                      ) : (
                        <Receipt className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm ${
                      transaction.amount > 0 ? 'text-success' : 'text-foreground'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}
                      R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    {transaction.highlight && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        Salário
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* PIX Section - Estilo Inter */}
        <Card className="shadow-card">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">PIX</h3>
              <Button size="sm" className="bg-gradient-primary hover:shadow-button transition-all">
                <Plus className="h-4 w-4 mr-2" />
                Nova chave
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="flex flex-col gap-3 h-auto p-6 hover:bg-accent/30 border-2 hover:border-primary/20 transition-all"
                onClick={onNavigateToPix}
              >
                <QrCode className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">QR Code</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col gap-3 h-auto p-6 hover:bg-accent/30 border-2 hover:border-primary/20 transition-all"
              >
                <Smartphone className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">Copia e Cola</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col gap-3 h-auto p-6 hover:bg-accent/30 border-2 hover:border-primary/20 transition-all"
              >
                <DollarSign className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">Cobrar</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col gap-3 h-auto p-6 hover:bg-accent/30 border-2 hover:border-primary/20 transition-all"
              >
                <User className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">Contatos</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === "pix") onNavigateToPix?.();
          if (tab === "cards") onNavigateToCards?.();
        }} 
      />

      <div className="h-20"></div> {/* Bottom spacing for navigation */}
    </div>
  );
};

export default InterApp;