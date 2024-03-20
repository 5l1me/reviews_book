function searchFunction() {
    var book = prompt("Введите название книги");
    var bookElement = document.getElementById(book);
    if (bookElement) {
        // Получение ссылки на книгу
        var bookLink = bookElement.getElementsByTagName('a')[0].href;
        // Перенаправление на страницу книги
        window.location.href = bookLink;
    } else {
        alert("Книга не найдена");
    }
}


