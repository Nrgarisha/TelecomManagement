import './Header.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      <header className="header">
      <div className="section__container header__container" id="home">
        <div className="header__form">
            <h1>"A satisfied customer is the best business strategy of all"</h1>
            <p style={{color: '#f13033', marginLeft: '3.5rem'}}>- Michael LeBoeuf</p>
            <Button variant="danger" className='center'><Link to='/CustomerPlan'>Login!</Link></Button>
        </div>
      </div>
    </header>
    </div>
  )
}

export default Header