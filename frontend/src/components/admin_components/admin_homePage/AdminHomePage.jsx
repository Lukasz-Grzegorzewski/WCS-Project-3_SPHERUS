import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHomeAddSection from "./AdminHomeAddSection";
import AdminHomeAddPub from "./AdminHomeAddPub";
import AdminHomeCurrentComp from "./AdminHomeCurrentComp";

function AdminHomePage() {
  const [addSection, setAddSection] = useState(false);
  const [addPub, setAddPub] = useState(false);
  const [currentHome, setCurrentHome] = useState({});

  const getHome = () => {
    axios
      .get(`${import.meta.env.VITE_PORT_BACKEND}/home`)
      .then((res) => {
        setCurrentHome(res.data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getHome();
  }, []);

  return (
    <div className="adminhomepage">
      <div className="adminhomepage_admin">
        <h1>Admin your home page</h1>
        <div className="adminhomepage_admin_add">
          <h2>Add new section</h2>
          <button
            className="icon-btn add-btn"
            type="button"
            onClick={() => {
              setAddSection(!addSection);
            }}
          >
            <div className="add-icon" />
            <div className="btn-txt">Add section</div>
          </button>
          {addSection === true && (
            <div>
              <AdminHomeAddSection
                setAddPub={setAddPub}
                setAddSection={setAddSection}
                getHome={getHome}
              />
            </div>
          )}
        </div>
        <div className="adminhomepage_admin_add">
          <h2>Add new advert</h2>
          <button
            className="icon-btn add-btn"
            type="button"
            onClick={() => {
              setAddPub(!addPub);
            }}
          >
            <div className="add-icon" />
            <div className="btn-txt">Add advert</div>
          </button>
          {addPub === true && (
            <div>
              <AdminHomeAddPub
                setAddPub={setAddPub}
                setAddSection={setAddSection}
                getHome={getHome}
              />
            </div>
          )}
        </div>
      </div>
      {currentHome.length >= 1 && (
        <div className="adminhomepage_current">
          <h1>Currently in the Home Page</h1>
          {currentHome.map((infos) => {
            return (
              <div className="adminhomepage_current_comp" key={infos.id}>
                <AdminHomeCurrentComp
                  id={infos.id}
                  type={infos.type}
                  idLink={infos.idLink}
                  getHome={getHome}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdminHomePage;
