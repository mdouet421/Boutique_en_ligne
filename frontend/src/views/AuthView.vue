<template>
  <div class="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <Tabs v-model="activeTab">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="login">Connexion</TabsTrigger>
          <TabsTrigger value="register">Inscription</TabsTrigger>
        </TabsList>

        <!-- LOGIN -->
        <TabsContent value="login">
          <div class="border rounded-xl p-6 mt-4 space-y-4">
            <div>
              <h2 class="text-xl font-semibold">Se connecter</h2>
              <p class="text-muted-foreground text-sm">Accédez à votre compte.</p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-4">
              <div class="space-y-1.5">
                <Label for="login-email">Email</Label>
                <Input id="login-email" v-model="loginForm.email" type="email" placeholder="vous@exemple.fr" required />
              </div>
              <div class="space-y-1.5">
                <Label for="login-password">Mot de passe</Label>
                <Input id="login-password" v-model="loginForm.password" type="password" placeholder="••••••••" required />
              </div>

              <p v-if="loginError" class="text-destructive text-sm">{{ loginError }}</p>

              <Button type="submit" class="w-full" :disabled="loginLoading">
                {{ loginLoading ? 'Connexion...' : 'Se connecter' }}
              </Button>
            </form>
          </div>
        </TabsContent>

        <!-- REGISTER -->
        <TabsContent value="register">
          <div class="border rounded-xl p-6 mt-4 space-y-4">
            <div>
              <h2 class="text-xl font-semibold">Créer un compte</h2>
              <p class="text-muted-foreground text-sm">Rejoignez la boutique en quelques secondes.</p>
            </div>

            <form @submit.prevent="handleRegister" class="space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1.5">
                  <Label for="reg-firstname">Prénom</Label>
                  <Input id="reg-firstname" v-model="registerForm.firstName" placeholder="Jean" required />
                </div>
                <div class="space-y-1.5">
                  <Label for="reg-lastname">Nom</Label>
                  <Input id="reg-lastname" v-model="registerForm.lastName" placeholder="Dupont" required />
                </div>
              </div>
              <div class="space-y-1.5">
                <Label for="reg-email">Email</Label>
                <Input id="reg-email" v-model="registerForm.email" type="email" placeholder="vous@exemple.fr" required />
              </div>
              <div class="space-y-1.5">
                <Label for="reg-password">Mot de passe</Label>
                <Input id="reg-password" v-model="registerForm.password" type="password" placeholder="••••••••" required minlength="8" />
              </div>

              <p v-if="registerError" class="text-destructive text-sm">{{ registerError }}</p>

              <Button type="submit" class="w-full" :disabled="registerLoading">
                {{ registerLoading ? 'Création...' : 'Créer mon compte' }}
              </Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuth } from '@/composables/useAuth'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

  const { login, register } = useAuth()
  const router = useRouter()

  const activeTab = ref('login')

  const loginForm = ref({ email: '', password: '' })
  const loginError = ref('')
  const loginLoading = ref(false)

  const registerForm = ref({ firstName: '', lastName: '', email: '', password: '' })
  const registerError = ref('')
  const registerLoading = ref(false)

  async function handleLogin() {
    loginError.value = ''
    loginLoading.value = true
    try {
      await login(loginForm.value.email, loginForm.value.password)
      router.push({ name: 'home' })
    } catch (e) {
      loginError.value = e instanceof Error ? e.message : 'Une erreur est survenue.'
    } finally {
      loginLoading.value = false
    }
  }

  async function handleRegister() {
    registerError.value = ''
    registerLoading.value = true
    try {
      await register(
        registerForm.value.firstName,
        registerForm.value.lastName,
        registerForm.value.email,
        registerForm.value.password
      )
      router.push({ name: 'home' })
    } catch (e) {
      registerError.value = e instanceof Error ? e.message : 'Une erreur est survenue.'
    } finally {
      registerLoading.value = false
    }
  }
</script>
