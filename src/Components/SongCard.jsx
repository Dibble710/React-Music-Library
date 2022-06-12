import axios from "axios";
import Constants from "../Utilities/Constants";

function Table({ songs, setSongCurrentlyBeingUpdated, deleteSong }) {
  return (
    <>
      <div className="grid grid-cols-3 gap-3 song-card-container">
        {songs.map((song) => (
          <div
            className="card w-96 song-card bg-secondary shadow-xl mt-5"
            key={song.songId}
          >
            {song.videoUrl.includes("youtube.com/embed") ? (
              <iframe
                width={400}
                height={200}
                src={`${song.videoUrl}`}
                title={song.title}
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="empty-video-container">
                <h3>Please use a proper YouTube embed URL</h3>
              </div>
            )}
            <div className="card-body">
              <h2 className="card-title">{song.title}</h2>
              <p>{song.description}</p>
              <div className="card-actions justify-start">
                <button
                  onClick={() => setSongCurrentlyBeingUpdated(song)}
                  className="btn btn-primary"
                >
                  Edit Song
                </button>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you would like to delete ${song.title}?`
                      )
                    )
                      deleteSong(song.songId);
                    alert(`${song.title} has been deleted!`);
                  }}
                  className="btn btn-primary"
                >
                  Delete Song
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Table;
