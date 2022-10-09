import { render } from "@testing-library/react";
import React, { Component } from "react";
import './add.scss'

export default class Add extends Component{

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      owner: '',
      deadline: '',
    }
    this.setTitle = this.setTitle.bind(this)
    this.setOwner = this.setOwner.bind(this)
    this.setDeadline = this.setDeadline.bind(this)
    this.setTodo = this.setTodo.bind(this)
  }

  setTodo (event) {
    // perzakruska bulmaydi button bosilganda
    event.preventDefault()
    const {title, owner, deadline} = this.state
    this.setState({
      title:'',
      owner:'',
      deadline:''
    })
    this.props.newTodo({title, owner, deadline,status:false})
  }
  setTitle(event){
    this.setState({title: event.target.value})
  }
  setOwner(event){
    this.setState({owner: event.target.value})
  }
  setDeadline(event){
    this.setState({deadline: event.target.value})
  }

 render(){
  return(
    <form className="add" onSubmit={this.setTodo}>
  
      <div className="add__input">
        <input
        onInput={this.setTitle} 
        value={this.state.title}
        type="text" 
        placeholder="Topshiriq sarlavhasi" />
      </div>
      <div className="add__input">
        <input 
        onInput={this.setOwner} 
        value={this.state.owner}
        type="text" 
        placeholder="Mas'ul xodim" />

      </div>

      <div className="add__input">
        <input
        // onChange datalarda kuproq iwlatiladi
        onChange={this.setDeadline}
        value={this.state.deadline}
        type="date" />
      </div>

      <div className="add__input">
        <button className="btn btn-success">Kirish</button>
      </div>
    </form>
  )
 }
}