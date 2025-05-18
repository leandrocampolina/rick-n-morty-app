import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'characters.list',
        component: () => import('src/pages/CharactersList.vue')
      },
      {
        path: 'character/:id',
        name: 'characters.detail',
        component: () => import('src/pages/CharacterPage.vue'),
        props: true
      }
    ]
  }
];

export default routes;
