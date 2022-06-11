import { useState } from "react";
import Constants from "../Utilities/Constants";

function UpdateSongForm(props) {
  const initialFormData = Object.freeze({
    title: props.song.title,
    description: props.song.description,
    videoUrl: props.song.videoUrl,
  });
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const songToUpdate = {
      songId: props.song.songId,
      title: formData.title,
      description: formData.description,
      videoUrl: formData.videoUrl,
    };

    const url = Constants.API_URL_UPDATE_SONG;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songToUpdate),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
    props.onSongUpdated(songToUpdate);
  };
  return (
    <>
        <div className="modal modal-open" id="formModal">
          <div className="modal-box relative">
            <label
              onClick={() => props.setSong(null)}
              htmlFor="addSongModal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <form action="post" className="width-full px-8">
              <h1 className="mt-5 text-center">Updating {props.song.title}</h1>
              <div className="mt-5">
                <label htmlFor="Song Title">
                  Song Title
                </label>
                <input
                  required
                  onChange={handleChange}
                  value={formData.title}
                  name="title"
                  type="text"
                  placeholder="Song Title"
                  className="input input-bordered input-primary w-full"
                />
              </div>

              <div className="mt-5">
                <label htmlFor="Song Description">
                  Song Description
                </label>
                <input
                  onChange={handleChange}
                  value={formData.description}
                  name="description"
                  type="text"
                  placeholder="Song Description"
                  className="input input-bordered input-primary w-full"
                />
              </div>

              <div className="mt-5">
                <label htmlFor="Song Video URL">
                  YouTube URL
                </label>
                <input
                  onChange={handleChange}
                  value={formData.videoUrl}
                  name="videoUrl"
                  type="text"
                  placeholder="Song URL"
                  className="input input-bordered input-primary w-full"
                />
              </div>

              <button type="submit" onClick={handleSubmit} className="btn btn-block btn-primary mt-5">
                Submit
              </button>
            </form>
          </div>
        </div>
    </>
  );
}

export default UpdateSongForm;
