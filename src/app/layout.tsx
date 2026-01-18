import StyledComponentsRegistry from '@/lib/StyledComponentRegistry';
import MSWProvider from '@/lib/MSWProvider';
import UIProviders from '@/providers/UIProviders';
import ReactQueryProviders from '@/lib/ReactQueryProvider';

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
            <MSWProvider>
              <ReactQueryProviders>{children}</ReactQueryProviders>
            </MSWProvider>
          </UIProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
