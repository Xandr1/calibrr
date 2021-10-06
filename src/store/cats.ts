import { CatInterface } from "@/types/cat.interface";
import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const apiKey = "23684260-44eb7edd56ea024e999d0b812";

const state = () => ({
  catsList: [] as Array<CatInterface>,
  currentCat: {} as CatInterface,
});

export type ModuleState = ReturnType<typeof state>;

const getters = {
  catsList: (state: ModuleState): Array<CatInterface> => {
    return state.catsList;
  },
  catsListMostLiked: (state: ModuleState): Array<CatInterface> => {
    return state.catsList.slice().sort((a, b) => b.likes - a.likes);
  },
  catsListMostCommented: (state: ModuleState): Array<CatInterface> => {
    return state.catsList.slice().sort((a, b) => b.comments - a.comments);
  },
  currentCat: (state: ModuleState): CatInterface => {
    return state.currentCat;
  },
};

const mutations = {
  SAVE_CATS_LIST(state: ModuleState, cats: Array<CatInterface>): void {
    state.catsList = cats;
  },
  SET_CAT(state: ModuleState, singleCat: CatInterface): void {
    state.currentCat = singleCat;
  },
};

const actions = {
  async getCatsList(context: any): Promise<void> {
    await axios
      .get(
        `https://pixabay.com/api/?key=${apiKey}&q=cats&image_type=all&per_page=100`
      )
      .then((response: Record<string, any>) => {
        context.commit(
          "SAVE_CATS_LIST",
          response.data.hits as Array<CatInterface>
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async getSingleCat(context: any, id: number): Promise<void> {
    await axios
      .get(`https://pixabay.com/api/?key=${apiKey}&id=${id}`)
      .then((response: Record<string, any>) => {
        context.commit("SET_CAT", response.data.hits[0] as CatInterface);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
