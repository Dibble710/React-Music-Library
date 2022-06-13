function Table({ songs, setSongCurrentlyBeingUpdated, deleteSong }) {
  return (
    <>
      <div className="overflow-x-auto flex table-container">
        <table id="table" className="table">
          {/* head */}
          <thead>
            <tr>
              <th />
              <th>Song Title</th>
              <th>Description</th>
              <th>Video URL</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.songId}>
                <th>{song.songId}</th>
                <td>{song.title}</td>
                <td>{song.description}</td>
                <td>
                  <a href={song.videoUrl} target="_blank" rel="noreferrer">
                    Youtube Link
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you would like to delete ${song.title}?`
                        )
                      )
                        deleteSong(song.songId);
                    }}
                    className="btn btn-primary"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => setSongCurrentlyBeingUpdated(song)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
