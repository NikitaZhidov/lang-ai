const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  // TODO: remove this after this issue is resolved: https://github.com/nrwl/nx/issues/32880
  forceExit: true,
};
