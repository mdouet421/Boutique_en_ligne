<template>
  <main class="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-6 px-4 text-center">
    <h1 class="text-4xl font-bold tracking-tight">Boutique en Ligne</h1>
    <p class="text-muted-foreground max-w-md text-lg">
      Découvrez notre collection de vêtements tendance pour toutes les saisons.
    </p>
    <div class="flex gap-3">
      <Button size="lg" as-child>
        <RouterLink :to="{ name: 'products' }">Voir les produits</RouterLink>
      </Button>
      <Button v-if="!isAuthenticated" size="lg" variant="outline" as-child>
        <RouterLink :to="{ name: 'auth' }">Se connecter</RouterLink>
      </Button>
    </div>
  </main>
</template>

<script lang="ts" setup>
  import { Button } from '@/components/ui/button'
  import { useAuth } from '@/composables/useAuth'

  const { isAuthenticated } = useAuth()
</script>
