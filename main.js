const BASE_URL =
  "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json";
const cardContainer = document.querySelector(".card-container");

async function getAPI() {
  const res = await fetch(BASE_URL);
  const json = await res.json();
  return json;
}

function createCard(e) {
  function createHeader(e) {
    const header = document.createElement("div");
    if (e._embedded["wp:term"][2][0] && e._embedded["wp:term"][2][0].name) {
      header.innerHTML = e._embedded["wp:term"][2][0].name.toUpperCase();
    } else {
      header.innerHTML = e._embedded["wp:term"][1][0].name.toUpperCase();
    }

    header.classList.add("header");
    return header;
  }

  function createContent(e) {
    const content = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h5");
    const metadata = document.createElement("div");

    content.classList.add("content");
    img.src = e.featured_media;

    title.innerHTML = `<a href="${e.link}">${e.title.rendered}</a>`;
    title.classList.add("p-heading--4");
    const author = e._embedded.author[0];
    const date = new Date(e.date);
    metadata.innerHTML = `<i>By <a href="${author.link}">${
      author.name
    }</a> on ${date.toLocaleDateString("en-GB", { dateStyle: "long" })}<i>`;
    content.append(img, title, metadata);
    return content;
  }

  function createFooter(e) {
    const footer = document.createElement("div");
    footer.classList.add("footer");
    if (e._embedded["wp:term"][0][0].name === "Articles") {
      footer.innerHTML = "Article";
    }
    return footer;
  }

  const card = document.createElement("div");
  card.classList.add("p-card");

  const header = createHeader(e);
  const content = createContent(e);
  const footer = createFooter(e);

  card.append(header, content, footer);
  return card;
}

async function main() {
  const data = await getAPI();
  data.map((e) => {
    const card = createCard(e);
    cardContainer.append(card);
  });
}

main();
