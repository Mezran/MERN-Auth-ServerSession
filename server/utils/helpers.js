export const parseError = (err) => {
  if (err.isJoi) return err.details[0];
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
};
export const sessionizeUser = (user) => {
  return { username: user.username, email: user.email };
};
