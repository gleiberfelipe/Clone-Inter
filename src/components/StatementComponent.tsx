import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { bankingService } from "./BankingService";
import { 
  ArrowLeft, 
  CalendarIcon, 
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface StatementComponentProps {
  onBack: () => void;
}

interface Transaction {
  id: string;
  date: string;
  type: "sent" | "received" | "payment" | "investment";
  description: string;
  amount: number;
  category?: string;
  endToEndId?: string;
}

const StatementComponent = ({ onBack }: StatementComponentProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState<Date>(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const { toast } = useToast();

  useEffect(() => {
    fetchStatement();
  }, [selectedPeriod]);

  const fetchStatement = async () => {
    try {
      setLoading(true);
      
      const endDate = new Date();
      const startDate = new Date();
      
      switch (selectedPeriod) {
        case "7days":
          startDate.setDate(endDate.getDate() - 7);
          break;
        case "30days":
          startDate.setDate(endDate.getDate() - 30);
          break;
        case "90days":
          startDate.setDate(endDate.getDate() - 90);
          break;
        default:
          startDate.setDate(endDate.getDate() - 30);
      }

      const apiTransactions = await bankingService.getStatement(
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );

      // Transformar dados da API para formato local
      const formattedTransactions: Transaction[] = [
        ...apiTransactions.map((tx: any, index: number) => ({
          id: tx.codigoTransacao || `tx_${index}`,
          date: tx.dataHoraTransacao || new Date().toISOString(),
          type: tx.valorTransacao > 0 ? "received" as const : "sent" as const,
          description: tx.descricaoTransacao || "Transação",
          amount: tx.valorTransacao || 0,
          category: tx.tipoTransacao || "PIX",
          endToEndId: tx.endToEndId
        })),
        // Mock data adicional para demonstração
        {
          id: "mock_1",
          date: new Date().toISOString(),
          type: "received" as const,
          description: "Salário - Empresa XYZ",
          amount: 4200.00,
          category: "Transferência"
        },
        {
          id: "mock_2",
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          type: "payment" as const,
          description: "Conta de luz - Enel",
          amount: -186.45,
          category: "Utilidades"
        },
        {
          id: "mock_3",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          type: "investment" as const,
          description: "Rendimento CDB",
          amount: 125.30,
          category: "Investimentos"
        }
      ];

      setTransactions(formattedTransactions);
    } catch (error) {
      toast({
        title: "Erro ao carregar extrato",
        description: "Não foi possível carregar as transações",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "received":
        return <ArrowDownLeft className="h-4 w-4 text-success" />;
      case "sent":
        return <ArrowUpRight className="h-4 w-4 text-destructive" />;
      case "investment":
        return <TrendingUp className="h-4 w-4 text-primary" />;
      default:
        return <Receipt className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTransactionBg = (type: string) => {
    switch (type) {
      case "received":
        return "bg-success/10";
      case "sent":
        return "bg-destructive/10";
      case "investment":
        return "bg-primary/10";
      default:
        return "bg-muted";
    }
  };

  const getTotalBalance = () => {
    return transactions.reduce((sum, tx) => sum + tx.amount, 0);
  };

  const getIncomeTotal = () => {
    return transactions.filter(tx => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0);
  };

  const getExpenseTotal = () => {
    return transactions.filter(tx => tx.amount < 0).reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  };

  const downloadStatement = () => {
    toast({
      title: "Download iniciado",
      description: "O extrato será baixado em formato PDF",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Extrato</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-xs opacity-90">Entradas</span>
            </div>
            <p className="text-lg font-semibold">
              R$ {getIncomeTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="h-4 w-4 text-destructive" />
              <span className="text-xs opacity-90">Saídas</span>
            </div>
            <p className="text-lg font-semibold">
              R$ {getExpenseTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Receipt className="h-4 w-4" />
              <span className="text-xs opacity-90">Saldo</span>
            </div>
            <p className={`text-lg font-semibold ${getTotalBalance() >= 0 ? 'text-success' : 'text-destructive'}`}>
              R$ {Math.abs(getTotalBalance()).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Filters */}
        <Card className="shadow-card">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filtros</h3>
              <Button variant="outline" size="sm" onClick={downloadStatement}>
                <Download className="h-4 w-4 mr-2" />
                Baixar PDF
              </Button>
            </div>

            <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="7days">7 dias</TabsTrigger>
                <TabsTrigger value="30days">30 dias</TabsTrigger>
                <TabsTrigger value="90days">90 dias</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </Card>

        {/* Transactions List */}
        <Card className="shadow-card">
          <div className="p-4">
            <h3 className="font-semibold mb-4">Transações</h3>
            
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Carregando transações...</p>
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhuma transação encontrada</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${getTransactionBg(transaction.type)}`}>
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(transaction.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                          </p>
                          {transaction.category && (
                            <Badge variant="outline" className="text-xs">
                              {transaction.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.amount > 0 ? 'text-success' : 'text-foreground'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}
                        R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      {transaction.endToEndId && (
                        <p className="text-xs text-muted-foreground">
                          {transaction.endToEndId}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StatementComponent;