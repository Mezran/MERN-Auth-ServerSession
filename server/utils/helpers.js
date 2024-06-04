export const sessionizeUser = (user) => {
  return { username: user.username, email: user.email };
};
