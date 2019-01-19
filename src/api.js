export default async (endpoint, method = 'GET', token = null, body = null) => {
  return await fetch(`http://localhost:8080/${endpoint}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : null,
    },
    body,
  });
};
