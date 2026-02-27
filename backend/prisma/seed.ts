import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const categories = [
  { name: 'T-shirts' },
  { name: 'Pantalons' },
  { name: 'Robes' },
  { name: 'Vestes' },
  { name: 'Accessoires' },
]

const products = [
  // T-shirts
  {
    name: 'T-shirt col rond blanc',
    description: 'T-shirt basique en coton bio, coupe regular.',
    price: 19.99,
    stock: 120,
    categoryName: 'T-shirts',
  },
  {
    name: 'T-shirt oversize noir',
    description: 'T-shirt oversize en jersey épais, coupe tendance.',
    price: 24.99,
    stock: 85,
    categoryName: 'T-shirts',
  },
  {
    name: 'T-shirt rayé breton',
    description: 'T-shirt marinière en coton, rayures bleues et blanches.',
    price: 29.99,
    stock: 60,
    categoryName: 'T-shirts',
  },
  {
    name: 'T-shirt graphique imprimé',
    description: 'T-shirt avec impression artistique, édition limitée.',
    price: 34.99,
    stock: 40,
    categoryName: 'T-shirts',
  },
  {
    name: 'T-shirt manches longues gris',
    description: 'T-shirt thermique léger, idéal pour les mi-saisons.',
    price: 27.99,
    stock: 75,
    categoryName: 'T-shirts',
  },
  {
    name: 'T-shirt col V écru',
    description: 'T-shirt en lin et coton mélangés, très respirant.',
    price: 22.99,
    stock: 90,
    categoryName: 'T-shirts',
  },

  // Pantalons
  {
    name: 'Jean slim bleu indigo',
    description: 'Jean stretch 5 poches, coupe slim.',
    price: 59.99,
    stock: 55,
    categoryName: 'Pantalons',
  },
  {
    name: 'Chino beige',
    description: 'Pantalon chino coupe droite, tissu léger.',
    price: 49.99,
    stock: 70,
    categoryName: 'Pantalons',
  },
  {
    name: 'Jogging molleton gris',
    description: 'Jogging confortable en molleton doux, taille élastique.',
    price: 39.99,
    stock: 100,
    categoryName: 'Pantalons',
  },
  {
    name: 'Pantalon large cargo kaki',
    description: 'Pantalon cargo avec poches multiples, coupe baggy.',
    price: 64.99,
    stock: 45,
    categoryName: 'Pantalons',
  },
  {
    name: 'Jean wide leg noir',
    description: 'Jean taille haute à jambes larges, style 90s.',
    price: 69.99,
    stock: 35,
    categoryName: 'Pantalons',
  },

  // Robes
  {
    name: 'Robe midi fleurie',
    description: 'Robe légère à imprimé fleuri',
    price: 44.99,
    stock: 50,
    categoryName: 'Robes',
  },
  {
    name: 'Robe pull en maille',
    description: 'Robe pull en maille douce, col roulé.',
    price: 54.99,
    stock: 40,
    categoryName: 'Robes',
  },
  {
    name: 'Robe chemise en lin',
    description: 'Robe chemise boutonnée en lin naturel.',
    price: 62.99,
    stock: 30,
    categoryName: 'Robes',
  },
  {
    name: 'Robe courte asymétrique',
    description: 'Robe de soirée à ourlet asymétrique, tissu satiné.',
    price: 79.99,
    stock: 20,
    categoryName: 'Robes',
  },
  {
    name: 'Robe longue bohème',
    description: 'Robe longue à manches évasées, style bohème chic.',
    price: 72.99,
    stock: 25,
    categoryName: 'Robes',
  },

  // Vestes
  {
    name: 'Veste en jean oversize',
    description: 'Veste en denim délavé, coupe oversize.',
    price: 69.99,
    stock: 40,
    categoryName: 'Vestes',
  },
  {
    name: 'Blazer structuré camel',
    description: 'Blazer tailleur en laine mélangée, coupe ajustée.',
    price: 99.99,
    stock: 25,
    categoryName: 'Vestes',
  },
  {
    name: 'Bomber kaki',
    description: 'Bomber léger en nylon, poches zippées.',
    price: 84.99,
    stock: 30,
    categoryName: 'Vestes',
  },
  {
    name: 'Manteau long noir',
    description: 'Manteau ceinturé en laine bouclette, mi-saison.',
    price: 139.99,
    stock: 15,
    categoryName: 'Vestes',
  },
  {
    name: 'Veste en cuir synthétique',
    description: 'Perfecto style biker en similicuir doux.',
    price: 119.99,
    stock: 20,
    categoryName: 'Vestes',
  },

  // Accessoires
  {
    name: 'Écharpe en laine mérinos',
    description: 'Écharpe douce et chaude, 100% laine mérinos.',
    price: 34.99,
    stock: 80,
    categoryName: 'Accessoires',
  },
  {
    name: 'Bonnet côtelé beige',
    description: 'Bonnet en maille côtelée, taille unique.',
    price: 19.99,
    stock: 110,
    categoryName: 'Accessoires',
  },
  {
    name: 'Ceinture en cuir marron',
    description: 'Ceinture en cuir véritable, boucle dorée.',
    price: 29.99,
    stock: 60,
    categoryName: 'Accessoires',
  },
  {
    name: 'Sac tote en coton',
    description: 'Tote bag en coton épais avec anses longues.',
    price: 24.99,
    stock: 95,
    categoryName: 'Accessoires',
  },
  {
    name: 'Lunettes de soleil aviateur',
    description: 'Monture dorée avec verres dégradés.',
    price: 39.99,
    stock: 50,
    categoryName: 'Accessoires',
  },
  {
    name: 'Casquette brodée',
    description: 'Casquette 5 panneaux avec broderie minimaliste.',
    price: 22.99,
    stock: 70,
    categoryName: 'Accessoires',
  },
  {
    name: 'Chaussettes lot de 3 paires',
    description: 'Chaussettes en coton bio, motifs variés.',
    price: 14.99,
    stock: 150,
    categoryName: 'Accessoires',
  },
  {
    name: 'Gants en laine doublés',
    description: 'Gants tactiles en laine avec doublure polaire.',
    price: 27.99,
    stock: 45,
    categoryName: 'Accessoires',
  },
  {
    name: 'Bandeau en velours',
    description: 'Bandeau cheveux en velours, plusieurs coloris disponibles.',
    price: 12.99,
    stock: 130,
    categoryName: 'Accessoires',
  },
]

async function main() {
  console.log('Seeding admin user...')
  const hashedPassword = await bcrypt.hash('admin1234', 10)
  await prisma.user.upsert({
    where: { email: 'admin@boutique.fr' },
    update: {},
    create: {
      email: 'admin@boutique.fr',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'Boutique',
      role: 'ADMIN',
    },
  })

  console.log('Seeding categories...')
  const createdCategories = {}
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: { name: cat.name },
    })
    createdCategories[cat.name] = created.id
  }

  console.log('Seeding products...')
  for (const product of products) {
    const { categoryName, ...data } = product
    await prisma.product.create({
      data: {
        ...data,
        price: data.price,
        categoryId: createdCategories[categoryName],
      },
    })
  }

  console.log(`Done. ${products.length} products seeded across ${categories.length} categories.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
