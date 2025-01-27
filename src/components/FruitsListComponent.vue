<template>
    <div class="fruitsList">
        <FruitCardComponent v-for="item in fruitsStore.fruits.fruits" :key="item.id" :item="item" />
    </div>
    <section v-show="showAdd" class="fixedBg">
        <CreateFruit @hideCreateForm="showAdd=!showAdd" v-if="showAdd"/>
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
import FruitCardComponent from './FruitCardComponent.vue';
import CreateFruit from './CreateFruit.vue';

const showAdd = ref(false)

const fruitsStore = useFruitsStore()
fruitsStore.getFruits()
</script>