<template>
  <div class="container mx-auto px-4 py-10">
    <div class="mb-8 flex items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <Button variant="ghost" size="sm" as-child>
          <RouterLink :to="{ name: 'home' }">← Retour</RouterLink>
        </Button>
        <h1 class="text-3xl font-bold tracking-tight">Nos produits</h1>
      </div>

      <Select v-model="sort" @update:model-value="onSortChange">
        <SelectTrigger class="w-52">
          <SelectValue placeholder="Trier par..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price_asc">Prix croissant</SelectItem>
          <SelectItem value="price_desc">Prix décroissant</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Grille produits -->
    <div v-if="loading" class="grid grid-cols-4 gap-6">
      <div
        v-for="n in PAGE_SIZE"
        :key="n"
        class="bg-muted aspect-[3/4] animate-pulse rounded-xl"
      />
    </div>

    <div v-else-if="error" class="text-destructive py-20 text-center">
      Une erreur est survenue lors du chargement des produits.
    </div>

    <div v-else>
      <div class="grid grid-cols-4 gap-6">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-10 flex justify-center">
        <Pagination
          :total="totalItems"
          :items-per-page="PAGE_SIZE"
          :sibling-count="1"
          show-edges
          :default-page="currentPage"
          @update:page="onPageChange"
        >
          <PaginationContent v-slot="{ items }">
            <PaginationFirst />
            <PaginationPrevious />
            <template v-for="(item, index) in items" :key="index">
              <PaginationItem
                v-if="item.type === 'page'"
                :value="item.value"
                :is-active="item.value === currentPage"
              >
                {{ item.value }}
              </PaginationItem>
              <PaginationEllipsis v-else :index="index" />
            </template>
            <PaginationNext />
            <PaginationLast />
          </PaginationContent>
        </Pagination>
      </div>

      <p class="text-muted-foreground mt-4 text-center text-sm">
        {{ totalItems }} produit{{ totalItems > 1 ? 's' : '' }} au total
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { Button } from '@/components/ui/button'
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationFirst,
    PaginationItem,
    PaginationLast,
    PaginationNext,
    PaginationPrevious,
  } from '@/components/ui/pagination'
  import ProductCard from '@/components/ProductCard.vue'
  import type { Product, ProductsResponse } from '@/types'
  import { PAGE_SIZE } from '@/constants'

  const route = useRoute()
  const router = useRouter()

  const products = ref<Product[]>([])
  const totalItems = ref(0)
  const totalPages = computed(() => Math.ceil(totalItems.value / PAGE_SIZE))
  const currentPage = ref(Number(route.query.page) || 1)
  const sort = ref<string>((route.query.sort as string) || '')
  const loading = ref(false)
  const error = ref(false)

  async function fetchProducts(page: number, sortValue: string) {
    loading.value = true
    error.value = false
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE) })
      if (sortValue) params.set('sort', sortValue)
      const res = await fetch(`/api/products?${params}`)
      if (!res.ok) throw new Error()
      const json: ProductsResponse = await res.json()
      products.value = json.data
      totalItems.value = json.total
    } catch {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  function onPageChange(page: number) {
    currentPage.value = page
    const query: Record<string, string> = { page: String(page) }
    if (sort.value) query.sort = sort.value
    router.push({ query })
  }

  function onSortChange(value: string) {
    currentPage.value = 1
    const query: Record<string, string> = {}
    if (value) query.sort = value
    router.push({ query })
  }

  watch([currentPage, sort], ([page, sortValue]) => fetchProducts(page, sortValue))

  onMounted(() => fetchProducts(currentPage.value, sort.value))
</script>
