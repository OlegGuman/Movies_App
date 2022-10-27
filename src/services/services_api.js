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

  async getGenres() {
    const res = await fetch(`${this._apiBase}genre/movie/list?api_key=${this._apiKey}${this._language}`)
    return await res.json()
  }

  async getGuestSession() {
    const res = await fetch(`${this._apiBase}authentication/guest_session/new?api_key=${this._apiKey}`)
    return await res.json()
  }

  async rateMovie(movieId, rating, guestSession) {
    const res = await fetch(
      `${this._apiBase}movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${guestSession}`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ value: rating }),
      }
    )

    return res
  }

  async getMovies(page, query) {
    const res = await this.getResource('search/movie', page, query)
    return await res
  }

  async getRated(session) {
    const res = await fetch(
      `${this._apiBase}guest_session/${session}/rated/movies?api_key=${this._apiKey}${this._language}&sort_by=created_at.asc`
    )
    return await res.json()
  }
}

//res.results: [Array]
//res.total_pages: 293
//res.total_results: 5846
//https://api.themoviedb.org/3/authentication/guest_session/new?api_key=<<api_key>> создание гостевой сессии
//https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US  официальный список всех жанров
//https://developers.themoviedb.org/3/movies/rate-movie пост запрос для постановке рейтинга
//https://developers.themoviedb.org/3/guest-sessions/get-guest-session-rated-movies получение оценённых фильмов
