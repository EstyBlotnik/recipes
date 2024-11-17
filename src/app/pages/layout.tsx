export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div>
            {/* כאן רינדור מותנה,
            אם יש טוקן עמוד מתכונים
            אם לא עמוד התחברות */}
            {children}
        </div>

    );
}
