const Pagination = require('../pagination')

class ImageList extends Pagination {
  constructor (endpoint, images, meta) {
    super(meta)
    this.endpoint = endpoint
    this.images = images
  }

  next () {
    if (!this.nextPage) {
      return Promise.reject(new Error('Next page is not available'))
    }

    return this.endpoint.list({
      page: this.nextPage,
      perPage: this.perPage
    })
  }

  previous () {
    if (!this.previousPage) {
      return Promise.reject(new Error('Previous page is not available'))
    }

    return this.endpoint.list({
      page: this.previousPage,
      perPage: this.perPage
    })
  }

  last () {
    if (!this.lastPage) {
      return Promise.reject(new Error('Last page is not available'))
    }

    return this.endpoint.list({
      page: this.lastPage,
      perPage: this.perPage
    })
  }
}

module.exports = ImageList