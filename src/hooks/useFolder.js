export default function useFolder() {
    return process.env.REACT_APP_API_IMAGES || "http://localhost:1000/images"
}