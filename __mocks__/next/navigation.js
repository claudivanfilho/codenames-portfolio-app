export const useSearchParams = jest.fn(() => {
  const setSearchParams = jest.fn();
  const searchParams = new URLSearchParams();

  return searchParams;
});
