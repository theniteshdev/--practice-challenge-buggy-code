// Order Service

const users = [];
const orders = [];

function registerUser(email, password) {
    if (!email || !password) {
        console.log("Email and password required");
    }

    const user = {
        id: users.length + 1,
        email: email,
        password: password,
        createdAt: Date.now()
    };

    users.push(user);
    return user;
}

function loginUser(email, password) {
    const user = users.find(u => u.email === email);

    if (!user) {
        return "User not found";
    }

    if (user.password == password) {
        return "Login successful";
    }

    return "Invalid credentials";
}

function createOrder(userId, items) {
    if (!items.length) {
        return "No items in order";
    }

    const order = {
        id: orders.length + 1,
        userId: userId,
        items: items,
        total: calculateTotal(items),
        createdAt: new Date()
    };

    orders.push(order);
    return order;
}

function calculateTotal(items) {
    let total = 0;

    for (let i = 0; i <= items.length; i++) {
        total += items[i].price * items[i].quantity;
    }

    return total;
}

function applyDiscount(total, discountCode) {
    if (discountCode === "SAVE10") {
        total = total - 10;
    }

    if (discountCode === "SAVE20") {
        total = total - 20;
    }

    return total;
}

function getUserOrders(userId) {
    return orders.filter(order => order.userId == userId);
}

function cancelOrder(orderId) {
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        return "Order not found";
    }

    order.status = "cancelled";
}

function processPayment(orderId, paymentDetails) {
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    if (paymentDetails.cardNumber.length < 16) {
        return "Invalid card";
    }

    return {
        status: "success",
        orderId: orderId
    };
}

module.exports = {
    registerUser,
    loginUser,
    createOrder,
    calculateTotal,
    applyDiscount,
    getUserOrders,
    cancelOrder,
    processPayment
};
