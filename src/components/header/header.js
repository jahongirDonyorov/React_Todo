import React, { Component } from "react";
import './header.scss'

export default class Header extends Component {
  constructor(){
    super()
    this.state = {
      btnClass : 'all',
      search:''
    }
    this.changeSearch = this.changeSearch.bind(this)
  }
  handClick(val){
    this.setState({
      btnClass:val
    })
    this.props.filterStatus(val)
  }

  changeSearch(e){
    this.setState({search:e.target.value})
    this.props.filterTitle(e.target.value)
  }

  render() {
    return(
      <header className="header">
        <input 
        type="text" 
        placeholder="Izlash"
        onInput={this.changeSearch}
        value={this.state.search}
        />
        <div className="header__btns">
          <button
          onClick={()=> {this.handClick('all')}}
           className={
             `btn 
             ${this.state.btnClass === 'all' ? 'active':''}`
            }
          >Barchasi</button>
          <button 
          onClick={()=> {this.handClick('done')}}
          className={
             `btn 
             ${this.state.btnClass === 'done' ? 'active':''}`
            }>Bajarilgan</button>
          <button 
          onClick={()=> {this.handClick('waiting')}}  
          className={
             `btn 
             ${this.state.btnClass === 'waiting' ? 'active':''}`
            }>Tugatilmagan</button>
        </div>
      </header>
    )
  }
}