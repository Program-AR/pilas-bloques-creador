import request from "request-promise";

const baseUrl = "http://localhost:9001/api";

class Api {
	
  me() {
		return this.get("/me");
	}

  levels() {
    
    return this.get("/level");
  }

  level(id) {
    return this.get(`/level/${id}`);
  }

  logout() {
    return this.post("/logout");
  }

  deleteLevel({ _id }) {
    return this.delete(`/level/${_id}`);
  }

  save(level) {
    return this.post("/level", level);
  }

  comment({ _id }, text) {
    return this.post(`/publishedLevels/${_id}/comments`, { text });
  }

  downloadLevel({ _id }) {
    return this.post(`/stats/downloads/${_id}`);
  }

  publish(publishedLevel) {
    return this.post("/publishedLevels", publishedLevel);
  }

  rateLevel({_id},rate) {
    return this.post(`/stats/rates/${_id}`, {rate});
  }

  depublish({ _id }) {
    return this.delete(`/publishedLevels/${_id}`);
  }

  publishedLevels() {
    return this.get("/publishedLevels");
  }

  delete(resource, body) {
    return this._request("DELETE", resource, body);
  }

  post(resource, body) {
    return this._request("POST", resource, body);
  }

  get(resource) {
    return this._request("GET", resource)
  }

  _request(method, resource, body) {
    return request({ 
      method,
      url: `${baseUrl}${resource}`,
      json: true,
      jar: true,
      body
    }).promise()
  }
}

export default new Api()
