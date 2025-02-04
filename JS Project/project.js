let books = JSON.parse(localStorage.getItem("books")) || [];
let totalBooks = parseInt(localStorage.getItem("number-of-books")) || 0;
let currentBook = parseInt(localStorage.getItem("currentBook")) || 0;

document.addEventListener("DOMContentLoaded", function () {
    if (!totalBooks) {
        alert("Please enter the number of books on the main page.");
        window.location.href = "main.html"; 
    }

    if (books.length > 0) {
        displayBooks();
        document.getElementById("insertBookData").style.display = "none";
        document.getElementById("bookForms").style.display = "block";
    }
});

function addBook() {
    let name = document.getElementById("bookName").value.trim();
    let price = document.getElementById("bookPrice").value.trim();
    let author = document.getElementById("bookAuthor").value.trim();
    let email = document.getElementById("authorEmail").value.trim();

    let authorError = document.getElementById("authorError");
    let emailError = document.getElementById("emailError");

    authorError.textContent = "";
    emailError.textContent = "";

    let nameRegex = /^[a-zA-Z\s]+$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let isValid = true;

    if (!author || !nameRegex.test(author)) {
        authorError.textContent = "Please provide a valid name.";
        isValid = false;
    }

    if (!email || !emailRegex.test(email)) {
        emailError.textContent = "Please provide a valid email.";
        isValid = false;
    }

    if (!isValid) return;

    books.push({ name, price, author, email });
    localStorage.setItem("books", JSON.stringify(books));
    currentBook++;
    localStorage.setItem("currentBook", currentBook);

    document.getElementById("bookForm").reset();
    if (currentBook < totalBooks) {
        alert(`Book ${currentBook} has been added successfully`);
    } else {
        document.getElementById("insertBookData").style.display = "none";
        document.getElementById("bookForms").style.display = "block";
        displayBooks();
    }
}


function displayBooks() {
    const tbody = document.querySelector("#bookTable tbody");
    tbody.innerHTML = "";

    books.forEach((book, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>${book.author}</td>
            <td>${book.email}</td>
            <td>
                <button onclick="editBook(${index})">Edit</button>
                <button onclick="deleteBook(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    localStorage.setItem("books", JSON.stringify(books));
}

function editBook(index) {
    const row = document.querySelectorAll("#bookTable tbody tr")[index];
    const cells = row.querySelectorAll("td");

    cells.forEach((cell, i) => {
        if (i < 4) {
            const input = document.createElement("input");
            input.value = cell.innerText;
            cell.innerHTML = "";
            cell.appendChild(input);
        }
    });

    const buttons = row.querySelectorAll("button");
    buttons[0].innerText = "Save";
    buttons[0].setAttribute("onclick", `saveBook(${index})`);
}

function saveBook(index) {
    const row = document.querySelectorAll("#bookTable tbody tr")[index];
    const inputs = row.querySelectorAll("input");

    books[index] = {
        name: inputs[0].value,
        price: inputs[1].value,
        author: inputs[2].value,
        email: inputs[3].value
    };

    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}

function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}