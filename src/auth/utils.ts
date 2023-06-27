export const setAuthCookies = ({ payload, response, jwt, isLogin }) => {
  let options = {
    accessOptions: {},
    refreshOptions: {},
  };

  if (isLogin) {
    options = {
      accessOptions: {
        expiresIn: '10m',
      },
      refreshOptions: {
        expiresIn: '1d',
      },
    };
  }

  const accessToken = jwt.sign(payload, options.accessOptions);

  const refreshToken = jwt.sign(payload, options.refreshOptions);

  response.cookie('access-token', accessToken, {
    httpOnly: true,
    secure: false,
    expires: new Date(new Date(Date.now() + 24 * 60 * 1000)),
  });
  response.cookie('refresh-token', refreshToken, {
    httpOnly: true,
    secure: false,
    expires: new Date(new Date(Date.now() + 24 * 60 * 1000)),
  });
};
