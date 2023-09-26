import { Theme } from "@react-navigation/native";

export const lightTheme: Theme = {
  colors: {
    background: "#f5fbfb",
    border: "#f5fbfb",
    card: "#eaf3f5",
    notification: "#f5fbfb",
    primary: "#373b5f",
    text: "#747d91",
  },
  dark: false,
};

export const darkTheme: Theme = {
  colors: {
    background: "#1A202C",
    border: "#1A202C",
    card: "#2D3748",
    notification: "#1A202C",
    primary: "#EDF2F7",
    text: "#CBD5E0",
  },
  dark: true,
};
