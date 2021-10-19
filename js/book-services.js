'use strict';
const KEY = 'savedBooks';
var gBooks;
var gbookToUpdate;
var gSortBy = 'Sort By';
var gCurrPage = 0;
const gBooksPerPage = 6;



function setCurrPage(pageToMoveTo) {
    pageToMoveTo === 'next' ? gCurrPage++ : gCurrPage--;
    if (gCurrPage <= 0 || gCurrPage * gBooksPerPage >= gBooks.length) gCurrPage = 0; // the end or the first page
}

function getBooksForPage() {
    const startIndex = gCurrPage * gBooksPerPage;
    return gBooks.slice(startIndex, startIndex + gBooksPerPage);
}


function sortingBooks() {
    if (gSortBy === 'Sort By') return;
    gBooks.sort((a, b) => {
        return (a[gSortBy] > b[gSortBy] ? 1 : -1);
    });
}

function getBooks() {
    sortingBooks();
    return getBooksForPage();
}

function _getArrayNamesBooks() {
    return ["harry potter", "The Hunger Games", "Spider-Man", "Twilight", "The Joker", "Deadpool", "Captain America", 'green hulk', 'Wonder Women'];
}


function addBook(name, price) {
    gBooks.unshift(_createBook(name, 5, price));
    _saveToStorage();
}

function createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        var booksNames = _getArrayNamesBooks();
        books = booksNames.reduce((acc, bookName, idx) => {
            acc.push(_createBook(bookName, idx));
            return acc;
        }, []);
    }
    gBooks = books;
    _saveToStorage();
    return gBooks;
}

function removeBook(bookId) {
    var indexDelete = getBookIndex(bookId);
    gBooks.splice(indexDelete, 1);
    _saveToStorage();
}

function updatePrice(newPrice) {
    if (!newPrice) return;
    gBooks[gbookToUpdate].price = newPrice;
    _saveToStorage();
}

function updateBook(bookId) {
    gbookToUpdate = getBookIndex(bookId);
}

function changeRate(bookId, newRate) {
    getBook(bookId).rate = newRate;
    _saveToStorage();
}

function increaseRate(bookId) {
    getBook(bookId).rate++;
    _saveToStorage();
}

function decreaseRate(bookId) {
    getBook(bookId).rate--;
    _saveToStorage();
}

function getBook(bookId) {
    return gBooks.find(book => book.id === bookId);
}


function getBookIndex(bookId) {
    return gBooks.findIndex(book => book.id === bookId);
}

function _saveToStorage() {
    saveToStorage(KEY, gBooks);
}

function selectSort(sortBy) {
    gSortBy = sortBy;
}

function getPageCount() {
    return Math
}

function getNumsPages() {
    return Math.ceil(gBooks.length / gBooksPerPage);
}

function changePage(newPage) {
    gCurrPage = newPage;
}

function _createBook(name = '', img = 9, price = getRandomInt(90, 100)) {
    return {
        id: makeId(),
        name,
        price,
        img: img + '.jpg',
        description: makeLorem(9),
        rate: 0
    }
}