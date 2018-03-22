import AuthStore from './auth'
import NavigationStore from './navigation'
import EventsStore from './events'
import PeopleStore from './people'

const stores = {}

stores.auth = new AuthStore(stores)
stores.navigation = new NavigationStore(stores)
stores.events = new EventsStore(stores)
stores.people = new PeopleStore(stores)

export default stores