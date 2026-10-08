/// <reference lib="es2020" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function checkStock(item) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (item && item.trim() !== '') {
                console.log("[\u0417\u0430\u0434\u0430\u043D\u0438\u0435 1] \u0422\u043E\u0432\u0430\u0440 \"".concat(item, "\" \u0432 \u043D\u0430\u043B\u0438\u0447\u0438\u0438."));
                resolve(item);
            }
            else {
                reject(new Error('Товара нет в наличии'));
            }
        }, 1000);
    });
}
function processPayment(order) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var balance = 500;
            if (order.price <= balance) {
                console.log("[\u0417\u0430\u0434\u0430\u043D\u0438\u0435 1] \u041E\u043F\u043B\u0430\u0442\u0430 ".concat(order.price, " \u0440\u0443\u0431. \u043F\u0440\u043E\u0448\u043B\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E."));
                resolve(order);
            }
            else {
                reject(new Error('Недостаточно средств на счету'));
            }
        }, 2000);
    });
}
function deliverOrder(order) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log("[\u0417\u0430\u0434\u0430\u043D\u0438\u0435 1] \u0417\u0430\u043A\u0430\u0437 #".concat(order.id, " \u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D."));
            resolve("\u0417\u0430\u043A\u0430\u0437 ".concat(order.item, " \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D"));
        }, 1500);
    });
}
function placeOrder(item, price) {
    var order = { id: Date.now(), item: item, price: price };
    checkStock(item)
        .then(function (availableItem) {
        console.log("[\u0417\u0430\u0434\u0430\u043D\u0438\u0435 1] \u0422\u043E\u0432\u0430\u0440 \"".concat(availableItem, "\" \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D."));
        return processPayment(order);
    })
        .then(function (paidOrder) {
        console.log("[\u0417\u0430\u0434\u0430\u043D\u0438\u0435 1] \u041E\u043F\u043B\u0430\u0442\u0430 \u0437\u0430\u043A\u0430\u0437\u0430 #".concat(paidOrder.id, " \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0430."));
        return deliverOrder(paidOrder);
    })
        .then(function (deliveryMessage) {
        console.log("[\u0417\u0430\u0434\u0430\u043D\u0438\u0435 1] ".concat(deliveryMessage));
    })
        .catch(function (error) {
        console.error('[Задание 1] Ошибка в процессе заказа:', error.message);
    })
        .finally(function () {
        console.log('[Задание 1] Спасибо за заказ, приходите еще!');
    });
}
// Задание 2. Гонка запросов (Promise.race)
function fetchFast() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve('[Задание 2] fetchFast (500ms)');
        }, 500);
    });
}
function fetchSlow() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve('[Задание 2] fetchSlow (2000ms)');
        }, 2000);
    });
}
function raceDemo() {
    Promise.race([fetchFast(), fetchSlow()])
        .then(function (result) {
        console.log('[Задание 2] Победитель гонки:', result);
    })
        .catch(function (error) {
        console.error('[Задание 2] Ошибка:', error);
    });
}
// Задание 3. "Умный" агрегатор (Promise.allSettled)
function allSettledDemo() {
    var promises = [
        Promise.resolve('[Задание 3] Успех 1'),
        Promise.resolve('[Задание 3] Успех 2'),
        Promise.reject(new Error('Ошибка 1')),
        Promise.resolve('[Задание 3] Успех 3'),
        Promise.reject(new Error('Ошибка 2'))
    ];
    Promise.allSettled(promises).then(function (results) {
        console.log('[Задание 3] Все результаты (allSettled):', results);
        // Используем приведение к простому объекту, чтобы избежать зависимости от сложных типов
        var successful = results
            .filter(function (result) { return result.status === 'fulfilled'; })
            .map(function (result) { return result.value; });
        console.log('[Задание 3] Только успешные результаты:', successful);
    });
}
// Задание 4. Логическая задача "Микрозадачи"
function microtaskDemo() {
    console.log('[Задание 4] Начало');
    setTimeout(function () { return console.log('[Задание 4] Таймаут'); }, 0);
    Promise.resolve()
        .then(function () { return console.log('[Задание 4] Промис 1'); })
        .then(function () { return console.log('[Задание 4] Промис 2'); });
    console.log('[Задание 4] Конец');
}
// Задание 5. Рефакторинг на Async/Await с обработкой ошибок
function getData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://jsonplaceholder.typicode.com/posts/1')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log('[Задание 5] Данные получены:', data);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('[Задание 5] Ошибка:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Задание 6. Параллельный запуск с ограничением
function loadImage(url) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve("[\u0417\u0430\u0434\u0430\u043D\u0438\u0435 6] \u0414\u0430\u043D\u043D\u044B\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F: ".concat(url));
        }, Math.random() * 2000); // разное время загрузки
    });
}
function limitRequests(urls, limit, asyncTask) {
    return __awaiter(this, void 0, void 0, function () {
        var results, executing, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    results = [];
                    executing = [];
                    _loop_1 = function (i) {
                        var url, taskPromise, e;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    url = urls[i];
                                    taskPromise = asyncTask(url).then(function (result) {
                                        results[i] = result;
                                    });
                                    e = taskPromise.then(function () {
                                        executing.splice(executing.indexOf(e), 1);
                                    });
                                    executing.push(e);
                                    if (!(executing.length >= limit)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, Promise.race(executing)];
                                case 1:
                                    _b.sent();
                                    _b.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < urls.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, Promise.all(executing)];
                case 5:
                    _a.sent();
                    return [2 /*return*/, results];
            }
        });
    });
}
function limitRequestsDemo() {
    return __awaiter(this, void 0, void 0, function () {
        var urls, loadedImages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    urls = [
                        'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg',
                        'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg'
                    ];
                    return [4 /*yield*/, limitRequests(urls, 3, loadImage)];
                case 1:
                    loadedImages = _a.sent();
                    console.log('[Задание 6] Все загруженные изображения:', loadedImages);
                    return [2 /*return*/];
            }
        });
    });
}
// Демонстрация работы всех заданий
function runAllTasks() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Задание 1');
                    placeOrder('Пицца', 300); // успешный заказ
                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 5000); })];
                case 1:
                    _a.sent();
                    console.log('\nЗадание 2');
                    raceDemo();
                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 2500); })];
                case 2:
                    _a.sent();
                    console.log('\nЗадание 3');
                    allSettledDemo();
                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 500); })];
                case 3:
                    _a.sent();
                    console.log('\nЗадание 4');
                    microtaskDemo();
                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 500); })];
                case 4:
                    _a.sent();
                    console.log('\nЗадание 5');
                    return [4 /*yield*/, getData()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 1000); })];
                case 6:
                    _a.sent();
                    console.log('\nЗадание 6');
                    return [4 /*yield*/, limitRequestsDemo()];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
runAllTasks();
