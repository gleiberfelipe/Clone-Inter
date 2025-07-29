import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, Avatar as AvatarComponent, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  Plus
} from "lucide-react";

interface InterAppProps {
  onNavigateToPix?: () => void;
  onNavigateToStatement?: () => void;
  onNavigateToCards?: () => void;
}

const InterApp = ({ onNavigateToPix, onNavigateToStatement, onNavigateToCards }: InterAppProps) => {
  const [showBalance, setShowBalance] = useState(true);

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <AvatarComponent className="h-10 w-10">
              <AvatarFallback className="bg-white/20 text-white font-semibold">
                MF
              </AvatarFallback>
            </AvatarComponent>
            <div>
              <p className="text-sm opacity-90">Olá,</p>
              <p className="font-semibold">Maria Fernanda</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-90">Saldo em conta</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div className="text-2xl font-bold">
              {showBalance ? `R$ ${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "R$ •••••"}
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-4 mb-6">
        <Card className="shadow-card">
          <div className="p-4">
            <div className="grid grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="flex flex-col gap-2 h-auto p-3 hover:bg-accent"
                  onClick={action.onClick}
                >
                  <action.icon className="h-6 w-6 text-primary" />
                  <span className="text-xs text-foreground">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="px-6 space-y-6">
        {/* Cards Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-card">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <PiggyBank className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Poupança</p>
                  <p className="text-lg font-semibold">
                    {showBalance ? `R$ ${savings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "R$ •••••"}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="shadow-card">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cartão de Crédito</p>
                  <p className="text-lg font-semibold">
                    {showBalance ? `R$ ${(creditLimit - creditUsed).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "R$ •••••"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Limite: R$ {creditLimit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onNavigateToCards}
                className="mt-2 text-xs"
              >
                Ver cartões
              </Button>
            </div>
          </Card>

          <Card className="shadow-card">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Investimentos</p>
                  <p className="text-lg font-semibold">
                    {showBalance ? "R$ 12.450,32" : "R$ •••••"}
                  </p>
                  <p className="text-xs text-success">+2,5% este mês</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="shadow-card">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Últimas transações</h3>
              <Button variant="ghost" size="sm" onClick={onNavigateToStatement}>
                Ver todas
              </Button>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'received' 
                        ? 'bg-success/10' 
                        : transaction.type === 'sent' 
                        ? 'bg-destructive/10' 
                        : 'bg-muted'
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
                    <p className={`font-semibold ${
                      transaction.amount > 0 ? 'text-success' : 'text-foreground'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}
                      R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    {transaction.highlight && (
                      <Badge variant="secondary" className="text-xs">
                        Salário
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* PIX Section */}
        <Card className="shadow-card">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">PIX</h3>
              <Button size="sm" className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Nova chave
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="flex flex-col gap-2 h-auto p-4">
                <QrCode className="h-6 w-6 text-primary" />
                <span className="text-xs">QR Code</span>
              </Button>
              <Button variant="outline" className="flex flex-col gap-2 h-auto p-4">
                <Smartphone className="h-6 w-6 text-primary" />
                <span className="text-xs">PIX Copia e Cola</span>
              </Button>
              <Button variant="outline" className="flex flex-col gap-2 h-auto p-4">
                <DollarSign className="h-6 w-6 text-primary" />
                <span className="text-xs">Cobrar</span>
              </Button>
              <Button variant="outline" className="flex flex-col gap-2 h-auto p-4">
                <Building className="h-6 w-6 text-primary" />
                <span className="text-xs">Minhas chaves</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="h-24"></div> {/* Bottom spacing */}
    </div>
  );
};

export default InterApp;