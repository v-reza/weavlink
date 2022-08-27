export default function useFolder() {
    return process.env.NEXT_APP_API_IMAGES || "http://localhost:1000/images/"
}