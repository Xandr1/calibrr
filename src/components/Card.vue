<template>
  <div class="card">
    <img
      :src="cat.webformatURL"
      alt="cat"
      class="image"
      @click="goToCatPage()"
    />
    <div class="info">
      <div class="tags-list">
        <div v-for="(tag, index) of tagsArray" :key="index" class="tag">
          {{ tag }}
        </div>
      </div>
      <div>
        <span class="likes"
          >Liked <strong>{{ cat.likes }}</strong> times</span
        >
      </div>
      <div>
        <span class="comments"
          ><strong>{{ cat.comments }}</strong> Comments</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  width: 220px;
  height: 350px;
  border: 3px solid darkgrey;
  border-radius: 12px;
  margin: 25px auto;
}
.image {
  width: 100%;
  cursor: pointer;
}
.info {
  position: absolute;
  bottom: 25px;
  left: 25px;
}
.tags-list {
  display: flex;
  flex-wrap: wrap;
}
.tag {
  background: lightgrey;
  border-radius: 5px;
  padding: 3px;
  margin: 3px 3px 3px 0;
}
.likes,
.comments {
  float: left;
}
</style>

<script lang="ts">
import { CatInterface } from "@/types/cat.interface";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Card extends Vue {
  @Prop()
  public readonly cat!: CatInterface;

  get tagsArray(): Array<string> {
    return this.cat.tags.split(`, `);
  }

  public goToCatPage(): void {
    this.$router.push(`/cat-${this.cat.id}`);
  }
}
</script>

<style scoped lang="scss"></style>
