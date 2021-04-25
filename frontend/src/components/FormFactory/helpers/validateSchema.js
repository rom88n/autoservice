import * as Yup from 'yup';

const isRequired = 'Обязательное поле';

export default function validateSchema(fields) {
  return Yup.object().shape(
    fields.reduce((acc, field) => {
      if (!field.required) return acc;
      return {
        ...acc,
        [field.name]: Yup.string().required(isRequired)
      };
    }, {})
  );
}
