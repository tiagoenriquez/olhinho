import { combineReducers } from 'redux';

import pagina from '../modules/Pagina';
import periodos from '../modules/Periodos';
import periodoAlterado from '../modules/PeriodoAlterado';

export default combineReducers({ pagina, periodos, periodoAlterado });
