document.addEventListener("DOMContentLoaded", function () {
  const url = "http://localhost:3000/books";
  const user1 = { id: 1, username: "pouros" };
  const showPanel = document.getElementById("show-panel");
  function getBooks(url) {
    fetch(url)
      .then((res) => res.json())
      .then((books) => listBooks(books))
      .catch((error) => console.log("ERROR:", error));
  }

  function listBooks(books) {
    let ul = document.getElementById("list-panel");
    books.forEach((book) => {
      let li = document.createElement("li");
      li.textContent = book.title;
      li.addEventListener("click", (e) => {
        removeBook(showPanel);
        displayBook(book);
      });
      ul.appendChild(li);
    });
  }

  function displayBook(book) {
    let title = document.createElement("h2");
    title.textContent = book.title;

    let img = document.createElement("img");
    img.src = book.img_url;

    let description = document.createElement("p");
    description.textContent = book.description;

    let subtitle = document.createElement("p");
    subtitle.textContent = book.subtitle;

    let author = document.createElement("h3");
    author.textContent = book.author;

    let likeBtn = document.createElement("button");
    likeBtn.textContent = "Like";
    likeBtn.addEventListener("click", (e) => addLike(book));

    let remBtn = document.createElement("button");
    remBtn.textContent = "Put Back on Shelf";
    remBtn.addEventListener("click", (e) => removeBook(showPanel));

    let ul = document.createElement("ul");
    book.users.forEach((user) => {
      let li = document.createElement("li");
      li.textContent = user.username;
      ul.appendChild(li);
    });

    let x = [title, img, subtitle, author, description, ul, likeBtn, remBtn];
    x.forEach((element) => showPanel.appendChild(element));
  }

  function removeBook(showPanel) {
    while (showPanel.firstChild) {
      showPanel.removeChild(showPanel.firstChild);
    }
  }

  function addLike(book) {
    let x = [];
    book.users.forEach((user) => {
      let y = Object.values(user);
      x.push(y);
    });
    let w = x.reduce((acc, currItem) => acc.concat(currItem));
    if (w.find((element) => element === "pouros")) {
      console.log("You've liked this book already");
    } else {
      book.users.push(user1);
      let newLike = {
        users: book.users,
      };
      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLike),
      };

      fetch(url + "/" + book.id, configObj)
        .then((res) => res.json())
        .then((newbook) => {
          removeBook(showPanel);
          displayBook(newbook);
        })
        .catch((error) => console.error("ERROR:", error));
    }
  }

  getBooks(url);
});
