<template>
  <h1 class="title">Добавление нового бойца</h1>
  <ButtonAlert
    v-show="showAlert"
    :title="alertData.title"
    :mainText="alertData.mainText.value"
    :buttonText="alertData.buttonText"
    :buttonAction="alertData.buttonAction"
    :closeAction="alertData.closeAction"
  />
  <form @submit.prevent="saveNewFighter">
    <div class="promo-block">
      <div class="promo-block__picture">
        <ImageUpload v-model:imageSrc="newFighter.pic.value" />
      </div>
      <div class="promo-block__features">
        <div class="form-area">
          <div class="form-area__title form-area__title--medium">Введите данные бойца.</div>
          <div class="form-area__content">
            <div class="fieldsets-batch">
              <InputTextComponent
                :placeholder="'Фамилия'"
                v-model:value="newFighter.surname.value"
              />
              <InputTextComponent :placeholder="'Имя'" v-model:value="newFighter.name.value" />
              <InputTextComponent
                :placeholder="'Отчество'"
                v-model:value="newFighter.patronymic.value"
              />
              <SelectComponent
                :placeholder="'Страна'"
                :values="countries"
                v-model:value="newFighter.country.value"
              />
              <SelectComponent
                :placeholder="'Город'"
                :values="cities"
                v-model:value="newFighter.city.value"
              />
              <SelectComponent
                :placeholder="'Клуб'"
                :values="clubs"
                v-model:value="newFighter.club.value"
              />
              <VueCtkDateTimePicker
                :onlyDate="true"
                :right="true"
                :noLabel="true"
                :noHeader="true"
                :noButton="true"
                :color="'#808f9d'"
                :format="'DD-MM-YYYY'"
                :formatted="'ll'"
                :label="'Дата рождения'"
                v-model="newFighter.birthday.value"
                @click="newFighter.birthday.value = getDate(30)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-btn">
      <button type="submit" class="btn btn-primary-accent btn-large">Сохранить данные</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCommonDataStore } from '@/app/stores/commonData'
import { useFightersListStore } from '@/app/stores/fightersList'
import { useRouter } from 'vue-router'
import NoPhoto from '@/entities/no_photo.jpg'
import ButtonAlert from '@/widgets/ButtonAlert'
import ImageUpload from '@/widgets/ImageUpload'
import InputTextComponent from '@/widgets/InputTextComponent'
import SelectComponent from '@/widgets/SelectComponent'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import { getDate, parseDateString } from '@/features/getDates'

const fightersListStore = useFightersListStore()
const router = useRouter()

const newFighter = {
  id: -1,
  surname: ref<string>(''),
  name: ref<string>(''),
  patronymic: ref<string>(''),
  country: ref<string>(''),
  city: ref<string>(''),
  club: ref<string>(''),
  pic: ref<string>(''),
  birthday: ref<string>('')
}

const showAlert = ref(false)
let emptyFields = ''

const alertData = {
  title: 'Заполнены не все обязательные поля!',
  mainText: ref(''),
  buttonText: 'ОК',
  buttonAction: () => {
    showAlert.value = false
  },
  closeAction: () => {
    showAlert.value = false
  }
}

const commonDataStore = useCommonDataStore()
const countries = commonDataStore.getCountries
const cities = ref<string[]>([])
const clubs = ref<string[]>([])

watch(newFighter.country, (newValue) => {
  cities.value = commonDataStore.getCities(newValue)
  newFighter.city.value = ''
  newFighter.club.value = ''
})

watch(newFighter.city, (newValue) => {
  clubs.value = commonDataStore.getClubs(newValue)
  newFighter.club.value = ''
})

const saveNewFighter = () => {
  const errorMsg: string[] = []

  if (!newFighter.name.value) errorMsg.push('имя бойца')
  if (!newFighter.surname.value) errorMsg.push('фамилия бойца')
  if (!newFighter.country.value) errorMsg.push('страна')
  if (!newFighter.city.value) errorMsg.push('город')

  if (errorMsg.length) {
    emptyFields = errorMsg.join(', ') + '.'
    alertData.mainText.value = `Обязательны к заполнению следующие поля: ${emptyFields}`
    showAlert.value = true
    return
  }

  const saveDate = newFighter.birthday.value.length
    ? parseDateString(newFighter.birthday.value)
    : null

  const photo = newFighter.pic.value.length ? newFighter.pic.value : NoPhoto

  const saveData = {
    id: fightersListStore.getMaxId,
    surname: newFighter.surname.value,
    name: newFighter.name.value,
    patronymic: newFighter.patronymic.value,
    country: newFighter.country.value,
    city: newFighter.city.value,
    club: newFighter.club.value,
    pic: photo,
    birthday: saveDate
  }
  fightersListStore.$state.fighters.push(saveData)
  router.push('/fighters')
}
</script>

<style scoped>
#undefined-wrapper {
  border: 1px solid #808f9d;
}
</style>
