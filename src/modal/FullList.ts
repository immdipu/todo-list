import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  save(): void;
  load(): void;
  clearList(): void;
  RemoveItem(id: string): void;
  addItem(itemObj: ListItem): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();
  private constructor(private _list: ListItem[] = []) {}
  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("myList");
    if (!storedList) return;
    const parsedData: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);
    parsedData.forEach((item) => {
      const newList = new ListItem(item._id, item._item, item._checked);
      FullList.instance.addItem(newList);
    });
  }

  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }
  clearList(): void {
    this._list = [];
    this.save();
  }
  RemoveItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
  }
}
