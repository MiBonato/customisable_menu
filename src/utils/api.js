export async function getUserData() {
  const res = await fetch('/userData.json');
  return await res.json();
}

export async function saveUserOrder(userId, order) {
  console.log(`Saving order for ${userId}:`, order);
}
