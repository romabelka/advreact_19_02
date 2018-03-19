import AuthStore from './auth'
import NavigationStore from './navigation'

const stores = {}

stores.auth = new AuthStore(stores)
stores.navigation = new NavigationStore(stores)

export default stores