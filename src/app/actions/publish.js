export const Types = {
  LOAD_LEVEL_TO_PUBLISH: "LOAD_LEVEL_TO_PUBLISH",
  PUBLISH_LEVEL: "PUBLISH_LEVEL",
  DEPUBLISH_LEVEL: "DEPUBLISH_LEVEL",
};

export const loadLevelToPublish = level => {
  return {
    type: Types.LOAD_LEVEL_TO_PUBLISH,
    level
  }
};

export const publishLevel = levelToPublish => {
    return {
      type: Types.PUBLISH_LEVEL,
      publishedLevel: levelToPublish
    };
};

export const depublish = level => {
    return {
      type: Types.DEPUBLISH_LEVEL,
      level
    };
};