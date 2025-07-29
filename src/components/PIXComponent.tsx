import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  QrCode, 
  Copy, 
  Check, 
  Smartphone,
  CreditCard,
  Building,
  Mail,
  Phone,
  ArrowLeft,
  Send,
  DollarSign
} from "lucide-react";

interface PIXComponentProps {
  onBack: () => void;
}

const PIXComponent = ({ onBack }: PIXComponentProps) => {
  const [activeTab, setActiveTab] = useState("send");
  const [pixKey, setPixKey] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Mock PIX keys - em produção seria da API
  const pixKeys = [
    { type: "cpf", key: "123.456.789-00", alias: "CPF" },
    { type: "email", key: "maria@email.com", alias: "E-mail" },
    { type: "phone", key: "(11) 99999-9999", alias: "Celular" },
    { type: "random", key: "a1b2c3d4-e5f6-7890-1234-567890abcdef", alias: "Chave aleatória" },
  ];

  const recentPixContacts = [
    { name: "João Silva", key: "joao@email.com", lastAmount: "R$ 150,00" },
    { name: "Maria Santos", key: "11999887766", lastAmount: "R$ 75,50" },
    { name: "Pedro Costa", key: "123.456.789-00", lastAmount: "R$ 320,00" },
  ];

  const handleSendPix = async () => {
    if (!pixKey || !amount) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha a chave PIX e o valor",
        variant: "destructive",
      });
      return;
    }

    // Simular chamada para API do Inter
    toast({
      title: "PIX enviado com sucesso!",
      description: `R$ ${amount} enviado para ${pixKey}`,
    });

    // Reset form
    setPixKey("");
    setAmount("");
    setDescription("");
  };

  const handleCopyPixKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    toast({
      title: "Chave copiada!",
      description: "A chave PIX foi copiada para a área de transferência",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const generateQRCode = () => {
    // Em produção, chamaria a API do Inter para gerar QR Code
    toast({
      title: "QR Code gerado!",
      description: "QR Code para cobrança criado com sucesso",
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
          <h1 className="text-xl font-semibold">PIX</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="send">Enviar</TabsTrigger>
            <TabsTrigger value="receive">Receber</TabsTrigger>
            <TabsTrigger value="keys">Minhas chaves</TabsTrigger>
          </TabsList>

          {/* Enviar PIX */}
          <TabsContent value="send" className="space-y-6">
            <Card className="shadow-card">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Enviar PIX</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="pix-key">Chave PIX ou dados do destinatário</Label>
                    <Input
                      id="pix-key"
                      placeholder="CPF, e-mail, telefone ou chave aleatória"
                      value={pixKey}
                      onChange={(e) => setPixKey(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="amount">Valor</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        R$
                      </span>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0,00"
                        className="pl-10"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição (opcional)</Label>
                    <Input
                      id="description"
                      placeholder="Descrição da transferência"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <Button onClick={handleSendPix} className="w-full bg-gradient-primary">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar PIX
                  </Button>
                </div>
              </div>
            </Card>

            {/* Contatos recentes */}
            <Card className="shadow-card">
              <div className="p-6">
                <h4 className="font-semibold mb-4">Contatos recentes</h4>
                <div className="space-y-3">
                  {recentPixContacts.map((contact, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 hover:bg-accent rounded-lg cursor-pointer transition-colors"
                      onClick={() => setPixKey(contact.key)}
                    >
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.key}</p>
                      </div>
                      <Badge variant="outline">{contact.lastAmount}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Receber PIX */}
          <TabsContent value="receive" className="space-y-6">
            <Card className="shadow-card">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Receber PIX</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="receive-amount">Valor (opcional)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        R$
                      </span>
                      <Input
                        id="receive-amount"
                        type="number"
                        placeholder="0,00"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="receive-description">Descrição (opcional)</Label>
                    <Input
                      id="receive-description"
                      placeholder="Descrição da cobrança"
                    />
                  </div>

                  <Button onClick={generateQRCode} className="w-full bg-gradient-primary">
                    <QrCode className="h-4 w-4 mr-2" />
                    Gerar QR Code
                  </Button>
                </div>
              </div>
            </Card>

            {/* QR Code simulado */}
            <Card className="shadow-card">
              <div className="p-6 text-center">
                <div className="bg-muted w-32 h-32 mx-auto mb-4 rounded-lg flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  QR Code para recebimento via PIX
                </p>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Minhas chaves PIX */}
          <TabsContent value="keys" className="space-y-6">
            <Card className="shadow-card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Minhas chaves PIX</h3>
                  <Button size="sm" className="bg-gradient-primary">
                    Nova chave
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {pixKeys.map((key, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {key.type === 'cpf' && <CreditCard className="h-4 w-4 text-primary" />}
                          {key.type === 'email' && <Mail className="h-4 w-4 text-primary" />}
                          {key.type === 'phone' && <Phone className="h-4 w-4 text-primary" />}
                          {key.type === 'random' && <Building className="h-4 w-4 text-primary" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{key.alias}</p>
                          <p className="text-xs text-muted-foreground">{key.key}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopyPixKey(key.key)}
                      >
                        {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PIXComponent;