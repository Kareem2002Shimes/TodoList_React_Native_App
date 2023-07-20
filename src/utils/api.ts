import { User } from "../types/app";

export async function register(user: User) {
  fetch(`${process.env.BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => error);
}
export async function login(user: User) {
  fetch(`${process.env.BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => error);
}

// export async function getAllTodos(user: User) {
//   fetch(`${process.env.BASE_URL}/todos`, {
//     method: "POST",
//     body: JSON.stringify(user),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .catch((error) => error);
// }
