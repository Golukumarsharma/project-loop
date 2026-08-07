import "./globals.css";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "LOOP",
  description: "Feedback Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}

        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}