import { defineStore } from 'pinia'

interface CommonDataState {
  countries: {
    [key: string]: string[]
  }
  clubs: {
    [key: string]: string[]
  }
  selectedCountry: string
}

export const useCommonDataStore = defineStore({
  id: 'commonData',
  state: (): CommonDataState => ({
    countries: {
      Россия: ['Москва', 'Нижний Новгород', 'Курск'],
      Грузия: ['Тбилиси', 'Батуми'],
      Украина: ['Харьков', 'Киев', 'Сумы']
    },
    clubs: {
      Москва: ['Байард', 'Берн', 'Тверд'],
      'Нижний Новгород': ['Берн'],
      Курск: ['Авалон', 'Рарог'],
      Тбилиси: [`Saint George's School`, 'Mistral'],
      Батуми: [],
      Киев: ['Айна Бера'],
      Харьков: ['Ritter', 'Ратибор'],
      Сумы: ['Ritter']
    },
    selectedCountry: ''
  }),
  getters: {
    getCountries(state) {
      return Object.keys(state.countries)
    },
    getCities: (state) => (country: string) => {
      return state.countries[country]
    },
    getClubs: (state) => (city: string) => {
      return state.clubs[city]
    }
  }
})
