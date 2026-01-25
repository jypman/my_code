import StyledComponentsRegistry from '@/lib/StyledComponentRegistry';
import UIProviders from '@/providers/UIProviders';
import ReactQueryProviders from '@/lib/ReactQueryRegistry';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <UIProviders>
            <ReactQueryProviders>{children}</ReactQueryProviders>
          </UIProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
