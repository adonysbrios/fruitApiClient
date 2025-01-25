<template>
    <RouterLink :to="{name:'about', params:{id:props.item.id}}" class="fruitCard">
        <img :src="props.item.image" alt="">
        <h1>{{ props.item.name }}</h1>
        <p>{{ props.item.description }}</p>
        <br>
        <p class="price">$ {{ props.item.price }}</p>
        <a>Touch to view fruit</a>
    </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const props = defineProps(['item'])
</script>