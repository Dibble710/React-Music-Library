import Constants from '../Utilities/Constants'
import Table from "../Components/Table";
import ButtonContainer from "../Components/ButtonContainer";
import Loader from "../Components/Loader";
import axios from 'axios'

import { useState, useEffect } from "react";
import CreateSongForm from '../Components/CreateSongForm';

function Home() {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [showingCreateNewSongForm, setShowingCreateNewSongForm] = useState(false);

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
  }

  function onSongCreated(createdSong) {
    setShowingCreateNewSongForm(false);
    if (createdSong === null) {
      return; 
    }
    alert('Post Has been added!')
    getSongs();
  }

  useEffect(() => {
    getSongs()
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home" id="home">
          <Table songs={songs} />
          {/* <ButtonContainer /> */}
          {showingCreateNewSongForm && <CreateSongForm onSongCreated={onSongCreated} />}
          <button onClick={() => setShowingCreateNewSongForm(true)} className="btn btn-primary">Add New Song</button>
        </div>
      )}
    </>
  );
}

export default Home;
