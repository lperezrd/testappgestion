const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.historial.search(ctx.query);
    } else {
      entities = await strapi.services.historial.find(ctx.query, [
        "solicitudes_tema",
        "solicitudes_tema.tema_id",
        "solicitudes_tema.usuario_id",
        "estatus",
      ]);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.historial })
    );
  },
};
