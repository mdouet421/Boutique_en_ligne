import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface AuthRequest extends Request {
  userId?: number
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Non authentifié.' })
    return
  }

  const token = header.slice(7)
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number }
    req.userId = payload.userId
    next()
  } catch {
    res.status(401).json({ message: 'Token invalide ou expiré.' })
  }
}

export async function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  requireAuth(req, res, async () => {
    const user = await prisma.user.findUnique({ where: { id: req.userId } })
    if (!user || user.role !== 'ADMIN') {
      res.status(403).json({ message: 'Accès réservé aux administrateurs.' })
      return
    }
    next()
  })
}
