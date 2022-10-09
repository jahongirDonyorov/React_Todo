import React, { Component } from "react";
import './todo.scss'

export default class Todo extends Component{
  constructor() {
    super()
    this.state = {}
    this.changeStatus = this.changeStatus.bind(this)
    this.deletTodo = this.deletTodo.bind(this)
  }
  changeStatus(){
   this.props.changeStatus(this.props.id);
  }
  deletTodo(id){
    if(window.confirm("Qaroringiz qat'iymi?")){
      this.props.removeTodo(id)
    }
  }
  render() {

    const {title,owner,deadline,id,status} = this.props
    const btn = status ?
    (<button
       onClick={this.changeStatus}
      className="btn btn-warning">
        <i className="bi bi-x-lg"></i>
        </button>):
      (<button
       onClick={this.changeStatus}
       className="btn btn-success">
      <i className="bi bi-check-lg"></i>
      </button>)

    return(
      <div className={`todo ${this.state.status?'done':''}`}>
        <div className="todo__box">
          <div className="todo__title">{title}</div>
          <div className="todo__bottom">
            <div className="todo__owner">
            {owner}
            </div>
            <div className="todo__deadline">
            {deadline}
            </div>
          </div>
        </div>
        <div className="todo__btns">
          {btn}
          <button className="btn btn-info">
              <i className="bi bi-star"></i>
          </button>
          <button 
          onClick={()=>{this.deletTodo(id)}}
          className="btn btn-danger">
              <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    )
  }
}