// Loads the herbs from data/herbs.json and shows each one as a card.

const detail = document.querySelector("#herb-detail");
const main = document.querySelector("#herbs-main");

async function loadHerbs() {
  const response = await fetch("data/herbs.json")
  if (!response.ok) {
    throw new Error(`Could not load ${response.url}: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

function element(tag, className, text, link) {
  const node = document.createElement(tag)
  node.className = className
  node.textContent = text
  node.href=link
  return node
}

function card(herb) {
  const item = element("li", "card", "")
  item.append(
    element("h3", "name", herb.name),
    element("a", "name", herb.name, `#${herb.id}`),
    element("p", "latin", herb.latin),
    element("p", "use", herb.use),
    element("p", "life", herb.life))
    
  if (herb.name === "Lavender") {
    const link = element("a", "herb-link", "Learn about lavender")
    link.href = "lavender.html"
    const links = element("div", "card-links", "")
    links.append(link)
    item.append(links)
  }
  return item
}

async function show() {
  const list = document.querySelector("#herbs-list")
  const count = document.querySelector(".count")
  const herbs = await loadHerbs()
  list.replaceChildren(...herbs.map(card))
  count.textContent = `${herbs.length} herbs grow here.`
}

show().catch((error) => {
  count.textContent = "Could not load the herbs. Please try reloading the page."
  console.error(error)
})




async function showHerb() {

  const herbs = await loadHerbs()

  console.log("click flower");

  const id = location.hash.slice(1);

  console.log(`ID: ${id}`);

  const herb = herbs.find(herb => herb.id === id);

  if (!herb) {
    detail.innerHTML = "";
    main.innerHTML=`
    <section class="intro">
        <div>
          <h1>Herbs you can smell, taste and grow</h1>
          <p>A small garden with herbs for the kitchen, for tea and for the bees.
            See <a href="#herbs">what grows here</a></p>
        </div>
        <img class="hero" src="images/garden.svg" alt="Two raised beds full of herbs, with a bee">
      </section>

      <section id="herbs">
        <h2>What grows here</h2>
        <p class="count">Loading the herbs…</p>
        <ul id="herbs-list" class="cards"></ul>
      </section>

      <section id="visit">
        <h2>Visit</h2>
        <p>The garden is open every day from sunrise to sunset.
          Bring a friend, rub a leaf between your fingers, and leave the bees alone.</p>
      </section>

      <section id="about">
        <h2>About</h2>
        <p>The garden is made up, and so is this site: a practice project for
          <a href="https://github.com/zhibka/culs-frontend-day1">Frontend Development, day 1</a>.</p>
      </section>
    `;
    
    show();

    return;
  }
  else{
    main.innerHTML="";
  }

  detail.innerHTML = `
    <h1>${herb.name}</h1>
    <p><strong>Use:</strong> ${herb.use}</p>
    <p><strong>Life:</strong> ${herb.life}</p>
  `;
}

window.addEventListener("hashchange", showHerb);

showHerb();