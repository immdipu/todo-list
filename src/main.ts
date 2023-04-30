import "./style.css";
import FullList from "./modal/FullList";
import ListItem from "./modal/ListItem";
import ListTemplate from "./templates/ListTemplate";

const initApp = (): void => {
  const fullList = FullList.instance;
  const templates = ListTemplate.instance;
  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;
  itemEntryForm.addEventListener("submit", (event: Event): void => {
    event.preventDefault();
    const input = document.getElementById("newItem") as HTMLInputElement;
    const newEntryText: string = input.value.trim();
    if (!newEntryText) return;
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;
    const newItem = new ListItem(itemId.toString(), newEntryText);

    fullList.addItem(newItem);
    templates.render(fullList);
    input.value = "";
  });
  const clearItems = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;

  clearItems.addEventListener("click", (): void => {
    fullList.clearList();
    templates.clear();
  });
  fullList.load();
  templates.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
