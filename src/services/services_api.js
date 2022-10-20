export default class MoviesService {
  _apiBase = 'https://api.themoviedb.org/3/'
  _apiKey = '098a3f36e4fa66057828f78ad41efa04'
  _language = '&language=ru-RU'

  async getResource(url, page, query) {
    let requestAddress = `${this._apiBase}${url}?api_key=${this._apiKey}${this._language}&page=${page}&query=${query}`

    const res = await fetch(requestAddress)

    if (!res.ok) {
      throw new Error(`Не удалось получить данные ${res.status}`)
    }
    return await res.json()
  }

  async getMovies(page, query) {
    const res = await this.getResource('search/movie', page, query)
    return await res
  }
}

//res.results: [Array]
//res.total_pages: 293
//res.total_results: 5846
//https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US  официальный список всех жанров
