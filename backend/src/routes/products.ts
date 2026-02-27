import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/', async (req: Request, res: Response) => {
  const page = Math.max(1, Number(req.query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 12))
  const skip = (page - 1) * limit

  const sort = req.query.sort
  const orderBy =
    sort === 'price_asc'
      ? { price: 'asc' as const }
      : sort === 'price_desc'
        ? { price: 'desc' as const }
        : { createdAt: 'desc' as const }

  const [data, total] = await prisma.$transaction([
    prisma.product.findMany({
      skip,
      take: limit,
      orderBy,
      include: { category: { select: { name: true } } },
    }),
    prisma.product.count(),
  ])

  res.json({
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  })
})

export default router
