let types = [
  {
    grass: ["#008000", "./img/icons/grass.svg", 12],
    poison: ["#a60bc5", "./img/icons/skull.svg", 4],
    fire: ["#e24405", "./img/icons/fire.svg", 10],
    flying: ["#7dc0ff", "./img/icons/flying.svg", 3],
    water: ["#446ffc", "./img/icons/water.svg", 11],
    bug: ["#84b305", "./img/icons/bug.svg", 7],
    normal: ["#adadad", "./img/icons/normal.svg", 1],
    dark: ["#4d4343", "./img/icons/dark.svg", 17],
    electric: ["#eee017", "./img/icons/electric.svg", 13],
    psychic: ["#ff44c7", "./img/icons/psychic.svg", 14],
    ground: ["#755348", "./img/icons/ground.svg", 5],
    ice: ["#55ddff", "./img/icons/ice.svg", 15],
    steel: ["#7297af", "./img/icons/steel.svg", 9],
    fairy: ["#e79aff", "./img/icons/fairy.svg", 18],
    fighting: ["#ff1038", "./img/icons/fighting.svg", 2],
    rock: ["#948f76", "./img/icons/rock.svg", 6],
    ghost: ["#63436d", "./img/icons/ghost.svg", 8],
    dragon: ["#4b5f96", "./img/icons/dragon.svg", 16],
    stellar: ["#d8e243", "./img/icons/stellar.svg", 19],
    unknown: ["#ffffff", "./img/icons/unknown.svg", 10001],
  },
];

let pokeURL = [];
defaultStart = 1;
defaultAmount = 41;

function init() {
  showLoadingSpinner();
  getData();
}

function showLoadingSpinner() {
  document.getElementById('spinner').classList.remove('d-none');
  document.getElementById('header-pokeball').classList.add('d-none');
  document.getElementById('header').classList.add('d-none');
  document.getElementById('footer-pokeball').classList.add('d-none');
}

function hideSpinner() {
  document.getElementById('spinner').classList.add('d-none');
  document.getElementById('header-pokeball').classList.remove('d-none');
  document.getElementById('header').classList.remove('d-none');
  document.getElementById('footer-pokeball').classList.remove('d-none');
}

async function getData() {
  for (let index = defaultStart; index < defaultAmount; index++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${index}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();

    pokeURL.push(responseAsJson);
    // console.log(responseAsJson);
  }
  render();
}

async function render() {
  let content = document.getElementById("content");
  content.innerHTML = "";

  for (let i = 0; i < pokeURL.length; i++) {
    const element = pokeURL[i];

    content.innerHTML += generateRenderHTML(i,element);

    if (element.types.length == 1) {
      stylePokeTypeOne(i,element);
    } else {
      stylePokeTypeTwo(i,element);
      hideSpinner();
    }
  }
}

function stylePokeTypeOne(i,element) {
  let firstType = element.types[0].type.name;

  document.getElementById(`pokeCard${i}`).style.background = types[0][firstType][0];
  document.getElementById(`pokeTypeTwo${i}`).classList.add("d-none");
  document.getElementById(`pokeTypeOne${i}`).style.background = types[0][firstType][0];
  document.getElementById(`pokeTypeIconOne${i}`).src = types[0][firstType][1];
}

function stylePokeTypeTwo(i,element) {
  let firstType = element.types[0].type.name;
  let secondType = element.types[1].type.name;

  document.getElementById(`pokeCard${i}`).style.background = `linear-gradient(${types[0][firstType][0]}, ${types[0][secondType][0]}`;
  document.getElementById(`pokeTypeOne${i}`).style.background = types[0][firstType][0];
  document.getElementById(`pokeTypeTwo${i}`).style.background = types[0][secondType][0];
  document.getElementById(`pokeTypeIconOne${i}`).src = types[0][firstType][1];
  document.getElementById(`pokeTypeIconTwo${i}`).src = types[0][secondType][1];
  document.getElementById(`pokeTypeIconTwo${i}`).setAttribute('title',`${secondType}`)
}

async function loadMore() {
  defaultStart = defaultAmount;
  defaultAmount += 10;
  init();
}

function openInputfield() {
  document.getElementById("inputForm").classList.remove("d-none");
}

function renderSingleCard(i) {
  let overlayCard = document.getElementById('overlay-card');
  overlayCard.innerHTML = '';

  overlayCard.innerHTML = generateSingleCardHTML(i);
  if (pokeURL[i].types.length == 1) {
    stylePokeTypeOneSingleCard(i);
    } else {
      stylePokeTypeTwoSingleCard(i);
      }
  document.getElementById('overlay').classList.remove('d-none');
  renderAttributes(i)
}

function stylePokeTypeOneSingleCard(i) {
  let firstType = pokeURL[i].types[0].type.name;
  let procent = pokeURL[i].base_experience/3

  document.getElementById(`pokeCard${i}`).style.background = types[0][firstType][0];
  document.getElementById(`pokeTypeTwo${i}`).classList.add("d-none");
  document.getElementById(`pokeTypeOne${i}`).style.background = types[0][firstType][0];
  document.getElementById(`pokeTypeIconOne${i}`).src = types[0][firstType][1];
  document.getElementById(`progress-bar${i}`).style = `background-color : ${types[0][firstType][0]}; width : ${procent}%`;
}

function stylePokeTypeTwoSingleCard(i) {
  let firstType = pokeURL[i].types[0].type.name;
  let secondType = pokeURL[i].types[1].type.name;
  let procent = pokeURL[i].base_experience/3

  document.getElementById(`pokeCard${i}`).style.background = `linear-gradient(${types[0][firstType][0]}, ${types[0][secondType][0]}`;
  document.getElementById(`pokeTypeOne${i}`).style.background = types[0][firstType][0];
  document.getElementById(`pokeTypeTwo${i}`).style.background = types[0][secondType][0];
  document.getElementById(`pokeTypeIconOne${i}`).src = types[0][firstType][1];
  document.getElementById(`pokeTypeIconTwo${i}`).src = types[0][secondType][1];
  document.getElementById(`pokeTypeNameTwo${i}`).innerHTML = `${pokeURL[i].types[1].type.name}`;
  document.getElementById(`progress-bar${i}`).style = `background-color : ${types[0][secondType][0]}; width : ${procent}%`;
}


function renderAttributes(i){
  let ability = pokeURL[i].abilities;
  let items = pokeURL[i].held_items;
  let moves = pokeURL[i].moves;

  renderAbility(i,ability);
  renderItems(i,items);
  renderMoves(i,moves);
}

function renderAbility(i,ability) {
  if(ability.length == 0) {
    document.getElementById(`abilities${i}`).innerHTML = "none";
  } else {
    for (let index = 0; index < ability.length ; index++) {      
    document.getElementById(`abilities${i}`).innerHTML += `${pokeURL[i].abilities[index].ability.name}<br><br>`;
    }
  }
}

function renderItems(i,items) {
  if(items.length == 0) {
    document.getElementById(`items${i}`).innerHTML = "none";
  } else {
    for (let index = 0; index < items.length; index++) {      
    document.getElementById(`items${i}`).innerHTML += `${pokeURL[i].held_items[index].item.name}<br><br>`;
    }
  }
}

function renderMoves(i,moves) {
  if(moves.length == 0) {
    document.getElementById(`moves${i}`).innerHTML = "none";
  } else {
    for (let index = 0; index < 3; index++) {      
    document.getElementById(`moves${i}`).innerHTML += `${pokeURL[i].moves[index].move.name}<br><br>`;
    }
  }
}

function nextPoke(x) {
  let next = x+1;
  if (next == pokeURL.length){
      next = 0;
  }
  renderSingleCard(next);   
}

function previousPoke(x) {
  let previous = x-1; 
  if (previous < 0){
      previous = pokeURL.length-1;
  }
  renderSingleCard(previous);
}

function closeOverlay() {
  document.getElementById('overlay').classList.add('d-none');
}

function filterFunc() {
  let request = document.getElementById('input').value;
    // if (Object.fromEntries(Object.entries(types).filter(([key]) => key.includes(`${requestedName}`)))) {
    if (request == 'grass'){
      filterTypes(request);
    } else {
      filterNames(request);
    }
}

function filterId() {
  let request = document.getElementById('input').value;
  defaultStart = request;
  defaultAmount = (+request + 1);
  pokeURL = [];
  getData();
}

function filterNames() {
  let request = document.getElementById('input').value;
  let filter = pokeURL.filter(x => x.name == request);
    if(filter[0].name == request) {
      pokeURL = filter;
      console.log(pokeURL);
      render();
    } else {
      loadMore();
      filterNames(request);
    }
}

function stop(event) {
  event.stopPropagation()
}