import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVideoContent } from '../models/video-content.interface'; 
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

const options = {
  params: {
    include_adult: 'false',
    include_video: 'true',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTAzNjEyMGNhMDg1ZDJlNWY4YzQ3NWM5ZmE5ZmJlMyIsInN1YiI6IjY2NGEwMzZjZTM0ZjYyMDMyYTU0NDhkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eamYwb4n8G7V6UolZVWdfsh7EZYyv_cU9Lb4KnT6MWg'
  }
}
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  http = inject(HttpClient);

  private genreMapping: { [key: string]: number } = {
    'Action': 28,
    'Adventure': 12,
    'Animation': 16,
    'Comedy': 35,
    'Crime': 80,
    'Documentary': 99,
    'Drama': 18,
    'Family': 10751,
    'Fantasy': 14,
    'History': 36,
    'Horror': 27,
    'Music': 10402,
    'Mystery': 9648,
    'Romance': 10749,
    'Fiction': 878,
    'TV Movie': 10770,
    'Thriller': 53,
    'War': 10752,
    'Western': 37
  };

  baseurl = "https://api.themoviedb.org/3";
  // apikey = "08cc33bd5ae3a747598ce2ad84376e66";
  // apikey= "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTAzNjEyMGNhMDg1ZDJlNWY4YzQ3NWM5ZmE5ZmJlMyIsInN1YiI6IjY2NGEwMzZjZTM0ZjYyMDMyYTU0NDhkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eamYwb4n8G7V6UolZVWdfsh7EZYyv_cU9Lb4KnT6MWg";
  key="85036120ca085d2e5f8c475c9fa9fbe3"

  getMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', options)
  }

  getTvShows() {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/tv', options)
  }

  getRatedMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies', options)
  }

  getBannerImage(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/images`, options)
  }

  getBannerVideo(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
  }

  getBannerDetail(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`, options);
  }

  getNowPlayingMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/now_playing', options)
  }

  getPopularMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/popular', options)
  }

  getTopRated() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/top_rated', options)
  }

  getUpcomingMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/upcoming', options)
    
  }

  getSearchMovie(data: any): Observable<any> {
    console.log(data, 'movie#');

    return this.http.get(`${this.baseurl}/search/movie?api_key=${this.key}&query=${data.movieName}`);
  }



  searchMovies(query: string): Observable<any> {
    const genreId = this.getGenreId(query);

    if (genreId !== null) {
      return this.searchMoviesByGenreId(genreId);
    } else {
      return this.searchMoviesByName(query);
    }
  }

  private getGenreId(query: string): number | null {
    const queryLower = query.toLowerCase();
    for (const [genreName, genreId] of Object.entries(this.genreMapping)) {
      if (genreName.toLowerCase() === queryLower) {
        return genreId;
      }
    }
    return null;
  }

  private searchMoviesByGenreId(genreId: number): Observable<any> {
    const url = `${this.baseurl}/discover/movie`;
    const params = {
      api_key: this.key,
      with_genres: genreId.toString()
    };
    return this.http.get(url, { params });
  }

  private searchMoviesByName(name: string): Observable<any> {
    const url = `${this.baseurl}/search/movie`;
    const params = {
      api_key: this.key,
      query: name
    };
    return this.http.get(url, { params });
  }


  













  getAllContent() {
    return forkJoin({
      movies: this.getMovies(),
      tvShows: this.getTvShows(),
      ratedMovies: this.getRatedMovies(),
      nowPlayingMovies: this.getNowPlayingMovies(),
      popularMovies: this.getPopularMovies(),
      topRatedMovies: this.getTopRated(),
      upcomingMovies: this.getUpcomingMovies()
    });

// // getMovieVideo
  // getMovieVideo(data: any): Observable<any> {
  //   return this.http.get(`${this.baseurl}/movie/${data}/videos?api_key=${this.apikey}`)
  // }

  // // getMovieCast
  // getMovieCast(data: any): Observable<any> {
  //   return this.http.get(`${this.baseurl}/movie/${data}/credits?api_key=${this.apikey}`)
  // }

  }
}
