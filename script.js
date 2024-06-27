

function searchFunction() {
    const book = prompt("Введите название книги");
    const bookElement = document.getElementById(book);
    if (bookElement) {
        // Получение ссылки на книгу
        let bookLink = bookElement.getElementsByTagName('a')[0].href;
        // Перенаправление на страницу книги
        window.location.href = bookLink;
    } else {
        alert("Книга не найдена");
    }
}

function leaveFeedback(book_id) {
    const user = {
        user_name: '',
        review: '',
        book_id: 0
    }
    user.user_name = prompt("Введите имя");
    user.review = prompt("оставьте отзыв");
    user.book_id = book_id

    fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })

}

function getReviews(book_id) {
    fetch(`http://127.0.0.1:8000/reviews/${book_id}`)
    .then(response => response.json())
    .then(data => {
        const reviewsContainer = document.getElementById('reviews');
        // Очистка контейнера отзывов перед добавлением новых отзывов
        reviewsContainer.innerHTML = '';
        data.forEach(review => {
            const reviewElement = document.createElement('p');
            reviewElement.textContent = `${review.user_name}: ${review.review}`;
            reviewsContainer.appendChild(reviewElement);
        });
    })
    .catch(error => console.error('Ошибка:', error));
}



