import { NavigationActions } from 'react-navigation';
import { routers } from 'MYRN/app/route';

let _navigator;
function setGlobalNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function goPage(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function goBack() {
  _navigator.dispatch(
    NavigationActions.back()
  );
}

export const fetchCurrRoute = function(state) {
  const routeName = typeof state === 'string'? state: state.routeName;
  let route = routers[routeName];
  if (route) {
    return route;
  }

  return null;
};

// add other navigation functions that you need and export them
export {
  goPage,
  goBack,
  setGlobalNavigator
};