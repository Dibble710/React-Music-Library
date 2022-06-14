import { useState } from "react";

function CreateSongForm(props) {
  const initialFormData = Object.freeze({
    title: "Song Title",
    description: "Song Description",
    videoUrl: "https://www.youtube.com/embed/SigIbCVMTzU",
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

    const url = "https://aspnetcoremusicapi.azurewebsites.net/create-song";

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
      {props.showAddNewSongModal && (
        <div className="modal modal-open" id="formModal">
          <div className="modal-box relative">
            <label
              onClick={() => props.setShowAddNewSongModal(false)}
              htmlFor="addSongModal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <form action="post" className="width-full px-8 pb-5">
              <h1 className="mt-5 text-center">Add New Song</h1>
              <div className="mt-5">
                <label htmlFor="Song Title">Song Title</label>
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
                <label htmlFor="Song Description">Song Description</label>
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
                <label htmlFor="Song Video URL">YouTube Embed URL</label>
                <input
                  onChange={handleChange}
                  value={formData.videoUrl}
                  name="videoUrl"
                  type="text"
                  placeholder="Youtube Embed URL"
                  className="input input-bordered input-primary w-full"
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-block btn-primary mt-5"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateSongForm;
