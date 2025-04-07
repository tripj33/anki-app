export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      EXPO_ROUTER_APP_ROOT: "app",
    },
  };
};
