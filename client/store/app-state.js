import {observable, autorun, computed, action} from 'mobx'

class AppState {
  constructor(){
    // this.msg = this.msg.bind(this)
  }
  @observable count = 0;
  @observable name = "tom";
  @computed get msg(){
    return `${this.name} say count is ${this.count}`
  }
  @action add(){
    this.count += 1
  }

  @action changeName = (name) => {
    this.name = name
  }
}

const appState = new AppState()


export default appState
