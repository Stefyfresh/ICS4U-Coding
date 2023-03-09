<template>
    <div>
        <section v-if="destination" class="destination">
            <h1>{{destination.name}}</h1>
            <GoBack></GoBack>
            <div class="destination-details">
                <img :src="`/images/${destination.image}`" :alt="destination.name">
                <p>{{ destination.description }}</p>
            </div>
            </section>
        <section class="experiences">
            <h2>Top experiences in {{ destination.name }}</h2>
            <div class="cards">
                <RouterLink
                v-for="experience in destination.experiences"
                :key="experience.slug"
                :to="{ name: 'experience.show', params: {experienceSlug: experience.slug}}"
                >
                    <ExperienceCard
                    :experience="experience" 
                    ></ExperienceCard>
                </RouterLink>
            </div>
            <RouterView></RouterView>
        </section>
    </div>
</template>

<script> 
import sourceData from '@/data.json'
import ExperienceCard from '@/components/ExperienceCard.vue'
import { RouterLink, RouterView } from 'vue-router';
import GoBack from '@/components/GoBack.vue';

export default{
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    computed: {
        destination() {
            return sourceData.destinations.find(destination => destination.id === this.id);
        }
    },
    components: { ExperienceCard, RouterLink, RouterView, GoBack }
}
</script>