export const validate = ({
  dataInput,
  setErrors,
}: {
  dataInput: {
    email: string;
    password: string;
    [index: string]: string;
  };
  setErrors: (errors: { email: string; password: string }) => void;
}) => {
  const errors: { password: string; email: string; [index: string]: string } = {
    password: "",
    email: "",
  };
  if (dataInput.password.length < 8) {
    errors.password = ` должен состоять не менее чем из 8   символов`;
  }
  for (const fieldName in dataInput) {
    if (dataInput[fieldName].trim() === "") {
      errors[fieldName] = " обязателен для заполнения";
    }
  }

  setErrors(errors);

  return Object.keys(errors).length === 0;
};
