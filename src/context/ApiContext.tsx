import { createContext, ReactNode } from "react";
import { StripeApi } from "~/api/stripeApi";

const apiUrl = "/api";

export const stripeApi = new StripeApi(apiUrl);

export const ApiContext = createContext({
  stripeApi
});

type ApiProviderProps = {
  children?: ReactNode;
};

export const ApiProvider = ({ children }: ApiProviderProps) => {
  return (
    <ApiContext.Provider
      value={{
        stripeApi
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
