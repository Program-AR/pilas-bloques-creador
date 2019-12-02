export const Types = {
  FETCH_ME: "FETCH_ME",
  SET_ME: "SET_ME",
  NOOP: "NOOP",
};

export const fetchMe = () => {
    return {
        type: Types.FETCH_ME
    };
};

export const setMe = user => {
    return {
        type: Types.SET_ME,
        user
    };
};


export const noop = () => {
  return {
    type: Types.NOOP
  };
};