import React, { Component } from "react";
import Todo from "../todo";
import'./list.scss'

export default class List extends Component{

  constructor(props) {
    super(props)
    this.removeTodo = this.removeTodo.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
  }

  changeStatus(id){
    this.props.changeStatus(id)
  }

  removeTodo(id){
    this.props.delTodo(id)
  }
  render() {
    const {status, search} = this.props
    let filteredTodos = this.props.todos.filter(todo => {
     if(status === 'done' && todo.status){
       return todo
     }else if (status === 'waiting' && !todo.status){
       return todo 
     }else if (status === 'all'){
       return todo
     }
     return false
    })
    //                                                owner qilsak ownerrga qaram filter qiladi
    filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().indexOf(search.toLowerCase())
    !== -1)

    const list = filteredTodos.map(todo => 
    <Todo 
      key={todo.id}
      {...todo}
      removeTodo={(id)=>{this.removeTodo(id)}}
      changeStatus={(id)=>{this.changeStatus(id)}}
    />)

    return(
      <div className="list">
        {list}
      </div>
    )
  }
}