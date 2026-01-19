import StyledComponentsRegistry from '@/lib/StyledComponentRegistry';
import MSWRegistry from '@/lib/MSWRegistry';
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
            <MSWRegistry>
              <ReactQueryProviders>{children}</ReactQueryProviders>
            </MSWRegistry>
          </UIProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
