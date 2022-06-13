function SongCard({ songs, setSongCurrentlyBeingUpdated, deleteSong }) {
  return (
    <>
      <div className="grid song-card-container lg:grid-cols-3 lg:gap-3 md:gap-2">
        {songs.map((song) => (
          <div
            className="card w-96 song-card bg-primary text-primary-content mt-5"
            key={song.songId}
          >
            {song.videoUrl.includes("youtube.com/embed") ? (
              <iframe
                width={400}
                height={200}
                src={`${song.videoUrl}?showinfo=0&controls=0&autohide=1`}
                title={song.title}
                frameBorder={0}
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
                  className="btn btn-secondary"
                >
                  Edit Song
                </button>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you would like to delete ${song.title}?`
                      )
                    ) {
                      deleteSong(song.songId);
                    alert(`${song.title} has been deleted!`);
                    }
                  }}
                  className="btn btn-secondary"
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

export default SongCard;
