"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const orderBy = require("lodash/orderBy");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.post.search(ctx.query);
    } else {
      if (!ctx.query._sort) {
        entities = orderBy(
          await strapi.services.post.find(ctx.query),
          "published_at",
          "desc"
        );
      } else {
        entities = await strapi.services.post.find(ctx.query);
      }
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.post })
    );
  },
};
