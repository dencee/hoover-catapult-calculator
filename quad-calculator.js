document.addEventListener("DOMContentLoaded", () => {
    const calcBtn = document.getElementById("calculate-btn");

    if (calcBtn) {
        calcBtn.addEventListener("click", calculateQuadratic);
    }
});

function formatNumber(num) {
    if (Number.isInteger(num)) return num.toString();
    return Number(num.toFixed(4)).toString(); // Drop trailing zeros
}

function calculateQuadratic() {
    // 1. Read Inputs
    const yIntY = parseFloat(document.getElementById("y-intercept-y").value);
    const vertexX = parseFloat(document.getElementById("vertex-x").value);
    const xIntLarger = parseFloat(document.getElementById("x-intercept-x").value);

    if (isNaN(yIntY) || isNaN(vertexX) || isNaN(xIntLarger)) {
        alert("Please fill in all the fields with valid numbers.");
        return;
    }

    const y0 = yIntY;
    const h = vertexX;
    const xInt2 = xIntLarger;

    // 2. Smaller/negative x-intercept
    const xInt1 = (2 * h) - xInt2;

    // 2. Solving for a
    const denom = -xInt1 * -xInt2;

    if (denom === 0) {
        alert("Invalid coordinates! These points cannot form a valid quadratic relationship.");
        return;
    }

    const a = y0 / denom;
    const b = -2 * a * h;                              // from h = -(b)/2a
    const c = -((a * xInt2 * xInt2) + (b * xInt2));    // from y = ax^2 + bx + c

    // Vertex Y coordinate, find k by using x=h
    const k = (a * h * h) + (b * h) + c;

    // 3. Output Formatting
    const minXInt = Math.min(xInt1, xInt2);
    const maxXInt = Math.max(xInt1, xInt2);

    const sign = (num) => num >= 0 ? "+" : "-";
    const absNum = (num) => formatNumber(Math.abs(num));

    // Standard Form: y = ax^2 + bx + c
    const standard = `y = ${formatNumber(a)}x² ${sign(b)} ${absNum(b)}x ${sign(c)} ${absNum(c)}`;

    // Factored Form: y = a(x - r1)(x - r2)
    const factored = `y = ${formatNumber(a)}(x ${sign(-minXInt)} ${absNum(minXInt)})(x ${sign(-maxXInt)} ${absNum(maxXInt)})`;

    // Vertex Form: y = a(x - h)^2 + k
    const vertexForm = `y = ${formatNumber(a)}(x ${sign(-h)} ${absNum(h)})² ${sign(k)} ${absNum(k)}`;

    // 4. Update the DOM
    document.getElementById("out-x-intercepts").textContent = `(${formatNumber(minXInt)}, 0) and (${formatNumber(maxXInt)}, 0)`;
    document.getElementById("out-vertex").textContent = `(${formatNumber(h)}, ${formatNumber(k)})`;
    document.getElementById("out-standard").textContent = standard;
    document.getElementById("out-factored").textContent = factored;
    document.getElementById("out-vertex-form").textContent = vertexForm;

    // Show the output container
    document.getElementById("output-area").style.display = "block";
}
