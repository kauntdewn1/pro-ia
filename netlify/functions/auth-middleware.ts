import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import { verifyUnlockToken, clearSessionCookie } from '../../lib/auth'

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  const { pathname } = new URL(event.rawUrl || '')
  
  // Rotas protegidas
  const protectedRoutes = ['/portal', '/resources', '/missions', '/admin']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (!isProtectedRoute) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Route not protected' })
    }
  }

  // Verificar autenticação
  const authHeader = event.headers.authorization
  const cookieHeader = event.headers.cookie
  
  let token: string | null = null
  
  // Tentar pegar token do header Authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7)
  }
  
  // Tentar pegar token dos cookies
  if (!token && cookieHeader) {
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      acc[key] = value
      return acc
    }, {} as Record<string, string>)
    
    token = cookies.proia_session
  }

  if (!token) {
    return {
      statusCode: 401,
      headers: {
        ...headers,
        'Set-Cookie': clearSessionCookie()
      },
      body: JSON.stringify({ 
        error: 'Unauthorized',
        redirect: '/login'
      })
    }
  }

  // Verificar token
  const session = verifyUnlockToken(token)
  if (!session) {
    return {
      statusCode: 401,
      headers: {
        ...headers,
        'Set-Cookie': clearSessionCookie()
      },
      body: JSON.stringify({ 
        error: 'Invalid token',
        redirect: '/login'
      })
    }
  }

  // Verificar nível de acesso
  if (pathname.startsWith('/admin') && session.level !== 'expert') {
    return {
      statusCode: 403,
      headers,
      body: JSON.stringify({ 
        error: 'Insufficient permissions',
        redirect: '/portal'
      })
    }
  }

  // Token válido - adicionar informações do usuário ao contexto
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      authenticated: true,
      user: session,
      message: 'Access granted'
    })
  }
}
