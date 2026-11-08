import React, { useState, useEffect } from "react";
import { API_URL } from "./config";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [animals, setAnimals] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    conservationStatus: "Least Concern",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all animals on component load
  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setAnimals(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error("Error communicating with data ledger:", err);
    }
  };

  // ADDED: This function keeps track of what the user is typing into the inputs!
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setEditingId(null);
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      setFormData({
        name: "",
        species: "",
        conservationStatus: "Least Concern",
      });
      fetchAnimals();
    } catch (err) {
      console.error("Could not save animal entry:", err);
    }
  };

  const handleEditClick = (animal) => {
    setEditingId(animal._id);
    setFormData({
      name: animal.name,
      species: animal.species,
      conservationStatus: animal.conservationStatus,
    });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchAnimals();
    } catch (err) {
      console.error("Could not purge record:", err);
    }
  };

  return (
    <div className="app-shell">
      <header className="app-navbar">
        <div className="brand">🐾 WildLife Track</div>
        <nav className="nav-tabs">
          <button
            className={
              activePage === "dashboard" ? "nav-link active" : "nav-link"
            }
            onClick={() => setActivePage("dashboard")}
          >
            Log Registry
          </button>
          <button
            className={activePage === "about" ? "nav-link active" : "nav-link"}
            onClick={() => setActivePage("about")}
          >
            System Specs
          </button>
        </nav>
      </header>

      <main className="main-viewport">
        {activePage === "dashboard" ? (
          <div className="workspace-layout">
            {/* Form Column */}
            <section className="form-pane">
              <h3>{editingId ? "Modify Record" : "Register New Species"}</h3>
              <form onSubmit={handleSubmit} className="custom-input-form">
                <label>Common Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Snow Leopard"
                  required
                />

                <label>Scientific Name</label>
                <input
                  type="text"
                  name="species"
                  value={formData.species}
                  onChange={handleInputChange}
                  placeholder="e.g., Panthera uncia"
                  required
                />

                <label>Conservation Status</label>
                <select
                  name="conservationStatus"
                  value={formData.conservationStatus}
                  onChange={handleInputChange}
                >
                  <option value="Least Concern">Least Concern</option>
                  <option value="Vulnerable">Vulnerable</option>
                  <option value="Endangered">Endangered</option>
                  <option value="Critically Endangered">
                    Critically Endangered
                  </option>
                </select>

                <button type="submit" className="action-btn save">
                  {editingId ? "Apply Update" : "Commit Entry"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="action-btn cancel"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        name: "",
                        species: "",
                        conservationStatus: "Least Concern",
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </section>

            {/* List Column */}
            <section className="list-pane">
              <h2>Tracked Species Database</h2>
              <div className="scrollable-list">
                {animals.length === 0 ? (
                  <p className="empty-notice">
                    No animal records currently tracked.
                  </p>
                ) : (
                  animals.map((animal) => (
                    <div className="animal-record-card" key={animal._id}>
                      <div className="record-details">
                        <h4>{animal.name}</h4>
                        <p className="species-tag">{animal.species}</p>
                        <span
                          className={`status-pill ${animal.conservationStatus.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {animal.conservationStatus}
                        </span>
                        <span className="timestamp">
                          Log Date:{" "}
                          {animal.created_at
                            ? new Date(animal.created_at).toLocaleString()
                            : "New Entry"}
                        </span>
                      </div>
                      <div className="record-actions">
                        <button
                          className="ctrl-btn edit"
                          onClick={() => handleEditClick(animal)}
                        >
                          Edit
                        </button>
                        <button
                          className="ctrl-btn delete"
                          onClick={() => handleDelete(animal._id)}
                        >
                          Purge
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        ) : (
          <div className="about-viewport">
            <h2>Ecology Manifest Page</h2>
            <p>
              This tracking index handles specialized wildlife inventories using
              full-stack data mutations.
            </p>
            <div className="spec-card">
              <h4>System Pipeline Attributes</h4>
              <ul>
                <li>
                  <strong>Dynamic Frontend Architecture:</strong> Built using
                  React isolated state patterns.
                </li>
                <li>
                  <strong>RESTful API Interface:</strong> Connected directly to
                  your persistent Express collection.
                </li>
                <li>
                  <strong>Custom Aesthetic Styles:</strong> Designed using
                  tailored earthy layouts unique to global conservation data.
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
