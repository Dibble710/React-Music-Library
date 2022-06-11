import Constants from "../Utilities/Constants";
import Table from "../Components/Table";
import Loader from "../Components/Loader";
import axios from "axios";

import { useState, useEffect } from "react";
import CreateSongForm from "../Components/CreateSongForm";
import UpdateSongForm from "../Components/UpdateSongForm";

function Home() {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [showAddNewSongModal, setShowAddNewSongModal] = useState(false);

  const url = Constants.API_URL_GET_ALL_SONGS;

  const getSongs = () => {
    axios
      .get(url)
      .then((response) => {
        setSongs(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  function onSongCreated(createdSong) {
    if (createdSong === null) {
      return;
    }
    alert("Post Has been added!");
    getSongs();
    setShowAddNewSongModal(false);
  }



  useEffect(() => {
    getSongs();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home" id="home">
          <Table songs={songs} />
          <CreateSongForm
            onSongCreated={onSongCreated}
            showAddNewSongModal={showAddNewSongModal}
            setShowAddNewSongModal={setShowAddNewSongModal}
          />
          {/* <UpdateSongForm
            onSongUpdated={onSongUpdated}
            showUpdateSongModal={showUpdateSongModal}
            setShowUpdateSongModal={setShowUpdateSongModal}
          /> */}
          <div className="side-nav w-half bg-secondary">
            <label htmlFor="addSongModal" className="btn modal-button">
              Add New Song
            </label>
            <input
              onClick={() => setShowAddNewSongModal(true)}
              type="checkbox"
              id="addSongModal"
              className="modal-toggle"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
