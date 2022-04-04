'use strict';

const cartIconWrapEl = document.querySelector('.cartIconWrap');
const basketEl = document.querySelector('.basket');
const featuredItemsEl = document.querySelector('.featuredItems');
const countProductCartEl = cartIconWrapEl.querySelector('span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');

/* Объект для хранения характеристик продуктов в корзине. Далее объект. */
const basketObj = {};

/* Обробатываем открытие корзины при клике на её изображение. */
cartIconWrapEl.addEventListener('click', () =>
    basketEl.classList.toggle('hidden'));

/* Обрабатываем обавление элемента в корзину при клике на оответствующую 
кнопку на товаре. */
featuredItemsEl.addEventListener('click', event => {
    /* Проверка клика непосредственно на кнопку. */
    if (!event.target.classList.contains('addToCart')) {
        return;
    }

    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;

    addToCart(id, name, price);


})

/**
 * Функция добавляет продукт в корзину.
 * @param {number} id - Id продукта.
 * @param {string} name - Название продукта.
 * @param {number} price - Цена продукта.
 */
function addToCart(id, name, price) {
    /* Если продукта еще нет в нашем объекте, то добавляем. */
    if (!(id in basketObj)) {
        basketObj[id] = { id: id, name: name, price: price, count: 0 }
    }
    /* Увеличение количества продукта на 1. */
    basketObj[id].count++;

    /* Увеличение общего количества продуктов в корзине на 1. 
    Одновременно отрисовка этого количества на значке корзины. */
    paintProductCount(countProductCartEl);

    /* Увеличение общей суммы продуктов в корзине. Одновременно отрисовка 
    этой суммы в корзине. */
    basketTotalValueEl.textContent = +basketTotalValueEl.textContent
        + basketObj[id].price;

    /* Добавление нового продукта в корзину или изменение общего количества 
    и общей цены уже существующего. */
    changeProductInBasket(id);
}


/**
 * Функция увеличивает общее количество в определенном объекте на 1. 
 * @param {object} obj - Объект содержащий внутри только цифры.
 */
function paintProductCount(obj) {
    obj.textContent++;
}

/**
 * Функция добавляет блок кода HTML, описывающий продукт соответствующий 
 * переданному ей id из объекта. Если продукт с таким id уже находится 
 * в корзине, то изменяет количество и общую цену за него.
 * @param {object} productId - Id продукта.
 */
function changeProductInBasket(productId) {
    const productEl = basketEl.querySelector(`.basketRow[data-id="${productId}"]`);
    /* Если продукта нет в нашем объекте, то создает новый */
    if (!productEl) {
        createNewProductInBasket(productId);
        return;
    }

    const productFromObj = basketObj[productId];
    /* Изменение количества продукта. */
    productEl.querySelector('.productCount').textContent = productFromObj.count;
    /* Изменение общей цены за продукт. */
    productEl.querySelector('.productTotal').textContent =
        (productFromObj.price * productFromObj.count);


}

/**
 * Функция добавляет блок кода HTML, описывающий продукт соответствующий 
 * переданному ей id из объекта.
 * @param {object} productId - Id продукта.
 */
function createNewProductInBasket(productId) {
    const product = `
        <div class="basketRow" data-id="${productId}">
            <div>${basketObj[productId].name}</div>
            <div class="productCount">${basketObj[productId].count}</div>
            <div>$${basketObj[productId].price}</div>
            <div class="productTotal"> 
                $${basketObj[productId].price * basketObj[productId].count}</div>
        </div>`;
    basketTotalEl.insertAdjacentHTML("beforebegin", product);
}