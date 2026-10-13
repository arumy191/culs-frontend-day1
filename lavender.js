// Load the fact cards from JSON without inserting HTML from the data.
const facts = document.querySelector("#lavender-facts")
const status = document.querySelector("#facts-status")

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
}

showLavenderFacts().catch((error) => {
  status.textContent = "The extra facts could not be loaded. You can still read the growing guide below."
  console.error(error)
})
