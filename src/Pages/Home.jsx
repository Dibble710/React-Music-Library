import Table from "../Components/SongCard";
import Loader from "../Components/Loader";
import axios from "axios";

import { useState, useEffect } from "react";
import CreateSongForm from "../Components/CreateSongForm";
import UpdateSongForm from "../Components/UpdateSongForm";

function Home() {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [currentTheme, setCurrentTheme] = useState("business");
  const [showAddNewSongModal, setShowAddNewSongModal] = useState(false);

  const [showUpdateSongModal, setShowUpdateSongModal] = useState(false);
  const [songCurrentlyBeingUpdated, setSongCurrentlyBeingUpdated] =
    useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Check scroll poition to add styles on scroll
  const handleScroll = () => {
    const position = Math.round(window.pageYOffset);
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const html = document.querySelector("html");

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  const getSongs = () => {
    const url = "https://aspnetcoremusicapi.azurewebsites.net/get-all-songs";
    axios
      .get(url)
      .then((response) => {
        setSongs(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  function deleteSong(songId) {
    const url = `https://aspnetcoremusicapi.azurewebsites.net/delete-song-by-id/${songId}`;
    axios
      .delete(url)
      .then(() => {
        getSongs();
      })
      .catch((error) => console.log(error));
  }

  function onSongCreated(createdSong) {
    if (createdSong === null) {
      return;
    }
    alert("Song has been added!");
    getSongs();
    setShowAddNewSongModal(false);
  }

  function onSongUpdated(updatedSong) {
    setSongCurrentlyBeingUpdated(null);

    if (updatedSong === null) {
      return;
    }

    let songsCopy = [...songs];

    const index = songsCopy.findIndex((songsCopySong, currentIndex) => {
      if (songsCopySong.songId === updatedSong.songId) {
        alert(`Song ${updatedSong.title} successfully updated`);
        return true;
      } else {
        return false;
      }
    });

    if (index !== -1) {
      songsCopy[index] = updatedSong;
    }
    setSongs(songsCopy);
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
          <div className="side-nav w-half">
            <label
              htmlFor="addSongModal"
              className="btn btn-primary modal-button"
            >
              Add New Song
            </label>
            <input
              onClick={() => setShowAddNewSongModal(true)}
              type="checkbox"
              id="addSongModal"
              className="modal-toggle"
            />
            <button
              onClick={() => {
                html.setAttribute(
                  "data-theme",
                  themes[Math.floor(Math.random() * themes.length)]
                );
                setCurrentTheme(html.getAttribute("data-theme"));
              }}
              className="btn btn-secondary ml-5"
            >
              Change Theme!
            </button>
            <div
              className={`${
                scrollPosition >= 80 ? "text-white" : "text-base-content"
              } text-center ml-5`}
            >
              Theme Name: <br /> {currentTheme}
            </div>
          </div>
          <Table
            songs={songs}
            showUpdateSongModal={showUpdateSongModal}
            setSongCurrentlyBeingUpdated={setSongCurrentlyBeingUpdated}
            songCurrentlyBeingUpdated={songCurrentlyBeingUpdated}
            deleteSong={deleteSong}
          />
          <CreateSongForm
            onSongCreated={onSongCreated}
            showAddNewSongModal={showAddNewSongModal}
            setShowAddNewSongModal={setShowAddNewSongModal}
          />
          {songCurrentlyBeingUpdated !== null && (
            <UpdateSongForm
              song={songCurrentlyBeingUpdated}
              setSong={setSongCurrentlyBeingUpdated}
              onSongUpdated={onSongUpdated}
              showUpdateSongModal={showUpdateSongModal}
              setShowUpdateSongModal={setShowUpdateSongModal}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Home;
