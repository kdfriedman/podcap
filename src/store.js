// create data store model
const model = {
  builder: {
    section: [],
    updateSection: (state, payload) => {
      state.section.push(payload);
    },
  },
};

export default model;
