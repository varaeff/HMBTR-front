<template>
  <h1 class="title">Карточка бойца</h1>
  <div class="promo-block">
    <div class="promo-block__picture grey-image">
      <img class="card__image" :src="fighter?.pic" :alt="fullName" />
    </div>
    <div class="promo-block__features">
      <ul class="titled-items-list">
        <li class="titled-item titled-items-list__item">
          <div class="titled-item__title">ФИО:</div>
          <div class="titled-item__content">
            {{ fullName }}
          </div>
        </li>
        <li class="titled-item titled-items-list__item">
          <div class="titled-item__title">Город</div>
          <div class="titled-item__content">{{ fighter?.city }}</div>
        </li>
        <li class="titled-item titled-items-list__item">
          <div class="titled-item__title">Клуб</div>
          <div class="titled-item__content">{{ club }}</div>
        </li>
      </ul>
    </div>
  </div>
  <div class="center">
    <button class="btn btn-primary-accent btn-large" @click="router.push(`/fighters`)">
      К списку бойцов
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useFightersListStore } from '@/app/stores/fightersList'

const route = useRoute()
const router = useRouter()
const FightersListStore = useFightersListStore()
const fighterId = +route.params.id || 0
const fighter = FightersListStore.showFighterDetails(fighterId)
const fullName = `${fighter?.surname ? fighter?.surname : ''} ${fighter?.name ? fighter?.name : ''} ${fighter?.patronymic ? fighter?.patronymic : ''}`
const club = `${fighter?.club ? fighter.club : 'Без клуба'}`
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.grey-image {
  filter: grayscale(1);
  transition: 1s;
}
.grey-image:hover {
  filter: grayscale(0);
  transform: scale(1.1);
}
</style>
