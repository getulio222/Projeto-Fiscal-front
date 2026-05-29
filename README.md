# 🌐 FiscalSaaS - Enterprise Frontend Platform

Plataforma front-end moderna desenvolvida em **Angular**, projetada para operar como um ecossistema **SaaS (Software as a Service)** corporativo. O sistema evoluiu de uma arquitetura CRUD monolítica para um modelo descentralizado de alta escalabilidade e performance.

---

## 🏗️ Diferenciais da Arquitetura SaaS

A aplicação foi reestruturada para atender às demandas de ambientes corporativos e distribuição em nuvem, destacando-se pelos seguintes pilares:

- **Arquitetura Multi-Tenant:** Isolamento lógico de dados, rotas e configurações visuais específicas para cada organização/cliente.
- **Componentização Standalone:** Eliminação de módulos pesados, garantindo carregamento sob demanda (_Lazy Loading_) e redução do tamanho dos pacotes de distribuição.
- **Reatividade com Signals:** Substituição de fluxos complexos de gerenciamento de estado por controle nativo e síncrono de reatividade.
- **Design System Fluido:** Interface limpa, responsiva e preparada para customizações dinâmicas de marca (_White-label_).

---

## ⚙️ Core Funcional da Aplicação

- **Identity Access Management (IAM):** Autenticação robusta baseada em JWT com controle de rotas por nível de acesso (_Guards_).
- **Módulo de Pessoas (Enterprise Management):** Fluxo simplificado de cadastro, auditoria, alteração e buscas otimizadas por chaves de identificação (CPF/Nome).
- **Core de Integração:** Camada de serviços (`HttpInterceptors`) acoplada ao ecossistema de microsserviços em Java Spring Boot.

---

## 🛠️ Stack Tecnológica

- **Core Framework:** Angular 18+ (Processo ativo de transição para v19)
- **Linguagem Principal:** TypeScript 5+
- **Engine Reativa:** Signals & RxJS
- **Estilização Dinâmica:** SCSS Estruturado

---

## 🚀 Guia de Inicialização Rápida

### Configuração do Ambiente

Certifique-se de possuir o Node.js instalado (versão estável recomendada) e o Angular CLI configurado no sistema.

1. **Acesse o diretório raiz do front-end:**
   ```bash
   cd projeto_fiscal-front
   ```
2. **Instale as dependências limpas do projeto:**
   ```bash
   npm install
   ```
3. **Inicie o ecossistema local em modo de desenvolvimento:**
   ```bash
   npm start
   ```

A plataforma estará disponível para acesso local através do endereço: [http://localhost:4200](http://localhost:4200).
