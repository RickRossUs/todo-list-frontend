import React from 'react';

export const combineProviders = (providers: React.ComponentType<{ children: React.ReactNode }>[]): React.FC<{ children: React.ReactNode }> => {
  return ({ children }) =>
    providers.reduceRight(
      (children, Provider) => <Provider>{children}</Provider>,
      children
    );
};
