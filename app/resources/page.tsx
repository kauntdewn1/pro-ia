'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRequireAuth } from '../../hooks/useAuth'
import { Resource } from '../../types'
import PDFViewer from '../components/PDFViewer'

export default function ResourcesPage() {
  const { user, loading } = useRequireAuth('/')
  const [resources, setResources] = useState<Resource[]>([])
  const [filteredResources, setFilteredResources] = useState<Resource[]>([])
  const [filters, setFilters] = useState({
    level: '',
    type: '',
    search: ''
  })
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [showPDFViewer, setShowPDFViewer] = useState(false)

  useEffect(() => {
    if (user) {
      loadResources()
    }
  }, [user])

  const loadResources = async () => {
    try {
      const response = await fetch(`/api/resources?user_id=${user?.email}`)
      const data = await response.json()
      setResources(data.resources)
      setFilteredResources(data.resources)
    } catch (error) {
      console.error('Erro ao carregar recursos:', error)
    }
  }

  const handleFilter = () => {
    let filtered = resources

    if (filters.level) {
      filtered = filtered.filter(r => r.level === filters.level)
    }
    if (filters.type) {
      filtered = filtered.filter(r => r.type === filters.type)
    }
    if (filters.search) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.description?.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    setFilteredResources(filtered)
  }

  useEffect(() => {
    handleFilter()
  }, [filters, resources])

  const trackDownload = async (resourceId: string) => {
    try {
      await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'track_download',
          resource_id: resourceId,
          user_id: user?.email
        })
      })
    } catch (error) {
      console.error('Erro ao trackear download:', error)
    }
  }

  const trackVideoPlay = async (resourceId: string) => {
    try {
      await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'track_video_play',
          resource_id: resourceId,
          user_id: user?.email
        })
      })
    } catch (error) {
      console.error('Erro ao trackear vídeo:', error)
    }
  }

  const toggleFavorite = (resourceId: string) => {
    setFavorites(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    )
  }

  const openPDFViewer = (resource: Resource) => {
    setSelectedResource(resource)
    setShowPDFViewer(true)
  }

  const closePDFViewer = () => {
    setShowPDFViewer(false)
    setSelectedResource(null)
  }

  const handleDownload = async (resource: Resource) => {
    try {
      // Track download
      await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'track_download',
          resource_id: resource.id,
          user_id: user?.email
        })
      })
    } catch (error) {
      console.error('Erro ao trackear download:', error)
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'PDF': return '📄'
      case 'Video': return '🎥'
      case 'Link': return '🔗'
      case 'Template': return '📋'
      case 'Prompt': return '💬'
      case 'Checklist': return '✅'
      default: return '📁'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Basico': return 'text-green-400'
      case 'Avancado': return 'text-yellow-400'
      case 'Expert': return 'text-red-400'
      default: return 'text-white'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-xl mb-4">Carregando Recursos...</div>
          <div className="animate-pulse">Verificando autenticação...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="bg-black border-b border-green-400 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/portal" className="text-green-400 hover:text-green-300">
              ← Voltar ao Portal
            </Link>
            <div>
              <h1 className="text-xl font-bold">📚 RECURSOS PRO.IA</h1>
              <p className="text-sm text-white/80">Conhecimento organizado por nível</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">{user.xp} XP</div>
            <div className="text-sm text-white/80">Nível: {user.level.toUpperCase()}</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-black border-b border-green-400 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm">Nível:</label>
              <select
                value={filters.level}
                onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
                className="bg-black border border-green-400 text-green-400 px-3 py-1 rounded"
              >
                <option value="">Todos</option>
                <option value="Basico">Básico</option>
                <option value="Avancado">Avançado</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm">Tipo:</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="bg-black border border-green-400 text-green-400 px-3 py-1 rounded"
              >
                <option value="">Todos</option>
                <option value="PDF">PDF</option>
                <option value="Video">Vídeo</option>
                <option value="Link">Link</option>
                <option value="Template">Template</option>
                <option value="Prompt">Prompt</option>
                <option value="Checklist">Checklist</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm">Buscar:</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                placeholder="Digite para buscar..."
                className="bg-black border border-green-400 text-green-400 px-3 py-1 rounded w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <div 
              key={resource.id}
              className={`bg-black border rounded-lg p-6 ${
                resource.locked ? 'border-gray-500 opacity-60' : 'border-green-400'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getResourceIcon(resource.type)}</span>
                  <div>
                    <h3 className="font-bold text-lg">{resource.title}</h3>
                    <div className={`text-sm ${getLevelColor(resource.level)}`}>
                      {resource.level}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(resource.id)}
                  className={`text-lg ${
                    favorites.includes(resource.id) ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                >
                  {favorites.includes(resource.id) ? '⭐' : '☆'}
                </button>
              </div>

              <p className="text-white/80 text-sm mb-4">
                {resource.description}
              </p>

              <div className="text-xs text-white/60 mb-4">
                Atualizado: {new Date(resource.updated_at).toLocaleDateString('pt-BR')}
              </div>

              {resource.locked ? (
                <div className="text-center">
                  <div className="text-gray-400 mb-2">🔒 Recurso bloqueado</div>
                  <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-lg font-bold cursor-not-allowed">
                    Desbloquear
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {resource.type === 'PDF' && (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openPDFViewer(resource)}
                        className="bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors flex-1"
                      >
                        👁️ Ver PDF
                      </button>
                      <button 
                        onClick={() => handleDownload(resource)}
                        className="bg-blue-400 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-500 transition-colors"
                      >
                        📥 Baixar
                      </button>
                    </div>
                  )}
                  
                  {resource.type === 'Video' && (
                    <button 
                      onClick={() => trackVideoPlay(resource.id)}
                      className="w-full bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors"
                    >
                      Assistir vídeo
                    </button>
                  )}
                  
                  {resource.type === 'Link' && (
                    <button 
                      onClick={() => window.open(resource.url, '_blank')}
                      className="w-full bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors"
                    >
                      Abrir link
                    </button>
                  )}
                  
                  {(resource.type === 'Template' || resource.type === 'Checklist') && (
                    <button 
                      onClick={() => trackDownload(resource.id)}
                      className="w-full bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors"
                    >
                      Baixar {resource.type}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-xl mb-4">Nenhum recurso encontrado</div>
            <div className="text-white/80">Tente ajustar os filtros de busca</div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-green-400 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link 
            href="/portal"
            className="bg-green-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors"
          >
            🏠 Portal
          </Link>
          <Link 
            href="/missions"
            className="bg-green-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors"
          >
            🎮 Missões
          </Link>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {showPDFViewer && selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl max-h-full">
            <button
              onClick={closePDFViewer}
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-colors z-10"
            >
              ✕ Fechar
            </button>
            <PDFViewer
              pdfUrl={selectedResource.url}
              title={selectedResource.title}
              onDownload={() => handleDownload(selectedResource)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
