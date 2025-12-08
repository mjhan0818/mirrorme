import "./globals.css";
import BottomNav from "../components/BottomNav";

export const metadata = {
  title: "MirrorMe Chat",
  description: "Persona-based Chatbot",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
