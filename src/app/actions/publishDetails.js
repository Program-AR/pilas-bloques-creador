export const Types = {
    RATE_LEVEL: "RATE_LEVEL",
};

export const rateLevel = (level, rate) => {
    return {
        type: Types.RATE_LEVEL,
        level,
        rate
    };
};
