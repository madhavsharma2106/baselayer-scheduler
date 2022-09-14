import * as Joi from "joi";

export const createJob = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    schedule: Joi.string().required(),
    recurring: Joi.boolean().required(),
    taskExecutionAPIConfig: Joi.object()
      .keys({
        url: Joi.string().required(),
        method: Joi.string()
          .valid(
            "get",
            "GET",
            "delete",
            "DELETE",
            "head",
            "HEAD",
            "options",
            "OPTIONS",
            "post",
            "POST",
            "put",
            "PUT",
            "patch",
            "PATCH",
            "purge",
            "PURGE",
            "link",
            "LINK",
            "unlink",
            "UNLINK"
          )
          .required(),
        data: Joi.object(),
      })
      .required(),
  }),
};
