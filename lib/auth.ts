import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'pro-ia-secret-key-2025'

export interface UserSession {
  email: string
  xp: number
  level: 'basic' | 'premium' | 'expert'
  unlocked_at: string
  scope: string[]
}

export function signUnlockToken(email: string, xp: number): string {
  const level = xp >= 200 ? 'expert' : xp >= 100 ? 'premium' : 'basic'
  
  const payload: UserSession = {
    email,
    xp,
    level,
    unlocked_at: new Date().toISOString(),
    scope: ['portal_access']
  }

  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: '48h',
    issuer: 'pro-ia',
    audience: 'portal'
  })
}

export function verifyUnlockToken(token: string): UserSession | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'pro-ia',
      audience: 'portal'
    }) as UserSession
    
    return decoded
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

export function createSessionCookie(token: string): string {
  return `proia_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=172800` // 48h
}

export function clearSessionCookie(): string {
  return `proia_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`
}
