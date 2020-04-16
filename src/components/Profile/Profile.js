import React from 'react';
import './Profile.css';

export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.user.name,
            age: this.props.user.age,
            pet: this.props.user.pet,
            success: false
        }
    }
    
    onFormChange = (event) => {
        switch(event.target.name) {
            case 'name': 
            this.setState({name: event.target.value})
            break;
            case 'age': 
            this.setState({age: event.target.value})
            break;
            case 'pet': 
            this.setState({pet: event.target.value})
            break;
            default:
                return;
            }
        }
        


        onProfileUpdate = (event) => {

        const abortController = new AbortController();//to clear up after timeouts and fetch
        const signal = abortController.signal;
        const id = this.props.user.id;
        const url = `http://localhost:3000/profile/${id}`;
        const data = {
            name: this.state.name,
            age: this.state.age,
            pet: this.state.pet
        };
        
        fetch(url,  {
            signal: signal,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }).then(resp => {
            if(resp.status === 200 || resp.status === 304){
                this.setState(prevState => ({success: !prevState.success}))
                //Below - loads user from props and then overWrites them with new data
            this.props.loadUser({...this.props.user, ...data})
            setTimeout(() => {
                this.setState(prevState => ({success: !prevState.success}))
            }, 5000) && clearTimeout();
            }
        }).catch(err => console.log(err));
        // ! causing a memory ;leak
        // setTimeout(() => {
        //     abortController.abort();
           
        // }, 5000)&& clearTimeout();
    }

    render(){
        const {user, toggleModal} = this.props;
        return (
            <div className="profile-modal">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
            <div className="mt4" style={{display: 'flex', justifyContent: 'flex start'}}>
            <img src="http://tachyons.io/img/logo.jpg" className="h3 w3 dib" alt="avatar"/>
            {this.state.success && 
            <h4 className="ml4" style={{color: 'green'}}>Profile update success!!!</h4>
            }
            </div>
            <h1>{this.state.name}</h1>
            <h1>{`Images submitted:${user.entries} `}</h1>
            <h4>{`Member Since: ${new Date(user.joined).toLocaleDateString()}`}</h4>
            <hr/>   
                <label htmlFor="user-name" className="mt2 fw6">Name:</label>         
                <input
                onChange={this.onFormChange}
                  className="pa2 ba w-100"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="john"
                />
                <label htmlFor="user-name" className="mt2 fw6">Age:</label>         
                <input
                onChange={this.onFormChange}
                  className="pa2 ba w-100"
                  type="text"
                  name="age"
                  id="age"
                  placeholder="33"
                />
                <label htmlFor="user-name" className="mt2 fw6">Pet:</label>         
                <input
                onChange={this.onFormChange}
                  className="pa2 ba w-100"
                  type="text"
                  name="pet"
                  id="pet"
                  placeholder="dragon"
                />
                <div className="mt4" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <button onClick={() => this.onProfileUpdate()}className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20">Save</button>
                <button onClick={toggleModal} className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20">Cancel</button>
                </div>

        </main>
        <div className="modal-close" onClick={toggleModal}>&times;</div>
      </article>           
        </div>
        )
    }
}
