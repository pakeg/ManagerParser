import { useState } from 'react';

const useErrors = () => {
  const [errors, setErrors] = useState(null);

  const isErrors = (data) => {
    const tempErrors = {};
    for (let item in data) {
      if (item == 'shopsUrl') continue;

      const error = Boolean(data[item]);
      tempErrors[item] = error;
    }
    setErrors(tempErrors);
    const disabled = Object.values(tempErrors).every((item) => Boolean(item));

    return disabled;
  };

  const getError = () => {
    return errors;
  };

  const cleanError = () => {
    setErrors(null);
  };

  return { getError, cleanError, isErrors };
};

export default useErrors;
