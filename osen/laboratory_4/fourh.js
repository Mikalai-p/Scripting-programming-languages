// Задача 1: Товары (Set)
const products = new Set();

const productNameInput = document.getElementById('productName');
const addProductBtn = document.getElementById('addProductBtn');
const removeProductBtn = document.getElementById('removeProductBtn');
const checkProductBtn = document.getElementById('checkProductBtn');
const showProductsBtn = document.getElementById('showProductsBtn');
const getProductsCountBtn = document.getElementById('getProductsCountBtn');
const productResult = document.getElementById('productResult');

addProductBtn.addEventListener('click', addProduct);
removeProductBtn.addEventListener('click', removeProduct);
checkProductBtn.addEventListener('click', checkProduct);
showProductsBtn.addEventListener('click', showProducts);
getProductsCountBtn.addEventListener('click', getProductsCount);

function addProduct() {
    const name = productNameInput.value.trim();
    if (name) {
        products.add(name);
        productResult.innerHTML = `Товар "${name}" добавлен.`;
        productNameInput.value = '';
    } else {
        productResult.innerHTML = 'Введите название товара.';
    }
}

function removeProduct() {
    const name = productNameInput.value.trim();
    if (products.has(name)) {
        products.delete(name);
        productResult.innerHTML = `Товар "${name}" удален.`;
    } else {
        productResult.innerHTML = `Товар "${name}" не найден.`;
    }
    productNameInput.value = '';
}

function checkProduct() {
    const name = productNameInput.value.trim();
    const exists = products.has(name);
    productResult.innerHTML = `Товар "${name}" ${exists ? 'найден' : 'не найден'}.`;
    productNameInput.value = '';
}

function showProducts() {
    const productList = Array.from(products).join(', ');
    productResult.innerHTML = `Список товаров: ${productList || 'пуст'}`;
}

function getProductsCount() {
    productResult.innerHTML = `Количество товаров: ${products.size}`;
}

// Задача 2: Студенты (Set)
const students = new Set();

const studentIdInput = document.getElementById('studentId');
const studentGroupInput = document.getElementById('studentGroup');
const studentNameInput = document.getElementById('studentName');
const addStudentBtn = document.getElementById('addStudentBtn');
const removeStudentBtn = document.getElementById('removeStudentBtn');
const filterStudentsBtn = document.getElementById('filterStudentsBtn');
const sortStudentsBtn = document.getElementById('sortStudentsBtn');
const studentResult = document.getElementById('studentResult');

addStudentBtn.addEventListener('click', addStudent);
removeStudentBtn.addEventListener('click', removeStudent);
filterStudentsBtn.addEventListener('click', filterStudents);
sortStudentsBtn.addEventListener('click', sortStudents);

function addStudent() {
    const id = studentIdInput.value.trim();
    const group = studentGroupInput.value.trim();
    const name = studentNameInput.value.trim();
    
    if (id && group && name) {
        
        for (let student of students) {
            if (student.id === id) {
                studentResult.innerHTML = `Студент с номером зачетки ${id} уже существует.`;
                return;
            }
        }
        
        students.add({id, group, name});
        studentResult.innerHTML = `Студент ${name} добавлен.`;
        clearStudentInputs();
    } else {
        studentResult.innerHTML = 'Заполните все поля.';
    }
}

function removeStudent() {
    const id = studentIdInput.value.trim();
    let found = false;
    
    for (let student of students) {
        if (student.id === id) {
            students.delete(student);
            found = true;
            break;
        }
    }
    
    if (found) {
        studentResult.innerHTML = `Студент с номером ${id} удален.`;
    } else {
        studentResult.innerHTML = `Студент с номером ${id} не найден.`;
    }
    clearStudentInputs();
}

function filterStudents() {
    const group = studentGroupInput.value.trim();
    const filtered = Array.from(students).filter(student => 
        student.group === group);
    
    if (filtered.length > 0) {
        const studentList = filtered.map(s => 
            `${s.name} (${s.id}, группа ${s.group})`).join('<br>');
        studentResult.innerHTML = `Студенты группы ${group}:<br>${studentList}`;
    } else {
        studentResult.innerHTML = `В группе ${group} нет студентов.`;
    }
    clearStudentInputs();
}

function sortStudents() {
    const sorted = Array.from(students).sort((a, b) => 
        a.id.localeCompare(b.id));
    
    if (sorted.length > 0) {
        const studentList = sorted.map(s => 
            `${s.id}: ${s.name} (группа ${s.group})`).join('<br>');
        studentResult.innerHTML = `Студенты, отсортированные по номеру зачетки:<br>${studentList}`;
    } else {
        studentResult.innerHTML = 'Список студентов пуст.';
    }
}

function clearStudentInputs() {
    studentIdInput.value = '';
    studentGroupInput.value = '';
    studentNameInput.value = '';
}

// Задача 3: Корзина товаров (Map)
const cart = new Map();

const productIdInput = document.getElementById('productId');
const productTitleInput = document.getElementById('productTitle');
const productQuantityInput = document.getElementById('productQuantity');
const productPriceInput = document.getElementById('productPrice');
const addProductToCartBtn = document.getElementById('addProductToCartBtn');
const removeProductByIdBtn = document.getElementById('removeProductByIdBtn');
const removeProductByTitleBtn = document.getElementById('removeProductByTitleBtn');
const updateProductQuantityBtn = document.getElementById('updateProductQuantityBtn');
const updateProductPriceBtn = document.getElementById('updateProductPriceBtn');
const calculateCartBtn = document.getElementById('calculateCartBtn');
const cartResult = document.getElementById('cartResult');

addProductToCartBtn.addEventListener('click', addProductToCart);
removeProductByIdBtn.addEventListener('click', removeProductById);
removeProductByTitleBtn.addEventListener('click', removeProductByTitle);
updateProductQuantityBtn.addEventListener('click', updateProductQuantity);
updateProductPriceBtn.addEventListener('click', updateProductPrice);
calculateCartBtn.addEventListener('click', calculateCart);

function addProductToCart() {
    const id = productIdInput.value.trim();
    const title = productTitleInput.value.trim();
    const quantity = parseInt(productQuantityInput.value);
    const price = parseFloat(productPriceInput.value);
    
    if (id && title && !isNaN(quantity) && !isNaN(price)) {
        cart.set(id, {title, quantity, price});
        cartResult.innerHTML = `Товар "${title}" добавлен в корзину.`;
        clearCartInputs();
    } else {
        cartResult.innerHTML = 'Заполните все поля корректно.';
    }
}

function removeProductById() {
    const id = productIdInput.value.trim();
    if (cart.has(id)) {
        const product = cart.get(id);
        cart.delete(id);
        cartResult.innerHTML = `Товар "${product.title}" удален из корзины.`;
    } else {
        cartResult.innerHTML = `Товар с ID ${id} не найден.`;
    }
    clearCartInputs();
}

function removeProductByTitle() {
    const title = productTitleInput.value.trim();
    let removedCount = 0;
    
    for (let [id, product] of cart) {
        if (product.title === title) {
            cart.delete(id);
            removedCount++;
        }
    }
    
    cartResult.innerHTML = `Удалено товаров с названием "${title}": ${removedCount}`;
    clearCartInputs();
}

function updateProductQuantity() {
    const id = productIdInput.value.trim();
    const quantity = parseInt(productQuantityInput.value);
    
    if (cart.has(id) && !isNaN(quantity)) {
        const product = cart.get(id);
        product.quantity = quantity;
        cart.set(id, product);
        cartResult.innerHTML = `Количество товара "${product.title}" изменено на ${quantity}.`;
    } else {
        cartResult.innerHTML = 'Товар не найден или неверное количество.';
    }
    clearCartInputs();
}

function updateProductPrice() {
    const id = productIdInput.value.trim();
    const price = parseFloat(productPriceInput.value);
    
    if (cart.has(id) && !isNaN(price)) {
        const product = cart.get(id);
        product.price = price;
        cart.set(id, product);
        cartResult.innerHTML = `Цена товара "${product.title}" изменена на ${price}.`;
    } else {
        cartResult.innerHTML = 'Товар не найден или неверная цена.';
    }
    clearCartInputs();
}

function calculateCart() {
    let totalItems = 0;
    let totalValue = 0;
    
    for (let [id, product] of cart) {
        totalItems += product.quantity;
        totalValue += product.quantity * product.price;
    }
    
    cartResult.innerHTML = 
        `Количество позиций: ${cart.size}<br>` +
        `Общее количество товаров: ${totalItems}<br>` +
        `Общая стоимость: ${totalValue.toFixed(2)}`;
}

function clearCartInputs() {
    productIdInput.value = '';
    productTitleInput.value = '';
    productQuantityInput.value = '1';
    productPriceInput.value = '0';
}

// Задача 4: Кеширование (WeakMap)
const cache = new WeakMap();

const cacheInput = document.getElementById('cacheInput');
const calculateWithCacheBtn = document.getElementById('calculateWithCacheBtn');
const clearCacheBtn = document.getElementById('clearCacheBtn');
const cacheResult = document.getElementById('cacheResult');

calculateWithCacheBtn.addEventListener('click', calculateWithCache);
clearCacheBtn.addEventListener('click', clearCache);

function expensiveCalculation(data) {
    
    return `Результат для "${data}": ${data.length * 123}`;
}

function calculateWithCache() {
    const input = cacheInput.value.trim();
    if (!input) {
        cacheResult.innerHTML = 'Введите данные для вычисления.';
        return;
    }
    
    
    const key = {data: input};
    
    
    if (cache.has(key)) {
        cacheResult.innerHTML = `(Из кеша) ${cache.get(key)}`;
    } else {
        const result = expensiveCalculation(input);
        cache.set(key, result);
        cacheResult.innerHTML = `(Вычислено) ${result}`;
    }
    
    cacheInput.value = '';
}

function clearCache() {
        cacheResult.innerHTML = 'Кеш очищен (WeakMap будет очищен сборщиком мусора)';
}