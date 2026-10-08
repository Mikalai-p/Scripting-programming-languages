
/// <reference lib="es2020" />

// Задание 1. Симулятор "Службы доставки" (Promise Chaining)

interface Order {
    id: number;
    item: string;
    price: number;
}

function checkStock(item: string): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (item && item.trim() !== '') {
                console.log(`[Задание 1] Товар "${item}" в наличии.`);
                resolve(item);
            } else {
                reject(new Error('Товара нет в наличии'));
            }
        }, 1000);
    });
}

function processPayment(order: Order): Promise<Order> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const balance = 500; 
            if (order.price <= balance) {
                console.log(`[Задание 1] Оплата ${order.price} руб. прошла успешно.`);
                resolve(order);
            } else {
                reject(new Error('Недостаточно средств на счету'));
            }
        }, 2000);
    });
}

function deliverOrder(order: Order): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`[Задание 1] Заказ #${order.id} доставлен.`);
            resolve(`Заказ ${order.item} успешно доставлен`);
        }, 1500);
    });
}

function placeOrder(item: string, price: number): void {
    const order: Order = { id: Date.now(), item, price };

    checkStock(item)
        .then((availableItem) => {
            console.log(`[Задание 1] Товар "${availableItem}" проверен.`);
            return processPayment(order);
        })
        .then((paidOrder) => {
            console.log(`[Задание 1] Оплата заказа #${paidOrder.id} получена.`);
            return deliverOrder(paidOrder);
        })
        .then((deliveryMessage) => {
            console.log(`[Задание 1] ${deliveryMessage}`);
        })
        .catch((error: Error) => {
            console.error('[Задание 1] Ошибка в процессе заказа:', error.message);
        })
        .finally(() => {
            console.log('[Задание 1] Спасибо за заказ, приходите еще!');
        });
}

// Задание 2. Гонка запросов (Promise.race)

function fetchFast(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('[Задание 2] fetchFast (500ms)');
        }, 500);
    });
}

function fetchSlow(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('[Задание 2] fetchSlow (2000ms)');
        }, 2000);
    });
}

function raceDemo(): void {
    Promise.race([fetchFast(), fetchSlow()])
        .then((result) => {
            console.log('[Задание 2] Победитель гонки:', result);
        })
        .catch((error) => {
            console.error('[Задание 2] Ошибка:', error);
        });
}

// Задание 3. "Умный" агрегатор (Promise.allSettled)

function allSettledDemo(): void {
    const promises: Promise<string>[] = [
        Promise.resolve('[Задание 3] Успех 1'),
        Promise.resolve('[Задание 3] Успех 2'),
        Promise.reject(new Error('Ошибка 1')),
        Promise.resolve('[Задание 3] Успех 3'),
        Promise.reject(new Error('Ошибка 2'))
    ];

    Promise.allSettled(promises).then((results) => {
        console.log('[Задание 3] Все результаты (allSettled):', results);

        const successful = results
            .filter((result) => result.status === 'fulfilled')
            .map((result) => (result as { value: string }).value);

        console.log('[Задание 3] Только успешные результаты:', successful);
    });
}

// Задание 4. Логическая задача "Микрозадачи"

function microtaskDemo(): void {
    console.log('[Задание 4] Начало');

    setTimeout(() => console.log('[Задание 4] Таймаут'), 0);

    Promise.resolve()
        .then(() => console.log('[Задание 4] Промис 1'))
        .then(() => console.log('[Задание 4] Промис 2'));

    console.log('[Задание 4] Конец');
}

// Задание 5. Рефакторинг на Async/Await с обработкой ошибок

async function getData(): Promise<void> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('[Задание 5] Данные получены:', data);
    } catch (error) {
        console.error('[Задание 5] Ошибка:', error);
    }
}

// Задание 6. Параллельный запуск с ограничением

function loadImage(url: string): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`[Задание 6] Данные изображения: ${url}`);
        }, Math.random() * 2000); 
    });
}

async function limitRequests<T>(
    urls: string[],
    limit: number,
    asyncTask: (url: string) => Promise<T>
): Promise<T[]> {
    const results: T[] = [];
    const executing: Promise<void>[] = [];

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const taskPromise = asyncTask(url).then((result) => {
            results[i] = result;
        });

        const e = taskPromise.then(() => {
            executing.splice(executing.indexOf(e), 1);
        });
        executing.push(e);

        if (executing.length >= limit) {
            await Promise.race(executing);
        }
    }

    await Promise.all(executing);
    return results;
}

async function limitRequestsDemo(): Promise<void> {
    const urls = [
        'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg',
        'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg'
    ];
    const loadedImages = await limitRequests(urls, 3, loadImage);
    console.log('[Задание 6] Все загруженные изображения:', loadedImages);
}

// Демонстрация работы всех заданий
async function runAllTasks(): Promise<void> {
    console.log('Задание 1');
    placeOrder('Пицца', 300);   // успешный заказ
    await new Promise(res => setTimeout(res, 5000));
    
    console.log('\nЗадание 2');
    raceDemo();
    await new Promise(res => setTimeout(res, 2500));

    console.log('\nЗадание 3');
    allSettledDemo();
    await new Promise(res => setTimeout(res, 500));

    console.log('\nЗадание 4');
    microtaskDemo();
    await new Promise(res => setTimeout(res, 500));

    console.log('\nЗадание 5');
    await getData();
    await new Promise(res => setTimeout(res, 1000));

    console.log('\nЗадание 6');
    await limitRequestsDemo();
}

 runAllTasks();


