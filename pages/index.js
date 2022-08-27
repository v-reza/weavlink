import Head from "next/head";
import Image from "next/image";
import Container from "@uiComponents/Container";
import Sidebar from "@components/Sidebar/Sidebar";
import Card from "@uiComponents/Card";
import { useEffect, useState } from "react";
import useAuth from "@hooks/useAuth";
import { useRouter } from "next/router";

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
            <Sidebar />
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
