# 🎨 PRO.IA — Identidade Visual v2.5 (modo terminal)

> Interface híbrida: **MS-DOS + CyberOS**  
> Minimalista, escura, pulsante. O código é o design.

---

## 🌈 **Paleta Neural**

### **Gradientes Core**

- **Primário**: `from-[#1b1330] via-[#381f57] to-[#00d4ff]`
- **Secundário**: `from-[#ff2dac] to-[#00d4ff]`
- **Energia Neon**: `from-[#b026ff] to-[#ff00ff]`

### **Cores Fixas**

- **Roxão Base**: `#1b1330`
- **Neon Pink**: `#ff2dac`
- **Ciano Luminoso**: `#00d4ff`
- **Verde Terminal (OK)**: `#00ff9d`
- **Branco Glass**: `rgba(255,255,255,0.08)`

> 💡 *Regra visual:* tudo parece projetado em um vidro frio sob luz ultravioleta.

## 🧬 **Tipografia**

### **Sistema**

- **Título (Hero / Terminal Prompt)**: `font-mono text-6xl md:text-8xl font-black tracking-tight uppercase`
- **Subtítulo / Headers**: `font-mono text-3xl font-semibold text-cyan-400`
- **Body / Console Output**: `text-base md:text-lg text-white/80 font-mono`
- **Microtexto / Logs**: `text-sm text-white/60 font-mono tracking-wide`

### **Fontes**

- **Principal**: `JetBrains Mono`
- **Fallback**: `ui-monospace, SFMono-Regular, Menlo, Consolas`

> A tipografia simula leitura de console com precisão de UI técnica.

## 🪟 **Glass + Grid System**

### **Fundo Base**

- `bg-gradient-to-br from-[#1b1330] via-[#381f57]/60 to-[#00d4ff]/10`
- Overlay dinâmico com **grid scan lines** (pseudo-elemento com opacidade 0.04)

### **Cartões / Painéis**

- `bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl`
- Sombra: `shadow-[0_0_20px_rgba(0,212,255,0.15)]`
- Hover: leve brilho (`hover:shadow-[0_0_40px_rgba(255,0,255,0.25)]`)

## ⚙️ **Botões de Sistema**

### **Primary (Acesso / CTA)**

```css
bg-gradient-to-r from-[#00ff9d] to-[#00d4ff]
text-[#1b1330] px-10 py-5 font-mono font-bold uppercase rounded-xl
hover:from-[#00d4ff] hover:to-[#00ff9d]
transition-all duration-200 transform hover:scale-105 shadow-[0_0_25px_#00ff9d]
```

### **Secondary (Comando)**

```css
bg-gradient-to-r from-[#b026ff]/80 to-[#ff2dac]/80
text-white px-8 py-3 font-mono font-semibold rounded-lg border border-white/20
hover:border-white/40 hover:scale-105 transition-all duration-200
```

### **Tertiary (Linha de Comando / Links)**

```css
bg-white/5 text-white/80 border border-white/10 font-mono text-sm px-5 py-2 rounded-md
hover:bg-white/10 hover:text-white transition-all
```

## 🎛️ **Animações e Feedback**

- **Cursor Blink:** `animate-pulse text-cyan-400`
- **Entrada Terminal:** `@keyframes boot { from {opacity:0; transform:translateY(10px);} to {opacity:1; transform:translateY(0);} }`
- **Hover Scale:** `hover:scale-[1.03] transition-transform`
- **Glow:** `shadow-[0_0_20px_#00d4ff50]`

### **Transições**

- **Rápida:** `transition-all duration-200`
- **Console Delay:** `transition-all duration-400 ease-in-out`

## 🧠 **Layout Responsivo (modo painel)**

- **Mobile:** `grid-cols-1`
- **Tablet:** `md:grid-cols-2`
- **Desktop:** `lg:grid-cols-3`
- **Container:** `max-w-7xl mx-auto px-6 py-16`

## 🔋 **Gamificação Visual**

### **Badges / Status**

- **Ativo:** `text-[#00ff9d]`
- **Processando:** `text-[#ff2dac]`
- **Erro:** `text-red-500 font-bold uppercase`
- **XP Bar:**

  - Fundo: `bg-white/10 h-2 rounded-full`
  - Preenchimento: `bg-gradient-to-r from-[#00ff9d] to-[#00d4ff] animate-pulse`

### **Missões**

- Cards com **borda verde neon** ao concluir
- Ícones em ASCII style (`>_`, `⚡`, `✓`, `!`)
- Progress bar animada com easing lento

## 💾 **Hero Section (modo terminal)**

```html
<section class="relative min-h-screen flex flex-col justify-center text-center bg-gradient-to-br from-[#1b1330] via-[#381f57]/70 to-[#00d4ff]/10 text-white font-mono">
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1)_0%,transparent_70%)]"></div>
  <h1 class="text-6xl md:text-8xl font-black tracking-tight">PRO.IA_</h1>
  <p class="mt-4 text-cyan-400 text-xl uppercase">initialize intelligence protocol [Oct/25]</p>
  <a href="#access" class="mt-8 inline-block bg-gradient-to-r from-[#00ff9d] to-[#00d4ff] text-[#1b1330] px-10 py-4 rounded-xl font-bold hover:scale-105 transition-transform">> Request Access</a>
</section>
```

## 📐 **Espaçamentos Padrão**

### **Margins**
- **Entre seções**: `mb-8` / `mb-12`
- **Entre cards**: `gap-6`
- **Entre elementos**: `space-y-3` / `space-y-6`

### **Padding**
- **Container**: `px-6`
- **Seções**: `py-20`
- **Cards**: `p-6` / `p-8`

## 🎪 **Estados Interativos**

### **Hover States**
- **Cards**: Scale + mudança de cor de fundo
- **Botões**: Scale + mudança de gradiente
- **Links**: Mudança de opacidade

### **Focus States**
- **Botões**: `focus:outline-none focus:ring-2`
- **Inputs**: `focus:ring-2 focus:ring-purple-500`

## 📱 **Responsividade**

### **Mobile First**
- Base: Mobile (sem prefixo)
- Tablet: `md:` prefix
- Desktop: `lg:` prefix

### **Textos Responsivos**
- **Hero**: `text-5xl md:text-7xl`
- **Títulos**: `text-2xl md:text-4xl`
- **Body**: `text-sm md:text-lg`

---

## ✅ **Checklist de Aplicação**

- [ ] Gradiente principal aplicado no background
- [ ] Glassmorphism em todos os cards
- [ ] Sistema de botões com hierarquia correta
- [ ] Animações e transições suaves
- [ ] Responsividade mobile-first
- [ ] Estados hover/focus implementados
- [ ] Sistema de cores consistente
- [ ] Tipografia hierárquica
- [ ] Espaçamentos padronizados

---

**Esta identidade visual deve ser aplicada em todas as páginas do sistema PRO.IA para manter consistência e profissionalismo.**
