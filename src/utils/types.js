export const createTypes = (prefix, ...args) => args.reduce((types, type) => {
  [].concat(type).map((v) => types[v] = prefix + v);
  return types;
}, {});

export const async = (type) => [type, `${type}_PENDING`, `${type}_SUCCESS`, `${type}_ERROR`];