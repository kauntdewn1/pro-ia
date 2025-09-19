# Makefile para projeto Proia
# Comandos disponíveis: make dev, make build, make preview, make lint, make format, make analyze

.PHONY: dev build preview lint format analyze clean install

# Comando padrão
.DEFAULT_GOAL := dev

# Instalar dependências
install:
	npm install

# Servidor de desenvolvimento
dev:
	npm run dev

# Build para produção
build:
	npm run build

# Preview do build
preview:
	npm run preview

# Linter
lint:
	npm run lint

# Formatação de código
format:
	npm run format

# Análise do bundle
analyze:
	npm run analyze

# Limpar node_modules e reinstalar
clean:
	rm -rf node_modules package-lock.json
	npm install

# Comando para expor o servidor na rede (útil para testar em dispositivos móveis)
dev-host:
	npm run dev -- --host

# Comando para build com modo de análise
build-analyze:
	npm run analyze

# Análise de código INTERBØX V2
code-analysis:
	node code-analysis.js

# Help
help:
	@echo "Comandos disponíveis:"
	@echo "  make dev            - Inicia o servidor de desenvolvimento"
	@echo "  make build          - Gera build para produção"
	@echo "  make preview        - Preview do build de produção"
	@echo "  make lint           - Executa o linter"
	@echo "  make format         - Formata o código"
	@echo "  make analyze        - Analisa o bundle"
	@echo "  make code-analysis  - Executa análise de código INTERBØX V2"
	@echo "  make clean          - Limpa e reinstala dependências"
	@echo "  make dev-host       - Servidor de desenvolvimento acessível na rede"
	@echo "  make help           - Mostra esta ajuda"
