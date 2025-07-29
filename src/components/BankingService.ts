// Serviço para integração com APIs do Inter Bank
// Em produção, use as credenciais reais da API do Inter

const API_BASE_URL = "https://cdpj.partners.bancointer.com.br"; // URL sandbox do Inter
const TOKEN_URL = "https://cdpj.partners.bancointer.com.br/oauth/v2/token";

interface InterApiCredentials {
  clientId: string;
  clientSecret: string;
  certificatePath?: string; // Para ambiente de produção
  privateKeyPath?: string; // Para ambiente de produção
}

class BankingService {
  private credentials: InterApiCredentials;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(credentials: InterApiCredentials) {
    this.credentials = credentials;
  }

  // Autenticação OAuth2
  async authenticate(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      // Em ambiente de desenvolvimento, simular autenticação
      if (process.env.NODE_ENV === 'development') {
        this.accessToken = 'mock_access_token_' + Date.now();
        this.tokenExpiry = Date.now() + 3600 * 1000; // 1 hora
        return this.accessToken;
      }

      const response = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.credentials.clientId,
          client_secret: this.credentials.clientSecret,
          scope: 'extrato.read boleto-cobranca.read boleto-cobranca.write pix.read pix.write webhook.write'
        })
      });

      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000);
      
      return this.accessToken;
    } catch (error) {
      console.error('Erro na autenticação:', error);
      throw new Error('Falha na autenticação com a API do Inter');
    }
  }

  // Consultar saldo
  async getBalance(): Promise<{ saldo: number; saldoDisponivel: number }> {
    try {
      const token = await this.authenticate();
      
      // Mock data para desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        return {
          saldo: 15847.32,
          saldoDisponivel: 15847.32
        };
      }

      const response = await fetch(`${API_BASE_URL}/banking/v2/saldo`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    } catch (error) {
      console.error('Erro ao consultar saldo:', error);
      throw error;
    }
  }

  // Consultar extrato
  async getStatement(dataInicio: string, dataFim: string): Promise<any[]> {
    try {
      const token = await this.authenticate();
      
      // Mock data para desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        return [
          {
            dataHoraTransacao: new Date().toISOString(),
            tipoTransacao: "PIX",
            valorTransacao: -150.00,
            descricaoTransacao: "PIX para João Silva",
            codigoTransacao: "TXN001"
          },
          {
            dataHoraTransacao: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            tipoTransacao: "PIX",
            valorTransacao: 280.50,
            descricaoTransacao: "PIX recebido de Maria",
            codigoTransacao: "TXN002"
          }
        ];
      }

      const response = await fetch(
        `${API_BASE_URL}/banking/v2/extrato?dataInicio=${dataInicio}&dataFim=${dataFim}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();
      return data.transacoes || [];
    } catch (error) {
      console.error('Erro ao consultar extrato:', error);
      throw error;
    }
  }

  // Criar cobrança PIX
  async createPixCharge(valor: number, chave: string, solicitacaoPagador?: string): Promise<any> {
    try {
      const token = await this.authenticate();
      
      // Mock response para desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        return {
          txid: 'mock_txid_' + Date.now(),
          emv: 'mock_emv_qr_code_string',
          chave: chave,
          valor: { original: valor.toString() },
          status: 'ATIVA'
        };
      }

      const payload = {
        calendario: {
          expiracao: 3600 // 1 hora
        },
        valor: {
          original: valor.toFixed(2)
        },
        chave: chave,
        solicitacaoPagador: solicitacaoPagador || ''
      };

      const response = await fetch(`${API_BASE_URL}/pix/v2/cob`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      return await response.json();
    } catch (error) {
      console.error('Erro ao criar cobrança PIX:', error);
      throw error;
    }
  }

  // Consultar cobrança PIX
  async getPixCharge(txid: string): Promise<any> {
    try {
      const token = await this.authenticate();
      
      if (process.env.NODE_ENV === 'development') {
        return {
          txid: txid,
          status: 'CONCLUIDA',
          valor: { original: '100.00' },
          chave: 'mock@email.com'
        };
      }

      const response = await fetch(`${API_BASE_URL}/pix/v2/cob/${txid}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    } catch (error) {
      console.error('Erro ao consultar cobrança PIX:', error);
      throw error;
    }
  }

  // Realizar pagamento PIX
  async sendPix(chave: string, valor: number, descricao?: string): Promise<any> {
    try {
      const token = await this.authenticate();
      
      // Mock response para desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        return {
          endToEndId: 'E' + Date.now(),
          txid: 'pix_' + Date.now(),
          valor: valor.toString(),
          chave: chave,
          status: 'REALIZADA'
        };
      }

      const payload = {
        chave: chave,
        valor: valor.toFixed(2),
        infoPagador: descricao || ''
      };

      const response = await fetch(`${API_BASE_URL}/pix/v2/pix`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      return await response.json();
    } catch (error) {
      console.error('Erro ao enviar PIX:', error);
      throw error;
    }
  }

  // Consultar dados bancários
  async getAccountInfo(): Promise<any> {
    try {
      const token = await this.authenticate();
      
      if (process.env.NODE_ENV === 'development') {
        return {
          numeroContaCompleta: "00000000-0",
          nomeCorrentista: "Maria Fernanda Silva",
          cpfCnpjCorrentista: "123.456.789-00"
        };
      }

      const response = await fetch(`${API_BASE_URL}/banking/v2/conta`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    } catch (error) {
      console.error('Erro ao consultar dados da conta:', error);
      throw error;
    }
  }
}

// Instância singleton do serviço bancário
export const bankingService = new BankingService({
  clientId: process.env.VITE_INTER_CLIENT_ID || 'mock_client_id',
  clientSecret: process.env.VITE_INTER_CLIENT_SECRET || 'mock_client_secret'
});

export default BankingService;