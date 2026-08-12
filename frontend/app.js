const API_BASE_URL = "http://" + "192.168.49.2:32488";
const CUSTOMER_ID = "customer-001";


// =====================================================
// LOAD CAKES
// =====================================================

async function loadCakes() {

    try {

        const name =
            document.getElementById("name-filter").value.trim();

        const category =
            document.getElementById("category-filter").value;

        const minPrice =
            document.getElementById("min-price").value;

        const maxPrice =
            document.getElementById("max-price").value;

        const params = new URLSearchParams();

        if (name) {
            params.append("name", name);
        }

        if (category) {
            params.append("category", category);
        }

        if (minPrice) {
            params.append("minPrice", minPrice);
        }

        if (maxPrice) {
            params.append("maxPrice", maxPrice);
        }

        const query = params.toString();

        const url = query
            ? `${API_BASE_URL}/cakes?${query}`
            : `${API_BASE_URL}/cakes`;

        const response = await fetch(url);
        const result = await response.json();

        const container =
            document.getElementById("cakes-container");

        if (!result.success) {
            container.innerHTML =
                "<p>Unable to load cakes.</p>";
            return;
        }

        if (!result.data || result.data.length === 0) {
            container.innerHTML =
                "<p>No cakes found.</p>";
            return;
        }

        container.innerHTML = "";

        result.data.forEach(cake => {

            const card = document.createElement("div");

            card.className = "cake-card";

            card.innerHTML = `
                <h3>${cake.name}</h3>

                <p>${cake.description}</p>

                <p>
                    Category: ${cake.category}
                </p>

                <p class="price">
                    ₹${cake.price}
                </p>

                <p>
                    ${
                        cake.availability
                            ? "Available"
                            : "Not Available"
                    }
                </p>

                ${
                    cake.availability
                        ? `
                            <button
                                onclick="addToBasket('${cake._id}')">
                                Add to Basket
                            </button>
                          `
                        : ""
                }
            `;

            container.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        document.getElementById("cakes-container").innerHTML =
            "<p>Unable to connect to API Gateway.</p>";
    }
}


// =====================================================
// ADD TO BASKET
// =====================================================

async function addToBasket(cakeId) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/orders/basket/${CUSTOMER_ID}/items`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    cakeId,
                    quantity: 1
                })
            }
        );

        const result = await response.json();

        if (!result.success) {
            alert(result.message);
            return;
        }

        alert("Cake added to basket!");

        loadBasket();

    } catch (error) {

        console.error(error);

        alert("Unable to add cake to basket.");
    }
}


// =====================================================
// LOAD BASKET
// =====================================================

async function loadBasket() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/orders/basket/${CUSTOMER_ID}`
        );

        const result = await response.json();

        const container =
            document.getElementById("basket-container");

        if (!result.success) {
            container.innerHTML =
                "<p>Unable to load basket.</p>";
            return;
        }

        const basket = result.data;

        if (!basket.items || basket.items.length === 0) {

            container.innerHTML =
                "<p>Your basket is empty.</p>";

            return;
        }

        container.innerHTML = "";

        basket.items.forEach(item => {

            const div = document.createElement("div");

            div.className = "basket-item";

            div.innerHTML = `
                <h3>${item.name}</h3>

                <p>
                    Price: ₹${item.price}
                </p>

                <p>
                    Subtotal:
                    ₹${item.price * item.quantity}
                </p>

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(
                            '${item.cakeId}',
                            ${item.quantity - 1}
                        )">
                        -
                    </button>

                    <span>
                        Quantity: ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(
                            '${item.cakeId}',
                            ${item.quantity + 1}
                        )">
                        +
                    </button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromBasket('${item.cakeId}')">
                    Remove
                </button>
            `;

            container.appendChild(div);

        });

        const total = document.createElement("div");

        total.className = "basket-total";

        total.innerHTML = `
            <strong>
                Total: ₹${basket.totalAmount}
            </strong>
        `;

        container.appendChild(total);

    } catch (error) {

        console.error(error);

        document.getElementById("basket-container").innerHTML =
            "<p>Unable to connect to Order Service.</p>";
    }
}


// =====================================================
// UPDATE QUANTITY
// =====================================================

async function changeQuantity(cakeId, quantity) {

    if (quantity < 1) {
        await removeFromBasket(cakeId);
        return;
    }

    try {

        const response = await fetch(
            `${API_BASE_URL}/orders/basket/${CUSTOMER_ID}/items/${cakeId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    quantity
                })
            }
        );

        const result = await response.json();

        if (!result.success) {
            alert(result.message);
            return;
        }

        loadBasket();

    } catch (error) {

        console.error(error);

        alert("Unable to update quantity.");
    }
}


// =====================================================
// REMOVE ITEM
// =====================================================

async function removeFromBasket(cakeId) {

    try {

        const response = await fetch(
            `${API_BASE_URL}/orders/basket/${CUSTOMER_ID}/items/${cakeId}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!result.success) {
            alert(result.message);
            return;
        }

        loadBasket();

    } catch (error) {

        console.error(error);

        alert("Unable to remove item.");
    }
}


// =====================================================
// CLEAR BASKET
// =====================================================

async function clearBasket() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/orders/basket/${CUSTOMER_ID}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!result.success) {
            alert(result.message);
            return;
        }

        loadBasket();

    } catch (error) {

        console.error(error);

        alert("Unable to clear basket.");
    }
}


// =====================================================
// CHECKOUT
// =====================================================

async function checkout() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/orders/checkout/${CUSTOMER_ID}`,
            {
                method: "POST"
            }
        );

        const result = await response.json();

        const message =
            document.getElementById("checkout-message");

        if (!result.success) {

            message.textContent =
                result.message;

            return;
        }

        message.textContent =
            `Order confirmed! Order ID: ${result.data._id}`;

        // Display rating options for purchased cakes
        showRatingOptions(result.data.items);

        // Basket should now be empty
        loadBasket();

        // Refresh notifications
        loadNotifications();

    } catch (error) {

        console.error(error);

        document.getElementById("checkout-message").textContent =
            "Checkout failed.";
    }
}


// =====================================================
// SHOW RATING OPTIONS
// =====================================================

function showRatingOptions(items) {

    const container =
        document.getElementById("rating-container");

    if (!items || items.length === 0) {

        container.innerHTML =
            "<p>No purchased cakes available for rating.</p>";

        return;
    }

    container.innerHTML = "";

    items.forEach(item => {

        const div = document.createElement("div");

        div.className = "rating-card";

        div.innerHTML = `
            <h3>${item.name}</h3>

            <select id="rating-${item.cakeId}">
                <option value="">Select rating</option>
                <option value="1">⭐ 1</option>
                <option value="2">⭐⭐ 2</option>
                <option value="3">⭐⭐⭐ 3</option>
                <option value="4">⭐⭐⭐⭐ 4</option>
                <option value="5">⭐⭐⭐⭐⭐ 5</option>
            </select>

            <input
                type="text"
                id="comment-${item.cakeId}"
                placeholder="Comment"
            >

            <button
                onclick="submitRating('${item.cakeId}')">
                Submit Rating
            </button>

            <div id="rating-result-${item.cakeId}"></div>
        `;

        container.appendChild(div);

    });
}


// =====================================================
// SUBMIT RATING
// =====================================================

async function submitRating(cakeId) {

    const rating =
        document.getElementById(`rating-${cakeId}`).value;

    const comment =
        document.getElementById(`comment-${cakeId}`).value;

    const resultContainer =
        document.getElementById(`rating-result-${cakeId}`);

    if (!rating) {

        resultContainer.textContent =
            "Please select a rating.";

        return;
    }

    try {

        const response = await fetch(
            `${API_BASE_URL}/ratings/users/${CUSTOMER_ID}/cakes/${cakeId}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    rating: Number(rating),
                    comment
                })
            }
        );

        const result = await response.json();

        if (!result.success) {

            resultContainer.textContent =
                result.message;

            return;
        }

        resultContainer.textContent =
            "Rating submitted successfully!";

    } catch (error) {

        console.error(error);

        resultContainer.textContent =
            "Unable to submit rating.";
    }
}


// =====================================================
// LOAD NOTIFICATIONS
// =====================================================

async function loadNotifications() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/notifications/user/${CUSTOMER_ID}`
        );

        const result = await response.json();

        const container =
            document.getElementById("notification-container");

        if (!result.success) {

            container.innerHTML =
                "<p>Unable to load notifications.</p>";

            return;
        }

        if (!result.data || result.data.length === 0) {

            container.innerHTML =
                "<p>No notifications yet.</p>";

            return;
        }

        container.innerHTML = "";

        result.data.forEach(notification => {

            const div =
                document.createElement("div");

            div.className = "notification-card";

            div.innerHTML = `
                <h3>${notification.type}</h3>

                <p>
                    ${notification.message}
                </p>

                <p>
                    Status:
                    <strong>${notification.status}</strong>
                </p>

                <small>
                    ${new Date(
                        notification.createdAt
                    ).toLocaleString()}
                </small>
            `;

            container.appendChild(div);

        });

    } catch (error) {

        console.error(error);

        document.getElementById("notification-container").innerHTML =
            "<p>Unable to connect to Notification Service.</p>";
    }
}


// =====================================================
// FILTERS
// =====================================================

function clearFilters() {

    document.getElementById("name-filter").value = "";

    document.getElementById("category-filter").value = "";

    document.getElementById("min-price").value = "";

    document.getElementById("max-price").value = "";

    loadCakes();
}


// =====================================================
// EVENT LISTENERS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Cake Delight frontend initialized");

    const filterBtn = document.getElementById("filter-btn");
    const clearFilterBtn = document.getElementById("clear-filter-btn");
    const clearBasketBtn = document.getElementById("clear-basket-btn");
    const checkoutBtn = document.getElementById("checkout-btn");
    const refreshNotificationsBtn =
        document.getElementById("refresh-notifications-btn");

    if (filterBtn) {
        filterBtn.addEventListener("click", loadCakes);
    }

    if (clearFilterBtn) {
        clearFilterBtn.addEventListener("click", clearFilters);
    }

    if (clearBasketBtn) {
        clearBasketBtn.addEventListener("click", clearBasket);
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", checkout);
    }

    if (refreshNotificationsBtn) {
        refreshNotificationsBtn.addEventListener(
            "click",
            loadNotifications
        );
    }

    // Initial page loading
    loadCakes();
    loadBasket();
    loadNotifications();
});
