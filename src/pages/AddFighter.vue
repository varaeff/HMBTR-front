<template>
  <h1 class="title">Добавление нового бойца</h1>
  <div class="promo-block">
    <div class="promo-block__picture">
      <ImageUpload v-model:imageSrc="newFighter.pic.value" />
    </div>
    <div class="promo-block__features">
      <div class="form-area">
        <div class="form-area__title form-area__title--medium">Введите данные бойца.</div>
        <div class="form-area__content">
          <div class="fieldsets-batch">
            <InputTextComponent :placeholder="'Фамилия'" v-model:value="newFighter.surname.value" />
            <InputTextComponent :placeholder="'Имя'" v-model:value="newFighter.name.value" />
            <InputTextComponent
              :placeholder="'Отчество'"
              v-model:value="newFighter.patronymic.value"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-btn">
    <button class="btn btn-primary-accent btn-large">Сохранить данные</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ImageUpload from '@/widgets/ImageUpload'
import InputTextComponent from '@/widgets/InputTextComponent'

const newFighter = {
  surname: ref(''),
  name: ref(''),
  patronymic: ref(''),
  pic: ref('')
}
</script>
