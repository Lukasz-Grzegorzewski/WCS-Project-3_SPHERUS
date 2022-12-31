import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaPen } from "react-icons/fa";
import AvatarPicPrompt from "./AvatarPicPrompt";

function Avatar({
  id,
  photoSrc = "https://png.pngtree.com/png-clipart/20210129/ourlarge/pngtree-man-default-avatar-png-image_2813122.jpg",
}) {
  const [cardToggle, setCardToggle] = useState(false);
  const [url, setUrl] = useState(photoSrc);

  function handleClick() {
    setCardToggle(true);
  }

  async function handleSetUrl() {
    await setUrl(photoSrc);
  }
  useEffect(() => {
    handleSetUrl();
  }, []);

  return (
    <div className="img-profile-container">
      <img className="img-profile" src={url} alt="profile img" />
      <button
        className="btn-choose-pic"
        type="button"
        onClick={() => handleClick()}
      >
        <FaPen className="pen" />
      </button>
      {cardToggle && (
        <AvatarPicPrompt
          id={id}
          setUrl={setUrl}
          setCardToggle={setCardToggle}
        />
      )}
    </div>
  );
}

export default Avatar;

Avatar.propTypes = {
  photoSrc: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
