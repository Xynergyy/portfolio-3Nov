import { redirect } from "next/navigation";

export default function OtherPage() {
  redirect("/works?cat=other");
}
