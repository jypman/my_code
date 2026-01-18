import StyledComponentsRegistry from '@/lib/StyledComponentRegistry';
import MSWProvider from '@/lib/MSWProvider';
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
          <MSWProvider>
            <UIProviders>{children}</UIProviders>
          </MSWProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
