import { NextRequest, NextResponse } from 'next/server'
import { signUnlockToken, createSessionCookie, verifyUnlockToken } from '../../../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, xp, answers } = await request.json()
    
    // Validar dados
    if (!email || !xp || xp < 0) {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      )
    }

    // Gerar token de liberação
    const token = signUnlockToken(email, xp)
    const cookie = createSessionCookie(token)

    // Determinar nível de acesso
    const level = xp >= 200 ? 'expert' : xp >= 100 ? 'premium' : 'basic'
    
    // Resposta baseada no nível
    const response = {
      success: true,
      token,
      user: {
        email,
        xp,
        level,
        unlocked_at: new Date().toISOString()
      },
      redirect: xp >= 200 ? '/portal' : null,
      whatsapp: xp < 200 ? {
        message: `Quero liberação no Portal PRO.IA - XP: ${xp} pontos`,
        url: `https://wa.me/5562983231110?text=${encodeURIComponent(`Quero liberação no Portal PRO.IA - XP: ${xp} pontos`)}`
      } : null
    }

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Set-Cookie': cookie
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verificar token existente
    const cookieHeader = request.headers.get('cookie')
    if (!cookieHeader) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      )
    }

    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      acc[key] = value
      return acc
    }, {} as Record<string, string>)

    const token = cookies.proia_session
    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      )
    }

    const session = verifyUnlockToken(token)
    if (!session) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      )
    }

    return NextResponse.json({
      authenticated: true,
      user: session
    })

  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json(
      { authenticated: false },
      { status: 200 }
    )
  }
}
