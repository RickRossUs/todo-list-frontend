export const combineProviders = (providers) => {
  return ({ children }) =>
    providers.reduceRight(
      (children, Provider) => <Provider>{children}</Provider>,
      children
    );
}
