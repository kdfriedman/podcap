import { createStore, action } from "easy-peasy";

// create data store model
const store = createStore({
  sectionInput: {
    sectionInputValue: [],
    updateSectionInputValue: action((state, payload) => {
      state.sectionInputValue.push({ text: payload, done: false });
    }),
  },
});

export default store;
