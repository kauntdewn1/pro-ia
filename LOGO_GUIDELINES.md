# 🎨 PRO.IA · Logo Guidelines

## 📐 Especificações da Logo

### Logo Principal
- **Arquivo:** `/public/icons/icon.svg`
- **Formato:** SVG vetorial para máxima escalabilidade
- **Design:** Hexágono com "proia" centralizado
- **Proporção:** 1:1 (quadrada)

### Variações Disponíveis

#### 1. Full Color (Padrão)
- **Uso:** Hero sections, headers principais
- **Características:** Cores originais com efeito glow neon
- **Background:** Fundo escuro para contraste

#### 2. Mono Dark
- **Uso:** Fundos escuros, dark mode
- **Cor:** Branco (#FFFFFF)
- **Background:** Roxão (#1b1330) ou similar

#### 3. Mono Light
- **Uso:** Fundos claros, light mode
- **Cor:** Preto (#000000)
- **Background:** Branco ou cinza claro

#### 4. Favicon
- **Arquivo:** `/public/icons/icon-32x32.png`
- **Tamanho:** 32x32px
- **Uso:** Abas do navegador, bookmarks
- **Características:** Versão simplificada

## 📏 Diretrizes de Uso

### Tamanhos Mínimos
- **Digital:** 24px de altura
- **Impressão:** 12mm de altura
- **Favicon:** 16x16px (mínimo)

### Espaçamento
- **Margem mínima:** 20px em torno da logo
- **Zona de proteção:** 1x a altura da logo
- **Elementos próximos:** Mínimo 40px de distância

### Proporções
- **Manter aspect ratio:** 1:1 sempre
- **Não distorcer:** Nunca esticar ou comprimir
- **Escala uniforme:** Aumentar/diminuir proporcionalmente

## 🎨 Aplicações por Contexto

### Hero Sections
- **Tamanho:** 120px - 200px
- **Variação:** Full Color com glow
- **Posicionamento:** Centralizado
- **Background:** Gradiente PRO.IA

### Headers/Navbar
- **Tamanho:** 32px - 48px
- **Variação:** Mono Dark ou Full Color
- **Posicionamento:** Esquerda
- **Background:** Glassmorphism

### Cards/Componentes
- **Tamanho:** 24px - 32px
- **Variação:** Mono Dark
- **Posicionamento:** Canto superior esquerdo
- **Background:** Card background

### Favicon
- **Tamanho:** 16x16px, 32x32px
- **Variação:** Simplificada
- **Formato:** PNG
- **Uso:** Abas, bookmarks, PWA

## 🚫 Usos Incorretos

### Não Fazer
- ❌ Distorcer a proporção
- ❌ Usar cores não oficiais
- ❌ Colocar em fundos com baixo contraste
- ❌ Reduzir abaixo do tamanho mínimo
- ❌ Adicionar efeitos não aprovados
- ❌ Usar em contextos inadequados

### Exemplos de Contextos Inadequados
- Fundos muito claros com logo mono dark
- Fundos muito escuros com logo mono light
- Tamanhos muito pequenos (perda de legibilidade)
- Sobreposição com texto ou elementos

## 🔧 Implementação Técnica

### CSS para Logo
```css
.proia-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.proia-logo-hero {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.proia-logo-small {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
```

### HTML para Diferentes Contextos
```html
<!-- Hero Section -->
<img src="/icons/icon.svg" alt="PRO.IA" class="proia-logo-hero">

<!-- Header -->
<img src="/icons/icon.svg" alt="PRO.IA" class="proia-logo">

<!-- Card -->
<img src="/icons/icon.svg" alt="PRO.IA" class="proia-logo-small">
```

### Favicon
```html
<link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png">
```

## 📱 Responsividade

### Mobile (< 640px)
- **Hero:** 80px - 120px
- **Header:** 24px - 32px
- **Cards:** 20px - 24px

### Tablet (640px - 1024px)
- **Hero:** 120px - 160px
- **Header:** 32px - 40px
- **Cards:** 24px - 32px

### Desktop (> 1024px)
- **Hero:** 160px - 200px
- **Header:** 40px - 48px
- **Cards:** 32px - 40px

## 🎯 Acessibilidade

### Contraste
- **Mínimo:** 3:1 para logos
- **Recomendado:** 4.5:1
- **Teste:** Usar ferramentas de contraste

### Alt Text
- **Sempre incluir:** alt="PRO.IA"
- **Contexto específico:** alt="PRO.IA - Transforme IA em Faturamento"
- **Decorative:** alt="" (se puramente decorativa)

### Focus
- **Indicador:** Outline sutil quando clicável
- **Cor:** Neon blue (#007AFF)
- **Espessura:** 2px

## 📦 Arquivos Disponíveis

### SVG (Vetorial)
- `icon.svg` - Logo principal

### PNG (Raster)
- `icon-16x16.png` - Favicon pequeno
- `icon-32x32.png` - Favicon padrão
- `icon-72x72.png` - PWA mobile
- `icon-96x96.png` - PWA tablet
- `icon-128x128.png` - PWA desktop
- `icon-144x144.png` - Windows tiles
- `icon-152x152.png` - iOS touch icon
- `icon-192x192.png` - Android icon
- `icon-384x384.png` - Android splash
- `icon-512x512.png` - PWA splash

## 🔄 Atualizações

### Versionamento
- **v1.0:** Logo inicial com hexágono
- **v1.1:** Ajustes de contraste
- **v1.2:** Otimização para PWA

### Processo de Atualização
1. Atualizar arquivos SVG/PNG
2. Testar em todos os contextos
3. Verificar contraste e acessibilidade
4. Atualizar documentação
5. Comunicar mudanças à equipe
