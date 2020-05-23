interface Config {
  apiUrlLogin: string;
  apiUrlUsers: string;
  apiUrlComments: string;
}

const config: Config = {
  apiUrlLogin: '/api/v1/login/',
  apiUrlUsers: '/api/v1/users/',
  apiUrlComments: '/api/v1/comments/',
};
export default config;
