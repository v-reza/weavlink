import Head from "next/head";
import Image from "next/image";
import Container from "@uiComponents/Container";
import Sidebar from "@components/Sidebar/Sidebar";
import Card from "@uiComponents/Card";

export default function Home() {
  return (
    <Container>
      <Container.Sidebar>
        <Sidebar />
      </Container.Sidebar>
      <Container.Main>
        <Card>as</Card>
      </Container.Main>
      <Container.Rightbar>Ini Rightbar</Container.Rightbar>
    </Container>
  );
}
