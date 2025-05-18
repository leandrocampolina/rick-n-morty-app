import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Character {
  id: string
  name: string
  image: string
  species: string
  status?: string
  gender?: string
}

export interface PageInfo {
  pages: number
  next: number | null
  prev: number | null
}

export const useCharactersStore = defineStore('characters', () => {
  const list = ref<Character[]>([])
  const info = ref<PageInfo>({ pages: 0, next: null, prev: null })
  const current = ref<Character | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL as string

  const GET_CHARACTERS_QUERY = `
    query GetCharacters($page: Int, $filter: FilterCharacter) {
      characters(page: $page, filter: $filter) {
        info { pages next prev }
        results { id name image species }
      }
    }
  `

  const GET_CHARACTER_QUERY = `
    query GetCharacter($id: ID!) {
      character(id: $id) {
        id name image species status gender
      }
    }
  `

  async function fetchList(payload: { page?: number; name?: string } = {}) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: GET_CHARACTERS_QUERY,
          variables: { page: payload.page ?? 1, filter: { name: payload.name ?? '' } }
        })
      })
      const json = await res.json()
      if (json.errors) throw new Error(json.errors[0].message)
      list.value = json.data.characters.results
      info.value = json.data.characters.info
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      }
      else {
        error.value = String(err)
      }
    }
    finally {
      loading.value = false
    }
  }

  async function fetchDetail(id: string) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: GET_CHARACTER_QUERY,
          variables: { id }
        })
      })
      const json = await res.json()
      if (json.errors) throw new Error(json.errors[0].message)
      current.value = json.data.character
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      }
      else {
        error.value = String(err)
      }
    }
    finally {
      loading.value = false
    }
  }

  return {
    list,
    info,
    current,
    loading,
    error,
    fetchList,
    fetchDetail
  }
})