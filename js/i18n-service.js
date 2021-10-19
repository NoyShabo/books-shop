const gTrans = {
    title: {
        en: "Book Shop",
        he: "חנות ספרים"
    },

    'book-name': {
        en: "book name",
        he: "שם הספר"
    },
    price: {
        en: "Price",
        he: "מחיר"
    },
    add: {
        en: "Add book",
        he: "הוסף ספר"
    },
    sort: {
        en: "Sort By",
        he: "מיין לפי"
    },
    name: {
        en: "Name",
        he: "שם הספר"
    },
    rate: {
        en: "Rate",
        he: "דירוג"
    },
    update: {
        en: "Update",
        he: "עדכן"
    },
    "update-price": {
        en: 'Enter new price',
        he: "הכנס מחיר חדש"
    },
    delete: {
        en: "delete",
        he: "מחק"
    },
    read: {
        en: "read",
        he: "קרא"
    },
    close: {
        en: "close",
        he: "סגור"
    },
    prev: {
        en: 'Previous',
        he: "עמוד קודם"
    },
    next: {
        en: "Next",
        he: "עמוד הבא"
    },

    currency: {
        en: '$',
        he: '₪'

    }

};



var gLanl = 'en';

function getTrans(trans, lan) {
    gLanl = lan;
    return gTrans[trans][lan];
}

function getLan() {
    return gLanl;
}