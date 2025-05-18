<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header-app">
      <q-toolbar>

        <q-toolbar-title>
          Rick n' Morty
        </q-toolbar-title>

        <q-avatar class="img-shadow" >
          <img src="../assets/portal.png">
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
.header-app {
  background-color: #208D45;

  .img-shadow {
    box-shadow: rgba(0, 0, 0, 0.9) 0px 0px 11px;
  }
}
</style>
