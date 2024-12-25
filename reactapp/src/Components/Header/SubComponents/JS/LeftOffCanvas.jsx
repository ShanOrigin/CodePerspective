import '../CSS/LeftOffCanvas.css';
import Accordian from './Accordian';

function OffCanvas() {
  // Function to close the menu when overlay is clicked
  const closeMenu = () => {
    document.getElementById('toggle').checked = false;
  };

  return (
    <>
      {/* Checkbox for controlling the off-canvas */}
      <input type="checkbox" id="toggle" className="toggle-checkbox" />

      <label className="toggle-btn" htmlFor="toggle">
        <i className="fa-brands fa-slack"></i>
      </label>

      {/* Overlay to detect outside clicks and close the menu */}
      <div className="overlay" onClick={closeMenu}></div>

      {/* Off-canvas menu content */}
      <aside className="off-canvas">
        <h2> Programming </h2>
        <Accordian closeMenu={closeMenu} />
      </aside>
    </>
  );
}

export default OffCanvas;
