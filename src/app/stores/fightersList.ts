import { defineStore } from 'pinia'
import type { Fighter } from '@/shared/model'

import Ukolov from '@/entities/Ukolov.png'
import Namazov from '@/entities/Namazov.jpeg'
import Golovina from '@/entities/Golovina.jpeg'
import NoPhoto from '@/entities/no_photo.jpg'

interface FightersListState {
  fighters: Fighter[]
  seachString: string
}

export const useFightersListStore = defineStore({
  id: 'fightersList',
  state: (): FightersListState => ({
    fighters: [
      {
        id: 0,
        name: 'боец не найден',
        surname: '',
        country: 'боец не найден',
        city: 'боец не найден',
        club: 'боец не найден',
        pic: NoPhoto
      },
      {
        id: 1,
        name: 'Сергей',
        surname: 'Уколов',
        country: 'Россия',
        city: 'Москва',
        club: 'Байард',
        pic: Ukolov
      },
      {
        id: 2,
        name: 'Рафаэль',
        surname: 'Намазов',
        country: 'Россия',
        city: 'Нижний Новгород',
        club: 'Берн',
        pic: Namazov
      },
      {
        id: 3,
        name: 'Марина',
        surname: 'Головина',
        country: 'Россия',
        city: 'Москва',
        club: 'Тверд',
        pic: Golovina
      }
    ],
    seachString: ''
  }),
  actions: {
    showFighterDetails(this: FightersListState, id: number) {
      const fighter = this.fighters.find((fighter) => fighter.id === id)
      return fighter ? fighter : this.fighters[0]
    }
  },
  getters: {
    filteredFightersList(state) {
      return state.fighters
        .filter((fighter) => fighter.id !== 0)
        .filter(
          (fighter) =>
            fighter.name.toLowerCase().includes(state.seachString.toLowerCase()) ||
            fighter.surname.toLowerCase().includes(state.seachString.toLowerCase()) ||
            fighter.city.toLowerCase().includes(state.seachString.toLowerCase()) ||
            (fighter.club && fighter.club.toLowerCase().includes(state.seachString.toLowerCase()))
        )
    },
    getMaxId(state) {
      return (
        state.fighters.reduce((maxId, fighter) => {
          return Math.max(maxId, fighter.id)
        }, 0) + 1
      )
    }
  }
})
