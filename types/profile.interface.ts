export interface IProfile {
  id?: number;
  avatar?: string;
  name?: string;
}

export const profileInitialState: IProfile = {
  id: 0,
  name: "John Snow",
  avatar: "",
};
