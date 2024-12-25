// Function to store state in localStorage
export default function storeInLocalStorage(newState) {
  localStorage.setItem('sectionFlow', JSON.stringify(newState));
}
