<template>
  <main class="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
    <h1 class="text-4xl font-bold tracking-tight">Boutique en Ligne</h1>
    <p class="text-muted-foreground max-w-md text-lg">
      Découvrez notre collection de vêtements tendance pour toutes les saisons.
    </p>
    <Button size="lg" as-child>
      <RouterLink :to="{ name: 'products' }">Voir les produits</RouterLink>
    </Button>
  </main>
</template>

<script lang="ts" setup>
  import { Button } from '@/components/ui/button'
</script>
