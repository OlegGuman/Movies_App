export default class MoviesService {
  _apiBase = 'https://api.themoviedb.org/3/'
  _apiKey = '098a3f36e4fa66057828f78ad41efa04'

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}?api_key=${this._apiKey}&query=1&page=1`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`)
    }
    return await res.json()
  }

  async getMovies() {
    const res = await this.getResource('search/movie')
    return res.results
  }
}
