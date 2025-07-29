# 🏦 Inter Bank - Clone React App

Um clone completo e funcional do aplicativo do Banco Inter desenvolvido em React com TypeScript, utilizando as APIs oficiais em modo sandbox.

## 🎯 **Funcionalidades Implementadas**

### 📱 **Interface Principal**
- ✅ Dashboard com saldo e resumo financeiro
- ✅ Identidade visual oficial do Banco Inter
- ✅ Fonte Inter personalizada
- ✅ Cores e gradientes originais (#FF5722)
- ✅ Navegação inferior estilo app nativo
- ✅ Animações e transições suaves

### 💰 **PIX Completo**
- ✅ Envio de PIX com validação
- ✅ Recebimento via QR Code
- ✅ Gerenciamento de chaves PIX (CPF, e-mail, telefone, aleatória)
- ✅ Histórico de contatos recentes
- ✅ Integração com API sandbox do Inter

### 📊 **Extrato Bancário**
- ✅ Filtros por período (7, 30, 90 dias)
- ✅ Categorização visual das transações
- ✅ Resumo de entradas, saídas e saldo
- ✅ Exportação em PDF
- ✅ Integração com API de extrato

### 💳 **Cartões**
- ✅ Visualização de cartão de crédito e débito
- ✅ Gestão de limite e fatura
- ✅ Bloqueio/desbloqueio instantâneo
- ✅ Histórico de compras recentes
- ✅ Configurações de segurança

### 🏦 **Produtos Bancários**
- ✅ Conta corrente com saldo
- ✅ Poupança Inter com rendimento
- ✅ Cartão de crédito com limite
- ✅ Investimentos com rentabilidade
- ✅ Todas as funcionalidades em tempo real

## 🛠 **Tecnologias Utilizadas**

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Vite** - Build tool moderna
- **shadcn/ui** - Componentes de interface
- **Lucide React** - Ícones modernos
- **Date-fns** - Manipulação de datas
- **React Query** - Gerenciamento de estado

## 🔧 **APIs do Inter Integradas**

### **Autenticação OAuth2**
```typescript
// Configuração das credenciais
const credentials = {
  clientId: 'seu_client_id',
  clientSecret: 'seu_client_secret'
}
```

### **Endpoints Implementados**
- `GET /banking/v2/saldo` - Consulta saldo
- `GET /banking/v2/extrato` - Extrato bancário
- `POST /pix/v2/cob` - Criar cobrança PIX
- `GET /pix/v2/cob/{txid}` - Consultar cobrança
- `POST /pix/v2/pix` - Enviar PIX
- `GET /banking/v2/conta` - Dados da conta

## 🚀 **Como Executar**

### **Pré-requisitos**
- Node.js 18+
- npm ou yarn

### **Instalação**
```bash
# Clone o repositório
git clone <YOUR_GIT_URL>

# Entre no diretório
cd inter-bank-clone

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

### **Configuração das APIs (Opcional)**
Para usar as APIs reais do Inter, configure as variáveis de ambiente:

```bash
# .env.local
VITE_INTER_CLIENT_ID=seu_client_id
VITE_INTER_CLIENT_SECRET=seu_client_secret
```

## 📁 **Estrutura do Projeto**

```
src/
├── components/          # Componentes React
│   ├── InterApp.tsx    # Dashboard principal
│   ├── PIXComponent.tsx # Funcionalidades PIX
│   ├── CardsComponent.tsx # Gestão de cartões
│   ├── StatementComponent.tsx # Extrato
│   ├── BankingService.ts # Integração APIs
│   └── BottomNavigation.tsx # Navegação
├── assets/             # Imagens e recursos
├── hooks/              # React hooks customizados
├── lib/                # Utilitários
└── pages/              # Páginas da aplicação
```

## 🎨 **Design System**

O projeto implementa fielmente a identidade visual do Banco Inter:

- **Cor Principal**: `#FF5722` (Laranja Inter)
- **Fonte**: Inter (Google Fonts)
- **Componentes**: Baseados no design oficial
- **Responsividade**: Mobile-first design
- **Acessibilidade**: Seguindo padrões WCAG

## 🔒 **Segurança**

- ✅ Autenticação OAuth2 com certificados
- ✅ Tokens com expiração automática
- ✅ Dados sensíveis mascarados
- ✅ Validação de entrada
- ✅ HTTPS obrigatório em produção

## 📱 **Funcionalidades Mobile**

- ✅ Interface responsiva
- ✅ Navegação por gestos
- ✅ Animações nativas
- ✅ Performance otimizada
- ✅ PWA ready

## 🧪 **Modo Sandbox**

O app funciona em modo sandbox por padrão, simulando todas as funcionalidades:

- 💰 Saldo simulado: R$ 15.847,32
- 💳 Limite de crédito: R$ 5.000,00
- 📊 Transações de exemplo
- 🔑 Chaves PIX pré-configuradas

## 🚀 **Deploy**

Para produção, configure:

1. **Certificados SSL** do Inter
2. **Variáveis de ambiente** de produção
3. **URLs das APIs** oficiais
4. **Validação adicional** de segurança

## 📄 **Licença**

Este projeto é apenas para fins educacionais e demonstração das capacidades de integração com as APIs do Banco Inter.

## 🤝 **Contribuição**

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 **Suporte**

Para dúvidas sobre as APIs do Inter, consulte:
- [Portal do Desenvolvedor Inter](https://developers.inter.co/)
- [Documentação Oficial](https://developers.inter.co/docs)

---

Desenvolvido com ❤️ usando as tecnologias mais modernas do mercado.