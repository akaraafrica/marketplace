export interface IProfile {
  id: number | string;
  avatar: string;
  name: string;
}

export const profileInitialState: IProfile = {
  id: 0,
  name: "John Snow",
  avatar: "",
};
