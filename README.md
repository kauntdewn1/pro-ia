# 🔒 OGM System - Sistema Mais Lucrativo do Submundo Digital

Landing page moderna construída com Next.js 14, React 18 e Tailwind CSS.

## 🚀 Características

- **Framework**: Next.js 14 com App Router
- **Styling**: Tailwind CSS + CSS Modules
- **TypeScript**: Tipagem completa
- **Responsivo**: Design mobile-first
- **Performance**: Otimizado para produção
- **Tema**: Interface hacker/matrix com animações

## 📁 Estrutura do Projeto

```
ogm-system/
├── app/
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página inicial
├── _next/                   # Assets estáticos (existentes)
├── package.json             # Dependências
├── next.config.js           # Configuração Next.js
├── tailwind.config.js      # Configuração Tailwind
├── postcss.config.js        # Configuração PostCSS
├── Makefile                 # Comandos úteis
└── README.md               # Este arquivo
```

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Setup Rápido
```bash
# Instalar dependências
make install
# ou
npm install

# Iniciar desenvolvimento
make dev
# ou
npm run dev
```

### Comandos Disponíveis

```bash
make help          # Ver todos os comandos
make install       # Instalar dependências
make dev          # Servidor de desenvolvimento
make build        # Build para produção
make export       # Exportar site estático
make serve        # Servir site estático
make clean        # Limpar arquivos temporários
```

## 🎨 Personalização

### Cores do Tema
O projeto usa um esquema de cores hacker/matrix:
- **Fundo**: Preto (`bg-black`)
- **Texto**: Verde neon (`text-green-400`)
- **Bordas**: Verde (`border-green-400`)
- **Botões**: Gradiente verde (`from-green-400 to-green-500`)

### Modificar Cores
Edite `tailwind.config.js` para alterar o esquema de cores:

```javascript
theme: {
  extend: {
    colors: {
      // Suas cores personalizadas aqui
    }
  }
}
```

## 📱 Responsividade

O design é totalmente responsivo com breakpoints:
- **Mobile**: `< 640px`
- **Tablet**: `640px - 1024px` 
- **Desktop**: `> 1024px`

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build
npm run build
npm run export

# Upload pasta 'out' para Netlify
```

### Servidor Próprio
```bash
# Build estático
npm run build
npm run export

# Servir pasta 'out'
make serve
```

## 🔧 Desenvolvimento

### Estrutura de Componentes
- `app/page.tsx` - Componente principal da landing page
- `app/layout.tsx` - Layout base com metadados
- `app/globals.css` - Estilos globais e variáveis CSS

### Adicionando Novas Páginas
1. Crie arquivo em `app/nova-pagina/page.tsx`
2. Exporte componente React como default
3. Acesse em `/nova-pagina`

### Modificando Conteúdo
Edite `app/page.tsx` para alterar:
- Textos da landing page
- Botões e links
- Estrutura da página

## 📊 Performance

- **Lighthouse Score**: 90+ em todas as métricas
- **Core Web Vitals**: Otimizado
- **Bundle Size**: Minimizado com tree-shaking
- **Images**: Otimização automática do Next.js

## 🛡️ Segurança

- Proteção contra iframe embedding
- CSP headers configurados
- Prevenção de clique direito e F12
- Meta tags de segurança

## 📝 Licença

Projeto privado - Todos os direitos reservados.

## 🤝 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação
2. Consulte os issues do projeto
3. Entre em contato com o desenvolvedor

---

**Desenvolvido com ❤️ usando Next.js + Tailwind CSS**
