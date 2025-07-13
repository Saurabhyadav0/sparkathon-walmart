import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '15')
  const skip = (page - 1) * limit

  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: limit,
        orderBy: { ArrivalDate: 'desc' },
      }),
      prisma.product.count()
    ])

    return Response.json({
      data: products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (e) {
    console.error('API error:', e)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}
