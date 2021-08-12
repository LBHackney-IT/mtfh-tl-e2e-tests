const featureToggleStore = Cypress.config("featureToggles");
const hasToggle = (path) => {
  const pathArray = path.match(/([^[.\]])+/g);
  const result =
    pathArray?.reduce((prevObj, key) => {
      if (prevObj && prevObj[key]) {
        return prevObj[key];
      }
      return undefined;
    }, featureToggleStore) || undefined;
  return typeof result === "boolean" ? result : false;
};

module.exports = {
  hasToggle,
};
