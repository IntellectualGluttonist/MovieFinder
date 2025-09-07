import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar flex flex-column place-content-between p-[15px] bg-black text-push-purple">
      <div className="navbar-brand">
        <Link to="/">
          <button className="navbtn rounded-[5px] p-[5px] hover:bg-push-purple hover:text-black cursor-pointer">
            Movie App
          </button>
        </Link>
      </div>
      <div className="navbar-links flex gap-[35px]">
        <Link to="/" className="nav-link">
          <button className="navbtn rounded-[5px] p-[5px] hover:bg-push-purple hover:text-black cursor-pointer">
            Home
          </button>
        </Link>

        <Link to="/favorites" className="nav-link">
          <button className="navbtn rounded-[5px] p-[5px] hover:bg-push-purple hover:text-black cursor-pointer">
            Favorites
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
