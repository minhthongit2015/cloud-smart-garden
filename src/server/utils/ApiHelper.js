
const listParams = {
  offset: 0,
  limit: 0,
  sort: '-_id',
  fields: [],
  where: {}
};

function parseListParams(opts = listParams) {
  if (opts.offset != null) {
    opts.offset = parseInt(opts.offset, 10) || 0;
  }
  if (opts.limit != null) {
    opts.limit = parseInt(opts.limit, 10) || 0;
  }
  // if (typeof opts.sort === 'string') {
  //   opts.sort = JSON.parse(opts.sort);
  // }
  const parsedOption = { ...listParams };
  Object.assign(parsedOption, opts);
  return parsedOption;
}

async function find(queryObject, opts = listParams) {
  opts = parseListParams(opts);
  return queryObject // model.find()...
    .sort(opts.sort)
    .skip(opts.offset)
    .limit(opts.limit)
    .exec();
}

async function findWithModel(model, opts = listParams) {
  opts = parseListParams(opts);
  return find(model.find(opts.where), opts);
}

async function findWithFunc(findFunc, opts = listParams) {
  opts = parseListParams(opts);
  return find(findFunc(opts.where), opts);
}

module.exports = {
  listParams,
  parseListParams,
  find,
  findWithModel,
  findWithFunc
};
