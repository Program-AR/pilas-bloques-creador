export const Types = {
  SAVE: "SAVE",
  UPDATE_LEVEL_PROPS: "UPDATE_LEVEL_PROPS",
  SET_SUCCESS: "SET_SUCCESS",
  "FETCH_ME": "FETCH_ME"
}

export const save = level => {
    return {
        type: Types.SAVE,
        level
    };
}

export const fetchMe = () => {
    return {
        type: Types.FETCH_ME
    };
}

export const updateLevelProps = level => {
    return {
        type: Types.UPDATE_LEVEL_PROPS,
        level
    };
}

export const setSuccess = value => {
    return {
        type: Types.SET_SUCCESS,
        value
    };
}