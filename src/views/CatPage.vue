<template>
  <div class="wrapper">
    <div class="image-block">
      <img :src="currentCat.webformatURL" alt="cat" class="image" />
    </div>
    <div class="info-block">
      <p class="info-text">Type: {{ currentCat.type }}</p>
      <p class="info-text">Tags: {{ currentCat.tags }}</p>
      <p class="info-text">Views: {{ currentCat.views }}</p>
      <p class="info-text">Downloads: {{ currentCat.downloads }}</p>
      <p class="info-text">Likes: {{ currentCat.likes }}</p>
      <p class="info-text">Comments: {{ currentCat.comments }}</p>
      <p class="info-text">Author: {{ currentCat.user }}</p>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 25px auto;
  width: 320px;
  overflow: hidden;
}
.image-block {
  width: 100%;
}
.image {
  max-width: 100%;
  height: auto;
}
.info-block {
  float: left;
}
.info-text {
  text-align: left;
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Card from "@/components/Card.vue";
import { mapActions, mapGetters } from "vuex";
import { CatInterface } from "@/types/cat.interface";

@Component({
  components: {
    Card,
  },
  computed: {
    ...mapGetters({
      currentCat: "cats/currentCat",
    }),
  },
  methods: {
    ...mapActions({
      getSingleCat: "cats/getSingleCat",
    }),
  },
})
export default class CatPage extends Vue {
  currentCat!: CatInterface;
  getSingleCat!: (id: number) => Promise<void>;

  async mounted(): Promise<void> {
    await this.getSingleCat(Number(this.$route.params.id));
  }
}
</script>
