export default async function token(){
    let userId = async () =>
        await fetch(document.location.origin + "/game/token")
          .then((r) => r.json())
          .then((d) => (!d.token["identity"] ? false : d.token["identity"]));
      let userInfo = await userId();
      return userInfo
}