import { useState, useEffect } from "react";
import Constants from "../Utilities/Constants";

function CreateSongForm(props) {
  const initialFormData = Object.freeze({
    title: "Post X",
    description: "This is post x and it has some content",
    videoUrl: "https://www.google.com",
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

    const songToCreate = {
      songId: 0,
      title: formData.title,
      description: formData.description,
      videoUrl: formData.videoUrl,
    };

    const url = Constants.API_URL_CREATE_SONG;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songToCreate),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
    props.onSongCreated(songToCreate);
  };
  return (
    <>
      <form action="post" className="width-full px-5">
        <h1 className="mt-5">Add New Song</h1>
        <div className="mt-5">
          <label htmlFor="Song Title" className="">
            Song Title
          </label>
          <input
            onChange={handleChange}
            value={formData.title}
            name="title"
            type="text"
            placeholder="Song Title"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="Song Description" className="">
            Song Description
          </label>
          <input
            onChange={handleChange}
            value={formData.description}
            name="description"
            type="text"
            placeholder="Song Description"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="Song Video URL" className="">
            YouTube URL
          </label>
          <input
            onChange={handleChange}
            value={formData.videoUrl}
            name="videoUrl"
            type="text"
            placeholder="Song URL"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>

        <button onClick={handleSubmit} className="btn btn-primary mt-5">
          Submit
        </button>
        <button
          onClick={() => props.onSongCreated(null)}
          className="btn btn-secondary mx-5"
        >
          Cancel
        </button>
      </form>
    </>
  );
}

export default CreateSongForm;
