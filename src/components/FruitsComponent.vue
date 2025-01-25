<template>
    <div class="fruitsList">
        <FruitComponent v-for="item in fruitsStore.fruits.fruits" :key="item.id" :item="item" />
    </div>
    <section v-show="showAdd" class="fixedBg">
        <div class="card card-m">
            <h1>Add new fruit</h1>
            <p>Fill all fields to add a fruit</p>
            <hr>
            <p class="form-p">Fruit name</p>
            <input type="text" v-model="newFruit.name">
            <p class="form-p">Fruit image</p>
            <input type="text" v-model="newFruit.image">
            <p class="form-p">Fruit price</p>
            <input type="text" v-model="newFruit.price">
            <p class="form-p">Fruit description</p>
            <textarea v-model="newFruit.description"></textarea>
            <p class="form-p">Fruit taste</p>
            <input type="text" v-model="newFruit.taste">
            <p class="form-p">Fruit color</p>
            <input type="color" v-model="newFruit.color">
            <p class="form-p">Fruit expire date</p>
            <input type="date" v-model="newFruit.expires">
            <button @click="fruitsStore.addFruit(newFruit); resetFruit()">Add new fruit</button>
            <button @click="showAdd = !showAdd" class="secondary-btn">Close</button>
        </div>
    </section>
    <footer>
        <button @click="showAdd = !showAdd">+</button>
    </footer>
</template>

<style scoped>
button {
    margin-top: 10px;
}

p {
    margin-bottom: 10px;
}
</style>

<script setup lang="ts">
import { useFruitsStore } from '@/stores/fruits';
import { reactive, ref } from 'vue';
import FruitComponent from './FruitComponent.vue';

const showAdd = ref(false)

const newFruit = reactive({
    isFruit: true,
    name: "",
    image: "",
    price: "",
    description: "",
    taste: "",
    color: "#ffffff",
    expires: ""
})

const resetFruit = () => {
    newFruit.name = ''
    newFruit.image = ''
    newFruit.price = ''
    newFruit.description = ''
    newFruit.taste = ''
    newFruit.color = '#ffffff'
    newFruit.expires = ''
    showAdd.value = false
}

const fruitsStore = useFruitsStore()
fruitsStore.getFruits()
</script>