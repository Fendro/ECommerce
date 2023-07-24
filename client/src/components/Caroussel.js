import { useEffect } from "react";

export default function Caroussel() {
  useEffect(() => {
    fetch("localhost:4242/caroussel");
  });
  return <div></div>;
}
