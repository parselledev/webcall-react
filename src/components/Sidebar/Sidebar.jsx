import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Sidebar.sass';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faBars,
	faPhoneSquareAlt,
  faAddressBook,
  faCog
} from '@fortawesome/free-solid-svg-icons';

class Sidebar extends Component {

	state = {
		visible: false
	};

	handleNavToggle = () => {
		this.setState({visible: !this.state.visible});
	}

	render() {

		const navLinks = [
			{
				to: "/",
				icon: faAddressBook,
				title: "Contacts",
				exact: true
			},
			{
				to: "/calls",
				icon: faPhoneSquareAlt,
				title: "Calls",
				exact: true
			},
			{
				to: "/settings",
				icon: faCog,
				title: "Settings",
				exact: true
			}
		];

		return(
			<div className="app__sidebar">

				<FontAwesomeIcon
					icon={faBars}
					className="sidebar__navBtn"
					onClick={this.handleNavToggle}/>
	
				<nav className={`sidebar__nav ${this.state.visible ? 'visible' : ''}`}>
					{
						navLinks.map((link, index)=> {
							return(
								<NavLink
									key={index}
									to={link.to}
									className="nav__link"
									activeClassName="is-active"
									exact={link.exact}
									onClick={this.handleNavToggle}>
									<FontAwesomeIcon icon={link.icon} className="nav__icon"/>
									{link.title}
								</NavLink>
							);
						})
					}
				</nav>
			</div>
		);
	}
}

export default Sidebar;