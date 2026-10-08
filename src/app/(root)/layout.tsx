import Navbar from "./components/layout/navbar/navbar";
import { getProfile } from "@/lib/content";
import ScrollAnimation from "@/components/scroll-animation";
export default async function RootLayout({children}:{children:React.ReactNode}){const profile=await getProfile();return <><Navbar profile={profile}/><ScrollAnimation />{children}</>}
