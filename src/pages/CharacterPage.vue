<template>
  <q-page padding>
    <q-btn flat round icon="arrow_back" @click="$router.back()" />
    <q-spinner v-if="loading" size="2em" />
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="char">
      <div class="card-list-box">
        <q-card class="card-box-img">
          <q-img :src="char.image" ratio="1" />
        </q-card>
        <q-card class="card-box-description">
          <q-card-section>
            <div class="text-h6">{{ char.name }}</div>
            <div>Status: {{ char.status }}</div>
            <div>Espécie: {{ char.species }}</div>
            <div>Gênero: {{ char.gender }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCharactersStore } from 'stores/characters'
import { useRoute } from 'vue-router'

const store = useCharactersStore()
const route = useRoute()
const id = route.params.id as string

onMounted(() => {
  void store.fetchDetail(id)
})

const char = computed(() => store.current)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
</script>

<style lang="scss" scoped>
.card-list-box {
  margin-top: 20vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.card-box-img {
  width: 450px;
  border-radius: 5px;
}
.card-box-description {
  height: 150px;
  border-radius: 5px;
}
</style>
