// App namespace
const App = {
  $: {
    menu: document.querySelector("[data-id='menu']"), // we select the element using the data-* attribute in order to decouple CSS classes from JS
    menuItems: document.querySelector("[data-id='menu-popover']"),
    resetButton: document.querySelector("[data-id='reset-button']"),
    newRoundButton: document.querySelector("[data-id='new-round-button']"),
  },
  init() {
    // Toggle menu
    App.$.menu.addEventListener("click", (event) => {
      App.$.menuItems.classList.toggle("hidden");
    });
  },
};

// Init all the event listeners and logic only after the windows has loaded
window.addEventListener("load", App.init);
