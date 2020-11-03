"use strict";
const createSlug = require("create-slug");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.name) {
        data.slug = createSlug(data.name);
      }
    },
  },
};
