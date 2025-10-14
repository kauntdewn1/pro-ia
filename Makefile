# OGM System - Makefile

.PHONY: help install dev build start export serve clean

help: ## Mostra esta ajuda
	@echo "Comandos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Instala dependências
	npm install

dev: ## Inicia servidor de desenvolvimento
	npm run dev

build: ## Faz build do projeto
	npm run build

start: ## Inicia servidor de produção
	npm run start

export: ## Exporta site estático
	npm run export

serve: ## Serve site estático localmente
	npm run serve

clean: ## Limpa arquivos temporários
	rm -rf .next out node_modules/.cache

setup: install ## Setup completo do projeto
	@echo "✅ Projeto configurado com sucesso!"
	@echo "Execute 'make dev' para iniciar o servidor de desenvolvimento"
