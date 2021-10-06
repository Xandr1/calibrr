<template>
  <div class="wrapper">
    <div class="head-block">
      <input
        type="text"
        placeholder="Search by tag"
        class="search"
        v-model="searchBar"
        @keyup="search()"
      />
      <div class="sort most-liked" @click="sortToggle('most_liked')">
        <img src="../assets/sorting-icon.jpg" class="icon" /><span
          class="heading"
          >Most Liked</span
        >
      </div>
      <div class="sort most-liked" @click="sortToggle('most_commented')">
        <img src="../assets/sorting-icon.jpg" class="icon" /><span
          class="heading"
          >Most Commented</span
        >
      </div>
      <div class="sort default-sort" @click="sortToggle('default')">
        <img src="../assets/sorting-icon.jpg" class="icon" /><span
          class="heading"
          >Default</span
        >
      </div>
    </div>
    <div v-if="!searchBar && !isSearchDelay" class="card-list">
      <div v-for="(cat, index) of currentCatsList" :key="index">
        <Card :cat="cat" />
      </div>
    </div>
    <div v-else-if="!isSearchDelay" class="card-list">
      <div v-for="(cat, index) of searchResult" :key="index">
        <Card :cat="cat" />
      </div>
    </div>
    <div v-else>
      <h3>Loading...</h3>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
.head-block {
  width: 100%;
  margin: 50px auto;
  display: flex;
}
.search {
  display: block;
  width: 30%;
  max-width: 300px;
  height: 25px;
  margin: auto;
}
.sort {
  margin: 10px;
  margin-left: 20px;
  display: flex;
  cursor: pointer;
}
.heading {
  display: block;
  margin-top: 10px;
  font-size: 20px;
}
.card-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 25px;
  row-gap: 50px;
}
.icon {
  display: block;
  width: 30px;
  height: 30px;
  margin: 5px;
}

@media only screen and (max-width: 1024px) {
  .card-list {
    grid-template-columns: repeat(2, 1fr);
  }
  .head-block {
    width: 90%;
    flex-direction: column;
  }
  .search {
    width: 100%;
  }
}

@media only screen and (max-width: 640px) {
  .card-list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Card from "@/components/Card.vue";
import { mapActions, mapGetters } from "vuex";
import { CatInterface } from "@/types/cat.interface";
import { SortType } from "@/types/sort.type";
@Component({
  components: {
    Card,
  },
  computed: {
    ...mapGetters({
      catsList: "cats/catsList",
      catsListMostLiked: "cats/catsListMostLiked",
      catsListMostCommented: "cats/catsListMostCommented",
    }),
  },
  methods: {
    ...mapActions({
      getCatsList: "cats/getCatsList",
    }),
  },
})
export default class List extends Vue {
  catsList!: Array<CatInterface>;
  catsListMostLiked!: Array<CatInterface>;
  catsListMostCommented!: Array<CatInterface>;
  getCatsList!: () => Promise<void>;

  public isSearchDelay = false;

  public currentSorting: SortType = "default";

  public searchBar = "";

  public searchResult: Array<CatInterface> = [];

  get currentCatsList(): Array<CatInterface> {
    if (this.currentSorting === "most_liked") return this.catsListMostLiked;
    if (this.currentSorting === "most_commented")
      return this.catsListMostCommented;
    else return this.catsList;
  }

  public sortToggle(sortParam: SortType): void {
    this.currentSorting = sortParam;
  }

  public search(): void {
    this.isSearchDelay = true;
    window.setTimeout(() => {
      this.searchResult = this.currentCatsList.filter((cat) =>
        cat.tags.includes(this.searchBar)
      );
      this.isSearchDelay = false;
    }, 300);
  }

  async mounted(): Promise<void> {
    await this.getCatsList();
  }
}
</script>
