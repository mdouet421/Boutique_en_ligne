import { ref, computed } from 'vue'
import type { User, AuthResponse } from '@/types'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
const user = ref<User | null>(JSON.parse(localStorage.getItem(USER_KEY) ?? 'null'))

const isAuthenticated = computed(() => token.value !== null)

function persist(data: AuthResponse) {
  token.value = data.token
  user.value = data.user
  localStorage.setItem(TOKEN_KEY, data.token)
  localStorage.setItem(USER_KEY, JSON.stringify(data.user))
}

function clear() {
  token.value = null
  user.value = null
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

async function login(email: string, password: string): Promise<void> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const { message } = await res.json()
    throw new Error(message)
  }
  persist(await res.json())
}

async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<void> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email, password }),
  })
  if (!res.ok) {
    const { message } = await res.json()
    throw new Error(message)
  }
  persist(await res.json())
}

function logout() {
  clear()
}

export function useAuth() {
  return { token, user, isAuthenticated, login, register, logout }
}
