import React, { useEffect } from "react";
import "../index.css"; // Import custom CSS

const Flipbook = () => {
  useEffect(() => {
    // Ensure jQuery & Turn.js are available
    if (window.$ && window.$(".flipbook").turn) {
      window.$(".flipbook").turn({
        width: 800,
        height: 500,
        autoCenter: true,
        elevation: 50,
        gradients: true,
        duration: 1000, // Smooth page flip
      });
    }
  }, []);

  return (
    <div className="flipbook-container">
      <div className="flipbook">
        {/* Cover Page */}
        <div className="hard cover">
          <h1>My Pokemon Gallery</h1>
          <small>~ HankTheTank</small>
        </div>
        <div className="hard"></div>

        {/* Pages */}
        <div className="page">
          <p>Let’s Look At Some Amazing Pokemon ❤️</p>
          <p>Gotta Catch 'Em All</p>
        </div>
        {["img-1.png", "img-2.png", "img-3.png", "img-4.png", "img-5.png"].map(
          (img, index) => (
            <div className="page" key={index}>
              <img src={`/images/${img}`} alt={`Pokemon-${index + 1}`} />
              <small>
                {["Charmander", "Arbok", "Pikachu", "Mew", "Darkrai"][index]}
              </small>
            </div>
          )
        )}

        {/* Back Cover */}
        <div className="hard"></div>
        <div className="hard cover">
          <h2>Thank You</h2>
          <small>~ HankTheTank</small>
        </div>
      </div>
    </div>
  );
};

export default Flipbook;
