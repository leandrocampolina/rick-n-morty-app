<template>
  <q-page padding class="character-page">
    <q-btn class="text-white" flat round icon="arrow_back" @click="$router.back()" />
    <div v-if="loading" class="full-screen-overlay flex flex-center">
      <q-spinner color="white" size="4em" />
    </div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="char" class="card-list-box">
      <q-card flat bordered class="card-box">
        <q-card-section horizontal>
          <q-card-section class="card-box-description">
            <div class="text-h6">{{ char.name }}</div>
            <q-separator />
            <q-list class="avatar-icon-list">
              <q-item>
              <q-item-section avatar class="hover-container">
                <q-icon class="avatar-icon icon-hover-item" color="primary" name="favorite" />
                <span class="text-hover-item">{{ char.status }}</span>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar class="hover-container">
                <q-icon class="avatar-icon icon-hover-item" color="primary" name="groups" />
                <span class="text-hover-item">{{ char.species }}</span>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar class="hover-container">
                <q-icon
                  class="avatar-icon icon-hover-item"
                  color="primary"
                  :name="char.gender === 'male' ? 'female' : 'male'"
                />
                <span class="text-hover-item">{{ char.gender }}</span>
              </q-item-section>
            </q-item>
            </q-list>
          </q-card-section>

          <q-img
            class="card-box-img"
            :src="char.image"
            ratio="1"
          />
        </q-card-section>
      </q-card>
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
.full-screen-overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  opacity: 0.6;
  z-index: 10;
}
.character-page {
  position: relative;
  background-color: #0D0D0D;
}
.card-list-box {
  margin-top: 10vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.card-box {
  border-radius: 15px !important;
  box-shadow: rgba(92, 173, 74, 0.5) 0px 0px 11px, rgba(92, 173, 74, 0.14) 0px 8px 27px, rgba(92, 173, 74, 0.12) 0px 6px 10px !important;
}
.card-box-img {
  width: 450px;
}
.card-box-description {
  height: 150px;
  border-radius: 5px;
}
.avatar-icon-list {
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.avatar-icon {
  font-size: 35px !important;
}
.hover-container {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;

  .icon-hover-item,
  .text-hover-item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.4s ease;
    text-align: center;
  }

  .icon-hover-item {
    opacity: 1;
  }

  .text-hover-item {
    opacity: 0;
    color: black;
    font-weight: bold;
    font-size: 16px;
  }

  &:hover {
    .icon-hover-item {
      opacity: 0;
    }
    .text-hover-item {
      opacity: 1;
    }
  }
}
.text-white {
  color: white;
}
</style>
