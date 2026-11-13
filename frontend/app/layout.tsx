import "@/app/globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import { Toaster } from "react-hot-toast";
import 'react-datepicker/dist/react-datepicker.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        <Toaster position="top-right" />
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
