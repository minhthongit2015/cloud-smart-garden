
const listParams = {
  offset: 0,
  limit: null,
  sort: null,
  fields: null,
  where: null
};

function parseListParams(opts) {
  if (typeof opts.sort === 'string') {
    opts.sort = JSON.parse(opts.sort);
  }

  Object.assign({
    limit: 0, offset: 0, sort: [], fields: undefined
  }, opts);
  return opts;
}

module.exports = {
  listParams,
  parseListParams
};
