const MONGODB_CONNECTION_URL_REGEX =
  /^(mongodb:\/\/)([a-z\d]+:[a-z\d]+@)?([a-z\d.-]+)(:\d+)?(\/[a-z\d]+)?(\?[a-z\d]+=[a-z\d]+)?(&[a-z\d]+=[a-z\d]+)*$/i;

const validateMongoDBConnectionURL = (url: string): Error | null => {
  if (!url.length) {
    return new Error("The MONGODB_URL environment variable is required");
  } else if (!MONGODB_CONNECTION_URL_REGEX.test(url)) {
    return new Error("The MONGODB_URL environment variable is invalid");
  }

  return null;
};

export default validateMongoDBConnectionURL;
export { validateMongoDBConnectionURL };
