export function fetchUsers() {
  return fetch("http://localhost:3000/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}
// export function postUsers(user) {
//   const { firstname, lastname, email } = user;
//   const object = {
//     firstname: firstname,
//     lastname: lastname,
//     email: email,
//   };
//   fetch("http://localhost:3000/usersasdsad", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(object),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         console.log("404");
//         throw new Error(response.status);
//       } else return response.json();
//     })

//     .catch(function (error) {
//       return error;
//     });
// }
export async function postUsers(user) {
  const { firstname, lastname, email } = user;
  const object = {
    firstname: firstname,
    lastname: lastname,
    email: email,
  };

  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  };

  const fetchResponse = await fetch("http://localhost:3000/users", settings);
  if (!fetchResponse.ok) {
    throw new Error(fetchResponse.status);
  }

  const data = await fetchResponse.json();
  return data;
}
