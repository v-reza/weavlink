/* eslint-disable react-hooks/exhaustive-deps */
import Container from "@/uiComponents/Container";
import Card from "@/uiComponents/Card";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Sidebar from "@/uiComponents/Sidebar";
import {
  BookmarkIcon,
  BellIcon,
  CashIcon,
  ClipboardCheckIcon,
} from "@heroicons/react/outline";

const navigation = [
  { name: "My Jobs", href: "#", icon: BookmarkIcon, current: true },
  { name: "Job alerts", href: "#", icon: BellIcon, current: false },
  { name: "Salary", href: "#", icon: CashIcon, current: false },
  { name: "Skills Test", href: "#", icon: ClipboardCheckIcon, current: false },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [isSSR, setIsSSR] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
    setIsSSR(isAuthenticated);
  }),
    [isAuthenticated];

  return (
    <>
      {isSSR && (
        <Container>
          <Container.Sidebar>
            <Sidebar navigation={navigation} />
          </Container.Sidebar>
          <Container.Main>
            <Card>as</Card>
          </Container.Main>
          <Container.Rightbar>Ini Rightbar</Container.Rightbar>
        </Container>
      )}
    </>
  );
}
