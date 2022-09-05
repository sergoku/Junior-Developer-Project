export const getAccsessToken: () => string | null = () =>
  localStorage.getItem("accsessToken");
export const getRefreshToken: () => string | null = () =>
  localStorage.getItem("refreshToken");
export const getId: () => string | null = () => localStorage.getItem("id");
export const getExpiresIn: () => string | number | null = () =>
  localStorage.getItem("expiresIn");

export const setAccsessToken: (accsessToken: string) => void = (accsessToken) =>
  localStorage.setItem("accsessToken", accsessToken);
export const setRefreshToken: (refreshToken: string) => void = (refreshToken) =>
  localStorage.setItem("refreshToken", refreshToken);
export const setId: (id: string) => void = (id) =>
  localStorage.setItem("id", id);
export const setExpiresIn: (expiresIn: string) => void = (expiresIn) =>
  localStorage.setItem("expiresIn", expiresIn);

export const userIsAuthorized: () => boolean = () => {
  if (getId() || getRefreshToken() || getAccsessToken()) {
    return true;
  } else {
    return false;
  }
};
