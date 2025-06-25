import { getCurrentUser, signOut } from "aws-amplify/auth";

export async function getLoggedUser() {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (err) {
    return null;
  }
}

export async function logoutAndRedirect() {
  try {
    await signOut();
    window.location.href = "/login";
  } catch (err) {
    window.location.href = "/login";
  }
}
