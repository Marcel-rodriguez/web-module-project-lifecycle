import axios from 'axios';
import React from 'react';
import './index.css'

class App extends React.Component {
  state ={
    currentUser: 'Marcel-rodriguez',
    followerList: [],
    avatar: '',
    username: '',
    repos: '',
    followers: '',
    following: '',
  }

  componentDidMount(){
    axios.get(`https://api.github.com/users/${this.state.currentUser}`)
    .then(resp => {
      console.log(resp.data)
      this.setState({
        ...this.state,
        currentUser: resp.data.avatar_url,
        avatar: resp.data.avatar_url,
        username: resp.data.login,
        followers: resp.data.followers,
        following: resp.data.following,
        repos: resp.data.public_repos,
      })
    })
    .catch(err => {
      console.error(err)
    })

    axios.get(`https://api.github.com/users/${this.state.currentUser}/followers`)
    .then(resp => {
      console.log(resp.data)
      this.setState({
        ...this.state,
        followerList: resp.data
      })
    })
    .catch(err => {
      console.error(err)
    })
  }

  render() {
    console.log('User Image: ', this.state.currentUser)
    console.log('Follower List: ', this.state.followerList)
    return(<div>
      <div className='search-bar'>
      <h1>Github Info</h1>
      <form>
      <input />
      <button>Search</button>
      </form>
      </div>
      <div className='main-info'>
        <img src={this.state.avatar} alt={this.state.avatar}/>
        <span className='main-info-data'>
        <h2>{this.state.username}</h2>
        <p>Repos: {this.state.repos}</p>
        <p>Following: {this.state.following}</p>
        <p>Followers: {this.state.followers}</p>
        </span>
      </div>
      <hr />
      <div className='bottom'>
        <h2>Followers</h2>
        <div className='card-area'>
          {
            this.state.followerList.map(follower => {
              return <div>
                <img src={follower.avatar_url} alt={follower.id}/>
                <h3>{follower.login}</h3>
              </div>
            })
          }
        </div>
      </div>
    </div>);
  }
}

export default App;
