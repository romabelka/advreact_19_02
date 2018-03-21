import {observable, action} from 'mobx'
import firebase from 'firebase'
import BasicStore from './basic-store'

class AuthStore extends BasicStore {
    @observable email = ''
    @observable password = ''
    @observable user = null

    @action setEmail = email => this.email = email
    @action setPassword = password => this.password = password

    signIn = () => {
        this.getStore('navigation').goTo('eventList')
    }


}

export default AuthStore