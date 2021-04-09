import { login, logout } from '../../services/firebase';

const Header = (props) => (
    <header>
       <a href="https://imgur.com/6HEpcDl"><img src="https://i.imgur.com/6HEpcDl.png" title="source: imgur.com" /></a>
        <ul>
            {
                props.user ?
                <>
                    <li>Welcome, {props.user.displayName}</li>
                    <li><img src={props.user.photoURL} alt={props.user.displayName} /></li>
                    <li className="auth-link" onClick={logout}>Logout</li>
                </>
                :
                <li className="auth-link" onClick={login}>Login</li>
            }
        </ul>
    </header>
); 

export default Header;