import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

import Logo from '../Logo/Logo';
import './ProfileIcon.css';

export default class ProfileIcon extends Component {
    constructor(props){
        super(props);
        this.state = {
            dropDownOpen: false,
        }
    }

    toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }
    
    
    render() {
        return (
    <div className="pa4 tc">
    <Dropdown direction='left' isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
          >
        <Logo/>
        </DropdownToggle>
        <DropdownMenu
        
        className="b--transparent shadow-5 pa4"
        style={{ marginTop: '20px', backgroundColor: 'rgb(255, 255, 255, 0.5)'}}>
          <DropdownItem onClick={() => this.props.toggleModal()} className="" style={{}}>View Profile</DropdownItem>
          <DropdownItem onClick={() => this.props.onRouteChange('signout')} className="">Sign out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    
    </div>
        )
    }
}
