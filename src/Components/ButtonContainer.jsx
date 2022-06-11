function ButtonContainer() {
  return (
    <>
      <div className="button-container w-full bg-secondary">
        <button className="btn btn-primary">Add New Song</button>
        {/* <label htmlFor="addSongModal" className="btn modal-button">
          Add New Song
        </label>
        <input type="checkbox" id="addSongModal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="addSongModal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">
              Congratulations random Interner user!
            </h3>
            <p className="py-4">
              You've been selected for a chance to get one year of subscription
              to use Wikipedia for free!
            </p>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default ButtonContainer;
