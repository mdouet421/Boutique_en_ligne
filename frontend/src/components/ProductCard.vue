<template>
  <div
    class="bg-card text-card-foreground flex flex-col overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md"
  >
    <!-- Contenu -->
    <div class="flex flex-1 flex-col gap-2 p-4">
      <span
        class="bg-secondary text-secondary-foreground w-fit rounded-full px-2.5 py-0.5 text-xs font-medium"
      >
        {{ product.category.name }}
      </span>
      <h3 class="line-clamp-2 text-sm font-semibold leading-tight">{{ product.name }}</h3>
      <p class="text-muted-foreground line-clamp-2 flex-1 text-xs">
        {{ product.description }}
      </p>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between border-t px-4 py-3">
      <span class="text-base font-bold">{{ formatPrice(product.price) }}</span>
      <span
        :class="[
          'rounded-full px-2.5 py-0.5 text-xs font-medium',
          product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-destructive/10 text-destructive',
        ]"
      >
        {{ product.stock > 0 ? 'En stock' : 'Rupture' }}
      </span>
    </div>

    <!-- Actions admin -->
    <div v-if="isAdmin" class="flex gap-2 border-t px-4 py-2">
      <Button variant="outline" size="sm" class="flex-1" @click="emit('edit', product)">
        <Pencil :size="18" />
      </Button>
      <Button variant="destructive" size="sm" class="flex-1" @click="emit('delete', product)">
        <Trash :size="18" />
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Product } from '@/types'
  import { Button } from '@/components/ui/button'
  import { Pencil, Trash } from 'lucide-vue-next'

  defineProps<{ product: Product; isAdmin?: boolean }>()

  const emit = defineEmits<{
    edit: [product: Product]
    delete: [product: Product]
  }>()

  function formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
  }
</script>
