document.addEventListener("DOMContentLoaded", () => {
    const calcBtn = document.getElementById("calculate-btn");

    if (calcBtn) {
        calcBtn.addEventListener("click", calculateQuadratic);
    }

    const historyToggle = document.getElementById("history-toggle");
    if (historyToggle) {
        historyToggle.addEventListener("click", () => {
            const content = document.getElementById("history-content");
            const icon = document.getElementById("history-icon");
            if (content.style.display === "none") {
                content.style.display = "block";
                icon.textContent = "-";
            } else {
                content.style.display = "none";
                icon.textContent = "+";
            }
        });
    }
});

function formatNumber(num, decimalPlaces = 4) {
    if (Number.isInteger(num)) return num.toString();
    return Number(num.toFixed(decimalPlaces)).toString(); // Drop trailing zeros
}

function calculateQuadratic() {

    const yIntY = parseFloat(document.getElementById("y-intercept-y").value);
    const vertexX = parseFloat(document.getElementById("vertex-x").value);
    const xInt2 = parseFloat(document.getElementById("x-intercept-x").value);

    if (isNaN(yIntY) || isNaN(vertexX) || isNaN(xInt2)) {
        alert("Please fill in all the fields with valid numbers.");
        return;
    }

    const h = vertexX;

    // Smaller/negative x-intercept
    const xInt1 = (2 * h) - xInt2;

    // Check for division by zero
    const denom = -xInt1 * -xInt2;
    if (denom === 0) {
        alert(`Invalid coordinates, divide by zero when solving for a! (h: ${vertexX}, x-intercept1: ${xInt1}, x-intercept2: ${xInt2})`);
        return;
    }

    // Find a, b, c for standard form quadratic equation
    const a = yIntY / denom;
    const b = -2 * a * h;                              // from h = -(b)/2a
    const c = -((a * xInt2 * xInt2) + (b * xInt2));    // from y = ax^2 + bx + c using point (xInt2, 0)

    // Vertex Y coordinate, find k by using x=h
    const k = (a * h * h) + (b * h) + c;

    // Output Formatting
    const minXInt = Math.min(xInt1, xInt2);
    const maxXInt = Math.max(xInt1, xInt2);
    const sign = (num) => num >= 0 ? "+" : "-";
    const absNum = (num) => formatNumber(Math.abs(num));

    // Standard Form: y = ax^2 + bx + c
    const standardForm = `y = ${formatNumber(a)}x² ${sign(b)} ${absNum(b)}x ${sign(c)} ${absNum(c)}`;

    // Factored Form: y = a(x - r1)(x - r2)
    const factoredForm = `y = ${formatNumber(a)}(x ${sign(-minXInt)} ${absNum(minXInt)})(x ${sign(-maxXInt)} ${absNum(maxXInt)})`;

    // Vertex Form: y = a(x - h)^2 + k
    const vertexForm = `y = ${formatNumber(a)}(x ${sign(-h)} ${absNum(h)})² ${sign(k)} ${absNum(k)}`;

    // 4. Update DOM with results
    document.getElementById("out-x-intercepts").textContent = `(${formatNumber(minXInt)}, 0) and (${formatNumber(maxXInt)}, 0)`;
    document.getElementById("out-vertex").textContent = `(${formatNumber(h)}, ${formatNumber(k)})`;
    document.getElementById("out-factored").textContent = factoredForm;
    document.getElementById("out-standard").textContent = standardForm;
    document.getElementById("out-vertex-form").textContent = vertexForm;

    // Show the output container
    document.getElementById("output-area").style.display = "block";

    // 5. Append to History Table
    const tbody = document.getElementById("history-tbody");
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>(${formatNumber(yIntY)}, ${formatNumber(h)}, ${formatNumber(xInt2)})</td>
        <td>(${formatNumber(h)}, ${formatNumber(k)})</td>
        <td>(${formatNumber(minXInt)}, 0) and (${formatNumber(maxXInt)}, 0)</td>
        <td>${standardForm}</td>
    `;

    tbody.prepend(tr); // Add newest to the top
    document.getElementById("history-area").style.display = "block";
    
    // Update the history count
    const countSpan = document.getElementById("history-count");
    if (countSpan) {
        countSpan.textContent = `(${tbody.children.length})`;
    }
}
