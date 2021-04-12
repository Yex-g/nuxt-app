export default function ({
  isHMR,
  app,
  store,
  route,
  params,
  error,
  redirect
}) {
  // If the user is authenticated redirect to home page
  if (store.state.user) {
    if (route.name === 'login') {
      let _route = {
        name: 'home',
        query: {
          tab: 'your_feed'
        }
      }
      return redirect(_route)
    }
    // return redirect(_route)

  }
}
