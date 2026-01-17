import StyledComponentsRegistry from '@/lib/StyledComponentRegistry';
import UIProviders from '@/providers/UIProviders';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <UIProviders>{children}</UIProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
