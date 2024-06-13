<template>
  <h1 class="title">Список бойцов</h1>
  <div class="title">
    <SeachComponent
      :placeholder="'Введите имя, город или клуб'"
      :clearBtn="true"
      :btnTitle="'Очистить поиск'"
      :width="30"
    />
  </div>
  <div class="fightersList">
    <FighterCard
      v-for="fighter in fightersList"
      :key="fighter.id"
      :name="`${fighter.surname} ${fighter.name}`"
      :description="`${fighter.city} ${fighter.club}`"
      :pic="fighter.pic"
      @click="router.push(`/fighter/${fighter.id}`)"
    />
  </div>
  <div class="bottom-btn">
    <button class="btn btn-primary-accent btn-large" @click="router.push(`/addFighter`)">
      Добавить бойца
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Fighter } from '@/shared/model'
import { useFightersListStore } from '@/app/stores/fightersList'
import FighterCard from '@/widgets/FighterCard'
import SeachComponent from '@/widgets/SeachComponent'
import { useRouter } from 'vue-router'

const router = useRouter()

const fightersList = ref([] as Fighter[])
const fightersListStore = useFightersListStore()
fightersList.value = fightersListStore.filteredFightersList

const seachString = computed(() => fightersListStore.$state.seachString)

watch(seachString, () => {
  fightersList.value = fightersListStore.filteredFightersList
})
</script>

<style scoped>
.fightersList {
  display: flex;
}
</style>
