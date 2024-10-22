function generateRenderHTML(i,element) {
    return `
    <div onclick="renderSingleCard(${i})" id="pokeCard${i}" class="pokeCard">
      <div class="pokeCard-content">
        <div class="pokeCard-head">
          <h2># ${element.id}</h2>
          <div class="pokeTypes">
           <div id="pokeTypeOne${i}" class="singlePokeType">
              <img id="pokeTypeIconOne${i}" class="icons" src="" title="${element.types[0].type.name}">
            </div>
            <div id="pokeTypeTwo${i}" class="singlePokeType">
              <img id="pokeTypeIconTwo${i}" class="icons" src="">
            </div>
          </div>
        </div>
          <img src="${element.sprites.other["official-artwork"].front_default}" alt="${element.name}">
          <h1>${element.name}</h1>
      </div>
    </div>
    `;
}

function generateSingleCardHTML(i) {
    return `
    <div id="pokeCard${i}" class="pokeCard-big">
      <div class="frame">
        <div class="pokeCard-head-big">
          <div class="num-name">
            <h2># ${pokeURL[i].id}</h2>
            <h1>${pokeURL[i].name}</h1>
          </div>
          <div class="pokeTypes-big">
           <div id="pokeTypeOne${i}" class="singlePokeType-big">
              <img id="pokeTypeIconOne${i}" class="icons-big" src="">
              <span>${pokeURL[i].types[0].type.name}</span>
            </div>
            <div id="pokeTypeTwo${i}" class="singlePokeType-big">
              <img id="pokeTypeIconTwo${i}" class="icons-big" src="">
              <span id="pokeTypeNameTwo${i}"></span>
            </div>
          </div>
        </div>
        <div class="arrow-cont">
          <img onclick="previousPoke(${i})" src="/img/icons/arrow-left.svg" class="arrows" alt="arrow left">
          <img onclick="nextPoke(${i})" src="/img/icons/arrow-right.svg" class="arrows" alt="arrow right">
        </div>
          <img class="pokeImg-big" src="${pokeURL[i].sprites.other.showdown.front_default}" alt="${pokeURL[i].name}">
          <img class="pokeball-bg" src="/img/icons/pokeball.svg">
        </div>
      <div class="pokeCard-content-big">
          <div class="content-head-big">
            <div class="content-species">
              <h4>SPECIES</h4>
              <span>${pokeURL[i].species.name}</span>
            </div>
            <div class="content-height">
              <h4>HEIGHT</h4>
              <span>${pokeURL[i].height}</span>
            </div>
            <div class="content-weight">
              <h4>WEIGHT</h4>
              <span>${pokeURL[i].weight}</span>
            </div>
          </div>
          <div class="content-all-attributes">
            <div class="content-single-attribute">
              <h4>ABILITIES</h4>
              <div id="abilities${i}" class="single-attribute-cont"></div>
            </div>
            <div class="content-single-attribute">
              <h4>ITEMS</h4>
              <div id="items${i}" class="single-attribute-cont"></div>
            </div>
            <div class="content-single-attribute">
              <h4>MOVES</h4>
              <div id="moves${i}" class="single-attribute-cont"></div>
            </div>
          </div>
            <div class="content-single-attribute">
              <h4 class="margin-zero">BASE EXPERIENCE</h4>
              <div class="progress-bar-cont">
                <div id="progress-bar${i}" class="progress-bar"></div>
                <span>${pokeURL[i].base_experience}</span>
              </div>
            </div>
      </div>
    </div>
  `;
}