export default function useHeader(token) {
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return header;
}
