import VideoCard from "@components/category_video/VideoCard";
import PropTypes from "prop-types";
import axios from "axios";
import React, { useEffect, useState } from "react";

function CategorySugestions({ arrCatId, vidName }) {
  const [video, setVideo] = useState([]);

  async function getVideo(ids) {
    const results = [];

    await Promise.all(
      ids.map(async (catId) => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_PORT_BACKEND}/videos/categories/${catId}`
          );
          results.push(...response.data);
        } catch (error) {
          console.error(error);
        }
      })
    );
    const uniqueArr = results.reduce((acc, current) => {
      const x = acc.find((item) => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      }
      return acc;
    }, []);

    const shuffledArray = uniqueArr.sort(() => 0.5 - Math.random());
    setVideo([...shuffledArray]);
    return shuffledArray;
  }

  useEffect(() => {
    getVideo(arrCatId);
  }, [arrCatId]);

  return (
    <div className="category_sugestions">
      <div className="category_sugestions_videos">
        <p className="category_sugestions_heading">
          Reccomendations after watching {vidName}
        </p>
        <div className="category_sugestions_videos_container">
          {video.length > 0 &&
            video.map((e) => (
              <VideoCard
                key={e.id}
                id={e.id}
                url={e.url}
                title={e.title}
                description={e.description}
                display={e.display}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default CategorySugestions;

CategorySugestions.propTypes = {
  vidName: PropTypes.string.isRequired,
  arrCatId: PropTypes.arrayOf(PropTypes.number).isRequired,
};
