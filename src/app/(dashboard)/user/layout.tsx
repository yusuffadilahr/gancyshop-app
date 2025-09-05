import SideBarLayout from "./_clients/components/sideBarLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SideBarLayout>{children}</SideBarLayout>;
}
