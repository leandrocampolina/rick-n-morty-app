import { defineStore } from '#q-app/wrappers'
import { createPinia } from 'pinia'

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface PiniaCustomProperties {
    // add your custom properties here, if any
  }
}

export default defineStore(() => {
  const pinia = createPinia()

  return pinia
})
