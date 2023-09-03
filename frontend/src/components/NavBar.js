import { NavLink } from 'react-router-dom';

function NavBar(props) {

    return (
        <nav className="navigation">
            <NavLink className={props?.className} to={`/${props?.path}`} onClick={props?.signOut} >{props?.name}</NavLink>
        </nav>
    )
}

export default NavBar