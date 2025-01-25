<template>
  <div class="aboutView">
    <div class="buttons-about">
      <button @click="router.back()" class="goBack">Go back</button>
      <button @click="() => { fruits.deleteFruit(id).then(() => router.back()) }" class="goBack">Delete</button>
    </div>
    <img :src="fruit.image" :alt="fruit.name">
    <h1>{{ fruit.name }}</h1>
    <p class="taste">({{ fruit.taste }})</p>
    <p>{{ fruit.description }}</p>
    <br>
    <h3>Expire date</h3>
    <p>{{ fruit.expires }}</p>
    <br>
    <h3>Price</h3>
    <p>$ {{ fruit.price }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useFruitsStore } from '@/stores/fruits';
import { ref } from 'vue';

const route = useRoute()
const fruits = useFruitsStore()
const id = Number(route.params.id)
const fruit = ref({
  image: "",
  name: "",
  taste: "",
  description: "",
  expires: "",
  price: 0
})
const router = useRouter()



// Chequear si existe el id en fruits.fruits y si no usar fruits.getFruitById(id)
let check:any = fruits.fruits.fruits.find((fruit: any) => fruit.id === id);
if(check){
  fruit.value = check
}else{
  fruits.getFruitById(id).then((res: any) => {
    fruit.value = res
  }).catch((err: any) => {
    console.log(err)
  })
}

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
