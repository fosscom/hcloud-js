const snakeCase = require('snake-case')
const FloatingIP = require('./floatingIP')
const FloatingIPList = require('./floatingIPList')
const FloatingIPBuilder = require('./floatingIPBuilder')

class FloatingIPsEndpoint {
  constructor (client) {
    this.client = client
  }

  list (params) {
    let snakeCaseParams = {}
    if (params) {
      Object.keys(params).forEach(key => {
        snakeCaseParams[snakeCase(key)] = params[key]
      })
    }

    return this.client.axios({
      url: '/floating_ips',
      method: 'GET',
      params: snakeCaseParams
    }).then(response => {
      // Make new FloatingIP objects
      let floatingIPs = []
      response.data['floating_ips'].forEach(floatingIP => {
        floatingIPs.push(new FloatingIP(this, floatingIP))
      })

      // Return a list
      return new FloatingIPList(this, floatingIPs, response.data.meta)
    })
  }

  get (id) {
    return this.client.axios({
      url: '/floating_ips/' + id,
      method: 'GET'
    }).then(response => {
      // Return new FloatingIP instance
      return new FloatingIP(this, response.data.datacenter)
    })
  }

  build (type) {
    return new FloatingIPBuilder(this, type)
  }

  changeDescription (id, description) {
    return this.client.axios({
      url: '/floating_ips/' + id,
      method: 'PUT',
      data: {
        description
      }
    }).then(response => {
      // Return new FloatingIP instance
      return new FloatingIP(this, response.data.datacenter)
    })
  }

  delete (id) {
    return this.client.axios({
      url: '/floating_ips/' + id,
      method: 'DELETE'
    }).then(() => null)
  }
}

module.exports = FloatingIPsEndpoint