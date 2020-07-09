const API = "https://cat-fact.herokuapp.com";

export const getFacts = () =>
  fetch(API + "/facts/random?animal_type=cat&amount=5");

const catFactService = {
  getFacts
};

export default catFactService;