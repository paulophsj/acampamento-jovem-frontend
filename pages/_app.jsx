import { UserProvider } from "@/components/Auth/UserContext"
import "../app/globals.css"
import "../app/style.css"

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}