import {config as dotenvConfig} from 'dotenv'

dotenvConfig({path:'env.development'})

export const config ={
  authRequired: false,
  auth0Logout:true,
  secret: 'ifDSbQg8Frl5uekLRdrhglIMe9Uw4KfMk07ct8dLkla6sfJGYLiuWP6IqdQfgxmT',
  baseURL: 'https://localhost:3000',
  clientID: 'g9sKo4CvuWqmz3614QAgfv3EDMvCSBOQ',
  issuerBaseURL: 'https://dev-xk4piwty04btc53j.us.auth0.com'
}