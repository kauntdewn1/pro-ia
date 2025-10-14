#!/usr/bin/env node

/**
 * Script de Análise de Código INTERBØX V2
 * Analisa o código real do projeto e gera relatórios baseados no estado atual
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cores para output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  purple: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Configurações
const CONFIG = {
  srcDir: './src',
  excludeDirs: ['node_modules', 'dist', 'dev-dist', '.git', 'coverage'],
  fileExtensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
  maxFileSize: 1000, // linhas
  maxFunctionLength: 50, // linhas
  maxComponentLength: 200 // linhas
};

class CodeAnalyzer {
  constructor() {
    this.stats = {
      files: {
        total: 0,
        byType: {},
        bySize: { small: 0, medium: 0, large: 0, xlarge: 0 }
      },
      components: {
        total: 0,
        withProps: 0,
        withHooks: 0,
        withState: 0,
        memoized: 0,
        withComposables: 0
      },
      composables: {
        total: 0,
        custom: 0
      },
      functions: {
        total: 0,
        long: 0,
        withJSDoc: 0
      },
      imports: {
        vue: 0,
        vueRouter: 0,
        external: 0,
        internal: 0
      },
      issues: {
        naming: [],
        performance: [],
        security: [],
        structure: []
      }
    };
  }

  // Utilitários
  log(message, color = 'white') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  logSection(title) {
    console.log(`\n${colors.cyan}${colors.bold}${title}${colors.reset}`);
    console.log(`${colors.yellow}${'='.repeat(title.length)}${colors.reset}`);
  }

  logSuccess(message) {
    this.log(`✓ ${message}`, 'green');
  }

  logWarning(message) {
    this.log(`⚠ ${message}`, 'yellow');
  }

  logError(message) {
    this.log(`✗ ${message}`, 'red');
  }

  // Análise de arquivos
  getAllFiles(dir, files = []) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!CONFIG.excludeDirs.includes(item)) {
          this.getAllFiles(fullPath, files);
        }
      } else if (CONFIG.fileExtensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      const fileName = path.basename(filePath);
      const fileType = path.extname(filePath);
      
      this.stats.files.total++;
      
      // Contar por tipo
      this.stats.files.byType[fileType] = (this.stats.files.byType[fileType] || 0) + 1;
      
      // Classificar por tamanho
      if (lines.length < 50) this.stats.files.bySize.small++;
      else if (lines.length < 200) this.stats.files.bySize.medium++;
      else if (lines.length < 500) this.stats.files.bySize.large++;
      else this.stats.files.bySize.xlarge++;
      
      // Análise específica por tipo
      if (fileType === '.vue') {
        this.analyzeVueComponent(content, filePath, lines.length);
      }
      
      if (fileType === '.ts' || fileType === '.js') {
        this.analyzeTypeScriptFile(content, filePath);
      }
      
      // Análise de imports
      this.analyzeImports(content);
      
      // Análise de problemas
      this.analyzeIssues(content, filePath, lines.length);
      
    } catch (error) {
      this.logError(`Erro ao analisar ${filePath}: ${error.message}`);
    }
  }

  analyzeVueComponent(content, filePath, lineCount) {
    this.stats.components.total++;
    
    // Verificar se usa props
    if (content.includes('defineProps') || content.includes('props:')) {
      this.stats.components.withProps++;
    }
    
    // Verificar composables
    const composableMatches = content.match(/use[A-Z]\w+/g);
    if (composableMatches) {
      this.stats.components.withComposables++;
    }
    
    // Verificar ref/reactive (estado)
    if (content.includes('ref(') || content.includes('reactive(') || content.includes('computed(')) {
      this.stats.components.withState++;
    }
    
    // Verificar se usa composables
    if (content.includes('use') && (content.includes('from') || content.includes('import'))) {
      this.stats.components.withHooks++;
    }
    
    // Verificar se é muito grande
    if (lineCount > CONFIG.maxComponentLength) {
      this.stats.issues.performance.push({
        file: filePath,
        issue: `Componente Vue muito grande (${lineCount} linhas)`,
        suggestion: 'Considere quebrar em componentes menores ou usar composables'
      });
    }
  }

  analyzeTypeScriptFile(content, filePath) {
    // Verificar se é composable
    if (filePath.includes('/composables/') && content.includes('use')) {
      this.stats.composables.custom++;
    }
    
    // Contar funções
    const functionMatches = content.match(/function\s+\w+|const\s+\w+\s*=\s*\(/g);
    if (functionMatches) {
      this.stats.functions.total += functionMatches.length;
      
      // Verificar JSDoc
      const jsdocMatches = content.match(/\/\*\*[\s\S]*?\*\//g);
      if (jsdocMatches) {
        this.stats.functions.withJSDoc += jsdocMatches.length;
      }
    }
  }

  analyzeImports(content) {
    const importLines = content.split('\n').filter(line => line.trim().startsWith('import'));
    
    for (const line of importLines) {
      if (line.includes('vue')) this.stats.imports.vue++;
      if (line.includes('vue-router')) this.stats.imports.vueRouter++;
      if (line.includes('from \'') && !line.includes('vue') && !line.includes('./') && !line.includes('../')) {
        this.stats.imports.external++;
      }
      if (line.includes('from \'./') || line.includes('from \'../')) {
        this.stats.imports.internal++;
      }
    }
  }

  analyzeIssues(content, filePath, lineCount) {
    // Problemas de nomenclatura
    const fileName = path.basename(filePath);
    const isComponent = filePath.includes('/components/') && fileName.endsWith('.vue');
    const isComposable = filePath.includes('/composables/') && fileName.startsWith('use');
    
    if (isComponent && !/^[A-Z]/.test(fileName.replace('.vue', ''))) {
      this.stats.issues.naming.push({
        file: filePath,
        issue: 'Nome de arquivo de componente não segue PascalCase',
        suggestion: 'Renomeie para PascalCase (ex: MyComponent.vue)'
      });
    }
    
    if (isComposable && !fileName.startsWith('use')) {
      this.stats.issues.naming.push({
        file: filePath,
        issue: 'Composable não começa com "use"',
        suggestion: 'Renomeie para começar com "use" (ex: useMyComposable.ts)'
      });
    }
    
    // Problemas de performance
    if (content.includes('console.log') && !filePath.includes('test')) {
      this.stats.issues.performance.push({
        file: filePath,
        issue: 'console.log encontrado em código de produção',
        suggestion: 'Remova ou substitua por sistema de logging apropriado'
      });
    }
    
    // Verificar v-if sem v-else
    if (content.includes('v-if') && !content.includes('v-else')) {
      this.stats.issues.performance.push({
        file: filePath,
        issue: 'v-if sem v-else pode causar re-renderizações desnecessárias',
        suggestion: 'Considere usar v-show para elementos que mudam frequentemente'
      });
    }
    
    // Problemas de segurança
    if (content.includes('localStorage') && !content.includes('JSON.parse')) {
      this.stats.issues.security.push({
        file: filePath,
        issue: 'Uso de localStorage sem tratamento de erro',
        suggestion: 'Adicione try/catch para localStorage'
      });
    }
    
    // Problemas de estrutura
    if (lineCount > CONFIG.maxFileSize) {
      this.stats.issues.structure.push({
        file: filePath,
        issue: `Arquivo muito grande (${lineCount} linhas)`,
        suggestion: 'Considere quebrar em arquivos menores'
      });
    }
  }

  // Análise de dependências
  analyzeDependencies() {
    try {
      const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
      const dependencies = Object.keys(packageJson.dependencies || {});
      const devDependencies = Object.keys(packageJson.devDependencies || {});
      
      return {
        total: dependencies.length + devDependencies.length,
        production: dependencies.length,
        development: devDependencies.length,
        vue: dependencies.some(dep => dep.includes('vue')),
        vueRouter: dependencies.some(dep => dep.includes('vue-router')),
        typescript: devDependencies.some(dep => dep.includes('typescript')),
        vite: devDependencies.some(dep => dep.includes('vite')),
        tailwind: devDependencies.some(dep => dep.includes('tailwindcss')),
        pwa: devDependencies.some(dep => dep.includes('pwa'))
      };
    } catch (error) {
      this.logError(`Erro ao analisar package.json: ${error.message}`);
      return null;
    }
  }

  // Análise de estrutura de pastas
  analyzeStructure() {
    const structure = {
      src: this.analyzeDirectory('./src'),
      components: this.analyzeDirectory('./src/components'),
      composables: this.analyzeDirectory('./src/composables'),
      views: this.analyzeDirectory('./src/views'),
      utils: this.analyzeDirectory('./src/utils')
    };
    
    return structure;
  }

  analyzeDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) return null;
    
    const items = fs.readdirSync(dirPath);
    const files = items.filter(item => {
      const fullPath = path.join(dirPath, item);
      return fs.statSync(fullPath).isFile();
    });
    
    const directories = items.filter(item => {
      const fullPath = path.join(dirPath, item);
      return fs.statSync(fullPath).isDirectory();
    });
    
    return {
      files: files.length,
      directories: directories.length,
      subdirs: directories
    };
  }

  // Relatórios
  generateReport() {
    this.logSection('📊 ANÁLISE DE CÓDIGO INTERBØX V2 2025 - PROIA');
    
    this.reportFiles();
    this.reportComponents();
    this.reportComposables();
    this.reportFunctions();
    this.reportImports();
    this.reportDependencies();
    this.reportStructure();
    this.reportIssues();
    this.reportRecommendations();
  }

  reportFiles() {
    this.logSection('📁 ARQUIVOS');
    this.log(`Total de arquivos analisados: ${this.stats.files.total}`, 'white');
    
    this.log('\nPor tipo:', 'yellow');
    Object.entries(this.stats.files.byType).forEach(([type, count]) => {
      this.log(`  ${type}: ${count}`, 'cyan');
    });
    
    this.log('\nPor tamanho:', 'yellow');
    this.log(`  Pequenos (<50 linhas): ${this.stats.files.bySize.small}`, 'green');
    this.log(`  Médios (50-200 linhas): ${this.stats.files.bySize.medium}`, 'yellow');
    this.log(`  Grandes (200-500 linhas): ${this.stats.files.bySize.large}`, 'orange');
    this.log(`  Muito grandes (>500 linhas): ${this.stats.files.bySize.xlarge}`, 'red');
  }

  reportComponents() {
    this.logSection('⚛️ COMPONENTES VUE');
    this.log(`Total de componentes: ${this.stats.components.total}`, 'white');
    this.log(`Com props: ${this.stats.components.withProps}`, 'cyan');
    this.log(`Com composables: ${this.stats.components.withComposables}`, 'cyan');
    this.log(`Com estado (ref/reactive): ${this.stats.components.withState}`, 'cyan');
    this.log(`Com hooks: ${this.stats.components.withHooks}`, 'cyan');
    
    const composableUsageRate = this.stats.components.total > 0 
      ? ((this.stats.components.withComposables / this.stats.components.total) * 100).toFixed(1)
      : 0;
    this.log(`Taxa de uso de composables: ${composableUsageRate}%`, 'yellow');
  }

  reportComposables() {
    this.logSection('🪝 COMPOSABLES');
    this.log(`Composables customizados: ${this.stats.composables.custom}`, 'cyan');
    this.log(`Total de composables: ${this.stats.composables.custom}`, 'white');
  }

  reportFunctions() {
    this.logSection('🔧 FUNÇÕES');
    this.log(`Total de funções: ${this.stats.functions.total}`, 'white');
    this.log(`Com JSDoc: ${this.stats.functions.withJSDoc}`, 'cyan');
    
    const documentationRate = this.stats.functions.total > 0 
      ? ((this.stats.functions.withJSDoc / this.stats.functions.total) * 100).toFixed(1)
      : 0;
    this.log(`Taxa de documentação: ${documentationRate}%`, 'yellow');
  }

  reportImports() {
    this.logSection('📦 IMPORTS');
    this.log(`Vue: ${this.stats.imports.vue}`, 'cyan');
    this.log(`Vue Router: ${this.stats.imports.vueRouter}`, 'cyan');
    this.log(`Externos: ${this.stats.imports.external}`, 'cyan');
    this.log(`Internos: ${this.stats.imports.internal}`, 'cyan');
  }

  reportDependencies() {
    const deps = this.analyzeDependencies();
    if (!deps) return;
    
    this.logSection('📚 DEPENDÊNCIAS');
    this.log(`Total: ${deps.total}`, 'white');
    this.log(`Produção: ${deps.production}`, 'green');
    this.log(`Desenvolvimento: ${deps.development}`, 'blue');
    
    this.log('\nTecnologias principais:', 'yellow');
    this.log(`  Vue: ${deps.vue ? '✓' : '✗'}`, deps.vue ? 'green' : 'red');
    this.log(`  Vue Router: ${deps.vueRouter ? '✓' : '✗'}`, deps.vueRouter ? 'green' : 'red');
    this.log(`  TypeScript: ${deps.typescript ? '✓' : '✗'}`, deps.typescript ? 'green' : 'red');
    this.log(`  Vite: ${deps.vite ? '✓' : '✗'}`, deps.vite ? 'green' : 'red');
    this.log(`  Tailwind CSS: ${deps.tailwind ? '✓' : '✗'}`, deps.tailwind ? 'green' : 'red');
    this.log(`  PWA: ${deps.pwa ? '✓' : '✗'}`, deps.pwa ? 'green' : 'red');
  }

  reportStructure() {
    const structure = this.analyzeStructure();
    
    this.logSection('🏗️ ESTRUTURA');
    
    if (structure.src) {
      this.log(`src/: ${structure.src.files} arquivos, ${structure.src.directories} diretórios`, 'cyan');
      this.log(`  Subdiretórios: ${structure.src.subdirs.join(', ')}`, 'white');
    }
    
    if (structure.components) {
      this.log(`components/: ${structure.components.files} arquivos`, 'cyan');
    }
    
    if (structure.composables) {
      this.log(`composables/: ${structure.composables.files} arquivos`, 'cyan');
    }
    
    if (structure.views) {
      this.log(`views/: ${structure.views.files} arquivos`, 'cyan');
    }
    
    if (structure.utils) {
      this.log(`utils/: ${structure.utils.files} arquivos`, 'cyan');
    }
  }

  reportIssues() {
    const totalIssues = this.stats.issues.naming.length + 
                       this.stats.issues.performance.length + 
                       this.stats.issues.security.length + 
                       this.stats.issues.structure.length;
    
    this.logSection('⚠️ PROBLEMAS ENCONTRADOS');
    this.log(`Total: ${totalIssues}`, totalIssues > 0 ? 'red' : 'green');
    
    if (this.stats.issues.naming.length > 0) {
      this.log(`\nNomenclatura (${this.stats.issues.naming.length}):`, 'yellow');
      this.stats.issues.naming.forEach(issue => {
        this.log(`  ${issue.file}: ${issue.issue}`, 'red');
        this.log(`    → ${issue.suggestion}`, 'cyan');
      });
    }
    
    if (this.stats.issues.performance.length > 0) {
      this.log(`\nPerformance (${this.stats.issues.performance.length}):`, 'yellow');
      this.stats.issues.performance.forEach(issue => {
        this.log(`  ${issue.file}: ${issue.issue}`, 'red');
        this.log(`    → ${issue.suggestion}`, 'cyan');
      });
    }
    
    if (this.stats.issues.security.length > 0) {
      this.log(`\nSegurança (${this.stats.issues.security.length}):`, 'yellow');
      this.stats.issues.security.forEach(issue => {
        this.log(`  ${issue.file}: ${issue.issue}`, 'red');
        this.log(`    → ${issue.suggestion}`, 'cyan');
      });
    }
    
    if (this.stats.issues.structure.length > 0) {
      this.log(`\nEstrutura (${this.stats.issues.structure.length}):`, 'yellow');
      this.stats.issues.structure.forEach(issue => {
        this.log(`  ${issue.file}: ${issue.issue}`, 'red');
        this.log(`    → ${issue.suggestion}`, 'cyan');
      });
    }
  }

  reportRecommendations() {
    this.logSection('💡 RECOMENDAÇÕES');
    
    const recommendations = [];
    
    // Recomendações baseadas nos dados
    if (this.stats.components.withComposables < this.stats.components.total * 0.3) {
      recommendations.push('Considere usar mais composables para reutilizar lógica entre componentes');
    }
    
    if (this.stats.functions.withJSDoc < this.stats.functions.total * 0.5) {
      recommendations.push('Documente mais funções com JSDoc para melhorar a manutenibilidade');
    }
    
    if (this.stats.files.bySize.xlarge > 0) {
      recommendations.push('Refatore arquivos muito grandes para melhor organização');
    }
    
    if (this.stats.issues.performance.length > 0) {
      recommendations.push('Remova console.logs e otimize código de performance');
    }
    
    if (this.stats.issues.security.length > 0) {
      recommendations.push('Implemente tratamento de erro adequado para operações sensíveis');
    }
    
    if (this.stats.composables.custom < 3) {
      recommendations.push('Considere criar mais composables para funcionalidades reutilizáveis');
    }
    
    if (recommendations.length === 0) {
      this.log('Parabéns! O código está seguindo boas práticas Vue.js.', 'green');
    } else {
      recommendations.forEach((rec, index) => {
        this.log(`${index + 1}. ${rec}`, 'yellow');
      });
    }
  }

  // Executar análise
  async run() {
    this.log('🔍 Iniciando análise de código...', 'blue');
    
    // Analisar arquivos src
    const srcFiles = this.getAllFiles(CONFIG.srcDir);
    this.log(`Analisando ${srcFiles.length} arquivos em src/...`, 'yellow');
    srcFiles.forEach(file => this.analyzeFile(file));
    
    this.logSuccess('Análise concluída!');
    this.generateReport();
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const analyzer = new CodeAnalyzer();
  analyzer.run().catch(console.error);
}

export default CodeAnalyzer;
