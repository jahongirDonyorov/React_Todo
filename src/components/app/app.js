import React, { Component } from "react";
import Add from "../add";
import Header from "../header";
import List from "../list";
import "./app.scss";
//axios paket urtatilgan fetch ni urniga osonroq variant
import axios from "axios";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      url:'http://localhost:3000/todos',
      status:'all',
      search:''
    };
    this.addTodo = this.addTodo.bind(this);
    this.delTodo = this.delTodo.bind(this);
    this.changeStatus = this.changeStatus.bind(this)
    this.setStatus = this.setStatus.bind(this)
  }

  componentDidMount(){
    //fetch ni urniga npm i axios blan axios paket urnatildi
    //axiosdan kelyotgan malumotlarni json qilish shart emas axiosni uzi back entdan kelyotgan malumotlarni json formatga utkazadi
    axios.get(this.state.url)
    .then(res => {
      if(res.status === 200){
          this.setState({  
            todos:res.data
          })
      }
    })
  }
  changeStatus(id){
    const {todos} = this.state
    let index = this.state.todos.findIndex(todo => todo.id === id)
    if ( index !== -1){
      let todo = todos[index]
        todo.status = !todo.status
        console.log(index);
        axios.put(`${this.state.url}/${id}`, todo)
        .then(res => {
          if(res.status === 200){
            let oldTodos = todos
            oldTodos[index] = res.data
            this.setState({
              todos: oldTodos
            })
          }
        })
    }
  }
  addTodo(newItem) {
    axios.post(this.state.url,newItem)
    .then(res => {
      if(res.status === 201){
        this.setState({
          todos: [...this.state.todos,res.data]
        })
      }
    })

  }
  delTodo(id) {
    // http://localhost:300/todos/2 cilick bulgan obyekt raqami tuwadi uchsin deydi
    axios.delete(`${this.state.url}/${id}`)
    .finally(()=>{
      let oldTodos = this.state.todos;
      let index = oldTodos.findIndex((todo) => todo.id === id);
      oldTodos.splice(index, 1);
      this.setState({
        todos: oldTodos,
      });
    })
  }

  setStatus(status){
    this.setState({status})
  }
  setSearch(search){
    this.setState({search})
  }

  render() {
    return (
      <div className="main">
        <Header 
          filterTitle={(val)=>{this.setSearch(val)}}
          filterStatus={(status) => {this.setStatus(status)}}
        />
        <List
         search={this.state.search}
          status={this.state.status}
          todos={this.state.todos}
          delTodo={(id) => {
            this.delTodo(id);
          }}
          changeStatus={(id)=>{this.changeStatus(id)}}
        />
        <Add
          newTodo={(obj) => {
            this.addTodo(obj);
          }}
        />
      </div>
    );
  }
}
