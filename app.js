//imports
import { TarjetaPokemon, clearHTML } from "./funtions.js";

const Select = document.getElementById("TypePokes");
const Url = "https://pokeapi.co/api/v2/type";
//console.log(Select);
const pre = "normal";

const Selecciona = (results) => {
  const fragmen = document.createDocumentFragment();

  results.forEach((typos) => {
    let option1 = document.createElement("option");
    option1.id = typos.id;
    option1.textContent = typos.name;
    option1.value = typos.name;

    fragmen.appendChild(option1);
  });

  Select.appendChild(fragmen);
};

const TypeData = async () => {
  try {
    const res = await fetch(Url);
    const data = await res.json();
    const { results } = data;
    Selecciona(results);
  } catch (error) {
    console.log(error);
  }
};

//const CaraPokemon = () => {};

const CreaPokemones = (DataPokemon) => {
  // console.log(DataPokemon);
  const {
    abilities,
    types,
    sprites: { front_default },
    name,
  } = DataPokemon;

  const Rabilitis = abilities.map(({ ability: { name } }) => name);

  const Rtypes = types.map(({ type: { name } }) => name);
  // console.log(Rabilitis, Rtypes, front_default);
  TarjetaPokemon({ name, front: front_default, Rabilitis, Rtypes });
};

const SacaPokemones = (OnePokemon) => {
  fetch(OnePokemon)
    .then((response) => response.json())
    .then((data) => CreaPokemones(data));
};

const Pokemones = (Pokemons) => {
  Pokemons.forEach((OnePoke) => {
    const { pokemon } = OnePoke;
    SacaPokemones(pokemon.url);
  });
};

const fetcData = async (Typo) => {
  const URL = `https://pokeapi.co/api/v2/type/${Typo}`;
  try {
    const res = await fetch(URL);
    const datos = await res.json();
    const { pokemon } = datos;
    Pokemones(pokemon);
  } catch (error) {
    console.log(error);
  }
};

Select.addEventListener("change", () => {
  fetcData(Select.value);
  clearHTML();
});

document.addEventListener("DOMContentLoaded", () => {
  const URL = `https://pokeapi.co/api/v2/type/${pre}`;

  fetch(URL)
    .then((res) => res.json())
    .then(({ pokemon }) => Pokemones(pokemon));
  TypeData();
});
