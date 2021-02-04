import Logo from '../assets/img/logo-white.png'
import LogoCircle from '../assets/img/logo-circle.png'

import Minimalist1 from '../assets/img/minimalist/1.jpg'
import Minimalist2 from '../assets/img/minimalist/2.jpg'
import Minimalist3 from '../assets/img/minimalist/3.jpg'
import Minimalist4 from '../assets/img/minimalist/4.jpg'
import Minimalist5 from '../assets/img/minimalist/5.jpg'

const theme = {
  MENU_LEFT_WIDTH: 64,
  LOGO: Logo,
  FAVICON: LogoCircle,
  MINIMALIST_WALLPAPERS: [
    Minimalist1,
    Minimalist2,
    Minimalist3,
    Minimalist4,
    Minimalist5,
  ],
}

const app = {
  NAME: 'Application Teste',
  KEY: 'AppUUID',
  URL: 'http://localhost:3333',
  DIR_FILES: 'tmp',
}

const STORAGE_PREFIX = 'App'

const storage = {
  PREFIX: STORAGE_PREFIX,
  AUTH: `${STORAGE_PREFIX}@Auth`,
  REDIRECT_ACTION: `${STORAGE_PREFIX}@RouteRedirect`,
}

export default {
  theme,
  app,
  storage,
}
