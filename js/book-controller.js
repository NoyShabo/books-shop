'use strict';

window.onload = function init() {
    createBooks();
    renderBooks();
    renderPagination();
}
const STAR = '⭐';


function renderBooks() {

    var books = getBooks();
    var booksCardsHTML = books.map((book) => {
        return `
        <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 18rem;">
            <img class="card-img-top" src="./imgs/${book.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${book.name}</h5>
                <h6 class="card-text">${book.price} <span data-trans="currency">${getTrans('currency',getLan())}</span></h6>
                <p class="card-text">${book.description}</p>

                <section class="cards-buttons">
                    <button class="btn btn-info" data-trans="read" onclick="onReadBook('${book.id}')">${getTrans('read',getLan())}</button>
                    <button class="btn btn-warning" data-trans="update" onclick="onUpdateBook('${book.id}')">${getTrans('update',getLan())}</button>
                    <button class="btn btn-danger" data-trans="delete" onclick="onRemoveBook('${book.id}')">${getTrans('delete',getLan())}</button>
                </section>
            </div>
        </div>
`
    });
    console.log(getTrans('currency', getLan()));
    document.querySelector('.books-container').innerHTML = booksCardsHTML.join('');
    // onSelectLa(getLan());
}

function onReadBook(bookId) {
    const bookInfo = getBook(bookId);

    var bookInfoHtml = `  
    <h1>${STAR.repeat(+bookInfo.rate)}</h1>
    <h2>${bookInfo.name}</h2>
    <img src="./imgs/${bookInfo.img}">
    <p>${bookInfo.description}</p>
    <div class="rate-container">
        <button class="btn btn-success" onclick="onIncreaseRate('${bookInfo.id}')">&plus;</button>
        <input type="text" class="input-rate"  oninput="onChangeRate('${bookInfo.id}')"  value=${bookInfo.rate}>
        <button class="btn btn-dark" onclick="onDecreaseRate('${bookInfo.id}')">-</button>
    </div>
    <button class="btn btn-warning" data-trasn="close" onclick="closeReadModal()">Close</button>`
    const elReadModal = document.querySelector(".read-book-info-modal");
    elReadModal.innerHTML = bookInfoHtml;
    elReadModal.style.display = "block";
}

function closeReadModal() {
    document.querySelector(".read-book-info-modal").style.display = 'none';
}

function onAddBook() {
    var elBookSection = document.querySelector('.add-book');
    var elInputs = elBookSection.querySelectorAll('input');
    addBook(elInputs[0].value, elInputs[1].value);
    renderBooks();
    renderPagination();
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
    renderPagination();
}

function onUpdateBook(bookId) {
    updateBook(bookId);
    document.querySelector('#update-card').hidden = false;
    document.querySelector(".update-screen").style.display = 'block';
}

function onUpdaePrice() {
    var newPrice = document.querySelector('.newPrice').value;
    updatePrice(newPrice);
    document.querySelector('.newPrice').value = '';
    document.querySelector('#update-card').hidden = true;
    document.querySelector(".update-screen").style.display = 'none';
    renderBooks();
}

function onDecreaseRate(bookId) {
    const elInputRate = document.querySelector('.input-rate');
    if (elInputRate.value <= 0) return;
    document.querySelector('.read-book-info-modal h1').innerText = STAR.repeat(--elInputRate.value);
    decreaseRate(bookId);
}

function onIncreaseRate(bookId) {
    const elInputRate = document.querySelector('.input-rate');
    if (elInputRate.value >= 5) return;
    document.querySelector('.read-book-info-modal h1').innerText = STAR.repeat(++elInputRate.value);
    increaseRate(bookId);
}

function onChangeRate(bookId) {
    var elRate = document.querySelector(".input-rate");
    if (elRate.value < 0 || elRate.value > 5) return;
    document.querySelector('.read-book-info-modal h1').innerText = STAR.repeat(elRate.value);
    changeRate(bookId, elRate.value);
}

function onNextPrevPage(pageToMoveTo) {
    setCurrPage(pageToMoveTo);
    renderBooks();
}

function renderPagination() {
    var pagination =
        `<li class="page-item">
         <a class="page-link" href="#" aria-label="Previous" onclick="onNextPrevPage('prev')">
             <span aria-hidden="true">&laquo;</span>
             <span class="sr-only">Previous</span>
         </a>
 </li>`

    for (var i = 1; i <= getNumsPages(); i++) {
        pagination += `<li class="page-item"><a class="page-link" onclick="onChangePage(${i-1})" href="#">${i}</a></li>`
    }
    pagination +=
        `<li class="page-item" onclick="onNextPrevPage('next')">
        <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
        </a>
</li>`;

    document.querySelector('.pagination').innerHTML = pagination;
}

function onChangePage(newPage) {
    changePage(newPage);
    renderBooks();
}

function onSelectSort(sortBy) {
    selectSort(sortBy);
    renderBooks();
}

function onSelectLan(lan) {
    const elDataTransArray = document.querySelectorAll('[data-trans]');
    elDataTransArray.forEach((el) => {
        if (el.nodeName === 'INPUT') {
            el.placeholder = getTrans(el.dataset.trans, lan);
        } else { el.innerText = getTrans(el.dataset.trans, lan); }
    });
    const elBody = document.querySelector('body');
    if (lan === 'he') elBody.classList.add('rtl');
    else elBody.classList.remove('rtl');
}