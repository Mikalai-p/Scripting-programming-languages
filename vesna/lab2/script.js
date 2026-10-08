var _a;
var ProductCategory;
(function (ProductCategory) {
    ProductCategory["Electronics"] = "Electronics";
    ProductCategory["Clothing"] = "Clothing";
    ProductCategory["Books"] = "Books";
    ProductCategory["Food"] = "Food";
    ProductCategory["Other"] = "Other";
})(ProductCategory || (ProductCategory = {}));
var Product = /** @class */ (function () {
    function Product(data) {
        this.id = Product.nextId++;
        this.name = data.name;
        this.price = data.price;
        this.description = data.description;
        this.category = data.category;
    }
    Product.prototype.getInfo = function () {
        var info = "ID: ".concat(this.id, ", Name: ").concat(this.name, ", Price: ").concat(this.price, ", Category: ").concat(this.category);
        if (this.description) {
            info += ", Description: ".concat(this.description);
        }
        return info;
    };
    Product.nextId = 1;
    return Product;
}());
var Catalog = /** @class */ (function () {
    function Catalog() {
        this.products = [];
        this.products = [];
    }
    Catalog.prototype.addProduct = function (productData) {
        var product = new Product(productData);
        this.products.push(product);
        return product;
    };
    Catalog.prototype.updateProduct = function (id, updates) {
        var product = this.getProductById(id);
        if (!product)
            return false;
        for (var key in updates) {
            if (updates.hasOwnProperty(key)) {
                product[key] = updates[key];
            }
        }
        return true;
    };
    Catalog.prototype.removeProduct = function (id) {
        var index = -1;
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }
        if (index === -1)
            return false;
        this.products.splice(index, 1);
        return true;
    };
    Catalog.prototype.getProductById = function (id) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                return this.products[i];
            }
        }
        return undefined;
    };
    Catalog.prototype.getAllProducts = function () {
        return this.products;
    };
    Catalog.prototype.getProductsByCategory = function (category) {
        var result = [];
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].category === category) {
                result.push(this.products[i]);
            }
        }
        return result;
    };
    return Catalog;
}());
var Order = /** @class */ (function () {
    function Order(customerId, products) {
        this.id = Order.nextId++;
        this.customerId = customerId;
        this.products = products;
        this.totalPrice = this.calculateTotalPrice();
    }
    Order.prototype.calculateTotalPrice = function () {
        var sum = 0;
        for (var i = 0; i < this.products.length; i++) {
            sum += this.products[i].price;
        }
        return sum;
    };
    Order.prototype.getOrderInfo = function () {
        return "Order ID: ".concat(this.id, ", Customer ID: ").concat(this.customerId, ", Total: ").concat(this.totalPrice, ", Products: ").concat(this.products.length);
    };
    Order.prototype.getSummary = function () {
        return {
            id: this.id,
            totalPrice: this.totalPrice
        };
    };
    Order.nextId = 1;
    return Order;
}());
var Customer = /** @class */ (function () {
    function Customer(name, email) {
        this.id = Customer.nextId++;
        this.name = name;
        this.email = email;
    }
    Customer.prototype.getCustomerInfo = function () {
        return "Customer ID: ".concat(this.id, ", Name: ").concat(this.name, ", Email: ").concat(this.email);
    };
    Customer.nextId = 1;
    return Customer;
}());
var OrderManager = /** @class */ (function () {
    function OrderManager() {
        this.orders = [];
        this.orders = [];
    }
    OrderManager.prototype.createOrder = function (customer, products) {
        var order = new Order(customer.id, products);
        this.orders.push(order);
        return order;
    };
    OrderManager.prototype.getOrderById = function (id) {
        for (var i = 0; i < this.orders.length; i++) {
            if (this.orders[i].id === id) {
                return this.orders[i];
            }
        }
        return undefined;
    };
    OrderManager.prototype.getAllOrders = function () {
        return this.orders;
    };
    OrderManager.prototype.getOrdersByCustomer = function (customerId) {
        var result = [];
        for (var i = 0; i < this.orders.length; i++) {
            if (this.orders[i].customerId === customerId) {
                result.push(this.orders[i]);
            }
        }
        return result;
    };
    return OrderManager;
}());
var catalog = new Catalog();
var phoneData = { name: "Smartphone", price: 500, category: ProductCategory.Electronics, description: "Latest model" };
var phone = catalog.addProduct(phoneData);
var bookData = { name: "TypeScript Guide", price: 30, category: ProductCategory.Books };
var book = catalog.addProduct(bookData);
console.log(phone.getInfo());
console.log(book.getInfo());
catalog.updateProduct(phone.id, { price: 450, description: "Discounted model" });
console.log("After update:", (_a = catalog.getProductById(phone.id)) === null || _a === void 0 ? void 0 : _a.getInfo());
var customer = new Customer("John Doe", "john@example.com");
console.log(customer.getCustomerInfo());
var manager = new OrderManager();
var order = manager.createOrder(customer, [phone, book]);
console.log(order.getOrderInfo());
var summary = order.getSummary();
console.log("Order summary:", summary);
var customerOrders = manager.getOrdersByCustomer(customer.id);
console.log("Customer orders:", customerOrders.map(function (o) { return o.id; })); // map доступен в ES5
