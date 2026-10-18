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

async function loadHerb(id) {
  const response = await fetch(`data/${id}.json`);
  if (!response.ok) {
    throw new Error(`Could not load herb: ${id}`);
  }
  return response.json();
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


function showHerbMain(){
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
}

function showHerbDetail(data){
  main.innerHTML="";
  detail.innerHTML = `
          <article>
            <header class="intro lavender-intro">
              <div>
                <p class="eyebrow">Meet the herbs</p>
                <h1 id="dherb-name"></h1>
                <p class="latin"><i lang="la" id="dherb-latin"></i></p>
                <p id="dherb-description"></p>
                <a href="#growing">Explore how it grows</a>
              </div>

              <figure class="lavender-figure">
                <img class="hero" id="dherb-img" width="600" height="400">
                <figcaption id="dherb-imgdescr"></figcaption>
              </figure>
            </header>



            <section aria-labelledby="facts-heading">
              <h2 id="facts-heading"></h2>
              <p id="facts-status" role="status">Loading facts…</p>
              <dl id="dherb-facts" class="facts-grid"></dl>
              <noscript><p>Enable JavaScript to see the extra facts. The growing guide below is available without it.</p></noscript>
            </section>

            <div class="lavender-sections">
              <section id="growing" class="card" aria-labelledby="growing-heading">
                <h2 id="growing-heading"></h2>
                <ul id="dherb-growing"></ul>
              </section>

              <section class="card" aria-labelledby="uses-heading">
                <h2 id="uses-heading"></h2>
                <ul id="dherb-enjoyment"></ul>
              </section>

            </div>

            <section class="video-section" aria-labelledby="video-heading">
              <h2 id="video-heading">Watch the video</h2>
              <div class="video-player">
                <iframe id="dherb-video" width="480" height="270"
                  loading="lazy" referrerpolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen></iframe>
              </div>
              <p><a id="dherb-link">Watch this video on YouTube</a>.</p>
            </section>

            <section aria-labelledby="garden-heading">
              <h2 id="garden-heading">Back to the garden</h2>
                <a href="index.html#herbs">Explore all herbs</a>.</p>
            </section>
          </article>
    `;
  const name = document.querySelector("#dherb-name")
  const latin = document.querySelector("#dherb-latin")
  const description = document.querySelector("#dherb-description")
  const image = document.querySelector("#dherb-img")
  const imgdescr = document.querySelector("#dherb-imgdescr")

  const factsheading = document.querySelector("#facts-heading")
  const facts = document.querySelector("#dherb-facts")
  const status = document.querySelector("#facts-status")

  const growingheading=document.querySelector('#growing-heading')
  const growing=document.querySelector('#dherb-growing')
  const enjoymentheading=document.querySelector('#uses-heading')
  const enjoyment=document.querySelector('#dherb-enjoyment')

  const video = document.querySelector("#dherb-video")
  const link = document.querySelector("#dherb-link")

  const cards = data.facts.map((fact) => {
    const card = document.createElement("div")
    card.className = "fact-card"
    const label = document.createElement("dt")
    label.textContent = fact.label
    const value = document.createElement("dd")
    value.textContent = fact.value
    card.append(label, value)
    return card
  })
  facts.replaceChildren(...cards)
  status.textContent = `${data.name} facts loaded.`
  status.classList.add("visually-hidden")
  factsheading.textContent=`${data.name} at a glance`;

  name.textContent=data.name;
  latin.textContent=data.latin;
  description.textContent=data.description;
  image.alt=data.img.alt;
  image.src=data.img.src;
  imgdescr.textContent=data.img.caption;

  growingheading.textContent=`Growing ${data.name}`;
  data.grow.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    growing.appendChild(li);
  });

  enjoymentheading.textContent=`Enjoying ${data.name}`;
  data.engoy.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    enjoyment.appendChild(li);
  });

  video.src=data.video.embedurl;
  video.title=data.video.title;
  link.href=data.video.url;

  window.scrollTo(0, 0);
}


async function showHerb() {
  const id = location.hash.slice(1);

  const mainSections = ["herbs", "visit", "about"];

  if (!id || mainSections.includes(id)) {
    showHerbMain();
    await show();

    if (id) {
      document.querySelector(`#${id}`)?.scrollIntoView();
    }

    return;
  }

  const herb = await loadHerb(id);
  showHerbDetail(herb);
}

window.addEventListener("hashchange", showHerb);

showHerb();