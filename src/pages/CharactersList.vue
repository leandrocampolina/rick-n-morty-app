<template>
  <q-page padding class="page-with-spinner">
    <div v-if="loading" class="full-screen-overlay flex flex-center">
      <q-spinner color="white" size="4em" />
    </div>
    <div v-else>
      <q-input
        v-model="name"
        label="Search by name"
        label-color="white"
        debounce="300"
        @keyup.enter="load()"
        input-class="text-white"
      />
      <div class="q-gutter-md q-mt-md card-list-box">
        <q-card
          v-for="char in list"
          :key="char.id"
          clickable
          class="card-box"
          @click="goTo(char.id)"
        >
          <q-img :src="char.image" ratio="1" />
          <q-card-section>{{ char.name }}</q-card-section>
        </q-card>
      </div>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="page"
          color="green"
          :max="info.pages"
          :max-pages="6"
          boundary-numbers
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCharactersStore } from 'stores/characters'
import { useRouter } from 'vue-router'

const store = useCharactersStore()
const router = useRouter()

const page = ref(1)
const name = ref('')

watch([page, name], load, { immediate: true })

function load() {
  void store.fetchList({
    page: page.value,
    name: name.value
  })
}

function goTo(id: string) {
  void router.push({ name: 'characters.detail', params: { id } })
}

const list = computed(() => store.list)
const info = computed(() => store.info)
const loading = computed(() => store.loading)
</script>

<style lang="scss" scoped>
.page-with-spinner {
  position: relative;
  background-color: #0D0D0D;
}

// Overlay cobrindo tudo
.full-screen-overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  opacity: 0.6;
  z-index: 10;
}
.card-list-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card-box {
  width: 300px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: rgba(92, 173, 74, 0.5) 0px 0px 11px, rgba(92, 173, 74, 0.14) 0px 8px 27px, rgba(92, 173, 74, 0.12) 0px 6px 10px;
}
.text-white {
  color: white;
}
</style>