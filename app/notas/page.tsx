import AuroraBackground from "@/components/layout/AuroraBackground";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/Notes/Cards/Sidebar";

export default function NotasPage() {
  return (
    <AuroraBackground>
      <Header />
      <div className="p-6">
        <Sidebar />
      </div>
    </AuroraBackground>
  );
}
