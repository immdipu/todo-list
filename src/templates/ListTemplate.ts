import FullList from "../modal/FullList";

interface DOMlist {
  ul: HTMLUListElement;
  clear(): void;
  render(FullList: FullList): void;
}

export default class ListTemplate implements DOMlist {
  ul: HTMLUListElement;
  static instance: ListTemplate = new ListTemplate();
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }
  clear(): void {
    this.ul.innerHTML = "";
  }
  render(fullList: FullList) {
    this.clear();
    fullList.list.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";
      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.tabIndex = 0;
      check.checked = item.checked;
      li.append(check);
      check.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.save();
      });
      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);
      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button";
      button.textContent = "x";
      li.append(button);
      button.addEventListener("click", () => {
        fullList.RemoveItem(item.id);
        this.render(fullList);
      });
      this.ul.append(li);
    });
  }
}
