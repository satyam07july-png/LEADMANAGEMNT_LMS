import ApiError from "./ApiError.js";

const validateRequest = (

    schema,

    data

) => {

    const { error, value } =

        schema.validate(

            data,

            {

                abortEarly: false,

                stripUnknown: true,

            }

        );

    if (error) {

        throw new ApiError(

            400,

            error.details

                .map(

                    item => item.message

                )

                .join(", ")

        );

    }

    return value;

};

export default validateRequest;