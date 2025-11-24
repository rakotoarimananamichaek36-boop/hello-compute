// READ / SAVE data
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function load(key) { return JSON.parse(localStorage.getItem(key) || "[]"); }

// SIGNUP
function signup() {
    let clients = load("clients");

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    if (!name || !phone || !password) return alert("Fill all fields");

    clients.push({ name, phone, password });
    save("clients", clients);

    alert("Account created!");
    location.href = "login.html";
}

// LOGIN
function login() {
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    let clients = load("clients");

    const found = clients.find(c => c.phone === phone && c.password === password);

    if (!found) return alert("Wrong phone or password!");

    localStorage.setItem("logged", phone);

    location.href = "dashboard.html";
}

// LOGOUT
function logout() {
    localStorage.removeItem("logged");
    location.href = "index.html";
}

// Buy Offer
function buy(offer) {
    const phone = localStorage.getItem("logged");
    let clients = load("clients");
    let user = clients.find(c => c.phone === phone);

    if (!user) return;

    const locationName = prompt("Your location: ");

    let purchases = load("purchases");
    purchases.push({
        name: user.name,
        phone,
        offer,
        location: locationName,
        date: new Date().toLocaleString()
    });
    save("purchases", purchases);

    // email simulation
    let emailLog = load("emailLog");
    emailLog.push(`${user.name} (${phone}) purchased ${offer} from ${locationName}`);
    save("emailLog", emailLog);

    alert("Purchase sent! Admin will activate your data.");
}

// Show Consumption
window.onload = function () {
    const phone = localStorage.getItem("logged");
    if (!phone) return;

    const consumption = JSON.parse(localStorage.getItem("consumption") || "{}");
    const consumed = consumption[phone] || 0;

    const place = document.getElementById("consumedDisplay");
    if (place) place.innerHTML = consumed + " Go used";
};
