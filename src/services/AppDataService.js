import DataService from './utils/dataservice/DataService'

class _AppDataService extends DataService {
    constructor() {
        super()
    }
}

const AppDataService = new _AppDataService()
export default AppDataService