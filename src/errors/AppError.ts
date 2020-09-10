interface IError {
  message: string;
  statusCode: number;
}

const AppError = (message: string, statusCode = 400): IError => {
  return {
    message,
    statusCode,
  };
};

export default AppError;
