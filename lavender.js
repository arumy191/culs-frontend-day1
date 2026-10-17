// Load the fact cards from JSON without inserting HTML from the data.
const name = document.querySelector("#lavender-name")
const latin = document.querySelector("#lavender-latin")
const description = document.querySelector("#lavender-description")
const image = document.querySelector("#lavender-img")
const imgdescr = document.querySelector("#lavender-imgdescr")


const facts = document.querySelector("#lavender-facts")
const status = document.querySelector("#facts-status")

const growing=document.querySelector('#lavender-growing')
const enjoyment=document.querySelector('#lavender-enjoyment')

const video = document.querySelector("#lavender-video")
const link = document.querySelector("#lavender-link")

async function showLavenderFacts() {
  const response = await fetch("data/lavender.json")
  if (!response.ok) {
    throw new Error(`Could not load lavender facts: ${response.status}`)
  }



  const data = await response.json()
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
  status.textContent = "Lavender facts loaded."
  status.classList.add("visually-hidden")

  name.textContent=data.name;
  latin.textContent=data.latin;
  description.textContent=data.description;
  image.alt=data.img.alt;
  image.src=data.img.src;
  imgdescr.textContent=data.img.caption;

  data.grow.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    growing.appendChild(li);
  });

  data.engoy.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    enjoyment.appendChild(li);
  });

  video.src=data.video.embedurl;
  video.title=data.video.title;
  link.href=data.video.url;
}

showLavenderFacts().catch((error) => {
  status.textContent = "The extra facts could not be loaded. You can still read the growing guide below."
  console.error(error)
})
