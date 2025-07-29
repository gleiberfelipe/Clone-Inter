import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Copy,
  Settings,
  ShoppingCart,
  Wallet,
  TrendingUp,
  Receipt
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CardsComponentProps {
  onBack: () => void;
}

const CardsComponent = ({ onBack }: CardsComponentProps) => {
  const [showCardNumbers, setShowCardNumbers] = useState(false);
  const [cardLocked, setCardLocked] = useState(false);
  const { toast } = useToast();

  // Mock data - em produção seria da API
  const creditCard = {
    number: "5555 **** **** 1234",
    fullNumber: "5555 1234 5678 1234",
    name: "MARIA F SILVA",
    expiry: "12/28",
    cvv: "123",
    brand: "Mastercard",
    limit: 5000.00,
    used: 1250.00,
    available: 3750.00,
    invoice: {
      current: 1250.00,
      dueDate: "15/02/2024",
      minimum: 125.00
    }
  };

  const debitCard = {
    number: "4111 **** **** 5678",
    fullNumber: "4111 1111 1111 5678",
    name: "MARIA F SILVA",
    expiry: "08/27",
    brand: "Visa"
  };

  const recentPurchases = [
    { id: 1, merchant: "Amazon", amount: -89.90, date: "Hoje, 14:30", category: "Compras Online" },
    { id: 2, merchant: "Uber", amount: -25.50, date: "Hoje, 12:15", category: "Transporte" },
    { id: 3, merchant: "Padaria Central", amount: -15.80, date: "Ontem, 08:45", category: "Alimentação" },
    { id: 4, merchant: "Posto Shell", amount: -120.00, date: "Ontem, 18:30", category: "Combustível" },
  ];

  const toggleCardLock = () => {
    setCardLocked(!cardLocked);
    toast({
      title: cardLocked ? "Cartão desbloqueado" : "Cartão bloqueado",
      description: cardLocked ? "Seu cartão foi desbloqueado com sucesso" : "Seu cartão foi bloqueado temporariamente",
    });
  };

  const copyCardNumber = (number: string) => {
    navigator.clipboard.writeText(number.replace(/\s/g, ''));
    toast({
      title: "Número copiado!",
      description: "O número do cartão foi copiado para a área de transferência",
    });
  };

  const usagePercentage = (creditCard.used / creditCard.limit) * 100;

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Header estilo Inter */}
      <div className="bg-gradient-primary px-6 pt-12 pb-8 text-white">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/10 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Cartões</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <Tabs defaultValue="credit">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="credit">Cartão de Crédito</TabsTrigger>
            <TabsTrigger value="debit">Cartão de Débito</TabsTrigger>
          </TabsList>

          {/* Cartão de Crédito */}
          <TabsContent value="credit" className="space-y-6">
            {/* Credit Card Visual */}
            <Card className="shadow-elevation">
              <div className="relative bg-gradient-dark p-6 text-white rounded-lg overflow-hidden">
                <div className="absolute top-4 right-4">
                  <img 
                    src={`/placeholder.svg?height=40&width=60&text=${creditCard.brand}`} 
                    alt={creditCard.brand}
                    className="h-8 opacity-80"
                  />
                </div>
                
                <div className="mt-8 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-lg font-mono tracking-wider">
                      {showCardNumbers ? creditCard.fullNumber : creditCard.number}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-white hover:bg-white/20"
                      onClick={() => setShowCardNumbers(!showCardNumbers)}
                    >
                      {showCardNumbers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-70 mb-1">Nome do portador</p>
                      <p className="font-semibold">{creditCard.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-70 mb-1">Validade</p>
                      <p className="font-semibold">{creditCard.expiry}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={() => copyCardNumber(creditCard.fullNumber)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-white hover:bg-white/20 ${cardLocked ? 'text-destructive' : 'text-success'}`}
                    onClick={toggleCardLock}
                  >
                    {cardLocked ? <Lock className="h-4 w-4 mr-2" /> : <Unlock className="h-4 w-4 mr-2" />}
                    {cardLocked ? 'Bloqueado' : 'Ativo'}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Limit and Usage */}
            <Card className="shadow-card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Limite de crédito</h3>
                  <Badge variant={usagePercentage > 80 ? "destructive" : "secondary"}>
                    {usagePercentage.toFixed(1)}% usado
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <Progress value={usagePercentage} className="h-2" />
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Limite total</p>
                      <p className="text-lg font-semibold">
                        R$ {creditCard.limit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Usado</p>
                      <p className="text-lg font-semibold text-destructive">
                        R$ {creditCard.used.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Disponível</p>
                      <p className="text-lg font-semibold text-success">
                        R$ {creditCard.available.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Invoice */}
            <Card className="shadow-card">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Fatura atual</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold">
                      R$ {creditCard.invoice.current.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Vencimento: {creditCard.invoice.dueDate}
                    </p>
                  </div>
                  <Badge variant="outline">
                    Fechada
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-gradient-primary">
                    <Wallet className="h-4 w-4 mr-2" />
                    Pagar fatura
                  </Button>
                  <Button variant="outline">
                    <Receipt className="h-4 w-4 mr-2" />
                    Ver detalhes
                  </Button>
                </div>

                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">Pagamento mínimo:</span> R$ {creditCard.invoice.minimum.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Cartão de Débito */}
          <TabsContent value="debit" className="space-y-6">
            {/* Debit Card Visual */}
            <Card className="shadow-elevation">
              <div className="relative bg-gradient-primary p-6 text-white rounded-lg overflow-hidden">
                <div className="absolute top-4 right-4">
                  <img 
                    src={`/placeholder.svg?height=40&width=60&text=${debitCard.brand}`} 
                    alt={debitCard.brand}
                    className="h-8 opacity-80"
                  />
                </div>
                
                <div className="mt-8 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-lg font-mono tracking-wider">
                      {showCardNumbers ? debitCard.fullNumber : debitCard.number}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-white hover:bg-white/20"
                      onClick={() => setShowCardNumbers(!showCardNumbers)}
                    >
                      {showCardNumbers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-70 mb-1">Nome do portador</p>
                      <p className="font-semibold">{debitCard.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-70 mb-1">Validade</p>
                      <p className="font-semibold">{debitCard.expiry}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={() => copyCardNumber(debitCard.fullNumber)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar
                  </Button>
                  
                  <Badge variant="secondary" className="bg-white/20">
                    <Unlock className="h-4 w-4 mr-1" />
                    Ativo
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Configurações do cartão de débito */}
            <Card className="shadow-card">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Configurações</h3>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-3" />
                    Alterar senha
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Lock className="h-4 w-4 mr-3" />
                    Bloquear/Desbloquear
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-3" />
                    Limites de transação
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Purchases */}
        <Card className="shadow-card">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Compras recentes</h3>
            
            <div className="space-y-3">
              {recentPurchases.map((purchase) => (
                <div key={purchase.id} className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <ShoppingCart className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{purchase.merchant}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">{purchase.date}</p>
                        <Badge variant="outline" className="text-xs">
                          {purchase.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="font-semibold text-foreground">
                    R$ {Math.abs(purchase.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              Ver todas as transações
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CardsComponent;