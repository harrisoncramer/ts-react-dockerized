import { useState } from "react";

type TokenSetter = {
  setToken: (token: string) => void;
  removeToken: () => void;
  token: string | null;
};
export default function useToken(): TokenSetter {
  const getToken = () => {
    const token = sessionStorage.getItem("token");
    return token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string) => {
    sessionStorage.setItem("token", userToken);
    setToken(userToken);
  };

  const removeToken = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  return {
    setToken: saveToken,
    removeToken,
    token,
  };
}
