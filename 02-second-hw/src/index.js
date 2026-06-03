import "./styles.css";
import { exercises } from "./exercises/index.js";

function captureConsole(runFn) {
  const logs = [];
  const orig = console.log;
  console.log = (...args) => {
    logs.push(args.map(String).join(" "));
    orig(...args);
  };
  let returned,
    error = null;
  try {
    returned = runFn();
  } catch (e) {
    error = e;
  } finally {
    console.log = orig;
  }
  return { logs, returned, error };
}

function el(html) {
  const d = document.createElement("div");
  d.innerHTML = html.trim();
  return d.firstElementChild;
}

const app = document.getElementById("app");
app.innerHTML = `
  <h1>JS Practice – Intro</h1>
  <div class="controls">
    <label>Exercise:
      <select id="exSelect"></select>
    </label>
    <button id="runStarter">Run</button>
  </div>

  <div id="meta"></div>

  <h3>Console</h3>
  <pre id="consoleOut"></pre>

  <h3>Checkpoints</h3>
  <ol id="checkpoints"></ol>
`;

const sel = document.getElementById("exSelect");
const metaBox = document.getElementById("meta");
const out = document.getElementById("consoleOut");
const cps = document.getElementById("checkpoints");

exercises.forEach((ex, i) => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = `${ex.meta.id} — ${ex.meta.title}`;
  sel.appendChild(opt);
});

let current = exercises[0];
renderMeta(current);

sel.addEventListener("change", (e) => {
  current = exercises[Number(e.target.value)];
  renderMeta(current);
});

function renderMeta(ex) {
  metaBox.innerHTML = `<p><strong>${ex.meta.title}</strong><br/>${ex.meta.description}</p>`;
  cps.innerHTML = "";
  ex.checkpoints.forEach((cp, idx) => {
    cps.appendChild(
      el(`
      <li>
        <div class="cp-title">${cp.description}</div>
        <ul class="cp-subresults" data-idx="${idx}"></ul>
      </li>
    `)
    );
  });
  out.textContent = "";
}

function runAndTest(runFn) {
  const result = captureConsole(runFn);
  out.textContent = result.error
    ? [
        ...result.logs,
        "",
        `❌ Runtime error: ${result.error?.message || result.error}`,
      ].join("\n")
    : result.logs.join("\n");

  // render test results from solution.js
  current.checkpoints.forEach((cp, idx) => {
    const ul = cps.querySelector(`.cp-subresults[data-idx="${idx}"]`);
    ul.innerHTML = "";
    const subResults = cp.test(result) || [];
    subResults.forEach((sr) => {
      const li = document.createElement("li");
      const passed = !!sr.pass;
      li.textContent =
        (passed ? "✅ " : "❌ ") +
        (sr.message || (passed ? "Passed" : "Failed"));

      // If we just ran the STARTER, prefix failures with TODO:
      if (runFn === current.runStarter && !passed) {
        li.textContent = "TODO: " + li.textContent;
      }

      li.style.color = passed ? "var(--green, #137333)" : "var(--red, #b00020)";
      ul.appendChild(li);
    });
  });
}

document.getElementById("runStarter").addEventListener("click", () => {
  runAndTest(current.runStarter);
});
