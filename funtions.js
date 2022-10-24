const main = document.querySelector(".main");

const clearHTML = () => {
  while (main.firstChild) {
    main.firstChild.remove();
  }
};

const TarjetaPokemon = (data) => {
  // console.log(data.Rtypes);
  const Tarjetita = document.querySelector(".Tarjetita");
  const content = Tarjetita.content.cloneNode(true);
  const ulT = content.querySelector(".types");
  const ulA = content.querySelector(".abilitis");
  data.Rtypes.map((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    console.log(name);
    ulT.appendChild(li);
  });

  data.Rabilitis.map((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    ulA.appendChild(li);
  });

  content.querySelector(".Name").textContent = data.name;
  content.querySelector(".img").src = data.front;
  main.appendChild(content);
};

export { TarjetaPokemon, clearHTML };
