import React from 'react';
import {useGlobalContext} from "../store/movie_context.jsx";

const Stories = () => {

    const {hits} = useGlobalContext();
    console.log(hits)

    return (
        <div>
            {
                hits.map((curPost) => {
                    const { title, author,  objectID, url, num_comments } = curPost;
                    return (
                        <div className="card"   key={objectID}>
                        <h2>{title}</h2>
                            <p> By <span> {author}  </span> | {num_comments} comments </p>
                        </div>

                    )
                })
            }
        </div>
    );
};

export default Stories;