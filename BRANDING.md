# 🎨 PRO.IA · Branding Guidelines

## 🚀 Identidade Visual

**Nome:** PRO.IA  
**Tagline:** Transforme IA em Faturamento  
**Descrição:** Método validado para gerar renda real com IA em 72h

## 🎨 Paleta de Cores Oficiais

### Cores Primárias
- **Roxão Primário:** `#1b1330` - Background principal, cards dark
- **Roxo Secundário:** `#381f57` - Bordas, elementos de destaque
- **Azul iOS:** `#007AFF` - Botões primários, links, highlights
- **Branco iOS:** `#F2F2F7` - Texto principal em dark mode
- **Dark iOS:** `#1C1C1E` - Background dark, contrastes

### Cores Secundárias (Cyberpunk)
- **Neon Pink:** `#ff2dac` - CTA buttons, glow effects
- **Neon Blue:** `#00d4ff` - Accents, secondary highlights
- **Neon Purple:** `#b026ff` - Glow effects, cyberpunk elements
- **Neon Cyan:** `#00ffff` - Terminal text, code highlights
- **Neon Magenta:** `#ff00ff` - Special effects, premium features

### Cores de Status
- **Success:** `#34C759` - Confirmações, checkmarks
- **Warning:** `#FF9500` - Avisos, atenção
- **Error:** `#FF3B30` - Erros, alertas críticos
- **Info:** `#007AFF` - Informações gerais

## 🔠 Tipografia

### Fonte Principal
**Avenir Next** - Fonte oficial do sistema iOS

**Pesos disponíveis:**
- **Regular (400):** Texto corrido, descrições
- **Medium (500):** Subtítulos, labels
- **Semibold (600):** Títulos secundários
- **Bold (700):** Títulos principais, CTAs

**Fallbacks web:**
```css
Avenir Next, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif
```

### Hierarquia Tipográfica
- **H1 (Hero):** 48px/60px, Bold, Line-height: 1.2
- **H2 (Section):** 36px/48px, Bold, Line-height: 1.3
- **H3 (Subsection):** 24px/32px, Semibold, Line-height: 1.4
- **H4 (Card Title):** 20px/28px, Semibold, Line-height: 1.4
- **Body Large:** 18px/28px, Regular, Line-height: 1.6
- **Body:** 16px/24px, Regular, Line-height: 1.5
- **Body Small:** 14px/20px, Regular, Line-height: 1.4
- **Caption:** 12px/16px, Medium, Line-height: 1.3

## 🖼️ Logo e Identidade

### Logo Principal
- **Arquivo:** `/public/icons/icon.svg`
- **Formato:** SVG vetorial para escalabilidade
- **Uso:** Hexágono com "proia" centralizado

### Variações da Logo
- **Full Color:** Cores originais com glow neon
- **Mono Dark:** Branco sobre fundo escuro
- **Mono Light:** Preto sobre fundo claro
- **Favicon:** 32x32px, versão simplificada

### Diretrizes de Uso
- **Margem mínima:** 20px em torno da logo
- **Tamanho mínimo:** 24px de altura
- **Proporção:** Manter aspect ratio original
- **Background:** Sempre com contraste adequado

## 🧩 Elementos de Interface

### Glassmorphism
- **Blur:** 16-20px
- **Transparência:** 70-80%
- **Saturação:** 180%
- **Bordas:** 1px solid com cor secundária

### Shadow Glow
- **Cor base:** Neon Purple (#b026ff)
- **Intensidade:** 0.2-0.4 opacity
- **Spread:** 0-20px
- **Blur:** 8-32px

### Transições
- **Duração:** 0.3s
- **Easing:** cubic-bezier(0.25, 0.8, 0.5, 1)
- **Propriedades:** transform, opacity, box-shadow

## 📱 Layout iOS-like

### Navbar
- **Background:** Translúcido com blur
- **Borda:** Inferior sutil
- **Altura:** 60px + safe area
- **Conteúdo:** Logo + navegação

### Bottom Bar
- **Tabs visíveis:** 4 principais
- **Aba extra:** "Mais" para rotas adicionais
- **Altura:** 80px + safe area
- **Background:** Glassmorphism dark

### Botões
- **Primário:** Gradiente neon (pink → blue)
- **Secundário:** Outline com cor secundária
- **Ghost:** Transparente com hover
- **Estados:** Hover, active, disabled

## 📐 Sistema de Espaçamentos

### Base Unit: 8px
- **xs:** 4px (0.5u)
- **sm:** 8px (1u)
- **md:** 16px (2u)
- **lg:** 24px (3u)
- **xl:** 32px (4u)
- **2xl:** 48px (6u)
- **3xl:** 64px (8u)

### Aplicação
- **Padding interno:** md (16px)
- **Margem entre elementos:** lg (24px)
- **Espaçamento de seções:** xl (32px)
- **Gap em grids:** md (16px)

## 🎭 Estados de Interação

### Hover
- **Escala:** 1.05
- **Glow:** Aumentado 20%
- **Transição:** 0.2s ease

### Active
- **Escala:** 0.98
- **Glow:** Reduzido 50%
- **Feedback:** Tátil (se disponível)

### Focus
- **Outline:** 2px solid neon
- **Glow:** Moderado
- **Acessibilidade:** Sempre visível

### Disabled
- **Opacidade:** 50%
- **Cursor:** not-allowed
- **Glow:** Removido

## 🌟 Efeitos Especiais

### Glow Effects
```css
.proia-glow {
  box-shadow: 0 0 20px rgba(183, 38, 255, 0.3);
}
.proia-glow-pink {
  box-shadow: 0 0 20px rgba(255, 45, 172, 0.3);
}
.proia-glow-blue {
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
}
```

### Gradientes
- **CTA:** linear-gradient(135deg, #ff2dac, #00d4ff)
- **Glow:** linear-gradient(135deg, #b026ff, #ff2dac)
- **Background:** linear-gradient(135deg, #1b1330, #381f57)

### Animações
- **Entrada:** slide-in da direita
- **Saída:** slide-out para esquerda
- **Loading:** spin ou pulse
- **Hover:** scale + glow

## 📱 Responsividade

### Breakpoints
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Adaptações
- **Mobile:** Bottom bar navigation
- **Tablet:** Bottom bar + sidebar
- **Desktop:** Sidebar navigation

### Touch Targets
- **Mínimo:** 44px × 44px
- **Recomendado:** 48px × 48px
- **Espaçamento:** 8px entre targets

## 🎯 Acessibilidade

### Contraste
- **Texto normal:** 4.5:1 mínimo
- **Texto grande:** 3:1 mínimo
- **Elementos UI:** 3:1 mínimo

### Focus
- **Indicador:** Outline 2px
- **Cor:** Neon blue (#007AFF)
- **Visibilidade:** Sempre presente

### Cores
- **Não depender apenas de cor** para informação
- **Ícones** para status e ações
- **Texto** para descrições importantes

## 🔧 Implementação Técnica

### CSS Variables
```css
:root {
  --proia-roxao: #1b1330;
  --proia-roxo: #381f57;
  --proia-ios-blue: #007AFF;
  --proia-neon-pink: #ff2dac;
  --proia-neon-blue: #00d4ff;
  --proia-neon-purple: #b026ff;
}
```

### Tailwind Classes
```css
.proia-bg { background: var(--proia-gradient-bg); }
.proia-btn-cta { background: var(--proia-gradient-cta); }
.proia-title { background: var(--proia-gradient-glow); }
```

### Componentes Base
- `.ios-card` - Cards com glassmorphism
- `.proia-btn-cta` - Botões CTA principais
- `.proia-title` - Títulos com gradiente
- `.proia-glow` - Efeitos de brilho
