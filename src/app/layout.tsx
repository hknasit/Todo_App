import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  authors:[{name:"Harsh Kishor Nasit", url:"harshnasit.com"}],
  title: 'Full-stack todo app',
  description: "This application is designed to provide a hands-on learning experience, emphasizing the fundamental principles of CRUD operations. By working on this project, you'll gain valuable insights into both front-end and back-end development, making it an essential resource for aspiring full-stack developers.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
