export const Types = {
  LOGOUT: "LOGOUT",
  FETCH_LEVELS: "FETCH_LEVELS",
  FETCH_LEVEL: "FETCH_LEVEL",
  SET_LEVELS: "SET_LEVELS",
  FETCH_PUBLISHED_LEVELS: "FETCH_PUBLISHED_LEVELS",
  SET_PUBLISHED_LEVELS: "SET_PUBLISHED_LEVELS",
  DELETE_LEVEL: "DELETE_LEVEL",
  DOWNLOAD_LEVEL: "DOWNLOAD_LEVEL",
  SET_PUBLISHED_LEVEL_DETAILS: "SET_PUBLISHED_LEVEL_DETAILS",
  COMMENT_LEVEL: "COMMENT_LEVEL",
}

export const logout = () => {
  return {
      type: Types.LOGOUT
  };
}

export const fetchLevels = () => {
  return {
      type: Types.FETCH_LEVELS
  };
}

export const fetchLevel = id => {
  return {
      type: Types.FETCH_LEVEL,
      id
  };
}

export const setLevels = levels => {
  return {
      type: Types.SET_LEVELS,
      levels
  };
}

export const fetchPublishedLevels = () => {
  return {
    type: Types.FETCH_PUBLISHED_LEVELS
  };
}

export const setPublishedLevels = publishedLevels => {
  return {
      type: Types.SET_PUBLISHED_LEVELS,
      publishedLevels
  }
}

export const deleteLevel = level => {
  return {
      type: Types.DELETE_LEVEL,
      level
  };
}

export const download = level => {
  return {
      type: Types.DOWNLOAD_LEVEL,
      level
  };
}

export const setPublishedLevelDetail = publishedLevel => {
  return {
    type: Types.SET_PUBLISHED_LEVEL_DETAILS,
    publishedLevel
  }
}

export const comment = (level, text) => {
  return {
    type: Types.COMMENT_LEVEL,
    level,
    text
  }
}
