"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.message.create(data, { files });
    } else {
      entity = await strapi.services.message.create(ctx.request.body);
    }
    entity = sanitizeEntity(entity, { model: strapi.models.message });
    await strapi.plugins["email"].services.email.send({
      to: "chris@solmediaco.com",
      replyTo: `${entity.email}`,
      subject: "New Contact Form Submission on Personal Portfolio",
      text: `
        The contact form on the personal portfolio website was submitted.
        Message: ${entity.message}

        Name: ${entity.name}

        Email: ${entity.email}

        Phone: ${entity.phone}
      `,
    });

    return entity;
  },
};
