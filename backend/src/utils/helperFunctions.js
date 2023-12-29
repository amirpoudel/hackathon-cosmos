function getLimitAndOffset(req) {
    let page, limit, offset;
  
    // if page and limit not set then defualt is 1 and 20 .
    page = req.query?.page || 1;
  
    limit = req.query?.limit < 20 ? req.query?.limit : 20 || 20;
    // if page and limit present in query then delete it
    if (req.query?.page) delete req.query.page;
  
    if (req.query?.limit) delete req.query.limit;
  
    offset = (page - 1) * limit;
    return [Number(limit), Number(offset)];
  }


module.exports = {
    getLimitAndOffset
}