const Menu = document.getElementById("MenuBas");
const OuvrirMenu = document.getElementById("OuvrirMenu");
const FermerMenu = document.getElementById("FermerMenu");

console.log(Menu);

function OpenMenu() {
    Menu.classList.add("active");
}

function CloseMenu() {
    Menu.classList.remove("active");
}

OuvrirMenu.onclick = OpenMenu;
FermerMenu.onclick = CloseMenu;