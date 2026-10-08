
enum ProductCategory {
    Electronics = "Electronics",
    Clothing = "Clothing",
    Books = "Books",
    Food = "Food",
    Other = "Other"
}

interface IProduct {
    id: number;
    name: string;
    price: number;
    description?: string;
    category: ProductCategory;
}

class Product implements IProduct {
    public readonly id: number;
    public name: string;
    public price: number;
    public description?: string;
    public category: ProductCategory;

    private static nextId = 1;

    constructor(data: Omit<IProduct, 'id'>) {
        this.id = Product.nextId++;
        this.name = data.name;
        this.price = data.price;
        this.description = data.description;
        this.category = data.category;
    }

    getInfo(): string {
        let info = `ID: ${this.id}, Name: ${this.name}, Price: ${this.price}, Category: ${this.category}`;
        if (this.description) {
            info += `, Description: ${this.description}`;
        }
        return info;
    }
}

class Catalog {
    private products: Product[] = [];

    constructor() {
        this.products = [];
    }

    addProduct(productData: Omit<IProduct, 'id'>): Product {
        const product = new Product(productData);
        this.products.push(product);
        return product;
    }

    updateProduct(id: number, updates: Partial<Omit<IProduct, 'id'>>): boolean {
        const product = this.getProductById(id);
        if (!product) return false;

        for (let key in updates) {
            if (updates.hasOwnProperty(key)) {
                (product as any)[key] = updates[key as keyof typeof updates];
            }
        }
        return true;
    }

    removeProduct(id: number): boolean {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }
        if (index === -1) return false;
        this.products.splice(index, 1);
        return true;
    }

    getProductById(id: number): Product | undefined {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                return this.products[i];
            }
        }
        return undefined;
    }

    getAllProducts(): Product[] {
        return this.products;
    }

    getProductsByCategory(category: ProductCategory): Product[] {
        const result: Product[] = [];
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].category === category) {
                result.push(this.products[i]);
            }
        }
        return result;
    }
}

class Order<G extends Product> {
    public readonly id: number;
    public products: G[];
    public totalPrice: number;
    public customerId: number;

    private static nextId = 1;

    constructor(customerId: number, products: G[]) {
        this.id = Order.nextId++;
        this.customerId = customerId;
        this.products = products;
        this.totalPrice = this.calculateTotalPrice();
    }

    calculateTotalPrice(): number {
        let sum = 0;
        for (let i = 0; i < this.products.length; i++) {
            sum += this.products[i].price;
        }
        return sum;
    }

    getOrderInfo(): string {
        return `Order ID: ${this.id}, Customer ID: ${this.customerId}, Total: ${this.totalPrice}, Products: ${this.products.length}`;
    }

    getSummary(): Pick<Order<G>, 'id' | 'totalPrice'> {
        return {
            id: this.id,
            totalPrice: this.totalPrice
        };
    }
}

class Customer {
    public readonly id: number;
    public name: string;
    public email: string;

    private static nextId = 1;

    constructor(name: string, email: string) {
        this.id = Customer.nextId++;
        this.name = name;
        this.email = email;
    }

    getCustomerInfo(): string {
        return `Customer ID: ${this.id}, Name: ${this.name}, Email: ${this.email}`;
    }
}

class OrderManager {
    private orders: Order<Product>[] = [];

    constructor() {
        this.orders = [];
    }

    createOrder(customer: Customer, products: Product[]): Order<Product> {
        const order = new Order(customer.id, products);
        this.orders.push(order);
        return order;
    }

    getOrderById(id: number): Order<Product> | undefined {
        for (let i = 0; i < this.orders.length; i++) {
            if (this.orders[i].id === id) {
                return this.orders[i];
            }
        }
        return undefined;
    }

    getAllOrders(): Order<Product>[] {
        return this.orders;
    }

    getOrdersByCustomer(customerId: number): Order<Product>[] {
        const result: Order<Product>[] = [];
        for (let i = 0; i < this.orders.length; i++) {
            if (this.orders[i].customerId === customerId) {
                result.push(this.orders[i]);
            }
        }
        return result;
    }
}

const catalog = new Catalog();

const phoneData = { name: "Smartphone", price: 500, category: ProductCategory.Electronics, description: "Latest model" };
const phone = catalog.addProduct(phoneData);

const bookData = { name: "TypeScript Guide", price: 30, category: ProductCategory.Books };
const book = catalog.addProduct(bookData);

console.log(phone.getInfo());
console.log(book.getInfo());

catalog.updateProduct(phone.id, { price: 450, description: "Discounted model" });
console.log("After update:", catalog.getProductById(phone.id)?.getInfo());

const customer = new Customer("John Doe", "john@example.com");
console.log(customer.getCustomerInfo());

const manager = new OrderManager();
const order = manager.createOrder(customer, [phone, book]);
console.log(order.getOrderInfo());

const summary = order.getSummary();
console.log("Order summary:", summary);

const customerOrders = manager.getOrdersByCustomer(customer.id);
console.log("Customer orders:", customerOrders.map(o => o.id)); // map доступен в ES5