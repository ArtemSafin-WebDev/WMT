import "virtual:svg-icons-register";
import "../scss/style.scss";
import newsSlider from "./newsSlider";
import tabs from "./tabs";
import servicesSlider from "./servicesSlider";
import stack from "./stack";
import cases from "./cases";
import casesSlider from "./casesSlider";
import approachSlider from "./approachSlider";
import clients from "./clients";
import reviews from "./reviews";
import expertise from "./expertise";
import fixedHeader from "./header";
import intro from "./intro";
import modals from "./modals";
import menu from "./menu";
import smoothScrolling from "./smoothScrolling";
import approachAnimation from "./approachAnimation";

document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling();
  fixedHeader();
  intro();
  tabs();
  newsSlider();
  servicesSlider();
  casesSlider();
  approachSlider();
  stack();
  cases();
  clients();
  reviews();
  expertise();
  modals();
  menu();
  approachAnimation();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
