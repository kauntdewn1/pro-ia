'use client'

import { useState, useEffect } from 'react'

interface PDFViewerProps {
  pdfUrl: string
  title: string
  onDownload?: () => void
}

export default function PDFViewer({ pdfUrl, title, onDownload }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
  }, [pdfUrl])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setError('Erro ao carregar PDF')
    setIsLoading(false)
  }

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  const goToNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  const downloadPDF = () => {
    if (onDownload) {
      onDownload()
    }
    
    // Criar link de download
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="bg-black border border-green-400 rounded-lg p-6 max-w-4xl mx-auto">
      {/* Header do PDF */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-green-400">{title}</h2>
          <p className="text-white/80 text-sm">Visualizador de PDF integrado</p>
        </div>
        <button
          onClick={downloadPDF}
          className="bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors"
        >
          📥 Baixar PDF
        </button>
      </div>

      {/* Controles de Navegação */}
      {totalPages > 0 && (
        <div className="flex justify-between items-center mb-4 p-3 bg-black border border-green-400 rounded">
          <button
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            className="bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>
          
          <div className="text-green-400 font-mono">
            Página {pageNumber} de {totalPages}
          </div>
          
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= totalPages}
            className="bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Próxima →
          </button>
        </div>
      )}

      {/* Container do PDF */}
      <div className="relative bg-white rounded-lg overflow-hidden" style={{ height: '600px' }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <div className="text-gray-600">Carregando PDF...</div>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="text-red-500 text-xl mb-4">❌</div>
              <div className="text-gray-600 mb-4">{error}</div>
              <button
                onClick={() => window.location.reload()}
                className="bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        )}

        {/* PDF Embed */}
        <iframe
          src={`${pdfUrl}#page=${pageNumber}&toolbar=0&navpanes=0&scrollbar=0`}
          width="100%"
          height="100%"
          onLoad={handleLoad}
          onError={handleError}
          className="border-0"
          title={title}
        />
      </div>

      {/* Informações Adicionais */}
      <div className="mt-4 text-center text-white/60 text-sm">
        <p>💡 Dica: Use os controles acima para navegar pelas páginas</p>
        <p>📱 Para melhor experiência em mobile, baixe o PDF</p>
      </div>
    </div>
  )
}
