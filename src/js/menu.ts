export default function menu() {
  const burger = document.querySelector<HTMLButtonElement>(
    ".page-header__burger"
  );

  burger?.addEventListener("click", (event) => {
    event.preventDefault();
    document.body.classList.toggle("menu-open");
  });
}
