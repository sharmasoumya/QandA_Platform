export default async function ({store, route, redirect}) {
  const qnaCurrentUser = store.state.userAuthentication.user;
  const authenticatedUserRoutes = /\/user\/*/g;

  if(!qnaCurrentUser && route.path.match(authenticatedUserRoutes)) {
    redirect('/login');
  } else if (qnaCurrentUser && !route.path.match(authenticatedUserRoutes)){
    redirect(`/user/${store.getters['userAuthentication/currentUserUID']}`);
  } else {
    console.log('Error!')
  }
}
