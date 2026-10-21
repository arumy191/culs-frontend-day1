## Group members/ nickname

- Zhibek Aubakirova/ zhibka
- Olha Korotych/ olgakor-242
- Zhuman Aruzhan/ arumy191

# The Little Herb Garden

The Little Herb Garden is a small, responsive website about herbs for the
kitchen, tea and pollinators. It was created as a practice project for
**Frontend Development, day 1**.

The home page presents eight herbs, with their botanical names, uses and life
cycles. Select a herb to open its detail view. The Lavender page also includes
growing tips, uses, extra facts loaded from JSON, and a video.

## Run the project

The site uses `fetch()` to load its JSON data, so open it through a local web
server rather than by double-clicking an HTML file.

1. Install [Node.js](https://nodejs.org/) if it is not already installed.
2. From the project folder, run:

   ```sh
   npx serve
   ```

   If prompted to install `serve`, confirm the installation.
3. Open the local address printed in the terminal, usually
   <http://localhost:3000>.
4. Stop the server with `Ctrl+C`.

## Project structure

```text
index.html       Herb garden home page
lavender.html    Lavender information page
app.js           Home page rendering and herb detail views
lavender.js      Loads Lavender facts
style.css        Shared page styles and responsive layout
data/
  herbs.json     Herb list used on the home page
  <herb>.json    Individual herb information and facts
images/
  *.svg          Garden, herb and logo illustrations
```

The project is built with HTML, CSS and vanilla JavaScript. It has no build
step or project-specific package installation.

## Herb data format

Each `data/<herb>.json` file contains one JSON object describing a herb. The
filename (without `.json`) matches that herb's `id` in `data/herbs.json`.

| Property | Format | Description |
| --- | --- | --- |
| `name` | string | Common name shown on the detail page. |
| `latin` | string | Botanical name. |
| `description` | string | Short introduction to the herb. |
| `img` | object | `src` (image path), `alt` (accessible image description), and `caption` (figure caption). |
| `facts` | array of objects | Each item has a `label` and `value` string for the facts section. |
| `grow` | array of strings | Growing tips displayed as a list. |
| `enjoy` | array of strings | Ways to use or enjoy the herb, displayed as a list. |
| `video` | object | `url` (watch page), `embedurl` (player source), and `title` (accessible player title). |

## Accessibility

The pages include keyboard skip links, visible keyboard focus, descriptive
image text and status messages for dynamically loaded information. The layout
adapts to smaller screens.
