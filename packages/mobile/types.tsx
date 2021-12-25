/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Home: undefined;
  Auth: undefined;
  Register: undefined;
  Login: undefined;
  MyLink: {
    name: string;
  };
  NewCategory: undefined;
  NewLinkForCategory: undefined;
};

export type ParamList = {
  MyLink: {
    categoryId: string;
  };
};
