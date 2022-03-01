export enum SUPPORTED_ALGORITMS {
  BUBBLE = "bubble",
  SELECTION = "selection",
  INSERTION = "insertion",
  QUICK = "quick",
  MERGE = "merge",
  HEAP = "heap",
}

export type TMapState = Readonly<{
  coordinates: string;
}>;

export enum SORT {
  SORT = "sort",
  TITLE = "sort__title",
  BOX = "sort__box",
}

export enum STATUS {
  SORTING = "Sorting...",
  CHOSE_ALGORITHM = "Choose your algorithm",
}
