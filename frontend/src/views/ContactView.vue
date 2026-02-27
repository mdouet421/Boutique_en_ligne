<template>
  <div class="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
    <div class="w-full max-w-lg">
      <div class="mb-6">
        <h1 class="text-3xl font-bold tracking-tight">Nous contacter</h1>
        <p class="text-muted-foreground mt-1 text-sm">
          Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
        </p>
      </div>

      <div v-if="submitted" class="border rounded-xl p-6 text-center space-y-2">
        <p class="text-lg font-semibold">Message envoyé !</p>
        <p class="text-muted-foreground text-sm">Merci pour votre message. Nous vous répondrons rapidement.</p>
        <Button variant="outline" class="mt-4" @click="reset">Envoyer un autre message</Button>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="border rounded-xl p-6 space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1.5">
            <Label for="contact-firstname">Prénom</Label>
            <Input id="contact-firstname" v-model="form.firstName" placeholder="Jean" required />
          </div>
          <div class="space-y-1.5">
            <Label for="contact-lastname">Nom</Label>
            <Input id="contact-lastname" v-model="form.lastName" placeholder="Dupont" required />
          </div>
        </div>
        <div class="space-y-1.5">
          <Label for="contact-email">Email</Label>
          <Input id="contact-email" v-model="form.email" type="email" placeholder="vous@exemple.fr" required />
        </div>
        <div class="space-y-1.5">
          <Label for="contact-subject">Objet</Label>
          <Input id="contact-subject" v-model="form.subject" placeholder="Sujet de votre message" required />
        </div>
        <div class="space-y-1.5">
          <Label for="contact-message">Message</Label>
          <Textarea id="contact-message" v-model="form.message" placeholder="Votre message..." :rows="5" required />
        </div>

        <Button type="submit" class="w-full">Envoyer</Button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  import { Textarea } from '@/components/ui/textarea'
  import { useAuth } from '@/composables/useAuth'

  const { user } = useAuth()

  const form = ref({
    firstName: user.value?.firstName ?? '',
    lastName: user.value?.lastName ?? '',
    email: user.value?.email ?? '',
    subject: '',
    message: '',
  })

  watch(user, (u) => {
    if (u) {
      form.value.firstName = u.firstName
      form.value.lastName = u.lastName
      form.value.email = u.email
    }
  })

  const submitted = ref(false)

  function handleSubmit() {
    submitted.value = true
  }

  function reset() {
    form.value = {
      firstName: user.value?.firstName ?? '',
      lastName: user.value?.lastName ?? '',
      email: user.value?.email ?? '',
      subject: '',
      message: '',
    }
    submitted.value = false
  }
</script>
