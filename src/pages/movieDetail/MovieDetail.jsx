import "./MovieDetail.css"
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const MovieDetail = () => {

  const[detail, setDetail]=useState();
  const {id} = useParams();

  useEffect(()=>{
    getData();
    window.scrollTo(0, 0);
  },[]);

  const getData=()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
    .then(res => res.json())
    .then(data => setDetail(data))
  }

  return (
    <div className='movie'>
      <div className="movie__intro">
        <img className='movie__backdrop' src={`https://image.tmdb.org/t/p/original${detail ? detail.backdrop_path : ""}`}  />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${detail ? detail.poster_path : ""}`}  />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
                        <div className="movie__name">{detail ? detail.original_title : ""}</div>
                        <div className="movie__tagline">{detail ? detail.tagline : ""}</div>
                        <div className="movie__rating">
                            {detail ? detail.vote_average.toFixed(1): ""} <i class ="fas fa-star" />
                            <span className="movie__voteCount">{detail ? "(" + detail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{detail ? detail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{detail ? "Release date: " + detail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                detail && detail.genres
                                ? 
                                detail.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{detail ? detail.overview : ""}</div>
                    </div>
        </div>
      </div>
      <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    detail && detail.homepage && <a href={detail.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    detail && detail.imdb_id && <a href={"https://www.imdb.com/title/" + detail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    detail && detail.production_companies && detail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
      
    </div>
  )
}

export default MovieDetail
