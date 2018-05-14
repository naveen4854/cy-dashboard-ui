import React from 'react'

export const Header = (props) => {
  return (
    <header className="main-header">
      <nav className="navbar navbar-bg navbar-fixed-top navbar-fixed-top-lunset">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
              aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
           
          </div>
          <div id="navbar" className="navbar-collapse collapse" aria-expanded="false">
            <ul className={props.l.isRtl ? "nav navbar-nav navbar-left" : "nav navbar-nav navbar-right"}>
              <li>
                <a>Logged in as {props.user ? props.user.userName : ''}</a>
              </li>
              <li>
                <a className="pointer" onClick={props.userLogout}>Log out</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

  );
}




export default Header

